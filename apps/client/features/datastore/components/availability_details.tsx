import { Availability } from "@/features/datastore/objects/availability";
import { ThemedView } from "@/shared/components/themed_components";
import ColonText from "@/shared/components/colon_text";
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
