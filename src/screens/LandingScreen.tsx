import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import heroImageSource from '../assets/back.png'

interface LandingScreenProps {
  onLogin: () => void
  onRegister: () => void
}

export function LandingScreen({ onLogin, onRegister }: LandingScreenProps) {
  return (
    <ImageBackground source={heroImageSource} style={styles.hero} imageStyle={styles.heroImage}>
      <View style={styles.content}>

        <TouchableOpacity style={styles.primary} onPress={onLogin}>
          <Text style={styles.primaryText}>ENTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondary} onPress={onRegister}>
          <Text style={styles.secondaryText}>
            Não tem conta? <Text style={styles.secondaryLink}>Crie agora</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  hero: {
    flex: 1,
    position: 'relative',
    justifyContent: 'flex-end',
    minHeight: 640,
    width: '100%',
  },
  heroImage: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    alignSelf: 'stretch',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7, 15, 30, 0.65)',
  },
  content: {
    padding: 28,
    paddingBottom: 44,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  tag: {
    color: '#00e49a',
    fontWeight: '800',
    letterSpacing: 2,
    marginLeft: 12,
  },
  title: {
    color: '#f4f8ff',
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 34,
    marginBottom: 8,
  },
  subtitle: {
    color: '#cdd6e7',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 18,
  },
  highlightRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 28,
  },
  highlightChip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: 'rgba(0, 228, 154, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(0, 228, 154, 0.2)',
    marginRight: 10,
    marginBottom: 10,
  },
  highlightText: {
    color: '#bfffe4',
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 0.4,
  },
  primary: {
    backgroundColor: '#101010',
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 16 },
    borderWidth: 2,
    borderColor: '#050505',
    marginBottom: 10,
  },
  primaryText: {
    color: '#ffffff',
    fontWeight: '900',
    letterSpacing: 1.4,
    fontSize: 16,
  },
  secondary: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  secondaryText: {
    color: '#cdd6e7',
    fontWeight: '600',
  },
  secondaryLink: {
    color: '#00d4ff',
  },
})
