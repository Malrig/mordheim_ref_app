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
  colorName: availableColours | "transparent"
) {
  const theme = useColourScheme() ?? Theme.Light;

  if (colorName === "transparent") {
    return "transparent";
  }

  return Colours[theme][colorName];
}
