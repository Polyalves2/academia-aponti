import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BrandWordmark } from '../components/BrandWordmark'
import backIcon from '../assets/icon_seta.png'

interface ProfessorScreenProps {
  onBackHome: () => void
  onOpenProfile: () => void
  onRegisterPoint: () => void
  onOpenStudents: () => void
}

export function ProfessorScreen({
  onBackHome,
  onOpenProfile,
  onRegisterPoint,
  onOpenStudents,
}: ProfessorScreenProps) {
  return (
    <View style={styles.screen}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={onBackHome} style={styles.iconButton}>
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.logoWrap}>
          <BrandWordmark size="lg" />
        </View>
        <View style={styles.closeSpacer} />
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.dropdownField} activeOpacity={0.8}>
          <Text style={styles.dropdownValue}>Professor</Text>
          <Text style={styles.dropdownIcon}>v</Text>
        </TouchableOpacity>

        <View style={styles.buttonStack}>
          <TouchableOpacity style={styles.actionButton} onPress={onOpenProfile}>
            <Text style={styles.actionButtonText}>Meu Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={onRegisterPoint}>
            <Text style={styles.actionButtonText}>Registro de Ponto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={onOpenStudents}>
            <Text style={styles.actionButtonText}>Treino de Alunos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#1c2f77',
    paddingHorizontal: 24,
    paddingTop: 18,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButton: {
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
  logoWrap: {
    flex: 1,
    alignItems: 'center',
  },
  closeSpacer: {
    width: 40,
    height: 40,
  },
  content: {
    marginTop: 24,
    alignItems: 'center',
  },
  dropdownField: {
    width: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  dropdownValue: {
    color: '#3a3a3a',
    fontWeight: '700',
  },
  dropdownIcon: {
    color: '#3a3a3a',
    fontWeight: '800',
  },
  buttonStack: {
    width: '80%',
    gap: 16,
  },
  actionButton: {
    backgroundColor: '#1d2230',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
  },
  actionButtonText: {
    color: '#ffffff',
    fontWeight: '800',
  },
})
