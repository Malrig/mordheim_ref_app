import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

import { MiscItem, Availability, ItemType } from '../../types/items'
import { createAppAsyncThunk } from '../withTypes';
import { initialMiscItemState } from '@/library/data/items';
import { SourceStatus } from '@/library/types/metadata';

interface MiscItemsState {
  miscItems: MiscItem[],
  status: "idle" | "pending" | "succeeded" | "failed"
  error: string | null
}

const initialState: MiscItemsState = {
  miscItems: [],
  status: 'idle',
  error: null
}

export const fetchMiscItems = createAppAsyncThunk(
  "miscItems/fetchMiscItems",
  async () => {
    const response = await new Promise(f =>
      setTimeout(f, 1000)) // Add in a delay to play around with Async
      .then(() => initialMiscItemState);
    return response;
  },
  // Below prevents any new dispatches of this thunk if the condition is not met.
  {
    condition(arg, thunkApi) {
      const postsStatus = selectMiscItemsStatus(thunkApi.getState())
      if (postsStatus !== 'idle') {
        return false
      }
    }
  },
)

// Create the slice and pass in the initial state
const miscItemsSlice = createSlice({
  name: 'miscItems',
  initialState,
  reducers: {
    miscItemAdded: {
      reducer(state, action: PayloadAction<MiscItem>) {
        if (!state.miscItems.find(miscItem => miscItem.id === action.payload.id)) {
          state.miscItems.push(action.payload);
        }
      },
      prepare(name: string, description: string, availability: Availability, price: string, source?: string, source_type?: SourceStatus, favourite?: boolean) {
        let payload: MiscItem = {
          name: name,
          description: description,
          availability: availability,
          price: price,
          source: source ?? "",
          source_type: source_type ?? SourceStatus.Unknown,
          favourite: favourite ?? false,
          item_type: ItemType.MiscItem,
        }

        return {
          payload: payload
        }
      }
    },
    miscItemUpdated(state, action: PayloadAction<MiscItem>) {
      const updatedMiscItem = action.payload;
      let existingMiscItem = state.miscItems.find(miscItem => miscItem.name === updatedMiscItem.name);

      if (existingMiscItem) {
        Object.assign(existingMiscItem, updatedMiscItem);
      }

      // If MiscItem does not already exist then don't do anything.
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMiscItems.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchMiscItems.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.miscItems.push(...action.payload)
      })
      .addCase(fetchMiscItems.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Unknown Error'
      })
  },
  selectors: {
    selectAllMiscItems: miscItemsState => miscItemsState.miscItems,
    selectMiscItemById: (miscItemsState, miscItemId: string) => {
      return miscItemsState.miscItems.find(miscItem => miscItem.id === miscItemId)
    },
    selectMiscItemsStatus: (miscItemsState) => miscItemsState.status,
    selectMiscItemsError: (miscItemsState) => miscItemsState.error,
  }
})


export default miscItemsSlice.reducer

// Export all the actions
export const { miscItemAdded, miscItemUpdated } = miscItemsSlice.actions
// Export all the selectors
export const { selectAllMiscItems, selectMiscItemById, selectMiscItemsStatus, selectMiscItemsError } = miscItemsSlice.selectors
