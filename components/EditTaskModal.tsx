import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Easing,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase, Task } from '@/lib/supabase';
import { ArrowLeft, Save, Edit3, Hash, FileText, CheckCircle } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

interface EditTaskModalProps {
  visible: boolean;
  task: Task | null;
  onClose: () => void;
  onTaskUpdated: (task: Task) => void;
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

export default function EditTaskModal({ visible, task, onClose, onTaskUpdated }: EditTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const breatheAnim = useRef(new Animated.Value(1)).current;
  const headerSlideAnim = useRef(new Animated.Value(-50)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setError(null);
    }
  }, [task]);

  useEffect(() => {
    if (visible) {
      // Reset animations when modal opens
      fadeAnim.setValue(0);
      slideAnim.setValue(30);
      scaleAnim.setValue(0.95);
      headerSlideAnim.setValue(-50);

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
      ).start();

      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 20000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    }
  }, [visible]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleUpdate = async () => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (!task) {
      setError('No task selected');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('tasks')
        .update({
          title: title.trim(),
          description: description.trim(),
        })
        .eq('id', task.id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      onTaskUpdated(data);
    } catch (err: any) {
      setError(err.message || 'Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  // Generate particles
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    delay: Math.random() * 3000,
    duration: 3000 + Math.random() * 2000,
    startX: Math.random() * width,
    startY: height + 50,
    endX: Math.random() * width,
    endY: -50,
    size: 2 + Math.random() * 3,
    color: ['#10b981', '#00d4ff', '#8b5cf6', '#f59e0b'][Math.floor(Math.random() * 4)],
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

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={handleClose}
    >
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

        {/* Abstract Background Elements */}
        <View style={styles.abstractContainer}>
          <Animated.View
            style={[
              styles.abstractShape1,
              {
                transform: [{ rotate: rotateInterpolate }, { scale: pulseAnim }],
              },
            ]}
          >
            <LinearGradient colors={["#10b981", "#059669"]} style={styles.shapeGradient1}>
              <Edit3 size={16} color="rgba(255,255,255,0.3)" />
            </LinearGradient>
          </Animated.View>

          <Animated.View
            style={[
              styles.abstractShape2,
              {
                transform: [{ scale: breatheAnim }],
              },
            ]}
          >
            <LinearGradient colors={["#8b5cf6", "#a855f7"]} style={styles.shapeGradient2}>
              <CheckCircle size={14} color="rgba(255,255,255,0.4)" />
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
              <TouchableOpacity onPress={handleClose} style={styles.backButton}>
                <LinearGradient
                  colors={["rgba(255,255,255,0.15)", "rgba(255,255,255,0.05)"]}
                  style={styles.backButtonGradient}
                >
                  <ArrowLeft size={24} color="#ffffff" />
                </LinearGradient>
              </TouchableOpacity>
              <Text style={styles.title}>Edit Task</Text>
              <View style={styles.placeholder} />
            </Animated.View>

            <KeyboardAvoidingView
              style={styles.keyboardView}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
              <ScrollView 
                style={styles.scrollView} 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
              >
                {/* Enhanced Welcome Section */}
                <Animated.View
                  style={[
                    styles.welcomeSection,
                    {
                      transform: [{ scale: breatheAnim }],
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
                        styles.welcomeShimmer,
                        {
                          transform: [{ translateX: headerShimmerTranslate }],
                        },
                      ]}
                    >
                      <LinearGradient
                        colors={["transparent", "rgba(255, 255, 255, 0.3)", "transparent"]}
                        style={styles.welcomeShimmerGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                      />
                    </Animated.View>

                    <View style={styles.welcomeIconContainer}>
                      <Animated.View
                        style={[
                          styles.welcomeIcon,
                          {
                            transform: [{ scale: pulseAnim }],
                          },
                        ]}
                      >
                        <LinearGradient
                          colors={["rgba(255,255,255,0.3)", "rgba(255,255,255,0.1)"]}
                          style={styles.welcomeIconGradient}
                        >
                          <Edit3 size={32} color="#ffffff" strokeWidth={2.5} />
                        </LinearGradient>
                      </Animated.View>
                    </View>
                    <Text style={styles.welcomeTitle}>Refine Your Task</Text>
                    <Text style={styles.welcomeSubtitle}>
                      Perfect your plan. Update details, clarify objectives, and keep your goals aligned with your vision.
                    </Text>
                  </LinearGradient>
                </Animated.View>

                {/* Enhanced Form Container */}
                <Animated.View
                  style={[
                    styles.formContainer,
                    {
                      transform: [{ scale: breatheAnim }],
                    },
                  ]}
                >
                  <LinearGradient 
                    colors={["#581c87", "#7c3aed", "#a855f7"]} 
                    style={styles.formGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    {error && (
                      <Animated.View style={styles.errorContainer}>
                        <LinearGradient colors={["#be123c", "#dc2626", "#ef4444"]} style={styles.errorGradient}>
                          <Text style={styles.errorText}>{error}</Text>
                        </LinearGradient>
                      </Animated.View>
                    )}

                    {/* Title Input */}
                    <View style={styles.inputGroup}>
                      <View style={styles.labelContainer}>
                        <Hash size={18} color="#c084fc" />
                        <Text style={styles.label}>Task Title</Text>
                        <Text style={styles.required}>*</Text>
                      </View>
                      <View style={styles.inputContainer}>
                        <TextInput
                          style={styles.input}
                          placeholder="What needs to be accomplished?"
                          placeholderTextColor="#64748b"
                          value={title}
                          onChangeText={setTitle}
                          multiline
                          autoFocus
                        />
                      </View>
                    </View>

                    {/* Description Input */}
                    <View style={styles.inputGroup}>
                      <View style={styles.labelContainer}>
                        <FileText size={18} color="#34d399" />
                        <Text style={styles.label}>Details</Text>
                        <Text style={styles.optional}>(Optional)</Text>
                      </View>
                      <View style={[styles.inputContainer, styles.textAreaContainer]}>
                        <TextInput
                          style={[styles.input, styles.textArea]}
                          placeholder="Update context, steps, or any details that will help you succeed..."
                          placeholderTextColor="#64748b"
                          value={description}
                          onChangeText={setDescription}
                          multiline
                          numberOfLines={4}
                          textAlignVertical="top"
                        />
                      </View>
                    </View>

                    {/* Save Button */}
                    <TouchableOpacity
                      style={[styles.saveButton, loading && styles.buttonDisabled]}
                      onPress={handleUpdate}
                      disabled={loading}
                      activeOpacity={0.8}
                    >
                      <LinearGradient
                        colors={loading ? ["#475569", "#334155"] : ["#047857", "#059669", "#10b981"]}
                        style={styles.saveButtonGradient}
                      >
                        {loading ? (
                          <ActivityIndicator color="#ffffff" size="small" />
                        ) : (
                          <>
                            <Save size={22} color="#ffffff" strokeWidth={2.5} />
                            <Text style={styles.saveButtonText}>Save Changes</Text>
                          </>
                        )}
                      </LinearGradient>
                    </TouchableOpacity>
                  </LinearGradient>
                </Animated.View>

                <View style={styles.bottomPadding} />
              </ScrollView>
            </KeyboardAvoidingView>
          </Animated.View>
        </SafeAreaView>
      </View>
    </Modal>
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
  abstractContainer: {
    position: "absolute",
    width: width,
    height: height,
    overflow: "hidden",
  },
  abstractShape1: {
    position: "absolute",
    top: height * 0.25,
    right: width * 0.08,
  },
  abstractShape2: {
    position: "absolute",
    top: height * 0.65,
    left: width * 0.08,
  },
  shapeGradient1: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.08,
  },
  shapeGradient2: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.06,
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
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  welcomeSection: {
    marginHorizontal: 24,
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
  welcomeGradient: {
    padding: 36,
    alignItems: 'center',
    position: 'relative',
    minHeight: 200,
  },
  welcomeShimmer: {
    position: "absolute",
    top: 0,
    width: 100,
    height: "100%",
  },
  welcomeShimmerGradient: {
    width: "100%",
    height: "100%",
  },
  welcomeIconContainer: {
    marginBottom: 20,
  },
  welcomeIcon: {
    shadowColor: "#10b981",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
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
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 12,
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
    paddingHorizontal: 20,
    fontWeight: '500',
  },
  formContainer: {
    marginHorizontal: 24,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 40,
    elevation: 20,
    marginBottom: 24,
  },
  formGradient: {
    padding: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  errorContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  errorGradient: {
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  errorText: {
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  inputGroup: {
    marginBottom: 24,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e2e8f0',
    marginLeft: 8,
  },
  required: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc2626',
    marginLeft: 4,
  },
  optional: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
    marginLeft: 8,
  },
  inputContainer: {
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  textAreaContainer: {
    minHeight: 120,
  },
  input: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    borderRadius: 16,
    marginTop: 12,
    shadowColor: "#10b981",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonDisabled: {
    shadowOpacity: 0.1,
  },
  saveButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  bottomPadding: {
    height: 32,
  },
});