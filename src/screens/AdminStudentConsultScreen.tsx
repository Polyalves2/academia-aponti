import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import backIcon from '../assets/icon_seta.png'
import { StudentRegistration } from '../types/admin'

interface AdminStudentConsultScreenProps {
  registrations: StudentRegistration[]
  onBack: () => void
  onSelect: (registration: StudentRegistration) => void
}

export function AdminStudentConsultScreen({
  registrations,
  onBack,
  onSelect,
}: AdminStudentConsultScreenProps) {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Consultar alunos</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} bounces keyboardShouldPersistTaps="handled">
        {registrations.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum cadastro encontrado.</Text>
        ) : (
          registrations.map((item) => (
            <TouchableOpacity key={item.id} style={styles.card} onPress={() => onSelect(item)}>
              <Text style={styles.cardTitle}>{item.nome || 'Aluno sem nome'}</Text>
              <InfoRow label="E-mail" value={item.email} />
              <InfoRow label="CPF" value={item.cpf} />
              <InfoRow label="Genero" value={item.genero} />
              <InfoRow label="Plano" value={item.plano} />
              <InfoRow label="Valor" value={item.valor} />
              <InfoRow label="Status" value={item.statusPlano} />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  )
}

interface InfoRowProps {
  label: string
  value: string
}

function InfoRow({ label, value }: InfoRowProps) {
  if (!value) {
    return null
  }

  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}:</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#041c3f',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 16,
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
  content: {
    flexGrow: 1,
    backgroundColor: '#e6e6ee',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    gap: 14,
  },
  emptyText: {
    color: '#46506a',
    textAlign: 'center',
    marginTop: 40,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#f7f7fb',
    borderRadius: 22,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  cardTitle: {
    color: '#1e3160',
    fontWeight: '800',
    fontSize: 16,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  infoLabel: {
    color: '#1e3160',
    fontWeight: '700',
  },
  infoValue: {
    color: '#1b1b1b',
    fontWeight: '600',
  },
})
