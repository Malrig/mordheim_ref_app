import React from 'react';
import { YStack, Text, Dialog, Button } from 'tamagui';
import { LoginForm } from '@/features/authentication/components/login_form';
import { SignUpForm } from '@/features/authentication/components/signup_form';
import {
  signInWithEmail,
  signUpWithEmail,
} from '@/features/authentication/hooks/login';

export default function Login() {
  const handleLogin = async (data: { email: string; password: string }) => {
    const result = await signInWithEmail(data.email, data.password);
    return result;
  };

  const handleSignUp = async (data: { email: string; password: string }) => {
    const result = await signUpWithEmail(data.email, data.password);

    if (!result.success) {
      console.log('Signup failed');
      return result;
    }

    if (result.requiresEmailConfirmation) {
      console.log('Signup successful');
    }

    return result;
  };

  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      padding="$4"
      backgroundColor="$background"
    >
      <Text fontSize="$8" fontWeight="bold">
        Welcome Back
      </Text>
      <Text fontSize="$4" opacity={0.8}>
        Sign in to your account
      </Text>
      <LoginForm onSubmit={handleLogin} />

      <Dialog modal>
        <Dialog.Trigger asChild>
          <Button variant="outlined">
            Don&apos;t have an account? Sign Up
          </Button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay key="overlay" opacity={0.5} />

          <Dialog.Content
            bordered
            elevate
            key="content"
            padding="$4"
            gap="$4"
            width={400}
          >
            <Dialog.Title>Create Account</Dialog.Title>
            <SignUpForm onSubmit={handleSignUp} />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </YStack>
  );
}
