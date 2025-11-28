import { Image, StyleSheet, View } from 'react-native'
import logoImg from '../assets/logo_cut.png'

interface BrandWordmarkProps {
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: { width: 50, height: 22.5 },
  md: { width: 100, height: 45 },
  lg: { width: 150, height: 67.5 },
}

export function BrandWordmark({ size = 'md' }: BrandWordmarkProps) {
  const { width, height } = sizeMap[size]

  return (
    <View style={styles.wrapper}>
      <Image source={logoImg} style={[styles.logo, { width, height }]} resizeMode="contain" />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 4,
  },
  logo: {
    width: 300,
    height: 135,
  },
})
