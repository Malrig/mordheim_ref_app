import { Pressable, Text, View } from "react-native";
import { Link } from 'expo-router';
import { persistor } from "../../library/store/store";
import RichText from "../../components/general/markdown_text";

export default function Index() {
  const text = `
# h1 Heading 8-)
| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |`;
  return (
    <View>
      <Pressable onPress={() => persistor.purge()}>
        <Text>If you need to reload data press this</Text>
      </Pressable>
      <RichText text={text} />
    </View>
  );
}
