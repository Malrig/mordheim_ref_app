import { Content } from "tinybase/store/with-schemas";
import { TablesSchema, ValuesSchema } from "./schema";


const InitialTableData = {
  favourites: {} as const,
} as const;

const InitialValueData = {
  // isThemeDark: localStorage.getItem("theme") === "dark",
};

export const InitialData: Content<[typeof TablesSchema, typeof ValuesSchema]> = [
  InitialTableData,
  InitialValueData
];
