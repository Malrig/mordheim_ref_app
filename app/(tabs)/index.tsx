import { Pressable, Text, View } from "react-native";
import { Link } from 'expo-router';
import { persistor } from "@/library/store/store";

export default function Index() {
  return (
    <View>
      <Pressable onPress={() => persistor.purge()}>
        <Text>If you need to reload data press this</Text>
      </Pressable>
    </View>
  );
}
