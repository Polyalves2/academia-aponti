import { useMemo, useState } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'
import { LandingScreen } from './screens/LandingScreen'
import { LoginScreen } from './screens/LoginScreen'
import { StudentScreen } from './screens/StudentScreen'

type AppScreen = 'landing' | 'login' | 'student'

function App() {
  const [activeScreen, setActiveScreen] = useState<AppScreen>('landing')

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
        return <StudentScreen onBackHome={() => setActiveScreen('landing')} />
      default:
        return null
    }
  }, [activeScreen])

  return (
    <SafeAreaView style={styles.root}>
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
