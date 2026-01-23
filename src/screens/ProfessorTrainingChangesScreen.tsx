import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import backIcon from '../assets/icon_seta.png'

interface ProfessorTrainingChangesScreenProps {
  onBack: () => void
  onSubmit: () => void
}

export function ProfessorTrainingChangesScreen({ onBack, onSubmit }: ProfessorTrainingChangesScreenProps) {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Alterações</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} bounces keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Field label="Treino" value="Treino A - Pernas e Gluteos" />

          <Field label="Exercicio" value="Agachamento livre" />

          <View style={styles.row}>
            <Field label="Series" value="4" flex />
            <Field label="Repeticoes" value="8-10" flex />
          </View>

          <View style={styles.row}>
            <Field label="Peso" value="Progressivo" flex />
            <Field label="Intervalo" value="90s" flex />
          </View>

          <View style={styles.textareaField}>
            <Text style={styles.label}>Observacoes</Text>
            <TextInput
              style={styles.textarea}
              multiline
              numberOfLines={4}
              placeholder="Descreva a alteração no treino"
              placeholderTextColor="#9aa2b1"
            />
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={onSubmit}>
            <Text style={styles.primaryButtonText}>Salvar alteração</Text>
          </TouchableOpacity>
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
  headerTitle: {
    flex: 1,
    color: '#ffffff',
    fontWeight: '800',
    textAlign: 'center',
    marginHorizontal: 12,
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
    backgroundColor: '#e6e6ee',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 18,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
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
  textareaField: {
    marginBottom: 16,
  },
  textarea: {
    backgroundColor: '#eef1f7',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    color: '#1b1b1b',
    borderWidth: 1,
    borderColor: '#d2d8e6',
    textAlignVertical: 'top',
    minHeight: 90,
  },
  primaryButton: {
    backgroundColor: '#4f66b6',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '800',
  },
})
