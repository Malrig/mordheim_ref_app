import { useAuthStore, STORE_NAME } from "../store";
import { useValue } from "../ui";


export function useIsLoggedIn(): {loading: boolean, isLoggedIn: boolean} {
  const authStore = useAuthStore();
  const userId = useValue("user_id", STORE_NAME);

  console.log(`authStore: ${authStore}, userId: ${userId}`);

  return {
    loading: !authStore,
    isLoggedIn: userId !== null && userId !== undefined && userId !== "",
  };
}

export const login = () => {

}

export const logout = () => {

}

export const signUpWithEmail = () => {

}
