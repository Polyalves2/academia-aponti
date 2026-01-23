import { useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { BrandWordmark } from '../components/BrandWordmark'
import backIcon from '../assets/icon_seta.png'

interface RecoverPasswordScreenProps {
  email: string
  onBack: () => void
  onComplete: () => void
}

export function RecoverPasswordScreen({ email, onBack, onComplete }: RecoverPasswordScreenProps) {
  const [emailValue, setEmailValue] = useState(email)
  const [password, setPassword] = useState('Forma@2024')
  const [confirmPassword, setConfirmPassword] = useState('Forma@2024')
  const [feedback, setFeedback] = useState('')

  const handleSubmit = () => {
    setFeedback('Senha salva.')
    setTimeout(onComplete, 600)
  }

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container} bounces keyboardShouldPersistTaps="handled">
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={onBack} activeOpacity={0.8} style={styles.backButton}>
            <Image source={backIcon} style={styles.backIcon} />
          </TouchableOpacity>
          <BrandWordmark size="lg" />
          <View style={styles.headerSpacer} />
        </View>

        <Text style={styles.title}>Recuperar senha</Text>
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>E-mail</Text>
          <TextInput
            style={styles.input}
            value={emailValue}
            placeholder="Digite seu e-mail"
            placeholderTextColor="#9097a6"
            onChangeText={setEmailValue}
            autoCapitalize="none"
          />

          <Text style={styles.sectionLabel}>Recuperar senha</Text>
          <TextInput
            style={styles.input}
            value={password}
            placeholder="Nova senha"
            placeholderTextColor="#9097a6"
            secureTextEntry
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            value={confirmPassword}
            placeholder="Confirme sua senha"
            placeholderTextColor="#9097a6"
            secureTextEntry
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85} onPress={handleSubmit}>
            <Text style={styles.primaryButtonText}>Atualizar senha</Text>
          </TouchableOpacity>

          {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#020617',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 36,
    paddingHorizontal: 28,
    gap: 20,
  },
  headerRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#083272',
    borderWidth: 1,
    borderColor: '#1a4a9a',
  },
  backIcon: {
    width: 18,
    height: 18,
    tintColor: '#000000',
    transform: [{ rotate: '180deg' }],
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  title: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 6,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  card: {
    width: '100%',
    backgroundColor: '#083272',
    borderRadius: 30,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 25,
    shadowOffset: { width: 0, height: 18 },
    overflow: 'visible',
  },
  sectionLabel: {
    width: '100%',
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 22,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1b1b1b',
    marginBottom: 14,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#000000',
    borderRadius: 28,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 6,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 18,
    letterSpacing: 0.6,
  },
  feedback: {
    color: '#7ff1d0',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 12,
  },
})
