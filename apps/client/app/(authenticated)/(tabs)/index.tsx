import { View } from "react-native";
import RichText from "@/shared/components/markdown_text";

export default function Index() {
  const text = `
# h1 Heading 8-)
| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |`;
  return (
    <View>
      <RichText text={text} />
    </View>
  );
}
