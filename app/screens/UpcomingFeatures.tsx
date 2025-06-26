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
  Zap, 
  ArrowLeft,
  Calendar,
  Users,
  Smartphone,
  BarChart3,
  Clock,
  Star
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function UpcomingFeatures() {
  const router = useRouter();
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

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
  }, []);

  const upcomingFeatures = [
    {
      id: 1,
      title: 'Task Templates',
      description: 'Create reusable task templates for recurring activities',
      status: 'Coming Soon',
      eta: 'Next Week',
      icon: Star,
      colors: ['#b45309', '#d97706', '#f59e0b'],
      iconColor: '#fbbf24'
    },
    {
      id: 2,
      title: 'Team Collaboration',
      description: 'Share tasks and collaborate with team members',
      status: 'In Development',
      eta: '2 Weeks',
      icon: Users,
      colors: ['#581c87', '#7c3aed', '#a855f7'],
      iconColor: '#c084fc'
    },
    {
      id: 3,
      title: 'Calendar Integration',
      description: 'Sync your tasks with Google Calendar and other calendar apps',
      status: 'Planning',
      eta: '1 Month',
      icon: Calendar,
      colors: ['#047857', '#059669', '#10b981'],
      iconColor: '#34d399'
    },
    {
      id: 4,
      title: 'Advanced Analytics',
      description: 'Detailed insights into your productivity patterns',
      status: 'Research',
      eta: '6 Weeks',
      icon: BarChart3,
      colors: ['#1e3a8a', '#1e40af', '#3b82f6'],
      iconColor: '#60a5fa'
    },
    {
      id: 5,
      title: 'Smart Notifications',
      description: 'AI-powered notifications based on your habits',
      status: 'Concept',
      eta: '2 Months',
      icon: Smartphone,
      colors: ['#be123c', '#dc2626', '#ef4444'],
      iconColor: '#f87171'
    },
    {
      id: 6,
      title: 'Time Tracking',
      description: 'Track time spent on tasks automatically',
      status: 'Concept',
      eta: '3 Months',
      icon: Clock,
      colors: ['#0c4a6e', '#0369a1', '#0ea5e9'],
      iconColor: '#38bdf8'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Coming Soon': return '#34d399';
      case 'In Development': return '#fbbf24';
      case 'Planning': return '#c084fc';
      case 'Research': return '#60a5fa';
      case 'Concept': return '#94a3b8';
      default: return '#94a3b8';
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#0f0f23", "#1a1a2e", "#16213e"]} style={styles.backgroundGradient} />
      
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
            <Text style={styles.headerTitle}>Upcoming Features</Text>
            <View style={styles.headerRight}>
              <View style={styles.zapContainer}>
                <Zap size={24} color="#c084fc" />
              </View>
            </View>
          </View>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionDescription}>
              Here's what we're working on to make your task management experience even better!
            </Text>

            {upcomingFeatures.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <View 
                  key={feature.id}
                  style={styles.featureCard}
                >
                  <LinearGradient 
                    colors={feature.colors} 
                    style={styles.featureGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <View style={styles.featureHeader}>
                      <View style={styles.featureIcon}>
                        <IconComponent size={24} color={feature.iconColor} strokeWidth={2.5} />
                      </View>
                      <View style={styles.featureInfo}>
                        <Text style={styles.featureTitle}>{feature.title}</Text>
                        <View style={styles.statusContainer}>
                          <View style={[styles.statusDot, { backgroundColor: getStatusColor(feature.status) }]} />
                          <Text style={[styles.statusText, { color: getStatusColor(feature.status) }]}>
                            {feature.status}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.etaText}>{feature.eta}</Text>
                    </View>
                    <Text style={styles.featureDescription}>{feature.description}</Text>
                  </LinearGradient>
                </View>
              );
            })}

            <View style={styles.footerCard}>
              <LinearGradient 
                colors={["#c2410c", "#ea580c", "#f97316"]} 
                style={styles.footerGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.footerTitle}>Have a Feature Request?</Text>
                <Text style={styles.footerDescription}>
                  We'd love to hear your ideas! Send us your suggestions and help shape the future of the app.
                </Text>
                <TouchableOpacity style={styles.feedbackButton} activeOpacity={0.8}>
                  <LinearGradient colors={["#ffffff", "#f8fafc"]} style={styles.feedbackGradient}>
                    <Text style={styles.feedbackText}>Send Feedback</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </LinearGradient>
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
  zapContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(192, 132, 252, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  sectionDescription: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
    paddingHorizontal: 20,
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
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureInfo: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  etaText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
  },
  featureDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 20,
  },
  footerCard: {
    marginTop: 16,
    marginBottom: 32,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  footerGradient: {
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  footerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  footerDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  feedbackButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  feedbackGradient: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  feedbackText: {
    color: '#f97316',
    fontSize: 14,
    fontWeight: '700',
  },
});