import { useEffect, useState } from 'react'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { BrandWordmark } from '../components/BrandWordmark'
import googleIconSource from '../assets/icon_google.png'

type Role = 'Aluno' | 'Professor' | 'Administrador'

interface LoginScreenProps {
  onBackHome: () => void
  onLoginSuccess: () => void
}

const roleCredentials: Record<Role, { label: string; idValue: string; password: string }> = {
  Aluno: { label: 'Matricula', idValue: '857083', password: 'forma@demo' },
  Professor: { label: 'Matricula', idValue: 'PRF-1188', password: 'forma@demo' },
  Administrador: { label: 'Codigo', idValue: 'ADM-0001', password: 'forma@demo' },
}

const roles: Role[] = ['Aluno', 'Professor', 'Administrador']
const tailwindGradientClass =
  'min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-black overflow-y-auto'

function useTailwindCdn() {
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
}

export function LoginScreen({ onBackHome, onLoginSuccess }: LoginScreenProps) {
  useTailwindCdn()
  const [selectedRole, setSelectedRole] = useState<Role>('Aluno')
  const [isPickerOpen, setIsPickerOpen] = useState(false)
  const [feedback, setFeedback] = useState('')

  const togglePicker = () => setIsPickerOpen((prev) => !prev)
  const closePicker = () => setIsPickerOpen(false)

  const handleSelectRole = (role: Role) => {
    setSelectedRole(role)
    closePicker()
  }

  const handleLogin = () => {
    setFeedback(`Acesso liberado para o perfil ${selectedRole}.`)
    setTimeout(onLoginSuccess, 500)
  }

  const credentials = roleCredentials[selectedRole]

  const content = (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container} bounces={false}>
        <TouchableOpacity onPress={onBackHome} activeOpacity={0.8}>
          <BrandWordmark size="lg" />
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.heading}>Faça seu login</Text>

          <View style={[styles.formGroup, styles.dropdownGroup]}>
            <Text style={styles.label}>Perfil</Text>
            <View style={styles.dropdownWrapper}>
              <TouchableOpacity style={styles.dropdownField} onPress={togglePicker} activeOpacity={0.7}>
                <Text style={styles.dropdownValue}>{selectedRole}</Text>
                <Text style={styles.dropdownIcon}>{isPickerOpen ? '^' : 'v'}</Text>
              </TouchableOpacity>

              {isPickerOpen && (
                <View style={styles.dropdownList}>
                  {roles.map((role) => {
                    const active = role === selectedRole
                    return (
                      <TouchableOpacity
                        key={role}
                        style={[styles.dropdownOption, active && styles.dropdownOptionActive]}
                        onPress={() => handleSelectRole(role)}
                      >
                        <Text style={[styles.dropdownOptionText, active && styles.dropdownOptionTextActive]}>
                          {role}
                        </Text>
                      </TouchableOpacity>
                    )
                  })}
                </View>
              )}
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>{credentials.label}</Text>
            <TextInput style={styles.input} editable={false} value={credentials.idValue} />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Senha</Text>
            <TextInput style={styles.input} secureTextEntry editable={false} value={credentials.password} />
          </View>

          <View style={styles.recoveryRow}>
            <Text style={styles.recoveryText}>Recuperar senha</Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.recoveryLink}>clique aqui</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.primary} activeOpacity={0.8} onPress={handleLogin}>
            <Text style={styles.primaryText}>Acessar</Text>
          </TouchableOpacity>

          {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.divider} />
          </View>

          <TouchableOpacity style={styles.google} activeOpacity={0.8}>
            <Image source={googleIconSource} style={styles.googleImage} />
            <Text style={styles.googleText}>Cadastre-se com o Google</Text>
          </TouchableOpacity>

          <Text style={styles.footer}>
            Ja possui uma conta?{' '}
            <Text style={styles.footerLink} onPress={() => {}}>
              clique aqui!
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  )

  if (Platform.OS === 'web') {
    return <div className={tailwindGradientClass}>{content}</div>
  }

  return content
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Platform.select({ web: 'transparent', default: '#020617' }),
  },
  container: {
    flexGrow: 1,
    paddingVertical: 36,
    paddingHorizontal: 28,
    alignItems: 'center',
    gap: 24,
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
  heading: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 4,
  },
  description: {
    color: '#9ac6ff',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  dropdownGroup: {
    zIndex: 40,
  },
  label: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 20,
    marginBottom: 10,
  },
  dropdownWrapper: {
    position: 'relative',
    zIndex: 30,
  },
  dropdownField: {
    backgroundColor: '#fefefe',
    borderRadius: 22,
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownValue: {
    color: '#13213f',
    fontSize: 16,
    fontWeight: '600',
  },
  dropdownIcon: {
    color: '#13213f',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 12,
  },
  dropdownList: {
    position: 'absolute',
    top: '102%',
    left: 0,
    right: 0,
    backgroundColor: '#fefefe',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#d6dbe9',
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 12,
    zIndex: 40,
  },
  dropdownOption: {
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  dropdownOptionActive: {
    backgroundColor: '#cce3ff',
  },
  dropdownOptionText: {
    color: '#0c1833',
    fontSize: 16,
    fontWeight: '700',
  },
  dropdownOptionTextActive: {
    color: '#04122a',
  },
  input: {
    backgroundColor: '#fefefe',
    borderRadius: 22,
    paddingVertical: 14,
    paddingHorizontal: 18,
    fontSize: 16,
    color: '#1b1b1b',
  },
  recoveryRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 18,
  },
  recoveryText: {
    color: '#9ac6ff',
    fontWeight: '600',
  },
  recoveryLink: {
    marginLeft: 4,
    color: '#49d9ff',
    fontWeight: '800',
  },
  primary: {
    backgroundColor: '#000',
    borderRadius: 28,
    paddingVertical: 15,
    alignItems: 'center',
  },
  primaryText: {
    color: '#ffffff',
    fontWeight: '900',
    fontSize: 18,
    letterSpacing: 1,
  },
  feedback: {
    color: '#7ff1d0',
    fontWeight: '700',
    marginTop: 12,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#0d2051',
  },
  dividerText: {
    color: '#84a2d9',
    marginHorizontal: 12,
    fontWeight: '700',
  },
  google: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 26,
    paddingVertical: 12,
    marginBottom: 18,
  },
  googleImage: {
    width: 24,
    height: 24,
    marginRight: 10,
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
