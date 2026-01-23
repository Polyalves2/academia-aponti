import { useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { BrandWordmark } from '../components/BrandWordmark'
import googleIconSource from '../assets/icon_google.png'

interface RegisterScreenProps {
  onNavigateToLogin: () => void
  onBackHome: () => void
  onRegisterSuccess: () => void
}

const textInputProps = {
  placeholderTextColor: '#c6cedf',
}

export function RegisterScreen({ onNavigateToLogin, onBackHome, onRegisterSuccess }: RegisterScreenProps) {
  const [matricula, setMatricula] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [feedback, setFeedback] = useState('')

  const handleRegister = () => {
    if (!matricula.trim() || !password.trim() || !confirmPassword.trim()) {
      setFeedback('Preencha todos os campos com valores fictícios.')
      return
    }

    if (password !== confirmPassword) {
      setFeedback('As senhas não conferem.')
      return
    }

    setFeedback(`Cadastro mockado criado para matrícula ${matricula}.`)
    setTimeout(onRegisterSuccess, 500)
  }

  return (
    <ScrollView contentContainerStyle={styles.container} bounces keyboardShouldPersistTaps="handled">
      <TouchableOpacity onPress={onBackHome} activeOpacity={0.8}>
        <BrandWordmark size="lg" />
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.label}>Matrícula</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua matrícula"
          value={matricula}
          onChangeText={setMatricula}
          {...textInputProps}
        />

        <Text style={[styles.label, styles.labelSpacing]}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          {...textInputProps}
        />
        <TextInput
          style={[styles.input, styles.inputSpacing]}
          placeholder="Digite novamente sua senha"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          {...textInputProps}
        />

        <TouchableOpacity style={styles.primary} onPress={handleRegister}>
          <Text style={styles.primaryText}>CADASTRAR</Text>
        </TouchableOpacity>

        {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.divider} />
        </View>

        <TouchableOpacity style={styles.google}>
          <Image source={googleIconSource} style={styles.googleImage} />
          <Text style={styles.googleText}>Cadastre-se com o Google</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          Já possui uma conta?{' '}
          <Text style={styles.footerLink} onPress={onNavigateToLogin}>
            clique aqui!
          </Text>
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#063170',
    paddingVertical: 28,
    paddingHorizontal: 36,
    alignItems: 'center',
    gap: 24,
  },
  card: {
    width: '100%',
  },
  label: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 22,
    marginBottom: 8,
  },
  labelSpacing: {
    marginTop: 18,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    paddingVertical: 14,
    paddingHorizontal: 18,
    fontSize: 16,
    color: '#1b1b1b',
  },
  inputSpacing: {
    marginTop: 12,
  },
  primary: {
    backgroundColor: '#000000',
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  primaryText: {
    color: '#ffffff',
    fontWeight: '900',
    letterSpacing: 1,
    fontSize: 16,
  },
  feedback: {
    color: '#9debd1',
    fontWeight: '600',
    marginTop: 10,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#1f4377',
  },
  dividerText: {
    color: '#8da6c4',
    marginHorizontal: 12,
    fontWeight: '700',
  },
  google: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    paddingVertical: 14,
    marginBottom: 18,
  },
  googleImage: {
    width: 26,
    height: 26,
    marginRight: 12,
  },
  googleText: {
    color: '#0f2a45',
    fontWeight: '700',
  },
  footer: {
    color: '#cdd6e7',
    textAlign: 'center',
  },
  footerLink: {
    color: '#00e49a',
    fontWeight: '800',
  },
})
