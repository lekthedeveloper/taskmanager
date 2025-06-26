import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/contexts/AuthContext';

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.container}>
        <LinearGradient colors={["#0f0f23", "#1a1a2e"]} style={styles.backgroundGradient}>
          <ActivityIndicator size="large" color="#00d4ff" />
        </LinearGradient>
      </View>
    );
  }

  if (user) {
    // Redirect to the tasks tab (index within tabs)
    return <Redirect href="/(tabs)/index" />;
  }

  return <Redirect href="/(auth)/login" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});