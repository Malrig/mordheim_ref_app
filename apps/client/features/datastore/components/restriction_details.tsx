import { Restriction } from "../objects/restriction";
import { ThemedView } from "@/shared/components/themed_components";
import ColonText from "@/shared/components/colon_text";

export default function RestrictionDetails({ restriction }: { restriction: Restriction }) {
  return (
    <ThemedView>
      <ColonText before={restriction.restriction_type} after={restriction.restriction} />
    </ThemedView>
  );
}
