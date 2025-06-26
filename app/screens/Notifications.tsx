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
  Bell, 
  ArrowLeft,
  CheckCircle,
  Clock,
  Star,
  Zap
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function Notifications() {
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

  const notifications = [
    {
      id: 1,
      title: 'Task Completed!',
      message: 'Great job! You completed "Review project proposal"',
      time: '2 minutes ago',
      type: 'success',
      icon: CheckCircle,
      colors: ['#047857', '#059669', '#10b981'],
      iconColor: '#34d399'
    },
    {
      id: 2,
      title: 'New Feature Available',
      message: 'Check out the new task templates feature',
      time: '1 hour ago',
      type: 'info',
      icon: Zap,
      colors: ['#1e3a8a', '#1e40af', '#3b82f6'],
      iconColor: '#60a5fa'
    },
    {
      id: 3,
      title: 'Daily Reminder',
      message: 'You have 3 tasks due today',
      time: '3 hours ago',
      type: 'reminder',
      icon: Clock,
      colors: ['#b45309', '#d97706', '#f59e0b'],
      iconColor: '#fbbf24'
    },
    {
      id: 4,
      title: 'Achievement Unlocked!',
      message: 'You\'ve completed 10 tasks this week',
      time: '1 day ago',
      type: 'achievement',
      icon: Star,
      colors: ['#581c87', '#7c3aed', '#a855f7'],
      iconColor: '#c084fc'
    }
  ];

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
            <Text style={styles.headerTitle}>Notifications</Text>
            <View style={styles.headerRight}>
              <View style={styles.bellContainer}>
                <Bell size={24} color="#60a5fa" />
              </View>
            </View>
          </View>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {notifications.map((notification) => {
              const IconComponent = notification.icon;
              return (
                <TouchableOpacity 
                  key={notification.id}
                  style={styles.notificationCard}
                  activeOpacity={0.8}
                >
                  <LinearGradient 
                    colors={notification.colors} 
                    style={styles.notificationGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <View style={styles.notificationIcon}>
                      <IconComponent size={22} color={notification.iconColor} strokeWidth={2.5} />
                    </View>
                    <View style={styles.notificationContent}>
                      <Text style={styles.notificationTitle}>{notification.title}</Text>
                      <Text style={styles.notificationMessage}>{notification.message}</Text>
                      <Text style={styles.notificationTime}>{notification.time}</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}

            {/* Empty State Message */}
            <View style={styles.emptyStateCard}>
              <LinearGradient 
                colors={["#0c4a6e", "#0369a1", "#0ea5e9"]} 
                style={styles.emptyStateGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Bell size={32} color="#38bdf8" />
                <Text style={styles.emptyStateTitle}>You're All Caught Up!</Text>
                <Text style={styles.emptyStateMessage}>
                  No more notifications to show. We'll notify you when something new happens.
                </Text>
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
  bellContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(96, 165, 250, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  notificationCard: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  notificationGradient: {
    padding: 18,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  notificationIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
  },
  emptyStateCard: {
    marginTop: 20,
    marginBottom: 32,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  emptyStateGradient: {
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateMessage: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 20,
  },
});