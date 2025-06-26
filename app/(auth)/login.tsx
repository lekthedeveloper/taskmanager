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
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Link, router } from "expo-router"
import { useAuth } from "@/contexts/AuthContext"
import { Mail, Lock, Eye, EyeOff, CheckCircle, Target, Zap, Star } from "lucide-react-native"

const { width, height } = Dimensions.get("window")

// Particle component
const Particle = ({ delay, duration, startX, startY, endX, endY, size, color, opacity }) => {
  const animValue = useRef(new Animated.Value(0)).current
  const fadeValue = useRef(new Animated.Value(0)).current

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
        animValue.setValue(0)
        fadeValue.setValue(0)
        setTimeout(animate, Math.random() * 3000 + 2000)
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
          transform: [
            { translateX },
            { translateY },
          ],
        },
      ]}
    />
  )
}

export default function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const { signIn } = useAuth()

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current
  const scaleAnim = useRef(new Animated.Value(0.8)).current
  const rotateAnim = useRef(new Animated.Value(0)).current
  const pulseAnim = useRef(new Animated.Value(1)).current
  const floatAnim1 = useRef(new Animated.Value(0)).current
  const floatAnim2 = useRef(new Animated.Value(0)).current
  const floatAnim3 = useRef(new Animated.Value(0)).current
  const logoRotateAnim = useRef(new Animated.Value(0)).current
  const logoScaleAnim = useRef(new Animated.Value(1)).current
  const shimmerAnim = useRef(new Animated.Value(0)).current
  const waveAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    // Initial entrance animation
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
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
    ]).start()

    // Continuous animations
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 20000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start()

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
      ])
    ).start()

    Animated.loop(
      Animated.timing(logoRotateAnim, {
        toValue: 1,
        duration: 15000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start()

    Animated.loop(
      Animated.sequence([
        Animated.timing(logoScaleAnim, {
          toValue: 1.1,
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(logoScaleAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start()

    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start()

    Animated.loop(
      Animated.timing(waveAnim, {
        toValue: 1,
        duration: 4000,
        easing: Easing.inOut(Easing.sin),
        useNativeDriver: true,
      })
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
        ])
      ).start()
    }

    createFloatingAnimation(floatAnim1, 0)
    createFloatingAnimation(floatAnim2, 1000)
    createFloatingAnimation(floatAnim3, 2000)
  }, [])

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    setLoading(true)
    setError(null)

    const { error } = await signIn(email, password)

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
    outputRange: ['0deg', '360deg'],
  })

  const logoRotateInterpolate = logoRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  const shimmerTranslate = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  })

  const waveTranslate = waveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
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
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    delay: Math.random() * 5000,
    duration: 3000 + Math.random() * 4000,
    startX: Math.random() * width,
    startY: height + 50,
    endX: Math.random() * width,
    endY: -50,
    size: 2 + Math.random() * 4,
    color: ['#00d4ff', '#0099cc', '#8b5cf6', '#10b981'][Math.floor(Math.random() * 4)],
    opacity: 0.3 + Math.random() * 0.4,
  }))

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#0f0f23", "#1a1a2e", "#16213e"]} style={styles.backgroundGradient} />
      
      {/* Particle System */}
      <View style={styles.particleContainer}>
        {particles.map((particle) => (
          <Particle key={particle.id} {...particle} />
        ))}
      </View>

      {/* Animated Wave Background */}
      <Animated.View 
        style={[
          styles.waveBackground,
          {
            transform: [{ translateY: waveTranslate }]
          }
        ]}
      >
        <LinearGradient 
          colors={["transparent", "rgba(0, 212, 255, 0.05)", "transparent"]} 
          style={styles.wave}
        />
      </Animated.View>

      {/* Shimmer Effect */}
      <Animated.View 
        style={[
          styles.shimmer,
          {
            transform: [{ translateX: shimmerTranslate }]
          }
        ]}
      >
        <LinearGradient 
          colors={["transparent", "rgba(255, 255, 255, 0.1)", "transparent"]} 
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
              transform: [
                { translateY: float1Y },
                { rotate: rotateInterpolate },
                { scale: pulseAnim }
              ]
            }
          ]}
        >
          <LinearGradient colors={["#00d4ff", "#0099cc"]} style={styles.shapeGradient1}>
            <CheckCircle size={24} color="rgba(255,255,255,0.3)" />
          </LinearGradient>
        </Animated.View>

        <Animated.View 
          style={[
            styles.abstractShape2,
            {
              transform: [{ translateY: float2Y }]
            }
          ]}
        >
          <LinearGradient colors={["#8b5cf6", "#a855f7"]} style={styles.shapeGradient2}>
            <Target size={20} color="rgba(255,255,255,0.4)" />
          </LinearGradient>
        </Animated.View>

        <Animated.View 
          style={[
            styles.abstractShape3,
            {
              transform: [{ translateY: float3Y }]
            }
          ]}
        >
          <LinearGradient colors={["#10b981", "#059669"]} style={styles.shapeGradient3}>
            <Zap size={18} color="rgba(255,255,255,0.5)" />
          </LinearGradient>
        </Animated.View>

        {/* Additional animated stars */}
        <Animated.View 
          style={[
            styles.star1,
            {
              transform: [
                { rotate: logoRotateInterpolate },
                { scale: logoScaleAnim }
              ]
            }
          ]}
        >
          <Star size={12} color="rgba(0, 212, 255, 0.3)" />
        </Animated.View>

        <Animated.View 
          style={[
            styles.star2,
            {
              transform: [
                { rotate: rotateInterpolate },
                { scale: pulseAnim }
              ]
            }
          ]}
        >
          <Star size={8} color="rgba(139, 92, 246, 0.4)" />
        </Animated.View>

        <Animated.View 
          style={[
            styles.star3,
            {
              transform: [
                { rotate: logoRotateInterpolate },
              ]
            }
          ]}
        >
          <Star size={10} color="rgba(16, 185, 129, 0.3)" />
        </Animated.View>
      </View>

      <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <Animated.View 
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim }
              ]
            }
          ]}
        >
          {/* Header Section with Enhanced Logo */}
          <View style={styles.header}>
            <View style={styles.logoSection}>
              <View style={styles.logoContainer}>
                <Animated.View
                  style={[
                    styles.logoWrapper,
                    {
                      transform: [
                        { rotate: logoRotateInterpolate },
                        { scale: logoScaleAnim }
                      ]
                    }
                  ]}
                >
                  <LinearGradient colors={["#00d4ff", "#0099cc"]} style={styles.logoGradient}>
                    <View style={styles.logoInner}>
                      <View style={styles.logoGrid}>
                        <Animated.View style={[styles.logoDot, styles.logoDot1, { transform: [{ scale: pulseAnim }] }]} />
                        <Animated.View style={[styles.logoDot, styles.logoDot2, { transform: [{ scale: pulseAnim }] }]} />
                        <Animated.View style={[styles.logoDot, styles.logoDot3, { transform: [{ scale: pulseAnim }] }]} />
                        <Animated.View style={[styles.logoDot, styles.logoDot4, { transform: [{ scale: pulseAnim }] }]} />
                      </View>
                    </View>
                  </LinearGradient>
                </Animated.View>
              </View>
              
              <Animated.Text 
                style={[
                  styles.appName,
                  {
                    transform: [{ scale: logoScaleAnim }]
                  }
                ]}
              >
                Taskes
              </Animated.Text>
              <Text style={styles.tagline}>Where productivity meets purpose</Text>
            </View>

            <View style={styles.welcomeSection}>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Continue your journey of achievement</Text>
            </View>
          </View>

          {/* Enhanced Login Form */}
          <Animated.View 
            style={[
              styles.formContainer,
              {
                transform: [{ scale: pulseAnim }]
              }
            ]}
          >
            {error && (
              <Animated.View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </Animated.View>
            )}

            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
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
                  placeholder="Enter your password"
                  placeholderTextColor="#64748b"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete="password"
                />
                <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={20} color="#64748b" /> : <Eye size={20} color="#64748b" />}
                </TouchableOpacity>
              </View>
            </View>

            {/* Enhanced Sign In Button */}
            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleLogin}
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
                  <Text style={styles.buttonText}>Sign In</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.optionsContainer}>
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>New to Taskes? </Text>
            <Link href="/(auth)/register" asChild>
              <TouchableOpacity>
                <Text style={styles.linkText}>Create Account</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </Animated.View>
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
  waveBackground: {
    position: "absolute",
    width: width,
    height: 200,
    top: height * 0.3,
  },
  wave: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
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
    top: height * 0.3,
    left: width * 0.05,
  },
  abstractShape3: {
    position: "absolute",
    top: height * 0.6,
    right: width * 0.15,
  },
  star1: {
    position: "absolute",
    top: height * 0.2,
    left: width * 0.2,
  },
  star2: {
    position: "absolute",
    top: height * 0.4,
    right: width * 0.3,
  },
  star3: {
    position: "absolute",
    top: height * 0.7,
    left: width * 0.1,
  },
  shapeGradient1: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.1,
  },
  shapeGradient2: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.08,
  },
  shapeGradient3: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.06,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoWrapper: {
    shadowColor: "#00d4ff",
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: "center",
    alignItems: "center",
  },
  logoGrid: {
    width: 24,
    height: 24,
    position: "relative",
  },
  logoDot: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ffffff",
  },
  logoDot1: { top: 0, left: 0 },
  logoDot2: { top: 0, right: 0 },
  logoDot3: { bottom: 0, left: 0 },
  logoDot4: { bottom: 0, right: 0 },
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
    marginBottom: 32,
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
  optionsContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  forgotPassword: {
    padding: 8,
  },
  forgotPasswordText: {
    color: "#00d4ff",
    fontSize: 14,
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