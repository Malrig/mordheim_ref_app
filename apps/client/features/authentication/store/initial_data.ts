import { Content } from "tinybase/store/with-schemas";
import { TablesSchema, ValuesSchema } from "./schema";

const InitialTableData = { } as const;

const InitialValueData = {
  email: "",
  access_token: "",
  user_role: "",
  user_id: "",
};

export const InitialData: Content<[typeof TablesSchema, typeof ValuesSchema]> = [
  InitialTableData,
  InitialValueData,
];
