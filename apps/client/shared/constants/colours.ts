const mordheim_gold = '#FFD700';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export const Colours = {
  [Theme.Light]: {
    background: '#fff',
    primary: '#0a7ea4',
    secondary: '#0a7ea4',
    tertiary: mordheim_gold,
    text: '#BCB8B1',
    grey: '#687076',
    tabBarBackground: '#1C1E21',
    tabIconDefault: '#687076',
    tabIconSelected: '#ffd33d',
  },
  [Theme.Dark]: {
    background: '#2E4057',
    primary: '#393C40',
    secondary: '#545C66',
    tertiary: mordheim_gold,
    text: '#BCB8B1',
    grey: '#687076',
    tabBarBackground: '#1C1E21',
    tabIconDefault: '#687076',
    tabIconSelected: mordheim_gold,
  },
};

export type availableColours = keyof (typeof Colours)[Theme.Light] &
  keyof (typeof Colours)[Theme.Dark];
