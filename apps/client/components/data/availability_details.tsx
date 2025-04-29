import { Availability } from "@/library/stores/data/objects/availability";
import { ThemedView } from "../general/themed_components";
import ColonText from "../general/colon_text";
import { FlatList } from "react-native";
import RestrictionDetails from "./restriction_details";

export default function AvailabilityDetails({ availability }: { availability: Availability }) {
  const restrictions = availability.useRestrictions();

  return (
    <ThemedView>
      <ColonText before="Rarity" after={availability.rarity ? String(availability.rarity) : 'Common'} />
      <FlatList
        data={restrictions}
        renderItem={({ item }) => <RestrictionDetails restriction={item} />}
      />
    </ThemedView>
  );
}
