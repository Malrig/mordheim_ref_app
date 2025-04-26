import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { ThemedButton, ThemedTextInput, ThemedText, ThemedView } from './general/themed_components'
import { signInWithEmail, signUpWithEmail } from '@/library/stores/auth/utils/login'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <ThemedView style={styles.container}>
      <ThemedText variant="title" style={styles.title}>Welcome</ThemedText>
      <ThemedView style={{ ...styles.verticallySpaced, ...styles.mt20 }}>
        <ThemedTextInput
          onChangeText={setEmail}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
        />
      </ThemedView>
      <ThemedView style={styles.verticallySpaced}>
        <ThemedTextInput
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize="none"
        />
      </ThemedView>
      <ThemedView style={{ ...styles.verticallySpaced, ...styles.mt20 }}>
        <ThemedButton title="Sign in" disabled={loading} onPress={() => signInWithEmail(email, password, setLoading)} />
      </ThemedView>
      <ThemedView style={styles.verticallySpaced}>
        <ThemedButton title="Sign up" disabled={loading} onPress={() => signUpWithEmail(email, password, setLoading)} />
      </ThemedView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    width: '100%',
    maxWidth: 400,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
})
