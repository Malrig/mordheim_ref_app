import { Text, View, FlatList } from "react-native";
import { Link } from 'expo-router';
import SkillListItem from "@/components/skills/skill_list_item";
import { selectAllSkills, selectFavouriteSkills } from "@/library/store/features/skillsSlice";
import { useAppSelector } from "@/library/store/hooks";

// What does this page do?
// - Displays all the information that people have chosen to appear here.
//   - E.g. favourited weapons, armour, equipment, and skills.
//   - Spells / magic that people have favourited.
//   - Particular rules (e.g. shooting, movement etc).
// - Advanced critical hits
// - Any other common rules that are looked up often.
//   - Various psychology things
//   - Mounted warriors rules
//   - Misfire rules, etc.

export default function QuickReference() {
  const skills = useAppSelector(selectFavouriteSkills);
  return (
    <View>
      <Text>Favourite Skills</Text>
      <FlatList data={skills} renderItem={({ item }) => <><SkillListItem skill={item} /></>} />
    </View>
  );
}
