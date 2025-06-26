import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, MessageCircle, Clock, Users, Headphones } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

interface LiveChatProps {
  onBack?: () => void; // Made optional since we're handling navigation internally
}

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

export default function LiveChat({ onBack }: LiveChatProps) {
  const navigation = useNavigation();

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
          toValue: 1.05,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
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

  // Enhanced back button handler with multiple fallback options
  const handleBack = () => {
    try {
      // First try the custom onBack prop if provided
      if (onBack && typeof onBack === 'function') {
        onBack();
        return;
      }

      // Then try React Navigation goBack
      if (navigation && navigation.canGoBack && navigation.canGoBack()) {
        navigation.goBack();
        return;
      }

      // If navigation is available but can't go back, try to navigate to a specific screen
      if (navigation && navigation.navigate) {
        // Replace 'Home' with your actual home/main screen name
        navigation.navigate('Home' as never);
        return;
      }

      // Last resort - show an alert if navigation fails
      Alert.alert(
        'Navigation Error',
        'Unable to go back. Please use the app navigation.',
        [{ text: 'OK', style: 'default' }]
      );
    } catch (error) {
      console.error('Navigation error:', error);
      Alert.alert(
        'Navigation Error',
        'Something went wrong. Please restart the app.',
        [{ text: 'OK', style: 'default' }]
      );
    }
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
    color: ['#00d4ff', '#10b981', '#8b5cf6', '#f59e0b'][Math.floor(Math.random() * 4)],
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
          {/* Enhanced Header with Fixed Back Button */}
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={handleBack} 
              style={styles.backButton}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <LinearGradient
                colors={["rgba(255,255,255,0.15)", "rgba(255,255,255,0.05)"]}
                style={styles.backButtonGradient}
              >
                <ArrowLeft size={24} color="#ffffff" />
              </LinearGradient>
            </TouchableOpacity>
            <Text style={styles.title}>Live Chat</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Enhanced Coming Soon Section */}
            <Animated.View
              style={[
                styles.comingSoonContainer,
                {
                  transform: [{ scale: pulseAnim }],
                },
              ]}
            >
              <LinearGradient 
                colors={["#047857", "#059669", "#10b981", "#34d399"]} 
                style={styles.comingSoonGradient}
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

                <View style={styles.comingSoonIconContainer}>
                  <LinearGradient
                    colors={["rgba(255,255,255,0.3)", "rgba(255,255,255,0.1)"]}
                    style={styles.comingSoonIconGradient}
                  >
                    <MessageCircle size={48} color="#ffffff" strokeWidth={2.5} />
                  </LinearGradient>
                </View>
                <Text style={styles.comingSoonTitle}>Live Chat Coming Soon!</Text>
                <Text style={styles.comingSoonSubtitle}>
                  We're building a real-time chat system to provide you with instant support and assistance.
                </Text>
              </LinearGradient>
            </Animated.View>

            {/* Enhanced Features Preview */}
            <View style={styles.featuresSection}>
              <Text style={styles.sectionTitle}>What to Expect</Text>
              
              <View style={styles.featureCard}>
                <LinearGradient 
                  colors={["#1e3a8a", "#1e40af", "#3b82f6"]} 
                  style={styles.featureGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.featureIcon}>
                    <Clock size={24} color="#60a5fa" />
                  </View>
                  <View style={styles.featureContent}>
                    <Text style={styles.featureTitle}>24/7 Support</Text>
                    <Text style={styles.featureDescription}>
                      Get help anytime, day or night with our round-the-clock support team
                    </Text>
                  </View>
                </LinearGradient>
              </View>

              <View style={styles.featureCard}>
                <LinearGradient 
                  colors={["#047857", "#059669", "#10b981"]} 
                  style={styles.featureGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.featureIcon}>
                    <Users size={24} color="#34d399" />
                  </View>
                  <View style={styles.featureContent}>
                    <Text style={styles.featureTitle}>Expert Team</Text>
                    <Text style={styles.featureDescription}>
                      Chat with knowledgeable support agents who understand your needs
                    </Text>
                  </View>
                </LinearGradient>
              </View>

              <View style={styles.featureCard}>
                <LinearGradient 
                  colors={["#581c87", "#7c3aed", "#a855f7"]} 
                  style={styles.featureGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.featureIcon}>
                    <Headphones size={24} color="#c084fc" />
                  </View>
                  <View style={styles.featureContent}>
                    <Text style={styles.featureTitle}>Instant Response</Text>
                    <Text style={styles.featureDescription}>
                      Get quick answers to your questions without waiting for email replies
                    </Text>
                  </View>
                </LinearGradient>
              </View>
            </View>

            {/* Enhanced Temporary Contact Info */}
            <View style={styles.contactSection}>
              <Text style={styles.sectionTitle}>Need Help Now?</Text>
              <View style={styles.contactCard}>
                <LinearGradient 
                  colors={["#b45309", "#d97706", "#f59e0b"]} 
                  style={styles.contactGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.contactTitle}>Email Support</Text>
                  <Text style={styles.contactDescription}>
                    While we're building live chat, you can reach us via email:
                  </Text>
                  <Text style={styles.contactEmail}>lekthedeveloper@gmail.com</Text>
                  <Text style={styles.contactNote}>
                    We typically respond within 24 hours
                  </Text>
                </LinearGradient>
              </View>
            </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  backButtonGradient: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  comingSoonContainer: {
    marginVertical: 32,
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: "#10b981",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
  },
  comingSoonGradient: {
    padding: 40,
    alignItems: 'center',
    position: 'relative',
    minHeight: 220,
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
  comingSoonIconContainer: {
    marginBottom: 20,
  },
  comingSoonIconGradient: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  comingSoonTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 12,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  comingSoonSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.95)',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
  },
  featuresSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 20,
  },
  featureCard: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  featureGradient: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  featureIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 20,
  },
  contactSection: {
    marginBottom: 32,
  },
  contactCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  contactGradient: {
    padding: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  contactDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 20,
  },
  contactEmail: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  contactNote: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});