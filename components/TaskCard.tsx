import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Task } from '@/lib/supabase';
import { Check, Edit3, Trash2, Calendar, Clock } from 'lucide-react-native';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export default function TaskCard({ task, onToggleComplete, onEdit, onDelete }: TaskCardProps) {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const breatheAnim = useRef(new Animated.Value(1)).current;
  const checkboxScaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Initial entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.back(1.1)),
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

    Animated.loop(
      Animated.sequence([
        Animated.timing(breatheAnim, {
          toValue: 1.01,
          duration: 2500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(breatheAnim, {
          toValue: 1,
          duration: 2500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete(task.id),
        },
      ]
    );
  };

  const handleToggleComplete = () => {
    // Animate checkbox on toggle
    Animated.sequence([
      Animated.timing(checkboxScaleAnim, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(checkboxScaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    onToggleComplete(task);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks}w ago`;
  };

  const shimmerTranslate = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  // Choose gradient colors based on task status
  const gradientColors = task.completed 
    ? ["#047857", "#059669", "#10b981"] // Emerald for completed
    : ["#1e3a8a", "#1e40af", "#3b82f6"]; // Blue for pending

  const borderColors = task.completed
    ? ["#34d399", "#10b981"] // Emerald border
    : ["#60a5fa", "#3b82f6"]; // Blue border

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [
            { translateY: slideAnim },
            { scale: scaleAnim },
          ],
        },
      ]}
    >
      <View style={styles.cardWrapper}>
        <LinearGradient 
          colors={gradientColors} 
          style={styles.cardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
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
              colors={["transparent", "rgba(255, 255, 255, 0.2)", "transparent"]}
              style={styles.shimmerGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          </Animated.View>

          <View style={styles.cardContent}>
            {/* Enhanced Checkbox */}
            <Animated.View
              style={[
                styles.checkboxContainer,
                {
                  transform: [{ scale: checkboxScaleAnim }],
                },
              ]}
            >
              <TouchableOpacity
                onPress={handleToggleComplete}
                activeOpacity={0.8}
              >
                <Animated.View
                  style={[
                    styles.checkbox,
                    {
                      transform: [{ scale: breatheAnim }],
                    },
                  ]}
                >
                  <LinearGradient
                    colors={task.completed ? ["#34d399", "#10b981"] : ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.1)"]}
                    style={styles.checkboxGradient}
                  >
                    {task.completed && (
                      <Animated.View
                        style={[
                          {
                            transform: [{ scale: pulseAnim }],
                          },
                        ]}
                      >
                        <Check size={16} color="#ffffff" strokeWidth={3} />
                      </Animated.View>
                    )}
                  </LinearGradient>
                </Animated.View>
              </TouchableOpacity>
            </Animated.View>

            {/* Content Section */}
            <View style={styles.content}>
              <Text style={[
                styles.title, 
                task.completed && styles.completedText
              ]}>
                {task.title}
              </Text>
              
              {task.description ? (
                <Text style={[
                  styles.description, 
                  task.completed && styles.completedDescription
                ]}>
                  {task.description}
                </Text>
              ) : null}
              
              {/* Enhanced Date Section */}
              <View style={styles.dateContainer}>
                <View style={styles.dateItem}>
                  <Calendar size={12} color="rgba(255,255,255,0.7)" strokeWidth={2} />
                  <Text style={styles.dateText}>
                    {formatDate(task.created_at)}
                  </Text>
                </View>
                <View style={styles.dateItem}>
                  <Clock size={12} color="rgba(255,255,255,0.7)" strokeWidth={2} />
                  <Text style={styles.dateText}>
                    {getTimeAgo(task.created_at)}
                  </Text>
                </View>
              </View>
            </View>

            {/* Enhanced Action Buttons */}
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => onEdit(task)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["rgba(255,255,255,0.15)", "rgba(255,255,255,0.05)"]}
                  style={styles.actionButtonGradient}
                >
                  <Edit3 size={16} color="rgba(255,255,255,0.9)" strokeWidth={2.5} />
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleDelete}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["rgba(239, 68, 68, 0.2)", "rgba(220, 38, 38, 0.1)"]}
                  style={styles.actionButtonGradient}
                >
                  <Trash2 size={16} color="#f87171" strokeWidth={2.5} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* Status Indicator */}
          <View style={styles.statusIndicator}>
            <LinearGradient
              colors={borderColors}
              style={styles.statusGradient}
            />
          </View>
        </LinearGradient>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  cardWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  cardGradient: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    position: 'relative',
  },
  shimmer: {
    position: "absolute",
    top: 0,
    width: 100,
    height: "100%",
    zIndex: 1,
  },
  shimmerGradient: {
    width: "100%",
    height: "100%",
  },
  cardContent: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    position: 'relative',
    zIndex: 2,
  },
  checkboxContainer: {
    marginRight: 16,
    marginTop: 2,
  },
  checkbox: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  checkboxGradient: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 6,
    lineHeight: 24,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'rgba(255,255,255,0.7)',
  },
  description: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 12,
    lineHeight: 20,
    fontWeight: '500',
  },
  completedDescription: {
    color: 'rgba(255,255,255,0.6)',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  dateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'column',
    gap: 8,
    marginLeft: 12,
  },
  actionButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButtonGradient: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  statusGradient: {
    flex: 1,
  },
});