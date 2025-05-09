import { Content } from 'tinybase/store/with-schemas';
import { TablesSchema, ValuesSchema } from './schema';
import { Appearance } from 'react-native';

const InitialTableData = {
  favourites: {} as const,
} as const;

const InitialValueData = {
  theme: Appearance.getColorScheme() === 'light' ? 'light' : 'dark',
};

export const InitialData: Content<[typeof TablesSchema, typeof ValuesSchema]> =
  [InitialTableData, InitialValueData];
