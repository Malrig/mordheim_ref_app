import React from 'react';
import { Dialog } from 'tamagui';
import { LoginForm } from '@/features/authentication/components/login_form';
import { SignUpForm } from '@/features/authentication/components/signup_form';
import {
  signInWithEmail,
  signUpWithEmail,
} from '@/features/authentication/hooks/login';
import { YStack } from '@/shared/components/stacks';
import { ThemedText, ThemedButton } from '@/shared/components/themed_components';

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
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      }}
      backgroundColor="background"
    >
      <ThemedText variant="title">Welcome Back</ThemedText>
      <ThemedText variant="subtitle">Sign in to your account</ThemedText>
      <LoginForm onSubmit={handleLogin} />

      <Dialog modal>
        <Dialog.Trigger asChild>
          <ThemedButton variant="outline">
            Don&apos;t have an account? Sign Up
          </ThemedButton>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay key="overlay" opacity={0.5} />

          <Dialog.Content
            bordered
            elevate
            key="content"
            padding="$4"
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
