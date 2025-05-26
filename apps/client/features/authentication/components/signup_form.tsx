import React, { useState } from 'react';
import { View } from 'react-native';
import { XStack, YStack } from '@/shared/components/stacks';
import {
  ThemedButton,
  ThemedText,
  ThemedTextInput,
} from '@/shared/components/themed_components';

interface SignUpFormProps {
  onSubmit: (data: { email: string; password: string }) => Promise<{
    success: boolean;
    error?: string;
    requiresEmailConfirmation?: boolean;
  }>;
}

export const SignUpForm = ({ onSubmit }: SignUpFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const updateFormField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    setMessage(null);

    try {
      const result = await onSubmit(formData);
      if (!result.success && result.error) {
        setError(result.error);
      } else if (result.requiresEmailConfirmation) {
        setMessage('Please check your email to confirm your account');
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={{ width: '100%' }}>
      <YStack style={{ gap: 12 }}>
        <YStack>
          <ThemedText>Email</ThemedText>
          <ThemedTextInput
            value={formData.email}
            onChangeText={(text) => updateFormField('email', text)}
            placeholder="Enter your email"
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!isSubmitting}
          />
        </YStack>

        <YStack>
          <ThemedText>Password</ThemedText>
          <XStack style={{ alignItems: 'center' }}>
            <ThemedTextInput
              value={formData.password}
              onChangeText={(text) => updateFormField('password', text)}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              editable={!isSubmitting}
              style={{ flex: 1 }}
            />
            <ThemedButton
              onPress={() => setShowPassword(!showPassword)}
              disabled={isSubmitting}
              variant="outline"
              size="small"
              style={{ marginLeft: 8 }}
            >
              {showPassword ? 'Hide' : 'Show'}
            </ThemedButton>
          </XStack>
        </YStack>

        {error && (
          <ThemedText style={{ color: 'red', textAlign: 'center' }}>
            {error}
          </ThemedText>
        )}
        {message && (
          <ThemedText style={{ textAlign: 'center' }}>{message}</ThemedText>
        )}

        <ThemedButton
          onPress={handleSubmit}
          disabled={isSubmitting}
          size="large"
        >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </ThemedButton>
      </YStack>
    </View>
  );
};
