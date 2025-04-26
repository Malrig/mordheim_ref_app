import { useCallback } from "react";
import { AuthStore } from "../interface";
import { removeUserSpecificStores } from "./user_specific_stores";
import { Session } from "@supabase/supabase-js";
import { getUserRoleAndPermissions } from "@/library/supabase";
import { supabase } from "@/library/supabase";
import { Alert } from "react-native";

export function useIsLoggedIn(): { loading: boolean, isLoggedIn: boolean } {
  const authStore = AuthStore.useStore();
  const userId = AuthStore.storeUIHooks.useValue("user_id", authStore);

  console.log(`authStore: ${authStore}, userId: ${userId}`);

  return {
    loading: !authStore,
    isLoggedIn: userId !== null && userId !== undefined && userId !== "",
  };
}

export async function signInWithEmail(email: string, password: string, setLoading?: (loading: boolean) => void) {
  setLoading?.(true)
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })

  if (error) {
    Alert.alert(error.message)
    setLoading?.(false)
    return false
  }
  setLoading?.(false)
  return true
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) Alert.alert(error.message)
}

export async function signUpWithEmail(email: string, password: string, setLoading: (loading: boolean) => void) {
  setLoading(true)
  const {
    data: { session },
    error,
  } = await supabase.auth.signUp({
    email: email,
    password: password,
  })

  if (error) Alert.alert(error.message)
  if (!session) Alert.alert('Please check your inbox for email verification!')
  setLoading(false)
}

export const userLoggedOutCallback = () => {
  const authStore = AuthStore.storeUIHooks.useStore(AuthStore.store_id);

  const removeStores = removeUserSpecificStores();

  return useCallback(() => {
    console.log(`User logged out`)

    removeStores();

    if (authStore) {
      authStore.setValue('user_id', '');
      authStore.setValue('email', '');
      authStore.setValue('access_token', '');
      authStore.setValue('user_role', '');
      authStore.delTable("permissions");
    }
  },
    [authStore, removeStores]
  )
}

export const userSignedInCallback = () => {
  const authStore = AuthStore.storeUIHooks.useStore(AuthStore.store_id);
  const user_id = AuthStore.storeUIHooks.useValue("user_id");

  const logoutCb = userLoggedOutCallback()

  return useCallback((user_session: Session) => {
    console.log("Sign in event")

    if (user_id && user_session.user.id && (user_id != user_session.user.id)) {
      // Use has changed or been logged out somehow, call the logout callback
      logoutCb()
    }

    if (!authStore) { console.log("No auth store"); return; }

    console.log(`User signed in: ${user_session.user.email}, ${user_session.user.id}`);
    authStore.setValue('user_id', user_session.user.id || '');
    authStore.setValue('email', user_session.user.email || '');
    authStore.setValue('access_token', user_session.access_token || '');
    const { userRole, permissions } = getUserRoleAndPermissions(user_session);

    console.log(`User role: ${userRole}`);
    console.log(`User permissions: ${JSON.stringify(permissions)}`);
    authStore.setValue('user_role', userRole);
    authStore.setTable('permissions', permissions);
  },
    [logoutCb, authStore, user_id])
}


