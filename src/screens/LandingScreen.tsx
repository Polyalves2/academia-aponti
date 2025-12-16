import { useEffect, useRef } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'
import { BrandWordmark } from '../components/BrandWordmark'

interface LandingScreenProps {
  onLogin: () => void
}

export function LandingScreen({ onLogin }: LandingScreenProps) {
  const fadeAnim = useRef(new Animated.Value(1)).current

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 450,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          onLogin()
        }
      })
    }, 1000)

    return () => {
      clearTimeout(splashTimer)
      fadeAnim.stopAnimation()
    }
  }, [fadeAnim, onLogin])

  return (
    <Animated.View style={[styles.hero, { opacity: fadeAnim }]}>
      <View style={styles.overlay} />
      <View style={styles.content}>
        <BrandWordmark size="lg" />
        <Text style={styles.tagline}>Academia</Text>
        <Text style={styles.subtitle}>Carregando sua experiencia Forma</Text>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  hero: {
    flex: 1,
    position: 'relative',
    minHeight: 640,
    width: '100%',
    backgroundColor: '#041228',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7, 15, 30, 0.65)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
  },
  subtitle: {
    color: '#d6e4ff',
    fontSize: 16,
    letterSpacing: 0.4,
  },
  tagline: {
    color: '#66f0c9',
    fontWeight: '800',
    fontSize: 20,
    marginTop: 6,
    marginBottom: 16,
    letterSpacing: 2,
  },
})
