import React from 'react';
import { ThemedView, ThemedViewProps } from './themed_components';

export const YStack = ({
  children,
  style,
  backgroundColor = 'transparent',
  ...props
}: ThemedViewProps) => {
  return (
    <ThemedView
      {...props}
      backgroundColor={backgroundColor}
      style={[
        {
          flexDirection: 'column',
        },
        style,
      ]}
    >
      {children}
    </ThemedView>
  );
};

export const XStack = ({
  children,
  style,
  backgroundColor = 'transparent',
  ...props
}: ThemedViewProps) => {
  return (
    <ThemedView
      {...props}
      backgroundColor={backgroundColor}
      style={[
        {
          flexDirection: 'row',
        },
        style,
      ]}
    >
      {children}
    </ThemedView>
  );
};
