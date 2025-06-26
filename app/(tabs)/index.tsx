"use client"

import { useState, useEffect, useRef } from "react"
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Dimensions,
  Animated,
  Easing,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { SafeAreaView } from "react-native-safe-area-context"
import { useAuth } from "@/contexts/AuthContext"
import { supabase, type Task } from "@/lib/supabase"
import { Plus, CheckSquare, Target, TrendingUp, Star, Sparkles, Trophy, Zap } from "lucide-react-native"
import TaskCard from "@/components/TaskCard"
import CreateTaskModal from "@/components/CreateTaskModal"
import EditTaskModal from "@/components/EditTaskModal"

const { width, height } = Dimensions.get("window")

// Enhanced Particle component
const Particle = ({ delay, duration, startX, startY, endX, endY, size, color, opacity, type = "circle" }) => {
  const animValue = useRef(new Animated.Value(0)).current
  const fadeValue = useRef(new Animated.Value(0)).current
  const rotateValue = useRef(new Animated.Value(0)).current

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
        Animated.loop(
          Animated.timing(rotateValue, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ),
      ]).start(() => {
        animValue.setValue(0)
        fadeValue.setValue(0)
        setTimeout(animate, Math.random() * 5000 + 4000)
      })
    }

    animate()
  }, [])

  const translateX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [startX, endX],
  })

  const translateY = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [startY, endY],
  })

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })

  if (type === "star") {
    return (
      <Animated.View
        style={[
          styles.particleStar,
          {
            opacity: fadeValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, opacity],
            }),
            transform: [{ translateX }, { translateY }, { rotate }],
          },
        ]}
      >
        <Star size={size} color={color} />
      </Animated.View>
    )
  }

  if (type === "sparkle") {
    return (
      <Animated.View
        style={[
          styles.particleSparkle,
          {
            opacity: fadeValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, opacity],
            }),
            transform: [
              { translateX },
              { translateY },
              {
                scale: animValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0.3, 1.2, 0.6],
                }),
              },
            ],
          },
        ]}
      >
        <Sparkles size={size} color={color} />
      </Animated.View>
    )
  }

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
  )
}

