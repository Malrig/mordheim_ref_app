import { StyleSheet, FlatList, SectionList, Pressable, ViewToken, SectionListRenderItem } from "react-native";
import * as React from 'react';
import { useState } from "react";
import { ThemedText, ThemedView } from "./themed_components";
import { useThemeColour } from "@/features/userstore/hooks/theme";

interface ObjectWithId {
  id: string
}

interface Section<ObjectType extends ObjectWithId> {
  title: string;
  data: ObjectType[];
  sectionKey: string;
}


type SectionListProps<ObjectType extends ObjectWithId> = {
  sections: Section<ObjectType>[],
  renderItem: SectionListRenderItem<ObjectType, Section<ObjectType>>
}

export function SectionedList<ObjectType extends ObjectWithId>({ sections, renderItem }: SectionListProps<ObjectType>) {
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const sectionListRef = React.useRef<SectionList<ObjectType, Section<ObjectType>>>(null);
  const sectionSelectionRef = React.useRef<FlatList<Section<ObjectType>>>(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    typeListContainer: {
      height: 50,
      marginBottom: 16,
    },
    typeListContent: {
      paddingVertical: 8,
    },
    typeItem: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginRight: 8,
      borderRadius: 20,
      backgroundColor: useThemeColour("tabIconDefault"),
    },
    selectedTypeItem: {
      backgroundColor: useThemeColour("tabIconSelected"),
    },
    selectedTypeItemText: {
      color: useThemeColour("primary"),
      fontWeight: 'bold',
    },
    sectionListContainer: {
      flex: 1,
    },
    sectionHeader: {
      padding: 10,
      marginTop: 0,
    },
  });

  const onSectionSelect = React.useCallback((section: Section<ObjectType>) => {
    setCurrentSection(section.sectionKey);
    sectionListRef?.current?.scrollToLocation({
      sectionIndex: sections.findIndex(s => s.sectionKey === section.sectionKey),
      itemIndex: 1,
      animated: true
    });
  }, [sections]);

  const renderSectionSelectionHeading = ({ item: section }: { item: Section<ObjectType> }) => (
    <Pressable
      style={[
        styles.typeItem,
        currentSection != null && currentSection == section.sectionKey && styles.selectedTypeItem
      ]}
      onPress={() => onSectionSelect(section)}
    >
      <ThemedText style={
        ((currentSection != null && currentSection == section.sectionKey) ? { ...styles.selectedTypeItemText } : {})
      }>
        {section.title}
      </ThemedText>
    </Pressable>
  );

  const renderSectionHeader = ({ section: { title } }: { section: Section<ObjectType> }) => (
    <ThemedView backgroundColor="primary" style={styles.sectionHeader}>
      <ThemedText variant="subtitle">{title}</ThemedText>
    </ThemedView>
  );

  const onViewableItemsChanged = ({ viewableItems, changed }: { viewableItems: ViewToken<ObjectType>[], changed: ViewToken<ObjectType>[] }) => {
    // Set the current section to the first viewable item
    if (viewableItems.length > 0) {
      setCurrentSection(viewableItems[0].section.sectionKey);
      sectionSelectionRef?.current?.scrollToIndex({
        index: sections.findIndex(s => s.sectionKey === viewableItems[0].section.sectionKey),
        animated: true,
        viewPosition: 0.5,
      });
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.typeListContainer}>
        <FlatList<Section<ObjectType>>
          ref={sectionSelectionRef}
          horizontal
          data={sections}
          renderItem={renderSectionSelectionHeading}
          keyExtractor={(item) => item.sectionKey}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.typeListContent}
        />
      </ThemedView>
      <ThemedView style={styles.sectionListContainer}>
        <SectionList<ObjectType, Section<ObjectType>>
          ref={sectionListRef}
          sections={sections}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          onViewableItemsChanged={onViewableItemsChanged}
          keyExtractor={(item) => item.id}
          stickySectionHeadersEnabled={true}
        />
      </ThemedView>
    </ThemedView>
  );
}

