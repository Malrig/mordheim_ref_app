import { Restriction } from "@/library/stores/data/objects/restriction";
import { ThemedView } from "../general/themed_components";
import ColonText from "../general/colon_text";

export default function RestrictionDetails({ restriction }: { restriction: Restriction }) {
  return (
    <ThemedView>
      <ColonText before={restriction.restriction_type} after={restriction.restriction} />
    </ThemedView>
  );
}
