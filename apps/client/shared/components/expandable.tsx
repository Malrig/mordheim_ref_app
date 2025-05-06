import React, { useState } from 'react';
import {
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
  TouchableOpacity,
} from 'react-native';
import { ThemedView, ThemedText } from './themed_components';
import { MaterialIcons } from '@expo/vector-icons';
import { useThemeColour } from '@/features/userstore/hooks/theme';
import { Divider } from 'react-native-paper';

interface ExpandableProps {
  title: string | React.ReactNode;
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  initialExpanded?: boolean;
}

export const Expandable: React.FC<ExpandableProps> = ({
  title,
  children,
  containerStyle,
  titleStyle,
  contentStyle,
  initialExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const defaultContainerColour = useThemeColour('secondary');

  return (
    <ThemedView
      style={[
        { backgroundColor: defaultContainerColour },
        styles.container,
        containerStyle,
      ]}
    >
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        {typeof title === 'string' ? (
          <ThemedText variant="subtitle" style={titleStyle}>
            {title}
          </ThemedText>
        ) : (
          title
        )}
        <MaterialIcons
          name={isExpanded ? 'expand-less' : 'expand-more'}
          size={24}
        />
      </TouchableOpacity>
      {isExpanded && (
        <ThemedView
          style={[
            { backgroundColor: defaultContainerColour },
            styles.content,
            contentStyle,
          ]}
        >
          <Divider />
          {children}
        </ThemedView>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  content: {
    paddingLeft: 12,
    paddingRight: 12,
  },
});
