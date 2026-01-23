import { useState } from 'react'
import { Image, ImageSourcePropType, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { BrandWordmark } from '../components/BrandWordmark'
import { Training, trainings } from '../data/trainings'
import backIcon from '../assets/icon_seta.png'
import trophyIcon from '../assets/trofeu.png'
import gastoCaloricoIcon from '../assets/Gasto Calorico.png'

interface ProfessorStudentTrainingListScreenProps {
  onBack: () => void
  onViewTraining: (training: Training) => void
  onOpenChanges: () => void
}

export function ProfessorStudentTrainingListScreen({
  onBack,
  onViewTraining,
  onOpenChanges,
}: ProfessorStudentTrainingListScreenProps) {
  const [items, setItems] = useState<Training[]>(trainings)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formTitulo, setFormTitulo] = useState('')
  const [formFoco, setFormFoco] = useState('')
  const [formFrequencia, setFormFrequencia] = useState('2')
  const [formObjetivo, setFormObjetivo] = useState('')

  const handleOpenAdd = () => {
    setEditingId(null)
    setFormTitulo('')
    setFormFoco('')
    setFormFrequencia('2')
    setFormObjetivo('')
    setIsModalOpen(true)
  }

  const handleEdit = (training: Training) => {
    setEditingId(training.id)
    setFormTitulo(training.titulo)
    setFormFoco(training.foco)
    setFormFrequencia(String(training.frequenciaSemanal))
    setFormObjetivo(training.objetivo)
    setIsModalOpen(true)
  }

  const handleSave = () => {
    const frequencia = Number(formFrequencia) || 1
    if (!formTitulo.trim()) {
      return
    }
    setItems((prev) => {
      if (editingId) {
        return prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                titulo: formTitulo.trim(),
                foco: formFoco.trim() || item.foco,
                frequenciaSemanal: frequencia,
                objetivo: formObjetivo.trim() || item.objetivo,
              }
            : item,
        )
      }
      const newItem: Training = {
        id: `treino_${Date.now()}`,
        titulo: formTitulo.trim(),
        foco: formFoco.trim() || 'Musculos',
        calorias: { min: 350, max: 450 },
        objetivo: formObjetivo.trim() || 'Hipertrofia',
        tempo: { min: 60, max: 75 },
        frequenciaSemanal: frequencia,
        areas: [],
        imageKeywords: [],
        exercicios: [],
      }
      return [newItem, ...prev]
    })
    setIsModalOpen(false)
  }

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <BrandWordmark size="lg" />
        <View style={styles.headerSpacer} />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleOpenAdd}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.closeButton} onPress={onBack}>
        <Text style={styles.closeText}>x</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content} bounces keyboardShouldPersistTaps="handled">
        <Text style={styles.sectionTitle}>Treino indicado:</Text>

        {items.map((training) => (
          <View key={training.id} style={styles.card}>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(training.id)}>
              <Text style={styles.deleteButtonText}>x</Text>
            </TouchableOpacity>
            <View style={styles.cardHeader}>
              <Image source={trophyIcon} style={styles.cardIcon} />
              <View style={styles.cardHeaderCopy}>
                <Text style={styles.cardTitle}>{training.titulo}</Text>
                <Text style={styles.cardFocus}>{training.foco}</Text>
              </View>
            </View>

            <View style={styles.cardInfo}>
              <InfoLine
                label="Gasto calorico"
                value={`${training.calorias.min}-${training.calorias.max} kcal`}
                iconSource={gastoCaloricoIcon}
              />
              <InfoLine label="Objetivo" value={training.objetivo} />
              <InfoLine label="Tempo medio" value={`${training.tempo.min} a ${training.tempo.max} minutos`} />
              <InfoLine label="Frequencia" value={`${training.frequenciaSemanal}x por semana`} />
            </View>

            <TouchableOpacity style={styles.cardButton} onPress={() => onViewTraining(training)} onLongPress={() => handleEdit(training)}>
              <Text style={styles.cardButtonText}>Visualizar treino completo</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.primaryButton} onPress={onOpenChanges}>
          <Text style={styles.primaryButtonText}>Alterações</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal transparent visible={isModalOpen} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{editingId ? 'Editar treino' : 'Adicionar treino'}</Text>

            <Text style={styles.modalLabel}>Treino</Text>
            <TextInput
              style={styles.modalInput}
              value={formTitulo}
              onChangeText={setFormTitulo}
              placeholder="Treino X"
              placeholderTextColor="#9aa2b1"
            />

            <Text style={styles.modalLabel}>Musculos</Text>
            <TextInput
              style={styles.modalInput}
              value={formFoco}
              onChangeText={setFormFoco}
              placeholder="Pernas e Gluteos"
              placeholderTextColor="#9aa2b1"
            />

            <Text style={styles.modalLabel}>Frequencia</Text>
            <TextInput
              style={styles.modalInput}
              value={formFrequencia}
              onChangeText={setFormFrequencia}
              placeholder="2"
              placeholderTextColor="#9aa2b1"
              keyboardType="numeric"
            />

            <Text style={styles.modalLabel}>Objetivo</Text>
            <TextInput
              style={styles.modalInput}
              value={formObjetivo}
              onChangeText={setFormObjetivo}
              placeholder="Hipertrofia"
              placeholderTextColor="#9aa2b1"
            />

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setIsModalOpen(false)}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButtonPrimary} onPress={handleSave}>
                <Text style={styles.modalButtonPrimaryText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

interface InfoLineProps {
  label: string
  value: string
  iconSource?: ImageSourcePropType
}

function InfoLine({ label, value, iconSource }: InfoLineProps) {
  return (
    <View style={styles.infoLine}>
      {iconSource ? <Image source={iconSource} style={styles.infoIcon} /> : <View style={styles.infoBullet} />}
      <View style={styles.infoTextWrapper}>
        <Text style={styles.infoLabel}>{label}:</Text>
        <Text style={styles.infoValue}>{value}</Text>
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
    paddingTop: 18,
    paddingHorizontal: 18,
    paddingBottom: 10,
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  addButton: {
    position: 'absolute',
    top: 18,
    right: 18,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#083272',
    borderWidth: 1,
    borderColor: '#1a4a9a',
    zIndex: 12,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 18,
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
  closeButton: {
    position: 'absolute',
    top: 64,
    alignSelf: 'center',
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#2b2b2b',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  closeText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 16,
  },
  content: {
    backgroundColor: '#e6e6ee',
    flexGrow: 1,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 18,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2a3450',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    borderWidth: 1,
    borderColor: '#dfe2eb',
    position: 'relative',
  },
  deleteButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#ff4d4d',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  deleteButtonText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardIcon: {
    width: 28,
    height: 28,
    marginRight: 10,
    resizeMode: 'contain',
  },
  cardHeaderCopy: {
    flex: 1,
  },
  cardTitle: {
    fontWeight: '800',
    fontSize: 16,
    color: '#1b1f2c',
  },
  cardFocus: {
    color: '#4b5463',
    fontWeight: '600',
    marginTop: 2,
  },
  cardInfo: {
    marginBottom: 10,
    gap: 6,
  },
  infoLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4a6ef4',
    marginRight: 8,
  },
  infoIcon: {
    width: 14,
    height: 14,
    marginRight: 8,
    resizeMode: 'contain',
  },
  infoTextWrapper: {
    flex: 1,
  },
  infoLabel: {
    fontWeight: '800',
    color: '#1f2736',
  },
  infoValue: {
    color: '#404b60',
  },
  cardButton: {
    backgroundColor: '#4a6ef4',
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: 'center',
  },
  cardButtonText: {
    color: '#ffffff',
    fontWeight: '800',
  },
  primaryButton: {
    alignSelf: 'center',
    backgroundColor: '#4f66b6',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 22,
    marginTop: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '800',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 16, 32, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
  },
  modalTitle: {
    fontWeight: '800',
    fontSize: 16,
    color: '#1f2a44',
    marginBottom: 12,
  },
  modalLabel: {
    color: '#4862cc',
    fontWeight: '800',
    marginBottom: 6,
  },
  modalInput: {
    backgroundColor: '#eef1f7',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#d2d8e6',
    color: '#1b1b1b',
    marginBottom: 10,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 8,
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#e3e6f3',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#1f2a44',
    fontWeight: '800',
  },
  modalButtonPrimary: {
    flex: 1,
    backgroundColor: '#4f66b6',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  modalButtonPrimaryText: {
    color: '#ffffff',
    fontWeight: '800',
  },
})
