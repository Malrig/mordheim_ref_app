import { createSlice, nanoid, PayloadAction, createEntityAdapter, EntityId, createSelector } from '@reduxjs/toolkit'

import { SpecialRule } from '../../types/items'
import { createAppAsyncThunk } from '../withTypes';
import { initialSpecialRuleState } from '@/library/data/weapons';

const specialRulesAdapter = createEntityAdapter<SpecialRule>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

interface SpecialRulesState {
  status: "idle" | "pending" | "succeeded" | "failed"
  error: string | null
}

const initialState = specialRulesAdapter.getInitialState<SpecialRulesState>({
  status: 'idle',
  error: null
});

export const fetchSpecialRules = createAppAsyncThunk(
  "specialRules/fetchSpecialRules",
  async () => {
    const response = await new Promise(f =>
      setTimeout(f, 1000)) // Add in a delay to play around with Async
      .then(() => initialSpecialRuleState);
    return response;
  },
  {
    condition(arg, thunkApi) {
      const postsStatus = selectSpecialRulesStatus(thunkApi.getState())
      if (postsStatus !== 'idle') {
        return false
      }
    }
  },
)

const specialRulesSlice = createSlice({
  name: 'specialRules',
  initialState,
  reducers: {
    specialRuleAdded: {
      reducer(state, action: PayloadAction<SpecialRule>) {
        specialRulesAdapter.addOne(state, action.payload);
      },
      prepare(name: string, description: string) {
        return {
          payload: {
            id: nanoid(),
            name: name,
            description: description,
          }
        }
      }
    },
    specialRuleUpdated(state, action: PayloadAction<SpecialRule>) {
      specialRulesAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload
      });
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSpecialRules.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchSpecialRules.fulfilled, (state, action) => {
        state.status = 'succeeded'
        specialRulesAdapter.setAll(state, action.payload.map(rule => ({ ...rule, id: rule.id ?? nanoid() })))
      })
      .addCase(fetchSpecialRules.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Unknown Error'
      })
  },
  selectors: {
    selectAllSpecialRules: (state) => specialRulesAdapter.getSelectors().selectAll(state),
    selectSpecialRuleById: (state, id: string) => specialRulesAdapter.getSelectors().selectById(state, id),
    selectSpecialRuleIds: (state) => specialRulesAdapter.getSelectors().selectIds(state),
    selectTotalSpecialRules: (state) => specialRulesAdapter.getSelectors().selectTotal(state),
    selectSpecialRulesStatus: (state) => state.status,
    selectSpecialRulesError: (state) => state.error,
    selectSpecialRulesByIds: createSelector(
      [(state) => state, (state, specialRuleIds: string[]) => specialRuleIds],
      (state, specialRuleIds) =>
        specialRuleIds
          .map(id => specialRulesAdapter.getSelectors().selectById(state, id))
          .filter((rule): rule is SpecialRule => rule !== undefined)
    ),
    selectSpecialRuleByName: (state, specialRuleName: string) =>
      specialRulesAdapter.getSelectors().selectAll(state).find(specialRule => specialRule.name === specialRuleName),
  }
})

export default specialRulesSlice.reducer

// Export all the actions
export const { specialRuleAdded, specialRuleUpdated } = specialRulesSlice.actions

// Export all the selectors
export const {
  selectAllSpecialRules,
  selectSpecialRuleById,
  selectSpecialRuleIds,
  selectTotalSpecialRules,
  selectSpecialRulesStatus,
  selectSpecialRulesError,
  selectSpecialRulesByIds,
  selectSpecialRuleByName,
} = specialRulesSlice.selectors;
