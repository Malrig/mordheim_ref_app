import { TablesSchema, ValuesSchema } from "./schema";
import * as UiReact from "tinybase/ui-react/with-schemas";


const UiReactWithSchemas = UiReact as UiReact.WithSchemas<
  [typeof TablesSchema, typeof ValuesSchema]
>;

export const {
  Provider,
  useCreatePersister,
  useCreateStore,
  useCreateIndexes,
  useCreateRelationships,
  useValues,
  useValue,
  useSetPartialValuesCallback,
  CellProps,
  CellView,
  RowView,
  useHasRow,
  useRowIds,
  useAddRowCallback,
  useSliceIds,
  useCell,
  useSetPartialRowCallback,
  LocalRowsView,
  RowProps,
  useLocalRowIds,
  useDelRowCallback
} = UiReactWithSchemas;
