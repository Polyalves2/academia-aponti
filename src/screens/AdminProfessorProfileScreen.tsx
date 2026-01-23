import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import backIcon from '../assets/icon_seta.png'
import femalePhoto from '../assets/aluna_mulher.png'

interface AdminProfessorProfileScreenProps {
  onBack: () => void
}

export function AdminProfessorProfileScreen({ onBack }: AdminProfessorProfileScreenProps) {
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
            <Image source={femalePhoto} style={styles.photo} resizeMode="cover" />
          </View>

          <Field label="Nome completo:" value="Ellen Fernanda da Silva Lima" />

          <View style={styles.row}>
            <Field label="Matrícula:" value="857083" flex />
            <Field label="CPF:" value="123.456.789-10" flex />
          </View>

          <View style={styles.row}>
            <Field label="Contato 1:" value="(81) 99999-9999" flex />
            <Field label="Contato 2:" value="(81) 99999-9999" flex />
          </View>

          <View style={styles.row}>
            <Field label="Data de Nascimento:" value="11/11/2000" flex />
            <Field label="CEP:" value="34450156-905" flex />
          </View>

          <Field label="CREF:" value="089321-G/PE" />
          <Field label="Endereço:" value="Rua da Imperatriz Tereza Cristina, 250, apto 901, Soledade, Recife" />
          <Field label="E-mail:" value="ellenfernanda12@gmail.com" />
          <Field label="Instituição de ensino:" value="Universidade de Pernambuco - UPE" />
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
    width: 120,
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
})
