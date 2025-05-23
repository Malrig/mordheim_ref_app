import React, { useState } from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { YStack, XStack, Separator } from 'tamagui';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from './themed_components';

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

  return (
    <YStack borderRadius="$4" {...(containerStyle as any)}>
      <TouchableOpacity
        // style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <XStack justifyContent="space-between" alignItems="center" padding="$2">
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
        </XStack>
      </TouchableOpacity>
      {isExpanded && (
        <YStack paddingHorizontal="$3" {...(contentStyle as any)}>
          <Separator />
          {children}
        </YStack>
      )}
    </YStack>
  );
};
