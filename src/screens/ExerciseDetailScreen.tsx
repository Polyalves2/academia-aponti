import { Alert, Image, ImageSourcePropType, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useEffect, useState } from 'react'
import { Training } from '../data/trainings'
import { UserProfile } from '../types/profile'
import backIcon from '../assets/icon_seta.png'

interface ExerciseDetailScreenProps {
  training: Training
  profile: UserProfile
  onBack: () => void
  onOpenProfile?: () => void
  onCheckIn?: (trainingId: string) => void
  isCompleted?: boolean
  showCheckIn?: boolean
  showProfessorTools?: boolean
  recommendations?: string[]
  onAddRecommendation?: (trainingId: string, text: string) => void
  onRemoveRecommendation?: (trainingId: string, index: number) => void
}

const trainingImageAssets: Record<string, ImageSourcePropType | undefined> = {
  pernas_gluteos: require('../assets/pernas_gluteos.png'),
  peito_triceps: require('../assets/peito_triceps.png'),
  treino_a: require('../assets/Imagem treino a.png'),
  treino_b: require('../assets/imagem treino b.png'),
  treino_c: require('../assets/imagem treino C.png'),
  treino_d: require('../assets/imagem treino d .png'),
  treino_e: require('../assets/imagem treino e.png'),
  treino_f: require('../assets/imagem treino f.png'),
}

