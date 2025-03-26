import { NewItem } from "@/library/types/new_items";
import { createSlice, PayloadAction, createEntityAdapter } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import { Availability, ItemType, WeaponType } from "@/library/types/items";
import { SourceStatus } from "@/library/types/metadata";
import { createAppAsyncThunk } from "../withTypes";
import { initialMiscItemState, initialArmourState } from "@/library/data/items";
import { initialWeaponState } from "@/library/data/weapons";
import { RootState } from "../store";

// Create the entity adapter
const itemsAdapter = createEntityAdapter<NewItem>({
  // The id field is already defined in NewItem, so we don't need to specify it
  // If we needed to specify a different id field, we would use:
  // selectId: (item) => item.id,
});

interface ItemsState {
  status: "idle" | "pending" | "succeeded" | "failed"
  error: string | null
}

// Initialize the state with the adapter
const initialState = itemsAdapter.getInitialState<ItemsState>({
  status: 'idle',
  error: null
});

export const fetchItems = createAppAsyncThunk(
  "items/fetchItems",
  async () => {
    const response = await new Promise(f =>
      setTimeout(f, 1000)) // Add in a delay to play around with Async
      .then(() => {
        // Map existing items to NewItem type
        const miscItems: NewItem[] = initialMiscItemState.map(item => ({
          ...item,
          id: item.id ?? nanoid(),
          range: null,
          strength: null,
          special_rules: null,
          weapon_type: null,
          item_type: ItemType.MiscItem
        }));

        const armourItems: NewItem[] = initialArmourState.map(item => ({
          ...item,
          id: item.id ?? nanoid(),
          range: null,
          strength: null,
          special_rules: null,
          weapon_type: null,
          item_type: ItemType.Armour
        }));

        const weaponItems: NewItem[] = initialWeaponState.map(item => ({
          ...item,
          id: item.id ?? nanoid(),
          range: item.range,
          strength: item.strength,
          special_rules: item.special_rules,
          weapon_type: item.weapon_type,
          item_type: ItemType.Weapon
        }));

        return [...miscItems, ...armourItems, ...weaponItems];
      });
    return response;
  }
)

// Create the slice and pass in the initial state
const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    itemAdded: {
      reducer(state, action: PayloadAction<NewItem>) {
        itemsAdapter.addOne(state, action.payload);
      },
      prepare(name: string, description: string, availability: Availability, price: string, item_type: ItemType, source?: string, source_type?: SourceStatus, favourite?: boolean) {
        return {
          payload: {
            id: nanoid(),
            name,
            description,
            availability,
            price,
            item_type,
            source: source ?? "",
            source_type: source_type ?? SourceStatus.Unknown,
            favourite: favourite ?? false,
            range: null,
            strength: null,
            special_rules: null,
            weapon_type: null
          } as NewItem
        }
      }
    },
    itemUpdated(state, action: PayloadAction<NewItem>) {
      itemsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload
      });
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'pending'
        state.error = null
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.error = null
        // Replace all items with the new ones
        itemsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Unknown Error'
      })
  },
  selectors: {
    selectAllItems: itemsAdapter.getSelectors().selectAll,
    selectItemById: itemsAdapter.getSelectors().selectById,
    selectItemIds: itemsAdapter.getSelectors().selectIds,
    selectTotalItems: itemsAdapter.getSelectors().selectTotal,
    selectItemEntities: itemsAdapter.getSelectors().selectEntities,
    selectItemsStatus: (state) => state.status,
    selectItemsError: (state) => state.error,
    selectItemsByType: (state, itemType: ItemType) => {
      const allItems = itemsAdapter.getSelectors().selectAll(state);
      return allItems.filter(item => item.item_type === itemType);
    },
    selectArmours: (state) => {
      const allItems = itemsAdapter.getSelectors().selectAll(state);
      return allItems.filter(item => item.item_type === ItemType.Armour);
    },
    selectMiscItems: (state) => {
      const allItems = itemsAdapter.getSelectors().selectAll(state);
      return allItems.filter(item => item.item_type === ItemType.MiscItem);
    },
    selectWeapons: (state) => {
      const allItems = itemsAdapter.getSelectors().selectAll(state);
      return allItems.filter(item => item.item_type === ItemType.Weapon);
    }
  }
})

export default itemsSlice.reducer

// Export all the actions
export const { itemAdded, itemUpdated } = itemsSlice.actions

// Export all the selectors
export const {
  selectAllItems,
  selectItemById,
  selectItemIds,
  selectTotalItems,
  selectItemEntities,
  selectItemsStatus,
  selectItemsError,
  selectItemsByType,
  selectArmours,
  selectMiscItems,
  selectWeapons
} = itemsSlice.selectors;
