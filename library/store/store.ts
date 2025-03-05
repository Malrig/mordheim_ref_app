import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from '@reduxjs/toolkit';

import skillsReducer from './features/skillsSlice'
import specialRulesReducer from './features/specialRulesSlice'
import armourReducer from './features/armoursSlice'
import miscItemReducer from './features/miscItemsSlice'
import weaponReducer from './features/weaponSlice'

const persistConfig = {
  key: "root",
  storage
}

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    skills: skillsReducer,
    specialRules: specialRulesReducer,
    armours: armourReducer,
    miscItems: miscItemReducer,
    weapons: weaponReducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer
})

// Infer the type of `store`
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch
// Same for the `RootState` type
export type RootState = ReturnType<typeof store.getState>
// Export a reusable type for handwritten thunks
export type AppThunk = ThunkAction<void, RootState, unknown, Action>
// Export the persistor that's used to persist data
export const persistor = persistStore(store);
