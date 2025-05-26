import React, { useState } from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from './themed_components';
import { XStack, YStack } from './stacks';
import Divider from './divider';

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
    <YStack style={[{ borderRadius: 8 }, containerStyle]}>
      <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
        <XStack
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 8,
          }}
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
        </XStack>
      </TouchableOpacity>
      {isExpanded && (
        <YStack style={[{ paddingHorizontal: 12 }, contentStyle]}>
          <Divider />
          {children}
        </YStack>
      )}
    </YStack>
  );
};
