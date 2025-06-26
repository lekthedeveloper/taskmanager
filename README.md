# 📱 Taskes - Beautiful Task Management App

<div align="center">
  <img src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Taskes App Banner" width="100%" height="300" style="object-fit: cover; border-radius: 10px;">
  
  <h3>A modern, beautiful, and intuitive task management application built with React Native and Expo</h3>
  
  [![React Native](https://img.shields.io/badge/React%20Native-0.79.1-blue.svg)](https://reactnative.dev/)
  [![Expo](https://img.shields.io/badge/Expo-53.0.0-black.svg)](https://expo.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
  [![Supabase](https://img.shields.io/badge/Supabase-2.39.0-green.svg)](https://supabase.com/)
</div>

## ✨ Features

### 🎯 Core Functionality
- **Task Management**: Create, edit, delete, and mark tasks as complete
- **User Authentication**: Secure email/password authentication with Supabase
- **Real-time Sync**: Tasks sync across devices in real-time
- **Offline Support**: Works offline with automatic sync when connected

### 🎨 Beautiful Design
- **Modern UI**: Stunning gradients, animations, and micro-interactions
- **Dark Theme**: Beautiful dark theme with vibrant accent colors
- **Smooth Animations**: Fluid transitions and engaging visual feedback
- **Responsive Design**: Optimized for all screen sizes

### 🚀 Advanced Features
- **Progress Tracking**: Visual progress indicators and completion stats
- **Achievement System**: Unlock achievements as you complete tasks
- **Particle Effects**: Dynamic background animations
- **Shimmer Effects**: Loading states with beautiful shimmer animations

## 🛠️ Tech Stack

### Frontend
- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and build tools
- **TypeScript** - Type-safe JavaScript
- **Expo Router** - File-based navigation system
- **React Native Reanimated** - High-performance animations
- **Expo Linear Gradient** - Beautiful gradient effects

### Backend & Database
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Robust relational database
- **Row Level Security** - Secure data access
- **Real-time Subscriptions** - Live data updates

### UI & Styling
- **Lucide React Native** - Beautiful icon library
- **React Native Safe Area Context** - Safe area handling
- **Custom StyleSheet** - Optimized styling system

### Development Tools
- **Expo CLI** - Development and build tools
- **TypeScript** - Static type checking
- **ESLint** - Code linting and formatting

## 📱 Screenshots

<div align="center">
  <img src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Login Screen" width="200" style="margin: 10px; border-radius: 10px;">
  <img src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Tasks Screen" width="200" style="margin: 10px; border-radius: 10px;">
  <img src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Profile Screen" width="200" style="margin: 10px; border-radius: 10px;">
</div>

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Expo CLI** (`npm install -g @expo/cli`)
- **Expo Go** app on your mobile device (for testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/taskes-app.git
   cd taskes-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your Supabase credentials in the `.env` file:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase Database**
   
   Run the migration file in your Supabase SQL editor:
   ```sql
   -- Copy and paste the contents of supabase/migrations/20250624121338_fragrant_hat.sql
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 📱 Testing with Expo Go

### iOS
1. Install **Expo Go** from the App Store
2. Open the Camera app and scan the QR code from your terminal
3. The app will open in Expo Go

### Android
1. Install **Expo Go** from Google Play Store
2. Open Expo Go and scan the QR code from your terminal
3. The app will open in Expo Go

### Web
- Open your browser and go to `http://localhost:8081`

## 🏗️ Building for Production

### Expo Build Service (EAS)

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Configure EAS**
   ```bash
   eas build:configure
   ```

3. **Build for Android**
   ```bash
   eas build --platform android
   ```

4. **Build for iOS**
   ```bash
   eas build --platform ios
   ```

### Building APK Locally

1. **Eject to bare React Native** (if needed)
   ```bash
   npx expo eject
   ```

2. **Build Android APK**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```
   
   The APK will be generated at: `android/app/build/outputs/apk/release/app-release.apk`

## 🔄 Converting to Native React Native

If you want to convert this Expo project to a bare React Native project:

### Option 1: Expo Eject (Deprecated but still works)
```bash
npx expo eject
```

### Option 2: Create Development Build
```bash
npx expo install expo-dev-client
eas build --profile development
```

### Option 3: Manual Migration
1. Create a new React Native project:
   ```bash
   npx react-native init TaskesNative --template react-native-template-typescript
   ```

2. Copy source files:
   - Copy `app/` folder contents to `src/`
   - Copy `components/` folder
   - Copy `contexts/` folder
   - Copy `lib/` folder

3. Install dependencies:
   ```bash
   npm install @react-navigation/native @react-navigation/bottom-tabs
   npm install react-native-screens react-native-safe-area-context
   npm install @supabase/supabase-js
   npm install react-native-linear-gradient
   npm install lucide-react-native
   ```

4. Configure navigation:
   - Replace Expo Router with React Navigation
   - Set up stack and tab navigators

5. Update imports and configurations as needed

## 📁 Project Structure

```
taskes-app/
├── app/                          # App screens and navigation
│   ├── (auth)/                   # Authentication screens
│   │   ├── login.tsx            # Login screen
│   │   └── register.tsx         # Registration screen
│   ├── (tabs)/                  # Main app tabs
│   │   ├── index.tsx            # Tasks screen
│   │   ├── profile.tsx          # Profile screen
│   │   ├── help.tsx             # Help screen
│   │   ├── notifications.tsx    # Notifications screen
│   │   ├── achievements.tsx     # Achievements screen
│   │   └── upcoming-features.tsx # Upcoming features
│   ├── screens/                 # Additional screens
│   └── _layout.tsx              # Root layout
├── components/                   # Reusable components
│   ├── TaskCard.tsx             # Task card component
│   ├── CreateTaskModal.tsx      # Create task modal
│   └── EditTaskModal.tsx        # Edit task modal
├── contexts/                     # React contexts
│   └── AuthContext.tsx          # Authentication context
├── lib/                         # Utilities and configurations
│   └── supabase.ts              # Supabase client setup
├── hooks/                       # Custom hooks
│   └── useFrameworkReady.ts     # Framework initialization hook
├── supabase/                    # Database migrations
│   └── migrations/              # SQL migration files
└── assets/                      # Static assets
    └── images/                  # App images and icons
```

## 🎨 Design System

### Color Palette
- **Primary**: `#00d4ff` (Cyan)
- **Secondary**: `#8b5cf6` (Purple)
- **Success**: `#10b981` (Green)
- **Warning**: `#f59e0b` (Amber)
- **Error**: `#ef4444` (Red)
- **Background**: `#0f0f23` to `#1a1a2e` (Dark gradient)

### Typography
- **Headers**: Inter Bold (700-800 weight)
- **Body**: Inter Regular (400-500 weight)
- **Captions**: Inter Medium (500-600 weight)

### Animations
- **Entrance**: Fade + slide animations
- **Interactions**: Scale and pulse effects
- **Background**: Particle systems and shimmer effects

## 🔧 Configuration

### Environment Variables
```env
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### App Configuration (app.json)
```json
{
  "expo": {
    "name": "Taskes",
    "slug": "taskes-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "platforms": ["ios", "android", "web"],
    "userInterfaceStyle": "automatic"
  }
}
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful commit messages
- Add comments for complex logic
- Test on both iOS and Android
- Ensure responsive design

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Expo Team** - For the amazing development platform
- **Supabase Team** - For the powerful backend-as-a-service
- **React Native Community** - For the excellent ecosystem
- **Lucide Icons** - For the beautiful icon library
- **Pexels** - For the stunning stock photos

## 📞 Support

If you have any questions or need help:

- 📧 Email: support@taskes-app.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/taskes-app/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/taskes-app/discussions)

---

<div align="center">
  <p>Made with ❤️ by the Taskes Team</p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>