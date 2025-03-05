import { Text, View } from "react-native";
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link href="/skills">Skills</Link>
      <Link href="/items">Items</Link>
      <Link href="/quick_reference">Quick Reference</Link>
    </View>
  );
}
