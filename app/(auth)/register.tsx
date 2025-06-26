"use client"

import { useState, useEffect, useRef } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Animated,
  Easing,
  ScrollView,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Link, router } from "expo-router"
import { useAuth } from "@/contexts/AuthContext"
import { Mail, Lock, Eye, EyeOff, CheckCircle, Users, Sparkles, Trophy, Rocket, Star, Heart } from "lucide-react-native"

const { width, height } = Dimensions.get("window")

// Enhanced Particle component with different types
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
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ),
      ]).start(() => {
        animValue.setValue(0)
        fadeValue.setValue(0)
        setTimeout(animate, Math.random() * 4000 + 3000)
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

  if (type === "heart") {
    return (
      <Animated.View
        style={[
          styles.particleHeart,
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
                  outputRange: [0.5, 1.2, 0.8],
                }),
              },
            ],
          },
        ]}
      >
        <Heart size={size} color={color} />
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

export default function RegisterScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { signUp } = useAuth()

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current
  const scaleAnim = useRef(new Animated.Value(0.8)).current
  const rotateAnim = useRef(new Animated.Value(0)).current
  const pulseAnim = useRef(new Animated.Value(1)).current
  const floatAnim1 = useRef(new Animated.Value(0)).current
  const floatAnim2 = useRef(new Animated.Value(0)).current
  const floatAnim3 = useRef(new Animated.Value(0)).current
  const floatAnim4 = useRef(new Animated.Value(0)).current
  const logoRotateAnim = useRef(new Animated.Value(0)).current
  const logoScaleAnim = useRef(new Animated.Value(1)).current
  const shimmerAnim = useRef(new Animated.Value(0)).current
  const waveAnim = useRef(new Animated.Value(0)).current
  const breatheAnim = useRef(new Animated.Value(1)).current

  useEffect(() => {
    // Initial entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 900,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
    ]).start()

    // Continuous animations
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 25000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start()

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 2500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    ).start()

    Animated.loop(
      Animated.timing(logoRotateAnim, {
        toValue: 1,
        duration: 18000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start()

    Animated.loop(
      Animated.sequence([
        Animated.timing(logoScaleAnim, {
          toValue: 1.15,
          duration: 3500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(logoScaleAnim, {
          toValue: 1,
          duration: 3500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    ).start()

    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start()

    Animated.loop(
      Animated.timing(waveAnim, {
        toValue: 1,
        duration: 5000,
        easing: Easing.inOut(Easing.sin),
        useNativeDriver: true,
      }),
    ).start()

    Animated.loop(
      Animated.sequence([
        Animated.timing(breatheAnim, {
          toValue: 1.03,
          duration: 4000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(breatheAnim, {
          toValue: 1,
          duration: 4000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    ).start()

    // Floating animations
    const createFloatingAnimation = (animValue: Animated.Value, delay: number, duration: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animValue, {
            toValue: 1,
            duration: duration + delay,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: duration + delay,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]),
      ).start()
    }

    createFloatingAnimation(floatAnim1, 0, 3500)
    createFloatingAnimation(floatAnim2, 800, 4000)
    createFloatingAnimation(floatAnim3, 1600, 3200)
    createFloatingAnimation(floatAnim4, 2400, 3800)
  }, [])

  // Password strength validation
  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: "", color: "#475569" }
    if (password.length < 6) return { strength: 1, label: "Weak", color: "#ef4444" }
    if (password.length < 8) return { strength: 2, label: "Fair", color: "#f59e0b" }
    if (password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return { strength: 3, label: "Strong", color: "#10b981" }
    }
    return { strength: 2, label: "Good", color: "#3b82f6" }
  }

  const passwordStrength = getPasswordStrength(password)
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setLoading(true)
    setError(null)

    const { error } = await signUp(email, password)

    if (error) {
      setError(error.message)
    } else {
      router.replace("/(tabs)")
    }

    setLoading(false)
  }

  // Interpolations
  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })

  const logoRotateInterpolate = logoRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })

  const shimmerTranslate = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  })

  const waveTranslate = waveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 25],
  })

  const float1Y = floatAnim1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -25],
  })

  const float2Y = floatAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  })

  const float3Y = floatAnim3.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -15],
  })

  const float4Y = floatAnim4.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 18],
  })

  // Generate enhanced particles with different types
  const particles = Array.from({ length: 35 }, (_, i) => {
    const types = ["circle", "star", "heart"]
    const colors = ["#10b981", "#059669", "#8b5cf6", "#a855f7", "#00d4ff", "#0099cc", "#f59e0b"]

    return {
      id: i,
      delay: Math.random() * 6000,
      duration: 4000 + Math.random() * 5000,
      startX: Math.random() * width,
      startY: height + 100,
      endX: Math.random() * width,
      endY: -100,
      size: i < 15 ? 2 + Math.random() * 4 : 8 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 0.2 + Math.random() * 0.5,
      type: i < 25 ? "circle" : types[Math.floor(Math.random() * types.length)],
    }
  })

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#0f0f23", "#1a1a2e", "#16213e", "#0f0f23"]} style={styles.backgroundGradient} />

      {/* Enhanced Particle System */}
      <View style={styles.particleContainer}>
        {particles.map((particle) => (
          <Particle key={particle.id} {...particle} />
        ))}
      </View>

      {/* Multiple Wave Backgrounds */}
      <Animated.View
        style={[
          styles.waveBackground1,
          {
            transform: [{ translateY: waveTranslate }],
          },
        ]}
      >
        <LinearGradient colors={["transparent", "rgba(16, 185, 129, 0.06)", "transparent"]} style={styles.wave} />
      </Animated.View>

      <Animated.View
        style={[
          styles.waveBackground2,
          {
            transform: [
              {
                translateY: waveTranslate.interpolate({
                  inputRange: [0, 25],
                  outputRange: [0, -15],
                }),
              },
            ],
          },
        ]}
      >
        <LinearGradient colors={["transparent", "rgba(139, 92, 246, 0.04)", "transparent"]} style={styles.wave} />
      </Animated.View>

      {/* Enhanced Shimmer Effect */}
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [{ translateX: shimmerTranslate }],
          },
        ]}
      >
        <LinearGradient
          colors={["transparent", "rgba(255, 255, 255, 0.08)", "transparent"]}
          style={styles.shimmerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </Animated.View>

      {/* Enhanced Abstract Background Elements */}
      <View style={styles.abstractContainer}>
        <Animated.View
          style={[
            styles.abstractShape1,
            {
              transform: [{ translateY: float1Y }, { rotate: rotateInterpolate }, { scale: pulseAnim }],
            },
          ]}
        >
          <LinearGradient colors={["#10b981", "#059669"]} style={styles.shapeGradient1}>
            <Sparkles size={28} color="rgba(255,255,255,0.3)" />
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
            <Trophy size={22} color="rgba(255,255,255,0.4)" />
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
          <LinearGradient colors={["#f59e0b", "#d97706"]} style={styles.shapeGradient3}>
            <Rocket size={20} color="rgba(255,255,255,0.5)" />
          </LinearGradient>
        </Animated.View>

        <Animated.View
          style={[
            styles.abstractShape4,
            {
              transform: [{ translateY: float4Y }, { scale: pulseAnim }],
            },
          ]}
        >
          <LinearGradient colors={["#00d4ff", "#0099cc"]} style={styles.shapeGradient4}>
            <Users size={24} color="rgba(255,255,255,0.4)" />
          </LinearGradient>
        </Animated.View>

        {/* Additional animated elements */}
        <Animated.View
          style={[
            styles.star1,
            {
              transform: [{ rotate: logoRotateInterpolate }, { scale: logoScaleAnim }],
            },
          ]}
        >
          <Star size={14} color="rgba(16, 185, 129, 0.4)" />
        </Animated.View>

        <Animated.View
          style={[
            styles.star2,
            {
              transform: [{ rotate: rotateInterpolate }, { scale: breatheAnim }],
            },
          ]}
        >
          <Star size={10} color="rgba(139, 92, 246, 0.3)" />
        </Animated.View>

        <Animated.View
          style={[
            styles.star3,
            {
              transform: [{ rotate: logoRotateInterpolate }, { scale: pulseAnim }],
            },
          ]}
        >
          <Star size={12} color="rgba(0, 212, 255, 0.35)" />
        </Animated.View>
      </View>

      <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <Animated.View
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
              },
            ]}
          >
            {/* Enhanced Header Section */}
            <View style={styles.header}>
              <View style={styles.logoSection}>
                <View style={styles.logoContainer}>
                  <Animated.View
                    style={[
                      styles.logoWrapper,
                      {
                        transform: [{ rotate: logoRotateInterpolate }, { scale: logoScaleAnim }],
                      },
                    ]}
                  >
                    <LinearGradient colors={["#10b981", "#059669"]} style={styles.logoGradient}>
                      <View style={styles.logoInner}>
                        <View style={styles.logoGrid}>
                          <Animated.View
                            style={[styles.logoDot, styles.logoDot1, { transform: [{ scale: pulseAnim }] }]}
                          />
                          <Animated.View
                            style={[styles.logoDot, styles.logoDot2, { transform: [{ scale: breatheAnim }] }]}
                          />
                          <Animated.View
                            style={[styles.logoDot, styles.logoDot3, { transform: [{ scale: pulseAnim }] }]}
                          />
                          <Animated.View
                            style={[styles.logoDot, styles.logoDot4, { transform: [{ scale: breatheAnim }] }]}
                          />
                          <Animated.View
                            style={[styles.logoDot, styles.logoDot5, { transform: [{ scale: pulseAnim }] }]}
                          />
                        </View>
                      </View>
                    </LinearGradient>
                  </Animated.View>
                </View>

                <Animated.Text
                  style={[
                    styles.appName,
                    {
                      transform: [{ scale: logoScaleAnim }],
                    },
                  ]}
                >
                  Taskes
                </Animated.Text>
                <Text style={styles.tagline}>Begin your productivity journey</Text>
              </View>

              <View style={styles.welcomeSection}>
                <Text style={styles.title}>Join Taskes</Text>
                <Text style={styles.subtitle}>Create your account and unlock your potential</Text>
              </View>
            </View>

            {/* Enhanced Registration Form */}
            <Animated.View
              style={[
                styles.formContainer,
                {
                  transform: [{ scale: breatheAnim }],
                },
              ]}
            >
              {error && (
                <Animated.View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{error}</Text>
                </Animated.View>
              )}

              {/* Email Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <View style={styles.inputContainer}>
                  <View style={styles.inputIconContainer}>
                    <Mail size={20} color="#64748b" />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="your@email.com"
                    placeholderTextColor="#64748b"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                  />
                </View>
              </View>

              {/* Password Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.inputContainer}>
                  <View style={styles.inputIconContainer}>
                    <Lock size={20} color="#64748b" />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Create a strong password"
                    placeholderTextColor="#64748b"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoComplete="new-password"
                  />
                  <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={20} color="#64748b" /> : <Eye size={20} color="#64748b" />}
                  </TouchableOpacity>
                </View>

                {/* Enhanced Password Strength Indicator */}
                {password.length > 0 && (
                  <Animated.View
                    style={[
                      styles.passwordStrength,
                      {
                        transform: [{ scale: pulseAnim }],
                      },
                    ]}
                  >
                    <View style={styles.strengthBar}>
                      <Animated.View
                        style={[
                          styles.strengthFill,
                          {
                            width: `${(passwordStrength.strength / 3) * 100}%`,
                            backgroundColor: passwordStrength.color,
                          },
                        ]}
                      />
                    </View>
                    <Text style={[styles.strengthText, { color: passwordStrength.color }]}>
                      {passwordStrength.label}
                    </Text>
                  </Animated.View>
                )}
              </View>

              {/* Confirm Password Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <View style={styles.inputContainer}>
                  <View style={styles.inputIconContainer}>
                    <Lock size={20} color="#64748b" />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm your password"
                    placeholderTextColor="#64748b"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    autoComplete="new-password"
                  />
                  <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <EyeOff size={20} color="#64748b" /> : <Eye size={20} color="#64748b" />}
                  </TouchableOpacity>
                  {passwordsMatch && (
                    <Animated.View
                      style={[
                        styles.checkIcon,
                        {
                          transform: [{ scale: pulseAnim }],
                        },
                      ]}
                    >
                      <CheckCircle size={20} color="#10b981" />
                    </Animated.View>
                  )}
                </View>
              </View>

              {/* Enhanced Create Account Button */}
              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleRegister}
                disabled={loading}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={loading ? ["#475569", "#334155"] : ["#00d4ff", "#0099cc"]}
                  style={styles.buttonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  {loading ? (
                    <ActivityIndicator color="#ffffff" size="small" />
                  ) : (
                    <Text style={styles.buttonText}>Create Account</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              {/* Terms and Privacy */}
              <Text style={styles.termsText}>
                By creating an account, you agree to our <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </Animated.View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <Link href="/(auth)/login" asChild>
                <TouchableOpacity>
                  <Text style={styles.linkText}>Sign In</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  particleHeart: {
    position: "absolute",
  },
  waveBackground1: {
    position: "absolute",
    width: width,
    height: 250,
    top: height * 0.25,
  },
  waveBackground2: {
    position: "absolute",
    width: width,
    height: 200,
    top: height * 0.5,
  },
  wave: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  shimmer: {
    position: "absolute",
    top: 0,
    width: 120,
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
    top: height * 0.12,
    right: width * 0.08,
  },
  abstractShape2: {
    position: "absolute",
    top: height * 0.25,
    left: width * 0.05,
  },
  abstractShape3: {
    position: "absolute",
    top: height * 0.45,
    right: width * 0.12,
  },
  abstractShape4: {
    position: "absolute",
    top: height * 0.65,
    left: width * 0.08,
  },
  star1: {
    position: "absolute",
    top: height * 0.18,
    left: width * 0.15,
  },
  star2: {
    position: "absolute",
    top: height * 0.35,
    right: width * 0.25,
  },
  star3: {
    position: "absolute",
    top: height * 0.55,
    left: width * 0.2,
  },
  shapeGradient1: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.08,
  },
  shapeGradient2: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.06,
  },
  shapeGradient3: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.07,
  },
  shapeGradient4: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.09,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 50,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoWrapper: {
    shadowColor: "#10b981",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  logoGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  logoInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  logoGrid: {
    width: 28,
    height: 28,
    position: "relative",
  },
  logoDot: {
    position: "absolute",
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#ffffff",
  },
  logoDot1: { top: 0, left: 0 },
  logoDot2: { top: 0, right: 0 },
  logoDot3: { top: 10.5, left: 10.5 },
  logoDot4: { bottom: 0, left: 0 },
  logoDot5: { bottom: 0, right: 0 },
  appName: {
    fontSize: 36,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 8,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 14,
    color: "#64748b",
    fontStyle: "italic",
  },
  welcomeSection: {
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#94a3b8",
    textAlign: "center",
    lineHeight: 24,
  },
  formContainer: {
    backgroundColor: "#1e293b",
    borderRadius: 24,
    padding: 28,
    borderWidth: 1,
    borderColor: "#334155",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 40,
    elevation: 20,
    marginBottom: 24,
  },
  errorContainer: {
    backgroundColor: "#dc2626",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  errorText: {
    color: "#ffffff",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#e2e8f0",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  inputIconContainer: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "500",
  },
  eyeIcon: {
    padding: 4,
    marginLeft: 8,
  },
  checkIcon: {
    marginLeft: 8,
  },
  passwordStrength: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    backgroundColor: "#334155",
    borderRadius: 2,
    marginRight: 12,
    overflow: "hidden",
  },
  strengthFill: {
    height: "100%",
    borderRadius: 2,
  },
  strengthText: {
    fontSize: 12,
    fontWeight: "600",
  },
  button: {
    borderRadius: 16,
    marginTop: 12,
    shadowColor: "#00d4ff",
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
  buttonGradient: {
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  termsText: {
    fontSize: 12,
    color: "#64748b",
    textAlign: "center",
    marginTop: 20,
    lineHeight: 18,
  },
  termsLink: {
    color: "#10b981",
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 32,
  },
  footerText: {
    color: "#94a3b8",
    fontSize: 16,
  },
  linkText: {
    color: "#00d4ff",
    fontSize: 16,
    fontWeight: "700",
  },
})
