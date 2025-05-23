import { useCallback } from 'react';
import { AuthStore } from '../store/interface';
import { useRemoveUserSpecificStores } from './user_specific_stores';
import { Session } from '@supabase/supabase-js';
import { getUserRoleAndPermissions } from '@/features/authentication/hooks/supabase';
import { supabase } from '@/features/authentication/hooks/supabase';
import { Alert } from 'react-native';

const showAlert = (message: string) => {
  Alert.alert('Alert', message);
};

export function useIsLoggedIn(): { loading: boolean; isLoggedIn: boolean } {
  const authStore = AuthStore.useStore();
  const userId = AuthStore.storeUIHooks.useValue('user_id', authStore);

  console.log(`authStore: ${authStore}, userId: ${userId}`);

  return {
    loading: !authStore,
    isLoggedIn: userId !== null && userId !== undefined && userId !== '',
  };
}

export async function signInWithEmail(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) showAlert(error.message);
}

export async function signUpWithEmail(
  email: string,
  password: string
): Promise<{
  success: boolean;
  error?: string;
  requiresEmailConfirmation?: boolean;
}> {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      emailRedirectTo: window.location.origin,
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  // Check if email confirmation is required
  if (data.user && !data.user.confirmed_at) {
    return {
      success: true,
      requiresEmailConfirmation: true,
    };
  }

  return { success: true, requiresEmailConfirmation: false };
}

export const useUserLoggedOutCallback = () => {
  const authStore = AuthStore.storeUIHooks.useStore(AuthStore.store_id);

  const removeStores = useRemoveUserSpecificStores();

  return useCallback(() => {
    console.log(`User logged out`);

    removeStores();

    if (authStore) {
      authStore.setValue('user_id', '');
      authStore.setValue('email', '');
      authStore.setValue('access_token', '');
      authStore.setValue('user_role', '');
      authStore.delTable('permissions');
    }
  }, [authStore, removeStores]);
};

export const useUserSignedInCallback = () => {
  const authStore = AuthStore.storeUIHooks.useStore(AuthStore.store_id);
  const user_id = AuthStore.storeUIHooks.useValue('user_id');

  const logoutCb = useUserLoggedOutCallback();

  return useCallback(
    (user_session: Session) => {
      console.log('Sign in event');

      if (user_id && user_session.user.id && user_id != user_session.user.id) {
        // Use has changed or been logged out somehow, call the logout callback
        logoutCb();
      }

      if (!authStore) {
        console.log('No auth store');
        return;
      }

      console.log(
        `User signed in: ${user_session.user.email}, ${user_session.user.id}`
      );
      authStore.setValue('user_id', user_session.user.id || '');
      authStore.setValue('email', user_session.user.email || '');
      authStore.setValue('access_token', user_session.access_token || '');
      const { userRole, permissions } = getUserRoleAndPermissions(user_session);

      console.log(`User role: ${userRole}`);
      console.log(`User permissions: ${JSON.stringify(permissions)}`);
      authStore.setValue('user_role', userRole);
      authStore.setTable('permissions', permissions);
    },
    [logoutCb, authStore, user_id]
  );
};
