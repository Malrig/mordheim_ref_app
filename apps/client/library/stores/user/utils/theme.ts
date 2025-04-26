import { availableColours, Colours, Theme } from "@/library/constants/colours";
import { UserStore } from "../../stores"

export function useColourScheme(): Theme {
  const userStore = UserStore.useStore();

  if (!userStore) {
    return Theme.Dark;
  }

  const theme = userStore.getValue("theme");

  return theme as Theme;
}

export function useThemeColour(
  colorName: availableColours
) {
  const theme = useColourScheme() ?? Theme.Light;

  return Colours[theme][colorName];
}
