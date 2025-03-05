import { Text, View, FlatList } from "react-native";
import { Link } from 'expo-router';

// What does this page do?
// - Display all items available in the campaign.
//   - Split by type (e.g. melee weapon, ranged weapon, etc).
//   - Include special rules (special rules should be separate entities by reference).
// - People should be able to "favourite" items and they appear in the quick reference sheet.

export default function Items() {
    return (
        <View>
            <Text>This is where the items would go.</Text>
        </View>
    );
}
