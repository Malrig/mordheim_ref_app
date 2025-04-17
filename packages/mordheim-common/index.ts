export const DATA_STORE = "data-store"
export const USER_STORE = "user-store"

export const PERMISSIONS = [
  "update",
  "delete",
]

export const ALL_STORES = [
  DATA_STORE
]
export const USER_SPECIFIC_STORES = [
  USER_STORE
]

export function userStore(user_id: string) {
  return `${USER_STORE}-${user_id}`;
}
export function userSpecificStoreName(store: string, user_id: string) {
  return `${store}-${user_id}`;
}

