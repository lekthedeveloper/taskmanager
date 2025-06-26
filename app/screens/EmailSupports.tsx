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
  Linking,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { 
  ArrowLeft, 
  Mail, 
  Globe, 
  Clock, 
  CheckCircle, 
  MessageSquare, 
  User,
  ExternalLink
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

interface EmailSupportProps {
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

export default function EmailSupport({ onBack }: EmailSupportProps) {
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

  const handleEmailPress = () => {
    Linking.openURL('mailto:lekthedeveloper@gmail.com?subject=Taskes App Support');
  };

  const handleWebsitePress = () => {
    Linking.openURL('https://olamilekanadeyemi.pro');
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
            <Text style={styles.title}>Email Support</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Enhanced Contact Header */}
            <Animated.View
              style={[
                styles.contactHeader,
                {
                  transform: [{ scale: pulseAnim }],
                },
              ]}
            >
              <LinearGradient 
                colors={["#0ea5e9", "#06b6d4", "#00d4ff", "#38bdf8"]} 
                style={styles.contactGradient}
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

                <View style={styles.contactIconContainer}>
                  <LinearGradient
                    colors={["rgba(255,255,255,0.3)", "rgba(255,255,255,0.1)"]}
                    style={styles.contactIconGradient}
                  >
                    <Mail size={48} color="#ffffff" strokeWidth={2.5} />
                  </LinearGradient>
                </View>
                <Text style={styles.contactTitle}>Get in Touch</Text>
                <Text style={styles.contactSubtitle}>
                  We're here to help! Reach out to us for any questions, feedback, or support needs.
                </Text>
              </LinearGradient>
            </Animated.View>

            {/* Enhanced Contact Methods */}
            <View style={styles.contactMethods}>
              {/* Email Card */}
              <TouchableOpacity 
                style={styles.contactCard} 
                onPress={handleEmailPress}
                activeOpacity={0.8}
              >
                <LinearGradient 
                  colors={["#1e3a8a", "#1e40af", "#3b82f6"]} 
                  style={styles.contactCardGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.contactCardIcon}>
                    <Mail size={24} color="#60a5fa" />
                  </View>
                  <View style={styles.contactCardContent}>
                    <Text style={styles.contactCardTitle}>Email Us</Text>
                    <Text style={styles.contactCardEmail}>lekthedeveloper@gmail.com</Text>
                    <Text style={styles.contactCardDescription}>
                      Send us your questions and we'll get back to you within 24 hours
                    </Text>
                  </View>
                  <ExternalLink size={20} color="rgba(255,255,255,0.7)" />
                </LinearGradient>
              </TouchableOpacity>

              {/* Website Card */}
              <TouchableOpacity 
                style={styles.contactCard} 
                onPress={handleWebsitePress}
                activeOpacity={0.8}
              >
                <LinearGradient 
                  colors={["#047857", "#059669", "#10b981"]} 
                  style={styles.contactCardGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.contactCardIcon}>
                    <Globe size={24} color="#34d399" />
                  </View>
                  <View style={styles.contactCardContent}>
                    <Text style={styles.contactCardTitle}>Visit Our Website</Text>
                    <Text style={styles.contactCardEmail}>olamilekanadeyemi.pro</Text>
                    <Text style={styles.contactCardDescription}>
                      Learn more about our work and other projects
                    </Text>
                  </View>
                  <ExternalLink size={20} color="rgba(255,255,255,0.7)" />
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Enhanced Support Info */}
            <View style={styles.supportInfo}>
              <Text style={styles.sectionTitle}>Support Information</Text>
              
              <View style={styles.infoCard}>
                <LinearGradient 
                  colors={["#b45309", "#d97706", "#f59e0b"]} 
                  style={styles.infoGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.infoIcon}>
                    <Clock size={24} color="#fbbf24" />
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoTitle}>Response Time</Text>
                    <Text style={styles.infoDescription}>
                      We typically respond to emails within 24 hours during business days
                    </Text>
                  </View>
                </LinearGradient>
              </View>

              <View style={styles.infoCard}>
                <LinearGradient 
                  colors={["#581c87", "#7c3aed", "#a855f7"]} 
                  style={styles.infoGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.infoIcon}>
                    <MessageSquare size={24} color="#c084fc" />
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoTitle}>What to Include</Text>
                    <Text style={styles.infoDescription}>
                      Please include your device info, app version, and detailed description of your issue
                    </Text>
                  </View>
                </LinearGradient>
              </View>

              <View style={styles.infoCard}>
                <LinearGradient 
                  colors={["#047857", "#059669", "#10b981"]} 
                  style={styles.infoGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.infoIcon}>
                    <CheckCircle size={24} color="#34d399" />
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoTitle}>We're Here to Help</Text>
                    <Text style={styles.infoDescription}>
                      Bug reports, feature requests, general questions - we welcome all feedback!
                    </Text>
                  </View>
                </LinearGradient>
              </View>
            </View>

            {/* Enhanced Developer Info */}
            <View style={styles.developerSection}>
              <Text style={styles.sectionTitle}>About the Developer</Text>
              <View style={styles.developerCard}>
                <LinearGradient 
                  colors={["#0c4a6e", "#0369a1", "#0ea5e9"]} 
                  style={styles.developerGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.developerIconContainer}>
                    <LinearGradient
                      colors={["rgba(255,255,255,0.3)", "rgba(255,255,255,0.1)"]}
                      style={styles.developerIconGradient}
                    >
                      <User size={32} color="#ffffff" strokeWidth={2.5} />
                    </LinearGradient>
                  </View>
                  <Text style={styles.developerName}>Olamilekan Adeyemi</Text>
                  <Text style={styles.developerTitle}>Full Stack Developer</Text>
                  <Text style={styles.developerDescription}>
                    Passionate about creating beautiful and functional mobile applications that enhance productivity and user experience.
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
  contactHeader: {
    marginVertical: 24,
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
  contactGradient: {
    padding: 36,
    alignItems: 'center',
    position: 'relative',
    minHeight: 200,
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
  contactIconContainer: {
    marginBottom: 16,
  },
  contactIconGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  contactTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  contactSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.95)',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
  },
  contactMethods: {
    marginBottom: 32,
  },
  contactCard: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  contactCardGradient: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  contactCardIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactCardContent: {
    flex: 1,
  },
  contactCardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  contactCardEmail: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 4,
  },
  contactCardDescription: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 18,
  },
  supportInfo: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 20,
  },
  infoCard: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  infoGradient: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  infoIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  infoDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 20,
  },
  developerSection: {
    marginBottom: 32,
  },
  developerCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  developerGradient: {
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  developerIconContainer: {
    marginBottom: 16,
  },
  developerIconGradient: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  developerName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  developerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 12,
  },
  developerDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    lineHeight: 20,
  },
});