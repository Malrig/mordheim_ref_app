import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

import { SpecialRule } from '../../types/items'
import { createAppAsyncThunk } from '../withTypes';
import { initialSpecialRuleState } from '@/library/data/items';

interface SpecialRulesState {
  specialRules: SpecialRule[],
  status: "idle" | "pending" | "succeeded" | "failed"
  error: string | null
}

const initialState: SpecialRulesState = {
  specialRules: [],
  status: 'idle',
  error: null
}

export const fetchSpecialRules = createAppAsyncThunk(
  "specialRules/fetchSpecialRules",
  async () => {
    const response = await new Promise(f =>
      setTimeout(f, 1000)) // Add in a delay to play around with Async
      .then(() => initialSpecialRuleState);
    return response;
  },
  // Below prevents any new dispatches of this thunk if the condition is not met.
  {
    condition(arg, thunkApi) {
      const postsStatus = selectSpecialRulesStatus(thunkApi.getState())
      if (postsStatus !== 'idle') {
        return false
      }
    }
  },
)

// Create the slice and pass in the initial state
const specialRulesSlice = createSlice({
  name: 'specialRules',
  initialState,
  reducers: {
    specialRuleAdded(state, action: PayloadAction<SpecialRule>) {
      if (!state.specialRules.find(specialRule => specialRule.name === action.payload.name)) {
        state.specialRules.push(action.payload);
      }
    },
    specialRuleUpdated(state, action: PayloadAction<SpecialRule>) {
      const updatedSpecialRule = action.payload;
      let existingSpecialRule = state.specialRules.find(specialRule => specialRule.name === updatedSpecialRule.name);

      if (existingSpecialRule) {
        Object.assign(existingSpecialRule, updatedSpecialRule);
      }

      // If SpecialRule does not already exist then don't do anything.
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSpecialRules.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchSpecialRules.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.specialRules.push(...action.payload)
      })
      .addCase(fetchSpecialRules.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Unknown Error'
      })
  },
  selectors: {
    selectAllSpecialRules: specialRulesState => specialRulesState.specialRules,
    selectSpecialRuleByName: (specialRulesState, specialRuleName: string) => {
      return specialRulesState.specialRules.find(specialRule => specialRule.name === specialRuleName)
    },
    selectSpecialRulesStatus: (specialRulesState) => specialRulesState.status,
    selectSpecialRulesError: (specialRulesState) => specialRulesState.error,
  }
})


export default specialRulesSlice.reducer

// Export all the actions
export const { specialRuleAdded, specialRuleUpdated } = specialRulesSlice.actions
// Export all the selectors
export const { selectAllSpecialRules, selectSpecialRuleByName, selectSpecialRulesStatus, selectSpecialRulesError } = specialRulesSlice.selectors
