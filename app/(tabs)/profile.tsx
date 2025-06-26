import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { User, Bell, CircleHelp as HelpCircle, LogOut, Star, Zap, Clock, Target, Trophy, Calendar, Smartphone, ChartBar as BarChart3, Settings } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

// Particle component for background animation
const Particle = ({ delay, duration, startX, startY, endX, endY, size, color, opacity }) => {
  const animValue = useRef(new Animated.Value(0)).current;
  const fadeValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      Animated.parallel([
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animValue, {
            toValue: 1,
            duration: duration,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(fadeValue, {
            toValue: 1,
            duration: duration * 0.3,
            useNativeDriver: true,
          }),
          Animated.timing(fadeValue, {
            toValue: 0,
            duration: duration * 0.7,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        animValue.setValue(0);
        fadeValue.setValue(0);
        setTimeout(animate, Math.random() * 3000 + 2000);
      });
    };

    animate();
  }, []);

  const translateX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [startX, endX],
  });

  const translateY = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [startY, endY],
  });

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          width: size,
          height: size,
          backgroundColor: color,
          opacity: fadeValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, opacity],
          }),
          transform: [{ translateX }, { translateY }],
        },
      ]}
    />
  );
};

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous animations
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.02,
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: signOut,
        },
      ]
    );
  };

  // Generate particles
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    delay: Math.random() * 3000,
    duration: 3000 + Math.random() * 2000,
    startX: Math.random() * width,
    startY: height + 50,
    endX: Math.random() * width,
    endY: -50,
    size: 2 + Math.random() * 3,
    color: ['#00d4ff', '#8b5cf6', '#10b981', '#f59e0b'][Math.floor(Math.random() * 4)],
    opacity: 0.2 + Math.random() * 0.3,
  }));

  const shimmerTranslate = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  const headerShimmerTranslate = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#0f0f23", "#1a1a2e", "#16213e"]} style={styles.backgroundGradient} />
      
      {/* Particle System */}
      <View style={styles.particleContainer}>
        {particles.map((particle) => (
          <Particle key={particle.id} {...particle} />
        ))}
      </View>

      {/* Shimmer Effect */}
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [{ translateX: shimmerTranslate }],
          },
        ]}
      >
        <LinearGradient
          colors={["transparent", "rgba(255, 255, 255, 0.05)", "transparent"]}
          style={styles.shimmerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </Animated.View>

      <SafeAreaView style={styles.safeArea}>
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Enhanced Profile Header */}
            <Animated.View
              style={[
                styles.profileHeader,
                {
                  transform: [{ scale: pulseAnim }],
                },
              ]}
            >
              <LinearGradient 
                colors={["#0ea5e9", "#06b6d4", "#00d4ff", "#38bdf8"]} 
                style={styles.profileGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                {/* Header Shimmer Effect */}
                <Animated.View
                  style={[
                    styles.headerShimmer,
                    {
                      transform: [{ translateX: headerShimmerTranslate }],
                    },
                  ]}
                >
                  <LinearGradient
                    colors={["transparent", "rgba(255, 255, 255, 0.3)", "transparent"]}
                    style={styles.headerShimmerGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  />
                </Animated.View>

                {/* Decorative Elements */}
                <View style={styles.decorativeCircle1} />
                <View style={styles.decorativeCircle2} />
                <View style={styles.decorativeCircle3} />

                <View style={styles.avatarContainer}>
                  <LinearGradient
                    colors={["rgba(255,255,255,0.3)", "rgba(255,255,255,0.1)"]}
                    style={styles.avatarGradient}
                  >
                    <User size={36} color="#ffffff" strokeWidth={2.5} />
                  </LinearGradient>
                  <View style={styles.avatarRing} />
                </View>

                <View style={styles.userInfoContainer}>
                  <Text style={styles.userName}>{user?.email || 'User'}</Text>
                  <View style={styles.subtitleContainer}>
                    <View style={styles.badgeContainer}>
                      <LinearGradient
                        colors={["rgba(255,255,255,0.2)", "rgba(255,255,255,0.1)"]}
                        style={styles.badge}
                      >
                        <Star size={12} color="#ffffff" fill="#ffffff" />
                        <Text style={styles.badgeText}>Task Master</Text>
                      </LinearGradient>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </Animated.View>

            {/* Menu Grid */}
            <View style={styles.menuGrid}>
              {/* Row 1 */}
              <View style={styles.menuRow}>
                <TouchableOpacity 
                  style={styles.menuCard} 
                  onPress={() => router.push('/screens/Notifications')}
                  activeOpacity={0.8}
                >
                  <LinearGradient 
                    colors={["#1e3a8a", "#1e40af", "#3b82f6"]} 
                    style={styles.menuGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <View style={[styles.menuIcon, { backgroundColor: '#00d4ff30' }]}>
                      <Bell size={24} color="#00d4ff" />
                    </View>
                    <Text style={styles.menuTitle}>Notifications</Text>
                    <Text style={styles.menuSubtitle}>Stay updated</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.menuCard} 
                  onPress={() => router.push('/screens/UpcomingFeatures')}
                  activeOpacity={0.8}
                >
                  <LinearGradient 
                    colors={["#581c87", "#7c3aed", "#a855f7"]} 
                    style={styles.menuGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <View style={[styles.menuIcon, { backgroundColor: '#8b5cf630' }]}>
                      <Zap size={24} color="#c084fc" />
                    </View>
                    <Text style={styles.menuTitle}>Upcoming Features</Text>
                    <Text style={styles.menuSubtitle}>What's next</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* Row 2 */}
              <View style={styles.menuRow}>
                <TouchableOpacity 
                  style={styles.menuCard} 
                  onPress={() => router.push('/screens/Achievements')}
                  activeOpacity={0.8}
                >
                  <LinearGradient 
                    colors={["#b45309", "#d97706", "#f59e0b"]} 
                    style={styles.menuGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <View style={[styles.menuIcon, { backgroundColor: '#fbbf2430' }]}>
                      <Trophy size={24} color="#fbbf24" />
                    </View>
                    <Text style={styles.menuTitle}>Achievements</Text>
                    <Text style={styles.menuSubtitle}>Your progress</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.menuCard} 
                  onPress={() => router.push('/(tabs)/help')}
                  activeOpacity={0.8}
                >
                  <LinearGradient 
                    colors={["#047857", "#059669", "#10b981"]} 
                    style={styles.menuGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <View style={[styles.menuIcon, { backgroundColor: '#34d39930' }]}>
                      <HelpCircle size={24} color="#34d399" />
                    </View>
                    <Text style={styles.menuTitle}>Help & Support</Text>
                    <Text style={styles.menuSubtitle}>Get assistance</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

            {/* Sign Out Button */}
            <TouchableOpacity 
              style={styles.signOutButton} 
              onPress={handleSignOut}
              activeOpacity={0.8}
            >
              <LinearGradient 
                colors={["#dc2626", "#ef4444", "#f87171"]} 
                style={styles.signOutGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <LogOut size={20} color="#ffffff" />
                <Text style={styles.signOutText}>Sign Out</Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
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
  },
  particleContainer: {
    position: "absolute",
    width: width,
    height: height,
    overflow: "hidden",
  },
  particle: {
    position: "absolute",
    borderRadius: 50,
  },
  shimmer: {
    position: "absolute",
    top: 0,
    width: 100,
    height: height,
  },
  shimmerGradient: {
    width: "100%",
    height: "100%",
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  profileHeader: {
    marginVertical: 32,
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: "#00d4ff",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
  },
  profileGradient: {
    padding: 36,
    alignItems: 'center',
    position: 'relative',
    minHeight: 200,
    justifyContent: 'center',
  },
  headerShimmer: {
    position: "absolute",
    top: 0,
    width: 100,
    height: "100%",
  },
  headerShimmerGradient: {
    width: "100%",
    height: "100%",
  },
  decorativeCircle1: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: -30,
    left: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  decorativeCircle3: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  avatarGradient: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  avatarRing: {
    position: 'absolute',
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
    borderRadius: 53,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  userInfoContainer: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 12,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitleContainer: {
    alignItems: 'center',
  },
  badgeContainer: {
    marginTop: 4,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 6,
  },
  menuGrid: {
    marginBottom: 32,
  },
  menuRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 16,
  },
  menuCard: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 12,
  },
  menuGradient: {
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    minHeight: 140,
    justifyContent: 'center',
  },
  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  signOutButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 32,
    shadowColor: "#ef4444",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  signOutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
  },
  signOutText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
});