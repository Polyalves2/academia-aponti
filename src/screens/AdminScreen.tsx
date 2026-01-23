import { useState } from 'react'
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BrandWordmark } from '../components/BrandWordmark'
import backIcon from '../assets/icon_seta.png'

type AdminTarget = 'Alunos' | 'Professores'

interface AdminScreenProps {
  onBackHome: () => void
  onRegisterStudent: () => void
  onRegisterProfessor: () => void
  onOpenTotal: () => void
  onOpenFrequency: () => void
  onOpenProfessorTotal: () => void
}

export function AdminScreen({
  onBackHome,
  onRegisterStudent,
  onRegisterProfessor,
  onOpenTotal,
  onOpenFrequency,
  onOpenProfessorTotal,
}: AdminScreenProps) {
  const [target, setTarget] = useState<AdminTarget>('Alunos')
  const [isPickerOpen, setIsPickerOpen] = useState(false)

  const togglePicker = () => setIsPickerOpen((prev) => !prev)
  const closePicker = () => setIsPickerOpen(false)

  const handleSelectTarget = (option: AdminTarget) => {
    setTarget(option)
    closePicker()
  }

  const totalLabel = target === 'Alunos' ? 'Total de alunos' : 'Total de professores'

  const handleRegister = () => {
    if (target === 'Alunos') {
      onRegisterStudent()
      return
    }
    onRegisterProfessor()
  }

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container} bounces keyboardShouldPersistTaps="handled">
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={onBackHome} activeOpacity={0.8} style={styles.backButton}>
            <Image source={backIcon} style={styles.backIcon} />
          </TouchableOpacity>
          <BrandWordmark size="lg" />
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.card}>
          <View style={styles.dropdownWrapper}>
            <TouchableOpacity style={styles.dropdownField} onPress={togglePicker} activeOpacity={0.7}>
              <Text style={styles.dropdownValue}>{target}</Text>
              <Text style={styles.dropdownIcon}>{isPickerOpen ? '^' : 'v'}</Text>
            </TouchableOpacity>

            {isPickerOpen && (
              <View style={styles.dropdownList}>
                <ScrollView style={styles.dropdownScroll} nestedScrollEnabled showsVerticalScrollIndicator>
                  {(['Alunos', 'Professores'] as AdminTarget[]).map((option) => {
                    const active = option === target
                    return (
                      <TouchableOpacity
                        key={option}
                        style={[styles.dropdownOption, active && styles.dropdownOptionActive]}
                        onPress={() => handleSelectTarget(option)}
                      >
                        <Text style={[styles.dropdownOptionText, active && styles.dropdownOptionTextActive]}>
                          {option}
                        </Text>
                      </TouchableOpacity>
                    )
                  })}
                </ScrollView>
              </View>
            )}
          </View>

          <View style={styles.buttonStack}>
            <TouchableOpacity style={styles.actionButton} onPress={handleRegister}>
              <Text style={styles.actionButtonText}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={target === 'Alunos' ? onOpenTotal : onOpenProfessorTotal}
            >
              <Text style={styles.actionButtonText}>
                {target === 'Alunos' ? 'Matriculados' : totalLabel}
              </Text>
            </TouchableOpacity>
            {target === 'Alunos' ? (
              <TouchableOpacity style={styles.actionButton} onPress={onOpenFrequency}>
                <Text style={styles.actionButtonText}>Gamificação</Text>
              </TouchableOpacity>
            ) : null}
          </View>
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
  card: {
    width: '100%',
    backgroundColor: '#083272',
    borderRadius: 30,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 25,
    shadowOffset: { width: 0, height: 18 },
  },
  dropdownWrapper: {
    position: 'relative',
    zIndex: 30,
    marginBottom: 18,
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
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#d6dbe9',
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 12,
    zIndex: 40,
    maxHeight: 220,
    overflow: 'hidden',
  },
  dropdownScroll: {
    maxHeight: 200,
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
  buttonStack: {
    gap: 14,
  },
  actionButton: {
    backgroundColor: '#0f172a',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
  },
  actionButtonText: {
    color: '#ffffff',
    fontWeight: '800',
  },
})
