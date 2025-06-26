import { Tabs } from 'expo-router';
import { View } from 'react-native';

// Custom 2D Task Icon Component with modern design
const TaskIcon = ({ size = 24, color = '#64748b', focused = false }) => (
  <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    <View
      style={{
        width: size * 0.85,
        height: size * 0.85,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: focused ? '#00d4ff' : color,
        backgroundColor: focused ? 'rgba(0, 212, 255, 0.1)' : 'transparent',
        position: 'relative',
        shadowColor: focused ? '#00d4ff' : 'transparent',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: focused ? 4 : 0,
      }}
    >
      {/* Checkmark for focused state */}
      {focused && (
        <View
          style={{
            position: 'absolute',
            top: '25%',
            left: '25%',
            width: size * 0.15,
            height: size * 0.25,
            borderRightWidth: 2.5,
            borderBottomWidth: 2.5,
            borderColor: '#00d4ff',
            transform: [{ rotate: '45deg' }],
          }}
        />
      )}
      {/* Task lines for unfocused state */}
      {!focused && (
        <>
          <View
            style={{
              position: 'absolute',
              top: '20%',
              left: '15%',
              width: '70%',
              height: 2,
              backgroundColor: color,
              borderRadius: 1,
            }}
          />
          <View
            style={{
              position: 'absolute',
              top: '45%',
              left: '15%',
              width: '55%',
              height: 2,
              backgroundColor: color,
              borderRadius: 1,
            }}
          />
          <View
            style={{
              position: 'absolute',
              top: '70%',
              left: '15%',
              width: '40%',
              height: 2,
              backgroundColor: color,
              borderRadius: 1,
            }}
          />
        </>
      )}
    </View>
  </View>
);

// Custom 2D Profile Icon Component with modern design
const ProfileIcon = ({ size = 24, color = '#64748b', focused = false }) => (
  <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ position: 'relative' }}>
      {/* Head circle with glow effect when focused */}
      <View
        style={{
          width: size * 0.4,
          height: size * 0.4,
          borderRadius: size * 0.2,
          borderWidth: 2.5,
          borderColor: focused ? '#00d4ff' : color,
          backgroundColor: focused ? 'rgba(0, 212, 255, 0.1)' : 'transparent',
          marginBottom: size * 0.08,
          shadowColor: focused ? '#00d4ff' : 'transparent',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.4,
          shadowRadius: 6,
          elevation: focused ? 4 : 0,
        }}
      />
      {/* Body/shoulders with modern styling */}
      <View
        style={{
          width: size * 0.7,
          height: size * 0.45,
          borderTopLeftRadius: size * 0.35,
          borderTopRightRadius: size * 0.35,
          borderWidth: 2.5,
          borderColor: focused ? '#00d4ff' : color,
          backgroundColor: focused ? 'rgba(0, 212, 255, 0.1)' : 'transparent',
          borderBottomWidth: 0,
          shadowColor: focused ? '#00d4ff' : 'transparent',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.4,
          shadowRadius: 6,
          elevation: focused ? 4 : 0,
        }}
      />
    </View>
  </View>
);

// Custom 2D Help Icon Component with modern design
const HelpIcon = ({ size = 24, color = '#64748b', focused = false }) => (
  <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    {/* Question mark circle with glow effect */}
    <View
      style={{
        width: size * 0.85,
        height: size * 0.85,
        borderRadius: size * 0.425,
        borderWidth: 2.5,
        borderColor: focused ? '#00d4ff' : color,
        backgroundColor: focused ? 'rgba(0, 212, 255, 0.1)' : 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        shadowColor: focused ? '#00d4ff' : 'transparent',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: focused ? 4 : 0,
      }}
    >
      {/* Question mark with improved styling */}
      <View style={{ alignItems: 'center' }}>
        {/* Top curve of question mark */}
        <View
          style={{
            width: size * 0.28,
            height: size * 0.28,
            borderTopWidth: 2.5,
            borderRightWidth: 2.5,
            borderColor: focused ? '#00d4ff' : color,
            borderTopRightRadius: size * 0.14,
            marginBottom: size * 0.06,
          }}
        />
        {/* Vertical line */}
        <View
          style={{
            width: 2.5,
            height: size * 0.16,
            backgroundColor: focused ? '#00d4ff' : color,
            marginBottom: size * 0.08,
            borderRadius: 1.25,
          }}
        />
        {/* Dot */}
        <View
          style={{
            width: size * 0.1,
            height: size * 0.1,
            borderRadius: size * 0.05,
            backgroundColor: focused ? '#00d4ff' : color,
          }}
        />
      </View>
    </View>
  </View>
);

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0f172a',
          borderTopWidth: 1,
          borderTopColor: '#334155',
          paddingTop: 16,
          paddingBottom: 16,
          height: 85,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 12,
        },
        tabBarActiveTintColor: '#00d4ff',
        tabBarInactiveTintColor: '#64748b',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
          marginTop: 6,
          textShadowColor: 'rgba(0, 212, 255, 0.3)',
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 2,
        },
        tabBarItemStyle: {
          paddingVertical: 6,
          borderRadius: 12,
          marginHorizontal: 8,
          flex: 1,
        },
      }}
    >
      {/* Main visible tabs */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ size, color, focused }) => (
            <TaskIcon size={size} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color, focused }) => (
            <ProfileIcon size={size} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="help"
        options={{
          title: 'Help',
          tabBarIcon: ({ size, color, focused }) => (
            <HelpIcon size={size} color={color} focused={focused} />
          ),
        }}
      />
      
      {/* Hidden screens - accessible via navigation but not shown in tab bar */}
      <Tabs.Screen
        name="notifications"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="upcoming-features"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="achievements"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="live-chat"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="email-support"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}