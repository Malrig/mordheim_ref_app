import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  YStack,
  XStack,
  Stack,
  Text,
  Label,
} from 'tamagui';
// import { Eye, EyeOff } from '@tamagui/lucide-icons';

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

  const handleSubmit = async () => {
    setError(null);
    setIsSubmitting(true);

    const result = await onSubmit(formData);
    setIsSubmitting(false);

    if (!result.success && result.error) {
      setError(result.error);
    }
    if (result.requiresEmailConfirmation) {
      setMessage('Please check your email for confirmation');
    }
  };

  const updateFormField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <YStack gap="$3" width="100%">
        <YStack>
          <Label>Email</Label>
          <Input
            value={formData.email}
            onChangeText={(text) => updateFormField('email', text)}
            placeholder="Enter your email"
            autoCapitalize="none"
            keyboardType="email-address"
            disabled={isSubmitting}
          />
        </YStack>

        <YStack>
          <Label>Password</Label>
          <XStack alignItems="center">
            <Input
              value={formData.password}
              onChangeText={(text) => updateFormField('password', text)}
              flex={1}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              disabled={isSubmitting}
            />
            <Stack
              cursor="pointer"
              marginLeft="$2"
              onPress={() => setShowPassword(!showPassword)}
              opacity={isSubmitting ? 0.5 : 1}
              disabled={isSubmitting}
            >
              {/* {showPassword ? <EyeOff size={20} /> : <Eye size={20} />} */}
            </Stack>
          </XStack>
        </YStack>

        {error && (
          <Text color="$red10" textAlign="center">
            {error}
          </Text>
        )}
        {message && <Text textAlign="center">{message}</Text>}

        <Form.Trigger asChild>
          <Button pressStyle={{ opacity: 0.8 }} disabled={isSubmitting}>
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </Button>
        </Form.Trigger>
      </YStack>
    </Form>
  );
};
