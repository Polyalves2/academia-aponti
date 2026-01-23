import { Image, ImageSourcePropType, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Training } from '../data/trainings'
import { UserProfile } from '../types/profile'
import backIcon from '../assets/icon_seta.png'

interface ExerciseDetailScreenProps {
  training: Training
  profile: UserProfile
  onBack: () => void
  onOpenProfile?: () => void
}

const trainingImageAssets: Record<string, ImageSourcePropType | undefined> = {
  pernas_gluteos: require('../assets/pernas_gluteos.png'),
  peito_triceps: require('../assets/peito_triceps.png'),
}

export function ExerciseDetailScreen({ training, profile, onBack, onOpenProfile }: ExerciseDetailScreenProps) {
  const imageSource = getTrainingImage(training.imageKeywords)
  const hasPhoto = Boolean(profile.photoUri)

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
              <Image source={imageSource} style={styles.trainingImage} resizeMode="cover" />
            ) : (
              <View style={styles.imagePlaceholder} />
            )}
          </View>
        </View>

        {training.exercicios.map((exercise, index) => (
          <View key={exercise.id} style={styles.exerciseCard}>
            <View style={styles.exerciseHeader}>
              <Text style={styles.exerciseIndex}>{index + 1}.</Text>
              <Text style={styles.exerciseName}>{exercise.nome}</Text>
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
      </ScrollView>
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
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#173c9b',
    padding: 4,
    height: 200,
    aspectRatio: 3 / 4,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  trainingImage: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
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
})
