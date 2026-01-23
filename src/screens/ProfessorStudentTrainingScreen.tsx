import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import backIcon from '../assets/icon_seta.png'
import studentPhoto from '../assets/aluno_homem.jpg'
import { StudentRegistration } from '../types/admin'

interface ProfessorStudentTrainingScreenProps {
  registration: StudentRegistration
  onBack: () => void
  onOpenTrainings: () => void
}

export function ProfessorStudentTrainingScreen({
  registration,
  onBack,
  onOpenTrainings,
}: ProfessorStudentTrainingScreenProps) {
  const nome = registration.nome || 'Allan Henrique Barbosa da Silva'
  const idade = registration.nascimento ? '24 anos' : '24 anos'
  const peso = registration.peso ? `${registration.peso} Kg` : '79 Kg'
  const matricula = registration.id ? registration.id.slice(-6) : '857083'
  const frequencia = registration.frequencia || '10'

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.headerSpacer} />
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} bounces keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <View style={styles.photoWrap}>
            <Image source={studentPhoto} style={styles.photo} />
            <View style={styles.closeBadge}>
              <Text style={styles.closeText}>x</Text>
            </View>
          </View>

          <View style={styles.topRow}>
            <View style={styles.field}>
              <Text style={styles.label}>Nome completo:</Text>
              <View style={styles.valueBox}>
                <Text style={styles.valueText}>{nome}</Text>
              </View>
            </View>
            <Text style={styles.frequency}>
              Frequencia: <Text style={styles.frequencyValue}>{frequencia}</Text>
            </Text>
          </View>

          <View style={styles.row}>
            <Field label="Idade:" value={idade} flex />
            <Field label="Peso:" value={peso} flex />
          </View>

          <Field label="Matricula:" value={matricula} />

          <View style={styles.row}>
            <Field label="FC sup:" value="120 bpm" flex />
            <Field label="FC inf:" value="175 bpm" flex />
          </View>

          <Field label="Aerobio:" value="Esteira (corrida/caminhada)" />
          <Field label="Objetivo:" value="Hipertrofia" />

          <View style={styles.row}>
            <Field label="Data avaliacao:" value="10/11/2025" flex />
            <Field label="Data reavaliacao:" value="10/02/2026" flex />
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => Alert.alert('Upload', 'Envio em breve.')}
            >
              <Text style={styles.primaryButtonText}>Fazer Upload</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={onOpenTrainings}
            >
              <Text style={styles.primaryButtonText}>Visualizar treino</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

interface FieldProps {
  label: string
  value: string
  flex?: boolean
}

function Field({ label, value, flex }: FieldProps) {
  return (
    <View style={[styles.field, flex && styles.fieldFlex]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueBox}>
        <Text style={styles.valueText}>{value}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#1c2f77',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerSpacer: {
    width: 40,
    height: 40,
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
  content: {
    flexGrow: 1,
    paddingHorizontal: 18,
    paddingBottom: 26,
  },
  card: {
    backgroundColor: '#f1f1f4',
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
  },
  photoWrap: {
    alignSelf: 'center',
    marginTop: -6,
    marginBottom: 10,
    width: 90,
    height: 90,
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photo: {
    width: '100%',
    height: '120%',
    transform: [{ translateY: 12 }],
  },
  closeBadge: {
    position: 'absolute',
    right: -10,
    top: -10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2b2b2b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: '#ffffff',
    fontWeight: '800',
  },
  topRow: {
    marginBottom: 8,
  },
  frequency: {
    color: '#6a6f86',
    fontWeight: '700',
    marginBottom: 6,
    alignSelf: 'flex-end',
  },
  frequencyValue: {
    color: '#3b53a6',
    fontWeight: '800',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  field: {
    marginBottom: 12,
  },
  fieldFlex: {
    flex: 1,
  },
  label: {
    color: '#4862cc',
    fontWeight: '800',
    marginBottom: 6,
  },
  valueBox: {
    backgroundColor: '#dedede',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  valueText: {
    color: '#1c1c1c',
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#4f66b6',
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '800',
  },
})