export default function TasksScreen() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [createModalVisible, setCreateModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(30)).current
  const scaleAnim = useRef(new Animated.Value(0.95)).current
  const headerSlideAnim = useRef(new Animated.Value(-50)).current
  const statsSlideAnim = useRef(new Animated.Value(50)).current
  const fabScaleAnim = useRef(new Animated.Value(0)).current
  const pulseAnim = useRef(new Animated.Value(1)).current
  const rotateAnim = useRef(new Animated.Value(0)).current
  const shimmerAnim = useRef(new Animated.Value(0)).current
  const waveAnim = useRef(new Animated.Value(0)).current
  const breatheAnim = useRef(new Animated.Value(1)).current
  const floatAnim1 = useRef(new Animated.Value(0)).current
  const floatAnim2 = useRef(new Animated.Value(0)).current
  const floatAnim3 = useRef(new Animated.Value(0)).current

  useEffect(() => {
    // Initial entrance animations
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
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.back(1.1)),
        useNativeDriver: true,
      }),
      Animated.timing(headerSlideAnim, {
        toValue: 0,
        duration: 900,
        delay: 200,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(statsSlideAnim, {
        toValue: 0,
        duration: 900,
        delay: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start()

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
    ).start()

    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 20000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start()

    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start()

    Animated.loop(
      Animated.timing(waveAnim, {
        toValue: 1,
        duration: 4000,
        easing: Easing.inOut(Easing.sin),
        useNativeDriver: true,
      }),
    ).start()

    Animated.loop(
      Animated.sequence([
        Animated.timing(breatheAnim, {
          toValue: 1.02,
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(breatheAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    ).start()

    // Floating animations
    const createFloatingAnimation = (animValue: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animValue, {
            toValue: 1,
            duration: 3000 + delay,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: 3000 + delay,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]),
      ).start()
    }

    createFloatingAnimation(floatAnim1, 0)
    createFloatingAnimation(floatAnim2, 1000)
    createFloatingAnimation(floatAnim3, 2000)
  }, [])

  useEffect(() => {
    if (tasks.length > 0) {
      Animated.spring(fabScaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }).start()
    }
  }, [tasks.length])

  const fetchTasks = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) {
        setError(error.message)
      } else {
        setTasks(data || [])
        setError(null)
      }
    } catch (err) {
      setError("Failed to fetch tasks")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [user])

  const onRefresh = () => {
    setRefreshing(true)
    fetchTasks()
  }

  const handleToggleComplete = async (task: Task) => {
    try {
      const { error } = await supabase.from("tasks").update({ completed: !task.completed }).eq("id", task.id)

      if (error) {
        throw error
      }

      setTasks((prevTasks) => prevTasks.map((t) => (t.id === task.id ? { ...t, completed: !t.completed } : t)))
    } catch (err) {
      setError("Failed to update task")
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    try {
      const { error } = await supabase.from("tasks").delete().eq("id", taskId)

      if (error) {
        throw error
      }

      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId))
    } catch (err) {
      setError("Failed to delete task")
    }
  }

  const handleEditTask = (task: Task) => {
    setSelectedTask(task)
    setEditModalVisible(true)
  }

  const handleTaskCreated = (newTask: Task) => {
    setTasks((prevTasks) => [newTask, ...prevTasks])
    setCreateModalVisible(false)
  }

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks((prevTasks) => prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)))
    setEditModalVisible(false)
    setSelectedTask(null)
  }

  const completedTasks = tasks.filter((task) => task.completed)
  const pendingTasks = tasks.filter((task) => !task.completed)
  const completionRate = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0

  // Interpolations
  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })

  const shimmerTranslate = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  })

  const headerShimmerTranslate = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  })

  const waveTranslate = waveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 15],
  })

  const float1Y = floatAnim1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  })

  const float2Y = floatAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 15],
  })

  const float3Y = floatAnim3.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  })

  // Generate particles
  const particles = Array.from({ length: 20 }, (_, i) => {
    const types = ["circle", "star", "sparkle"]
    const colors = ["#00d4ff", "#0099cc", "#8b5cf6", "#a855f7", "#10b981", "#059669"]

    return {
      id: i,
      delay: Math.random() * 4000,
      duration: 4000 + Math.random() * 3000,
      startX: Math.random() * width,
      startY: height + 50,
      endX: Math.random() * width,
      endY: -50,
      size: i < 12 ? 2 + Math.random() * 3 : 6 + Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 0.2 + Math.random() * 0.4,
      type: i < 14 ? "circle" : types[Math.floor(Math.random() * types.length)],
    }
  })

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LinearGradient colors={["#0f0f23", "#1a1a2e", "#16213e"]} style={styles.loadingGradient}>
          <Animated.View
            style={[
              styles.loadingContent,
              {
                transform: [{ scale: pulseAnim }],
              },
            ]}
          >
            <View style={styles.loadingIconContainer}>
              <LinearGradient colors={["#00d4ff", "#0099cc"]} style={styles.loadingIconGradient}>
                <ActivityIndicator size="large" color="#ffffff" />
              </LinearGradient>
            </View>
            <Text style={styles.loadingText}>Loading your tasks...</Text>
            <Text style={styles.loadingSubtext}>Preparing your productivity dashboard</Text>
          </Animated.View>
        </LinearGradient>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#0f0f23", "#1a1a2e", "#16213e"]} style={styles.backgroundGradient} />

      {/* Enhanced Particle System */}
      <View style={styles.particleContainer}>
        {particles.map((particle) => (
          <Particle key={particle.id} {...particle} />
        ))}
      </View>

      {/* Wave Background */}
      <Animated.View
        style={[
          styles.waveBackground,
          {
            transform: [{ translateY: waveTranslate }],
          },
        ]}
      >
        <LinearGradient colors={["transparent", "rgba(0, 212, 255, 0.03)", "transparent"]} style={styles.wave} />
      </Animated.View>

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

      {/* Abstract Background Elements */}
      <View style={styles.abstractContainer}>
        <Animated.View
          style={[
            styles.abstractShape1,
            {
              transform: [{ translateY: float1Y }, { rotate: rotateInterpolate }, { scale: pulseAnim }],
            },
          ]}
        >
          <LinearGradient colors={["#00d4ff", "#0099cc"]} style={styles.shapeGradient1}>
            <CheckSquare size={20} color="rgba(255,255,255,0.3)" />
          </LinearGradient>
        </Animated.View>

        <Animated.View
          style={[
            styles.abstractShape2,
            {
              transform: [{ translateY: float2Y }, { scale: breatheAnim }],
            },
          ]}
        >
          <LinearGradient colors={["#8b5cf6", "#a855f7"]} style={styles.shapeGradient2}>
            <Trophy size={18} color="rgba(255,255,255,0.4)" />
          </LinearGradient>
        </Animated.View>

        <Animated.View
          style={[
            styles.abstractShape3,
            {
              transform: [{ translateY: float3Y }],
            },
          ]}
        >
          <LinearGradient colors={["#10b981", "#059669"]} style={styles.shapeGradient3}>
            <Zap size={16} color="rgba(255,255,255,0.5)" />
          </LinearGradient>
        </Animated.View>
      </View>

      <SafeAreaView style={styles.safeArea}>
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
            },
          ]}
        >
          {/* Enhanced Header */}
          <Animated.View
            style={[
              styles.header,
              {
                transform: [{ translateY: headerSlideAnim }],
              },
            ]}
          >
            <View style={styles.headerContent}>
              <View style={styles.headerTop}>
                <View style={styles.welcomeSection}>
                  <Text style={styles.greeting}>Welcome back</Text>
                  <Animated.Text
                    style={[
                      styles.userName,
                      {
                        transform: [{ scale: breatheAnim }],
                      },
                    ]}
                  >
                    {user?.email?.split("@")[0] || "User"}
                  </Animated.Text>
                  <Text style={styles.subtitle}>Let's get things done today</Text>
                </View>
                <Animated.View
                  style={[
                    styles.avatarContainer,
                    {
                      transform: [{ scale: pulseAnim }],
                    },
                  ]}
                >
                  <LinearGradient colors={["#0ea5e9", "#06b6d4", "#00d4ff"]} style={styles.avatar}>
                    <Text style={styles.avatarText}>{user?.email?.charAt(0).toUpperCase() || "U"}</Text>
                  </LinearGradient>
                </Animated.View>
              </View>

              {/* Enhanced Stats Cards */}
              <Animated.View
                style={[
                  styles.statsContainer,
                  {
                    transform: [{ translateY: statsSlideAnim }],
                  },
                ]}
              >
                <Animated.View
                  style={[
                    styles.statCard,
                    {
                      transform: [{ scale: breatheAnim }],
                    },
                  ]}
                >
                  <LinearGradient 
                    colors={["#b45309", "#d97706", "#f59e0b"]} 
                    style={styles.statGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    {/* Shimmer Effect */}
                    <Animated.View
                      style={[
                        styles.statShimmer,
                        {
                          transform: [{ translateX: headerShimmerTranslate }],
                        },
                      ]}
                    >
                      <LinearGradient
                        colors={["transparent", "rgba(255, 255, 255, 0.2)", "transparent"]}
                        style={styles.statShimmerGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                      />
                    </Animated.View>

                    <Animated.View
                      style={[
                        styles.statIcon,
                        {
                          transform: [{ rotate: rotateInterpolate }],
                        },
                      ]}
                    >
                      <Target size={20} color="#fbbf24" strokeWidth={2.5} />
                    </Animated.View>
                    <Text style={styles.statNumber}>{pendingTasks.length}</Text>
                    <Text style={styles.statLabel}>Pending</Text>
                  </LinearGradient>
                </Animated.View>

                <Animated.View
                  style={[
                    styles.statCard,
                    {
                      transform: [{ scale: pulseAnim }],
                    },
                  ]}
                >
                  <LinearGradient 
                    colors={["#047857", "#059669", "#10b981"]} 
                    style={styles.statGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    {/* Shimmer Effect */}
                    <Animated.View
                      style={[
                        styles.statShimmer,
                        {
                          transform: [{ translateX: headerShimmerTranslate }],
                        },
                      ]}
                    >
                      <LinearGradient
                        colors={["transparent", "rgba(255, 255, 255, 0.2)", "transparent"]}
                        style={styles.statShimmerGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                      />
                    </Animated.View>

                    <View style={styles.statIcon}>
                      <CheckSquare size={20} color="#34d399" strokeWidth={2.5} />
                    </View>
                    <Text style={styles.statNumber}>{completedTasks.length}</Text>
                    <Text style={styles.statLabel}>Completed</Text>
                  </LinearGradient>
                </Animated.View>

                <Animated.View
                  style={[
                    styles.statCard,
                    {
                      transform: [{ scale: breatheAnim }],
                    },
                  ]}
                >
                  <LinearGradient 
                    colors={["#581c87", "#7c3aed", "#a855f7"]} 
                    style={styles.statGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    {/* Shimmer Effect */}
                    <Animated.View
                      style={[
                        styles.statShimmer,
                        {
                          transform: [{ translateX: headerShimmerTranslate }],
                        },
                      ]}
                    >
                      <LinearGradient
                        colors={["transparent", "rgba(255, 255, 255, 0.2)", "transparent"]}
                        style={styles.statShimmerGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                      />
                    </Animated.View>

                    <View style={styles.statIcon}>
                      <TrendingUp size={20} color="#c084fc" strokeWidth={2.5} />
                    </View>
                    <Text style={styles.statNumber}>{completionRate}%</Text>
                    <Text style={styles.statLabel}>Progress</Text>
                  </LinearGradient>
                </Animated.View>
              </Animated.View>
            </View>
          </Animated.View>

          {/* Error Message */}
          {error && (
            <Animated.View
              style={[
                styles.errorContainer,
                {
                  transform: [{ scale: pulseAnim }],
                },
              ]}
            >
              <LinearGradient colors={["#be123c", "#dc2626", "#ef4444"]} style={styles.errorGradient}>
                <Text style={styles.errorText}>{error}</Text>
              </LinearGradient>
            </Animated.View>
          )}

          {/* Enhanced Tasks List */}
          <View style={styles.listWrapper}>
            <FlatList
              data={tasks}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TaskCard
                  task={item}
                  onToggleComplete={handleToggleComplete}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                />
              )}
              contentContainerStyle={[styles.listContainer, tasks.length === 0 && styles.emptyContainer]}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={["#00d4ff"]}
                  tintColor="#00d4ff"
                />
              }
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <Animated.View
                  style={[
                    styles.emptyState,
                    {
                      transform: [{ scale: breatheAnim }],
                    },
                  ]}
                >
                  <Animated.View
                    style={[
                      styles.emptyIconContainer,
                      {
                        transform: [{ scale: pulseAnim }],
                      },
                    ]}
                  >
                    <LinearGradient colors={["#1e3a8a", "#1e40af", "#3b82f6"]} style={styles.emptyIconGradient}>
                      <CheckSquare size={48} color="#60a5fa" strokeWidth={2.5} />
                    </LinearGradient>
                  </Animated.View>
                  <Text style={styles.emptyTitle}>No tasks yet</Text>
                  <Text style={styles.emptySubtitle}>Create your first task to start organizing your day</Text>
                  <TouchableOpacity
                    style={styles.emptyButton}
                    onPress={() => setCreateModalVisible(true)}
                    activeOpacity={0.8}
                  >
                    <LinearGradient colors={["#0ea5e9", "#06b6d4", "#00d4ff"]} style={styles.emptyButtonGradient}>
                      <Plus size={20} color="#ffffff" strokeWidth={2.5} />
                      <Text style={styles.emptyButtonText}>Create Task</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </Animated.View>
              }
            />
          </View>

          {/* Enhanced FAB */}
          {tasks.length > 0 && (
            <Animated.View
              style={[
                styles.fab,
                {
                  transform: [{ scale: fabScaleAnim }],
                },
              ]}
            >
              <TouchableOpacity onPress={() => setCreateModalVisible(true)} activeOpacity={0.8}>
                <LinearGradient colors={["#0ea5e9", "#06b6d4", "#00d4ff"]} style={styles.fabGradient}>
                  <Animated.View
                    style={[
                      {
                        transform: [{ rotate: rotateInterpolate }],
                      },
                    ]}
                  >
                    <Plus size={28} color="#ffffff" strokeWidth={2.5} />
                  </Animated.View>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* Modals */}
          <CreateTaskModal
            visible={createModalVisible}
            onClose={() => setCreateModalVisible(false)}
            onTaskCreated={handleTaskCreated}
          />

          <EditTaskModal
            visible={editModalVisible}
            task={selectedTask}
            onClose={() => {
              setEditModalVisible(false)
              setSelectedTask(null)
            }}
            onTaskUpdated={handleTaskUpdated}
          />
        </Animated.View>
      </SafeAreaView>
    </View>
  )
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
  particleStar: {
    position: "absolute",
  },
  particleSparkle: {
    position: "absolute",
  },
  waveBackground: {
    position: "absolute",
    width: width,
    height: 150,
    top: height * 0.3,
  },
  wave: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
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
  abstractContainer: {
    position: "absolute",
    width: width,
    height: height,
    overflow: "hidden",
  },
  abstractShape1: {
    position: "absolute",
    top: height * 0.15,
    right: width * 0.1,
  },
  abstractShape2: {
    position: "absolute",
    top: height * 0.4,
    left: width * 0.05,
  },
  abstractShape3: {
    position: "absolute",
    top: height * 0.7,
    right: width * 0.15,
  },
  shapeGradient1: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.08,
  },
  shapeGradient2: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.06,
  },
  shapeGradient3: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.07,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
  },
  loadingGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContent: {
    alignItems: "center",
  },
  loadingIconContainer: {
    marginBottom: 20,
    borderRadius: 40,
    overflow: 'hidden',
    shadowColor: "#00d4ff",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  loadingIconGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  loadingSubtext: {
    color: "#94a3b8",
    fontSize: 14,
    fontWeight: "500",
  },
  header: {
    paddingBottom: 32,
  },
  headerContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 32,
  },
  welcomeSection: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: "#94a3b8",
    fontWeight: "500",
    marginBottom: 4,
  },
  userName: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "400",
  },
  avatarContainer: {
    shadowColor: "#00d4ff",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  statGradient: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    position: 'relative',
  },
  statShimmer: {
    position: "absolute",
    top: 0,
    width: 100,
    height: "100%",
  },
  statShimmerGradient: {
    width: "100%",
    height: "100%",
  },
  statIcon: {
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: "600",
  },
  errorContainer: {
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  errorGradient: {
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  errorText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  listWrapper: {
    flex: 1,
    backgroundColor: "#0f172a",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: 8,
  },
  listContainer: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 64,
  },
  emptyIconContainer: {
    marginBottom: 24,
    borderRadius: 50,
    overflow: 'hidden',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
  },
  emptyIconGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  emptyButton: {
    borderRadius: 16,
    shadowColor: "#00d4ff",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  emptyButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
  },
  emptyButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
  fab: {
    position: "absolute",
    bottom: 32,
    right: 24,
    borderRadius: 32,
    shadowColor: "#00d4ff",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
  },
  fabGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
})