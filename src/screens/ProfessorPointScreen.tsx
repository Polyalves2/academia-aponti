import { useMemo, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import backIcon from '../assets/icon_seta.png'

interface ProfessorPointScreenProps {
  onBack: () => void
}

type PointEntry = {
  id: string
  timestamp: number
}

export function ProfessorPointScreen({ onBack }: ProfessorPointScreenProps) {
  const [entries, setEntries] = useState<PointEntry[]>([])

  const handleRegister = () => {
    setEntries((prev) => [{ id: `${Date.now()}`, timestamp: Date.now() }, ...prev])
  }

  const formatted = useMemo(
    () =>
      entries.map((entry) => ({
        ...entry,
        label: new Date(entry.timestamp).toLocaleString('pt-BR'),
      })),
    [entries],
  )

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
        <TouchableOpacity style={styles.primaryButton} onPress={handleRegister}>
          <Text style={styles.primaryButtonText}>Registrar ponto</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Historico</Text>
          {formatted.length ? (
            formatted.map((entry) => (
              <View key={entry.id} style={styles.entryRow}>
                <Text style={styles.entryText}>{entry.label}</Text>
                <Text style={styles.entryStatus}>Ok</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>Nenhum registro ainda.</Text>
          )}
        </View>
      </ScrollView>
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
    gap: 16,
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
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#dfe2eb',
  },
  sectionTitle: {
    color: '#1f2736',
    fontWeight: '800',
    marginBottom: 8,
  },
  entryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#edf0f7',
  },
  entryText: {
    color: '#2a3550',
    fontWeight: '600',
  },
  entryStatus: {
    color: '#2a8f4a',
    fontWeight: '800',
  },
  emptyText: {
    color: '#7a8396',
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 10,
  },
})