export function ExerciseDetailScreen({
  training,
  profile,
  onBack,
  onOpenProfile,
  onCheckIn,
  isCompleted,
  showCheckIn = true,
  showProfessorTools = false,
  recommendations = [],
  onAddRecommendation,
  onRemoveRecommendation,
}: ExerciseDetailScreenProps) {
  const imageSource = trainingImageAssets[training.id] ?? getTrainingImage(training.imageKeywords)
  const hasPhoto = Boolean(profile.photoUri)
  const [exerciseList, setExerciseList] = useState(training.exercicios)
  const [isAddExerciseOpen, setIsAddExerciseOpen] = useState(false)
  const [exerciseName, setExerciseName] = useState('')
  const [exerciseSeries, setExerciseSeries] = useState('')
  const [exerciseReps, setExerciseReps] = useState('')
  const [exercisePeso, setExercisePeso] = useState('')
  const [exerciseIntervalo, setExerciseIntervalo] = useState('')
  const [isRecommendationOpen, setIsRecommendationOpen] = useState(false)
  const [recommendationText, setRecommendationText] = useState('')

  useEffect(() => {
    setExerciseList(training.exercicios)
  }, [training])
  const handleCheckIn = () => {
    if (isCompleted) {
      return
    }
    const message = 'Check-in realizado'
    if (Platform.OS === 'web') {
      globalThis.alert?.(message)
      onCheckIn?.(training.id)
      return
    }
    onCheckIn?.(training.id)
    Alert.alert(message)
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {training.titulo}: {training.foco}
        </Text>
        <TouchableOpacity style={styles.avatarWrapper} onPress={onOpenProfile}>
          {hasPhoto ? (
            <Image source={{ uri: profile.photoUri }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitials}>{profile.name.slice(0, 1)}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} bounces keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <View style={styles.areaRow}>
            {training.areas.map((area) => (
              <View key={area} style={styles.areaPill}>
                <Text style={styles.areaText}>{area}</Text>
              </View>
            ))}
          </View>

          <View style={styles.imageFrame}>
            {imageSource ? (
              <Image source={imageSource} style={styles.trainingImage} resizeMode="contain" />
            ) : (
              <View style={styles.imagePlaceholder} />
            )}
          </View>
        </View>

        {exerciseList.map((exercise, index) => (
          <View key={exercise.id} style={styles.exerciseCard}>
            <View style={styles.exerciseHeader}>
              <Text style={styles.exerciseIndex}>{index + 1}.</Text>
              <Text style={styles.exerciseName}>{exercise.nome}</Text>
              {showProfessorTools ? (
                <TouchableOpacity
                  style={styles.exerciseDelete}
                  onPress={() =>
                    setExerciseList((prev) => prev.filter((item) => item.id !== exercise.id))
                  }
                >
                  <Text style={styles.exerciseDeleteText}>x</Text>
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={styles.exerciseInfo}>
              <InfoRow label="Series" value={`${exercise.series}`} />
              <InfoRow label="Repeticoes" value={exercise.repeticoes} />
              <InfoRow label="Peso" value={exercise.peso} />
              <InfoRow label="Intervalo" value={exercise.intervalo} />
            </View>
            <Text style={styles.exerciseArrow}>{'>'}</Text>
          </View>
        ))}

        {showProfessorTools || recommendations.length ? (
          <>
            {showProfessorTools ? (
              <TouchableOpacity style={styles.addExerciseButton} onPress={() => setIsAddExerciseOpen(true)}>
                <Text style={styles.addExerciseText}>Adicionar exercicio</Text>
              </TouchableOpacity>
            ) : null}
            <View style={styles.recommendationsCard}>
              <View style={styles.recommendationsHeader}>
                <Text style={styles.recommendationsTitle}>Recomendacoes</Text>
                {showProfessorTools ? (
                  <TouchableOpacity style={styles.recommendationsAdd} onPress={() => setIsRecommendationOpen(true)}>
                    <Text style={styles.recommendationsAddText}>+</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
              {recommendations.length ? (
                recommendations.map((item, idx) => (
                  <View key={`${item}-${idx}`} style={styles.recommendationItem}>
                    <Text style={styles.recommendationText}>{item}</Text>
                    {showProfessorTools ? (
                      <TouchableOpacity
                        style={styles.recommendationDelete}
                        onPress={() => onRemoveRecommendation?.(training.id, idx)}
                      >
                        <Text style={styles.recommendationDeleteText}>x</Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                ))
              ) : (
                <Text style={styles.recommendationEmpty}>Sem recomendacoes</Text>
              )}
            </View>
          </>
        ) : null}

        {showCheckIn ? (
          <TouchableOpacity
            style={[styles.checkInButton, isCompleted && styles.checkInButtonDisabled]}
            onPress={handleCheckIn}
            disabled={Boolean(isCompleted)}
          >
            <Text style={styles.checkInButtonText}>Check-in</Text>
          </TouchableOpacity>
        ) : null}
      </ScrollView>

      <Modal transparent visible={isAddExerciseOpen} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Adicionar exercicio</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Nome do exercicio"
              placeholderTextColor="#9aa2b1"
              value={exerciseName}
              onChangeText={setExerciseName}
            />
            <View style={styles.modalRow}>
              <TextInput
                style={[styles.modalInput, styles.modalInputFlex]}
                placeholder="Series"
                placeholderTextColor="#9aa2b1"
                value={exerciseSeries}
                onChangeText={setExerciseSeries}
                keyboardType="numeric"
              />
              <TextInput
                style={[styles.modalInput, styles.modalInputFlex]}
                placeholder="Repeticoes"
                placeholderTextColor="#9aa2b1"
                value={exerciseReps}
                onChangeText={setExerciseReps}
              />
            </View>
            <View style={styles.modalRow}>
              <TextInput
                style={[styles.modalInput, styles.modalInputFlex]}
                placeholder="Peso"
                placeholderTextColor="#9aa2b1"
                value={exercisePeso}
                onChangeText={setExercisePeso}
              />
              <TextInput
                style={[styles.modalInput, styles.modalInputFlex]}
                placeholder="Intervalo"
                placeholderTextColor="#9aa2b1"
                value={exerciseIntervalo}
                onChangeText={setExerciseIntervalo}
              />
            </View>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setIsAddExerciseOpen(false)}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonPrimary}
                onPress={() => {
                  const id = `${Date.now()}`
                  setExerciseList((prev) => [
                    ...prev,
                    {
                      id,
                      nome: exerciseName || 'Exercicio',
                      series: Number(exerciseSeries) || 3,
                      repeticoes: exerciseReps || '10-12',
                      peso: exercisePeso || 'Moderado',
                      intervalo: exerciseIntervalo || '60s',
                    },
                  ])
                  setExerciseName('')
                  setExerciseSeries('')
                  setExerciseReps('')
                  setExercisePeso('')
                  setExerciseIntervalo('')
                  setIsAddExerciseOpen(false)
                }}
              >
                <Text style={styles.modalButtonPrimaryText}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal transparent visible={isRecommendationOpen} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Recomendacoes</Text>
            <TextInput
              style={[styles.modalInput, styles.modalTextarea]}
              placeholder="Escreva a recomendacao"
              placeholderTextColor="#9aa2b1"
              value={recommendationText}
              onChangeText={setRecommendationText}
              multiline
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setIsRecommendationOpen(false)}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonPrimary}
                onPress={() => {
                  if (recommendationText.trim()) {
                    onAddRecommendation?.(training.id, recommendationText.trim())
                    setRecommendationText('')
                  }
                  setIsRecommendationOpen(false)
                }}
              >
                <Text style={styles.modalButtonPrimaryText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

function getTrainingImage(keywords: string[]) {
  for (const key of keywords) {
    if (trainingImageAssets[key]) {
      return trainingImageAssets[key]
    }
  }
  return undefined
}

interface InfoRowProps {
  label: string
  value: string
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <Text style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}: </Text>
      <Text style={styles.infoValue}>{value}</Text>
    </Text>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#083060',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 14,
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
    fontWeight: '700',
    textAlign: 'center',
    marginHorizontal: 12,
  },
  avatarWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ffffff',
    overflow: 'hidden',
  },
  avatar: { width: '100%', height: '100%' },
  avatarPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  avatarInitials: {
    color: '#083060',
    fontWeight: '800',
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#f1f2f6',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 18,
    gap: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  areaRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 12,
  },
  areaPill: {
    backgroundColor: '#eff3ff',
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 999,
  },
  areaText: {
    color: '#173c9b',
    fontWeight: '800',
  },
  imageFrame: {
    borderRadius: 20,
    borderWidth: 0,
    backgroundColor: 'transparent',
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  trainingImage: {
    width: 280,
    height: 180,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: '#2f57b0',
    backgroundColor: '#2f57b0',
    alignSelf: 'center',
  },
  imagePlaceholder: {
    flex: 1,
    borderRadius: 14,
    backgroundColor: '#5da9ff',
  },
  exerciseCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e4f0',
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  exerciseIndex: {
    color: '#1d2b4f',
    fontWeight: '800',
    marginRight: 4,
  },
  exerciseName: {
    color: '#1d2b4f',
    fontWeight: '800',
    flex: 1,
  },
  exerciseInfo: {
    marginBottom: 4,
  },
  infoRow: {
    color: '#3f4b65',
  },
  infoLabel: {
    fontWeight: '800',
    color: '#121a30',
  },
  infoValue: {
    fontWeight: '600',
  },
  exerciseArrow: {
    textAlign: 'right',
    color: '#9aa4bd',
    fontSize: 16,
    fontWeight: '800',
  },
  exerciseDelete: {
    marginLeft: 'auto',
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#ff4d4d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseDeleteText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 12,
  },
  addExerciseButton: {
    backgroundColor: '#4f66b6',
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  addExerciseText: {
    color: '#ffffff',
    fontWeight: '800',
  },
  recommendationsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#dfe2eb',
    marginTop: 10,
  },
  recommendationsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  recommendationsTitle: {
    fontWeight: '800',
    color: '#1f2736',
  },
  recommendationsAdd: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#4f66b6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recommendationsAddText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 14,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f3f4f8',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: 6,
  },
  recommendationText: {
    color: '#1f2a44',
    fontWeight: '600',
    flex: 1,
    paddingRight: 8,
  },
  recommendationDelete: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ff4d4d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recommendationDeleteText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 11,
  },
  recommendationEmpty: {
    color: '#8a93a8',
    fontWeight: '600',
  },
  checkInButton: {
    backgroundColor: '#1f4fc6',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  checkInButtonText: {
    color: '#ffffff',
    fontWeight: '800',
  },
  checkInButtonDisabled: {
    opacity: 0.55,
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
    overflow: 'hidden',
  },
  modalTitle: {
    fontWeight: '800',
    fontSize: 16,
    color: '#1f2a44',
    marginBottom: 12,
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
  modalTextarea: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  modalRow: {
    flexDirection: 'row',
    gap: 10,
  },
  modalInputFlex: {
    flex: 1,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 6,
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
