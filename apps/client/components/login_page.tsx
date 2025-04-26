import React, { useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { supabase } from '../library/supabase'
import { ThemedButton, ThemedTextInput, ThemedText, ThemedView } from './general/themed_components'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) Alert.alert(error.message)
  }

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
        <ThemedButton title="Sign in" disabled={loading} onPress={signInWithEmail} />
      </ThemedView>
      <ThemedView style={styles.verticallySpaced}>
        <ThemedButton title="Sign up" disabled={loading} onPress={signUpWithEmail} />
      </ThemedView>
      <ThemedView style={styles.verticallySpaced}>
        <ThemedButton title="Sign out" disabled={loading} onPress={signOut} />
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
