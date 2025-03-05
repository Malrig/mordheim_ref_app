import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

import { Armour, Availability } from '../../types/items'
import { createAppAsyncThunk } from '../withTypes';
import { initialArmourState } from '@/library/data/items';
import { SourceStatus } from '@/library/types/metadata';

interface ArmoursState {
  armours: Armour[],
  status: "idle" | "pending" | "succeeded" | "failed"
  error: string | null
}

const initialState: ArmoursState = {
  armours: [],
  status: 'idle',
  error: null
}

export const fetchArmours = createAppAsyncThunk(
  "armours/fetchArmours",
  async () => {
    const response = await new Promise(f =>
      setTimeout(f, 1000)) // Add in a delay to play around with Async
      .then(() => initialArmourState);
    return response;
  },
  // Below prevents any new dispatches of this thunk if the condition is not met.
  {
    condition(arg, thunkApi) {
      const postsStatus = selectArmoursStatus(thunkApi.getState())
      if (postsStatus !== 'idle') {
        return false
      }
    }
  },
)

// Create the slice and pass in the initial state
const armoursSlice = createSlice({
  name: 'armours',
  initialState,
  reducers: {
    armourAdded: {
      reducer(state, action: PayloadAction<Armour>) {
        if (!state.armours.find(armour => armour.id === action.payload.id)) {
          state.armours.push(action.payload);
        }
      },
      prepare(name: string, description: string, availability: Availability, price: string, source?: string, source_type?: SourceStatus, favourite?: boolean) {
        return {
          payload: {
            id: nanoid(),
            name: name,
            description: description,
            availability: availability,
            price: price,
            source: source ?? "",
            source_type: source_type ?? SourceStatus.Unknown,
            favourite: favourite ?? false,
          }
        }
      }
    },
    armourUpdated(state, action: PayloadAction<Armour>) {
      const updatedArmour = action.payload;
      let existingArmour = state.armours.find(armour => armour.name === updatedArmour.name);

      if (existingArmour) {
        Object.assign(existingArmour, updatedArmour);
      }

      // If Armour does not already exist then don't do anything.
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchArmours.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchArmours.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.armours.push(...action.payload)
      })
      .addCase(fetchArmours.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Unknown Error'
      })
  },
  selectors: {
    selectAllArmours: armoursState => armoursState.armours,
    selectArmourById: (armoursState, armourId: string) => {
      return armoursState.armours.find(armour => armour.id === armourId)
    },
    selectArmoursStatus: (armoursState) => armoursState.status,
    selectArmoursError: (armoursState) => armoursState.error,
  }
})


export default armoursSlice.reducer

// Export all the actions
export const { armourAdded, armourUpdated } = armoursSlice.actions
// Export all the selectors
export const { selectAllArmours, selectArmourById, selectArmoursStatus, selectArmoursError } = armoursSlice.selectors
