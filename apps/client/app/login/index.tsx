import React, { useState } from 'react';
import { LoginForm } from '@/features/authentication/components/login_form';
import { SignUpForm } from '@/features/authentication/components/signup_form';
import {
  signInWithEmail,
  signUpWithEmail,
} from '@/features/authentication/hooks/login';
import { YStack } from '@/shared/components/stacks';
import {
  ThemedText,
  ThemedButton,
  ThemedModal,
} from '@/shared/components/themed_components';

export default function Login() {
  const [signUpModalVisible, setSignUpModalVisible] = useState(false);

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
        width: 325,
      }}
    >
      <ThemedText variant="title">Welcome Back</ThemedText>
      <ThemedText variant="subtitle">Sign in to your account</ThemedText>
      <LoginForm onSubmit={handleLogin} />

      <ThemedButton
        variant="outline"
        onPress={() => setSignUpModalVisible(true)}
        size="large"
      >
        Don&apos;t have an account? Sign Up
      </ThemedButton>

      <ThemedModal
        visible={signUpModalVisible}
        onClose={() => setSignUpModalVisible(false)}
        title="Create Account"
      >
        <SignUpForm onSubmit={handleSignUp} />
      </ThemedModal>
    </YStack>
  );
}
