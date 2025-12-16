import { useEffect, useMemo, useState } from 'react'
import { Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'
import { LandingScreen } from './screens/LandingScreen'
import { LoginScreen } from './screens/LoginScreen'
import { StudentScreen } from './screens/StudentScreen'
import { ProfileScreen } from './screens/ProfileScreen'
import { ProfileDataScreen } from './screens/ProfileDataScreen'
import { ExerciseDetailScreen } from './screens/ExerciseDetailScreen'
import { UserProfile } from './types/profile'
import { Training } from './data/trainings'

declare module 'react-native' {
  interface ViewProps {
    className?: string
  }
}

type AppScreen = 'landing' | 'login' | 'student' | 'profile' | 'profileData' | 'trainingDetail'

function App() {
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') {
      return
    }

    if (document.getElementById('tailwind-cdn-script')) {
      return
    }

    const script = document.createElement('script')
    script.id = 'tailwind-cdn-script'
    script.src = 'https://cdn.tailwindcss.com'
    script.async = true
    document.head.appendChild(script)
  }, [])

  const [activeScreen, setActiveScreen] = useState<AppScreen>('landing')
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Allan Henrique Barbosa da Silva',
    age: 24,
    weight: '79 kg',
    matricula: '857083',
    professor: 'Ellen Fernanda da Silva Lima',
    email: 'allan.henrique@email.com',
    phone: '(11) 99999-0000',
    address: 'Av. Brasil, 1200 - Centro, São Paulo',
    photoUri: undefined,
  })
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null)

  const updateProfile = (changes: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...changes }))
  }

  const screen = useMemo(() => {
    switch (activeScreen) {
      case 'landing':
        return <LandingScreen onLogin={() => setActiveScreen('login')} />
      case 'login':
        return (
          <LoginScreen
            onBackHome={() => setActiveScreen('landing')}
            onLoginSuccess={() => setActiveScreen('student')}
          />
        )
      case 'student':
        return (
          <StudentScreen
            profile={profile}
            onBackHome={() => setActiveScreen('landing')}
            onOpenProfile={() => setActiveScreen('profile')}
            onViewTraining={(training) => {
              setSelectedTraining(training)
              setActiveScreen('trainingDetail')
            }}
          />
        )
      case 'profile':
        return (
          <ProfileScreen
            profile={profile}
            onBack={() => setActiveScreen('student')}
            onUpdateProfile={updateProfile}
            onNavigateToData={() => setActiveScreen('profileData')}
          />
        )
      case 'profileData':
        return (
          <ProfileDataScreen
            profile={profile}
            onBack={() => setActiveScreen('profile')}
            onSave={(data) => {
              updateProfile(data)
              setActiveScreen('profile')
            }}
          />
        )
      case 'trainingDetail':
        return selectedTraining ? (
          <ExerciseDetailScreen
            training={selectedTraining}
            profile={profile}
            onBack={() => setActiveScreen('student')}
            onOpenProfile={() => setActiveScreen('profile')}
          />
        ) : (
          <StudentScreen
            profile={profile}
            onBackHome={() => setActiveScreen('landing')}
            onOpenProfile={() => setActiveScreen('profile')}
            onViewTraining={(training) => {
              setSelectedTraining(training)
              setActiveScreen('trainingDetail')
            }}
          />
        )
      default:
        return null
    }
  }, [activeScreen, profile, selectedTraining])

  return (
    <SafeAreaView
      style={styles.root}
      className={
        Platform.OS === 'web' ? 'bg-gradient-to-br from-slate-900 via-indigo-950 to-black' : undefined
      }
    >
      <StatusBar barStyle="light-content" backgroundColor="#041228" />
      <View style={styles.screen}>{screen}</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#041228',
  },
  screen: {
    flex: 1,
  },
})

export default App
