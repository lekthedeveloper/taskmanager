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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  HelpCircle, 
  MessageCircle, 
  Mail, 
  ChevronRight,
  Lightbulb,
  Users,
  BookOpen,
  ArrowLeft
} from 'lucide-react-native';

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

export default function Help() {
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

  const handleNavigateToLiveChat = () => {
    router.push('/LiveChat');
  };

  const handleNavigateToEmailSupport = () => {
    router.push('/EmailSupport');
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
          {/* Enhanced Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => router.back()}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["rgba(255,255,255,0.15)", "rgba(255,255,255,0.05)"]}
                style={styles.backButtonGradient}
              >
                <ArrowLeft size={24} color="#ffffff" />
              </LinearGradient>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Help & Support</Text>
            <View style={styles.headerRight}>
              <View style={styles.helpIconContainer}>
                <HelpCircle size={24} color="#10b981" />
              </View>
            </View>
          </View>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Enhanced Welcome Section */}
            <Animated.View
              style={[
                styles.welcomeContainer,
                {
                  transform: [{ scale: pulseAnim }],
                },
              ]}
            >
              <LinearGradient 
                colors={["#047857", "#059669", "#10b981", "#34d399"]} 
                style={styles.welcomeGradient}
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

                <View style={styles.welcomeIconContainer}>
                  <LinearGradient
                    colors={["rgba(255,255,255,0.3)", "rgba(255,255,255,0.1)"]}
                    style={styles.welcomeIconGradient}
                  >
                    <HelpCircle size={48} color="#ffffff" strokeWidth={2.5} />
                  </LinearGradient>
                </View>
                <Text style={styles.welcomeTitle}>How Can We Help?</Text>
                <Text style={styles.welcomeSubtitle}>
                  We're here to support you on your productivity journey. Choose how you'd like to get assistance.
                </Text>
              </LinearGradient>
            </Animated.View>

            {/* Enhanced Support Options */}
            <View style={styles.supportOptions}>
              <Text style={styles.sectionTitle}>Get Support</Text>
              
              {/* Live Chat Option */}
              <TouchableOpacity 
                style={styles.optionCard} 
                onPress={handleNavigateToLiveChat}
                activeOpacity={0.8}
              >
                <LinearGradient 
                  colors={["#047857", "#059669", "#10b981"]} 
                  style={styles.optionGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.optionIcon}>
                    <MessageCircle size={24} color="#34d399" />
                  </View>
                  <View style={styles.optionContent}>
                    <Text style={styles.optionTitle}>Live Chat</Text>
                    <Text style={styles.optionDescription}>
                      Get instant help with real-time chat support
                    </Text>
                    <Text style={styles.optionStatus}>Coming Soon</Text>
                  </View>
                  <ChevronRight size={20} color="rgba(255,255,255,0.7)" />
                </LinearGradient>
              </TouchableOpacity>

              {/* Email Support Option */}
              <TouchableOpacity 
                style={styles.optionCard} 
                onPress={handleNavigateToEmailSupport}
                activeOpacity={0.8}
              >
                <LinearGradient 
                  colors={["#1e3a8a", "#1e40af", "#3b82f6"]} 
                  style={styles.optionGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.optionIcon}>
                    <Mail size={24} color="#60a5fa" />
                  </View>
                  <View style={styles.optionContent}>
                    <Text style={styles.optionTitle}>Email Support</Text>
                    <Text style={styles.optionDescription}>
                      Send us your questions via email
                    </Text>
                    <Text style={styles.optionAvailable}>Available Now</Text>
                  </View>
                  <ChevronRight size={20} color="rgba(255,255,255,0.7)" />
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Enhanced Quick Tips */}
            <View style={styles.tipsSection}>
              <Text style={styles.sectionTitle}>Quick Tips</Text>
              
              <View style={styles.tipCard}>
                <LinearGradient 
                  colors={["#b45309", "#d97706", "#f59e0b"]} 
                  style={styles.tipGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.tipIcon}>
                    <Lightbulb size={24} color="#fbbf24" />
                  </View>
                  <View style={styles.tipContent}>
                    <Text style={styles.tipTitle}>Getting Started</Text>
                    <Text style={styles.tipDescription}>
                      • Tap the + button to create your first task{'\n'}
                      • Swipe to mark tasks as complete{'\n'}
                      • Long press for quick actions{'\n'}
                      • Use descriptions for detailed notes
                    </Text>
                  </View>
                </LinearGradient>
              </View>

              <View style={styles.tipCard}>
                <LinearGradient 
                  colors={["#581c87", "#7c3aed", "#a855f7"]} 
                  style={styles.tipGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.tipIcon}>
                    <Users size={24} color="#c084fc" />
                  </View>
                  <View style={styles.tipContent}>
                    <Text style={styles.tipTitle}>Best Practices</Text>
                    <Text style={styles.tipDescription}>
                      • Break large tasks into smaller ones{'\n'}
                      • Review and update tasks regularly{'\n'}
                      • Use clear, actionable task titles{'\n'}
                      • Celebrate completed milestones
                    </Text>
                  </View>
                </LinearGradient>
              </View>

              <View style={styles.tipCard}>
                <LinearGradient 
                  colors={["#047857", "#059669", "#10b981"]} 
                  style={styles.tipGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.tipIcon}>
                    <BookOpen size={24} color="#34d399" />
                  </View>
                  <View style={styles.tipContent}>
                    <Text style={styles.tipTitle}>Productivity Tips</Text>
                    <Text style={styles.tipDescription}>
                      • Focus on 3-5 important tasks daily{'\n'}
                      • Set realistic deadlines{'\n'}
                      • Take breaks between tasks{'\n'}
                      • Track your progress over time
                    </Text>
                  </View>
                </LinearGradient>
              </View>
            </View>

            {/* Enhanced App Info */}
            <View style={styles.appInfo}>
              <Text style={styles.sectionTitle}>App Information</Text>
              <View style={styles.infoCard}>
                <LinearGradient 
                  colors={["#0c4a6e", "#0369a1", "#0ea5e9"]} 
                  style={styles.infoGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.appName}>Taskes</Text>
                  <Text style={styles.appVersion}>Version 1.0.0</Text>
                  <Text style={styles.appDescription}>
                    A beautiful and intuitive task management app designed to boost your productivity and help you achieve your goals.
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
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  headerRight: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  welcomeContainer: {
    marginVertical: 24,
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
  welcomeGradient: {
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
  welcomeIconContainer: {
    marginBottom: 16,
  },
  welcomeIconGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.95)',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
  },
  supportOptions: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 20,
  },
  optionCard: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  optionGradient: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  optionIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 4,
  },
  optionStatus: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
  },
  optionAvailable: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
  },
  tipsSection: {
    marginBottom: 32,
  },
  tipCard: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  tipGradient: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  tipIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    marginTop: 4,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  tipDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 20,
  },
  appInfo: {
    marginBottom: 32,
  },
  infoCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  infoGradient: {
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  appName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  appVersion: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 12,
  },
  appDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    lineHeight: 20,
  },
});