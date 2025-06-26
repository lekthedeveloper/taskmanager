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
  Trophy, 
  ArrowLeft,
  Star,
  Target,
  Zap,
  Calendar,
  CheckCircle,
  Award
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function Achievements() {
  const router = useRouter();
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
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

    // Shimmer animation
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const achievements = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Complete your first task',
      progress: 100,
      unlocked: true,
      icon: CheckCircle,
      colors: ['#047857', '#059669', '#10b981'],
      iconColor: '#34d399',
      date: '2 days ago'
    },
    {
      id: 2,
      title: 'Getting Started',
      description: 'Complete 5 tasks',
      progress: 100,
      unlocked: true,
      icon: Target,
      colors: ['#1e3a8a', '#1e40af', '#3b82f6'],
      iconColor: '#60a5fa',
      date: '1 day ago'
    },
    {
      id: 3,
      title: 'Task Master',
      description: 'Complete 10 tasks',
      progress: 100,
      unlocked: true,
      icon: Star,
      colors: ['#b45309', '#d97706', '#f59e0b'],
      iconColor: '#fbbf24',
      date: 'Today'
    },
    {
      id: 4,
      title: 'Productivity Pro',
      description: 'Complete 25 tasks',
      progress: 60,
      unlocked: false,
      icon: Zap,
      colors: ['#581c87', '#7c3aed', '#a855f7'],
      iconColor: '#c084fc',
      current: 15,
      target: 25
    },
    {
      id: 5,
      title: 'Consistency King',
      description: 'Complete tasks for 7 days straight',
      progress: 43,
      unlocked: false,
      icon: Calendar,
      colors: ['#be123c', '#dc2626', '#ef4444'],
      iconColor: '#f87171',
      current: 3,
      target: 7
    },
    {
      id: 6,
      title: 'Champion',
      description: 'Complete 100 tasks',
      progress: 15,
      unlocked: false,
      icon: Trophy,
      colors: ['#0c4a6e', '#0369a1', '#0ea5e9'],
      iconColor: '#38bdf8',
      current: 15,
      target: 100
    },
    {
      id: 7,
      title: 'Legend',
      description: 'Complete 500 tasks',
      progress: 3,
      unlocked: false,
      icon: Award,
      colors: ['#c2410c', '#ea580c', '#f97316'],
      iconColor: '#fb923c',
      current: 15,
      target: 500
    }
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  const shimmerTranslate = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

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
          {/* Header */}
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
            <Text style={styles.headerTitle}>Achievements</Text>
            <View style={styles.headerRight}>
              <View style={styles.trophyContainer}>
                <Trophy size={24} color="#fbbf24" />
              </View>
            </View>
          </View>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Enhanced Progress Overview */}
            <View style={styles.overviewCard}>
              <LinearGradient 
                colors={["#b45309", "#d97706", "#f59e0b", "#fbbf24"]} 
                style={styles.overviewGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                {/* Shimmer Effect */}
                <Animated.View
                  style={[
                    styles.overviewShimmer,
                    {
                      transform: [{ translateX: shimmerTranslate }],
                    },
                  ]}
                >
                  <LinearGradient
                    colors={["transparent", "rgba(255, 255, 255, 0.3)", "transparent"]}
                    style={styles.shimmerGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  />
                </Animated.View>

                <View style={styles.trophyIconContainer}>
                  <Trophy size={36} color="#ffffff" strokeWidth={2.5} />
                </View>
                <Text style={styles.overviewTitle}>Your Progress</Text>
                <Text style={styles.overviewStats}>
                  {unlockedCount} of {totalCount} achievements unlocked
                </Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${(unlockedCount / totalCount) * 100}%` }]} />
                </View>
                <Text style={styles.progressPercentageMain}>
                  {Math.round((unlockedCount / totalCount) * 100)}% Complete
                </Text>
              </LinearGradient>
            </View>

            {/* Enhanced Achievements List */}
            {achievements.map((achievement) => {
              const IconComponent = achievement.icon;
              return (
                <View 
                  key={achievement.id}
                  style={[
                    styles.achievementCard,
                    achievement.unlocked && styles.unlockedCard
                  ]}
                >
                  <LinearGradient 
                    colors={achievement.unlocked ? achievement.colors : ["#1a1a1a", "#0f0f0f", "#0a0a0a"]} 
                    style={styles.achievementGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    {achievement.unlocked && (
                      <Animated.View
                        style={[
                          styles.achievementShimmer,
                          {
                            transform: [{ translateX: shimmerTranslate }],
                          },
                        ]}
                      >
                        <LinearGradient
                          colors={["transparent", "rgba(255, 255, 255, 0.2)", "transparent"]}
                          style={styles.shimmerGradient}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                        />
                      </Animated.View>
                    )}

                    <View style={styles.achievementHeader}>
                      <View style={[
                        styles.achievementIcon, 
                        { 
                          backgroundColor: achievement.unlocked ? `${achievement.iconColor}30` : '#333333',
                          opacity: achievement.unlocked ? 1 : 0.5,
                          borderWidth: achievement.unlocked ? 2 : 1,
                          borderColor: achievement.unlocked ? `${achievement.iconColor}40` : '#444444'
                        }
                      ]}>
                        <IconComponent 
                          size={24} 
                          color={achievement.unlocked ? achievement.iconColor : '#666666'} 
                          strokeWidth={achievement.unlocked ? 2.5 : 2}
                        />
                      </View>
                      <View style={styles.achievementInfo}>
                        <Text style={[
                          styles.achievementTitle,
                          { opacity: achievement.unlocked ? 1 : 0.5 }
                        ]}>
                          {achievement.title}
                        </Text>
                        <Text style={[
                          styles.achievementDescription,
                          { opacity: achievement.unlocked ? 1 : 0.5 }
                        ]}>
                          {achievement.description}
                        </Text>
                        {achievement.unlocked ? (
                          <View style={styles.unlockedContainer}>
                            <CheckCircle size={14} color="#34d399" />
                            <Text style={styles.unlockedDate}>Unlocked {achievement.date}</Text>
                          </View>
                        ) : (
                          <Text style={styles.progressText}>
                            {achievement.current}/{achievement.target}
                          </Text>
                        )}
                      </View>
                      {achievement.unlocked && (
                        <View style={styles.unlockedBadge}>
                          <LinearGradient
                            colors={["#047857", "#10b981"]}
                            style={styles.unlockedBadgeGradient}
                          >
                            <CheckCircle size={18} color="#ffffff" fill="#ffffff" />
                          </LinearGradient>
                        </View>
                      )}
                    </View>
                    
                    {!achievement.unlocked && (
                      <View style={styles.progressContainer}>
                        <View style={styles.progressBarSmall}>
                          <LinearGradient
                            colors={[achievement.colors[0], achievement.colors[2]]}
                            style={[
                              styles.progressFillSmall, 
                              { width: `${achievement.progress}%` }
                            ]}
                          />
                        </View>
                        <Text style={styles.progressPercentage}>{achievement.progress}%</Text>
                      </View>
                    )}
                  </LinearGradient>
                </View>
              );
            })}
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
  trophyContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(251, 191, 36, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  overviewCard: {
    marginBottom: 24,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
  },
  overviewGradient: {
    padding: 28,
    alignItems: 'center',
    position: 'relative',
    minHeight: 180,
  },
  overviewShimmer: {
    position: "absolute",
    top: 0,
    width: 100,
    height: "100%",
  },
  shimmerGradient: {
    width: "100%",
    height: "100%",
  },
  trophyIconContainer: {
    marginBottom: 12,
  },
  overviewTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 6,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  overviewStats: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.95)',
    marginBottom: 20,
    fontWeight: '600',
  },
  progressBar: {
    width: '100%',
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
  progressPercentageMain: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '700',
  },
  achievementCard: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  unlockedCard: {
    shadowColor: '#10b981',
    shadowOpacity: 0.3,
  },
  achievementGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    position: 'relative',
  },
  achievementShimmer: {
    position: "absolute",
    top: 0,
    width: 100,
    height: "100%",
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 6,
  },
  unlockedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unlockedDate: {
    fontSize: 12,
    color: '#34d399',
    fontWeight: '600',
    marginLeft: 6,
  },
  progressText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
  },
  unlockedBadge: {
    marginLeft: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  unlockedBadgeGradient: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarSmall: {
    flex: 1,
    height: 8,
    backgroundColor: '#333333',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 12,
  },
  progressFillSmall: {
    height: '100%',
    borderRadius: 4,
  },
  progressPercentage: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '600',
    minWidth: 35,
  },
});