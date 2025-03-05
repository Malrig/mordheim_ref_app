import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

import { Weapon, Availability, WeaponType } from '../../types/items'
import { createAppAsyncThunk } from '../withTypes';
import { initialWeaponState } from '@/library/data/items';
import { SourceStatus } from '@/library/types/metadata';

interface WeaponsState {
  weapons: Weapon[],
  status: "idle" | "pending" | "succeeded" | "failed"
  error: string | null
}

const initialState: WeaponsState = {
  weapons: [],
  status: 'idle',
  error: null
}

export const fetchWeapons = createAppAsyncThunk(
  "weapons/fetchWeapons",
  async () => {
    const response = await new Promise(f =>
      setTimeout(f, 1000)) // Add in a delay to play around with Async
      .then(() => initialWeaponState);
    return response;
  },
  // Below prevents any new dispatches of this thunk if the condition is not met.
  {
    condition(arg, thunkApi) {
      const postsStatus = selectWeaponsStatus(thunkApi.getState())
      if (postsStatus !== 'idle') {
        return false
      }
    }
  },
)

// Create the slice and pass in the initial state
const weaponsSlice = createSlice({
  name: 'weapons',
  initialState,
  reducers: {
    weaponAdded: {
      reducer(state, action: PayloadAction<Weapon>) {
        if (!state.weapons.find(weapon => weapon.id === action.payload.id)) {
          state.weapons.push(action.payload);
        }
      },
      prepare(name: string, description: string, availability: Availability, price: string, range: string, strength, special_rules: string[], weapon_type: WeaponType, source?: string, source_type?: SourceStatus, favourite?: boolean) {
        return {
          payload: {
            id: nanoid(),
            name: name,
            description: description,
            availability: availability,
            price: price,
            range: range,
            strength: strength,
            special_rules: special_rules,
            weapon_type: weapon_type,
            source: source ?? "",
            source_type: source_type ?? SourceStatus.Unknown,
            favourite: favourite ?? false,
          }
        }
      }
    },
    weaponUpdated(state, action: PayloadAction<Weapon>) {
      const updatedWeapon = action.payload;
      let existingWeapon = state.weapons.find(weapon => weapon.name === updatedWeapon.name);

      if (existingWeapon) {
        Object.assign(existingWeapon, updatedWeapon);
      }

      // If Weapon does not already exist then don't do anything.
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWeapons.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchWeapons.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.weapons.push(...action.payload)
      })
      .addCase(fetchWeapons.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Unknown Error'
      })
  },
  selectors: {
    selectAllWeapons: weaponsState => weaponsState.weapons,
    selectWeaponById: (weaponsState, weaponId: string) => {
      return weaponsState.weapons.find(weapon => weapon.id === weaponId)
    },
    selectWeaponsStatus: (weaponsState) => weaponsState.status,
    selectWeaponsError: (weaponsState) => weaponsState.error,
  }
})


export default weaponsSlice.reducer

// Export all the actions
export const { weaponAdded, weaponUpdated } = weaponsSlice.actions
// Export all the selectors
export const { selectAllWeapons, selectWeaponById, selectWeaponsStatus, selectWeaponsError } = weaponsSlice.selectors
