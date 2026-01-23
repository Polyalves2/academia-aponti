import { useMemo } from 'react'
import { Image, ImageSourcePropType, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BrandWordmark } from '../components/BrandWordmark'
import { trainings, Training } from '../data/trainings'
import { UserProfile } from '../types/profile'
import backIcon from '../assets/icon_seta.png'
import trophyIcon from '../assets/trofeu.png'
import gastoCaloricoIcon from '../assets/Gasto Calorico.png'

interface StudentScreenProps {
  profile: UserProfile
  completedTrainingIds: Record<string, boolean>
  onBackHome: () => void
  onOpenProfile: () => void
  onViewTraining: (training: Training) => void
}

export function StudentScreen({
  onBackHome,
  onOpenProfile,
  onViewTraining,
  profile,
  completedTrainingIds,
}: StudentScreenProps) {
  const recommendedTraining = trainings[0]
  const otherTrainings = useMemo(() => trainings.slice(1), [])
  const hasPhoto = Boolean(profile.photoUri)

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={onBackHome} style={styles.backButton}>
            <Image source={backIcon} style={styles.backIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onBackHome}>
            <BrandWordmark size="lg" />
          </TouchableOpacity>
        </View>
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

      <ScrollView contentContainerStyle={styles.scroll} bounces keyboardShouldPersistTaps="handled">
        <Text style={styles.sectionTitle}>Treino indicado:</Text>
        <TrainingCard
          training={recommendedTraining}
          isCompleted={Boolean(completedTrainingIds[recommendedTraining.id])}
          highlight
          onViewDetails={onViewTraining}
        />

        {otherTrainings.map((training) => (
          <TrainingCard
            key={training.id}
            training={training}
            isCompleted={Boolean(completedTrainingIds[training.id])}
            onViewDetails={onViewTraining}
          />
        ))}
      </ScrollView>
    </View>
  )
}

interface TrainingCardProps {
  training: Training
  highlight?: boolean
  isCompleted?: boolean
  onViewDetails: (training: Training) => void
}

function TrainingCard({ training, highlight, isCompleted, onViewDetails }: TrainingCardProps) {
  return (
    <View style={[styles.card, highlight && styles.cardHighlight]}>
      <View style={styles.cardHeader}>
        <Image source={trophyIcon} style={styles.cardIcon} />
        <View style={styles.cardHeaderCopy}>
          <View style={styles.cardTitleRow}>
            <Text style={styles.cardTitle}>{training.titulo}</Text>
            {isCompleted ? (
              <View style={styles.completedBadge}>
                <Text style={styles.completedBadgeText}>Concluido</Text>
              </View>
            ) : null}
          </View>
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

      <TouchableOpacity style={styles.cardButton} onPress={() => onViewDetails(training)}>
        <Text style={styles.cardButtonText}>Visualizar treino completo</Text>
      </TouchableOpacity>
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
    backgroundColor: '#e7ebf4',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 18,
    paddingBottom: 12,
    backgroundColor: '#083060',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#083272',
    borderWidth: 1,
    borderColor: '#1a4a9a',
  },
  backIcon: {
    width: 16,
    height: 16,
    tintColor: '#000000',
    transform: [{ rotate: '180deg' }],
  },
  avatarWrapper: {
    width: 46,
    height: 46,
    borderRadius: 23,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    color: '#083060',
    fontWeight: '800',
    fontSize: 16,
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#222a38',
    marginBottom: 14,
  },
  sectionSpacing: {
    marginTop: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.09,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    borderWidth: 1,
    borderColor: '#dfe2eb',
  },
  cardHighlight: {
    borderColor: '#4a6ef4',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardIcon: {
    width: 36,
    height: 36,
    marginRight: 12,
    resizeMode: 'contain',
  },
  cardHeaderCopy: {
    flex: 1,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  cardTitle: {
    fontWeight: '800',
    fontSize: 18,
    color: '#1b1f2c',
  },
  completedBadge: {
    backgroundColor: '#e1f3e7',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  completedBadgeText: {
    color: '#1c6b3d',
    fontWeight: '800',
    fontSize: 11,
  },
  cardFocus: {
    color: '#4b5463',
    fontWeight: '600',
    marginTop: 2,
  },
  cardInfo: {
    marginBottom: 12,
    gap: 8,
  },
  infoLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4a6ef4',
    marginTop: 6,
    marginRight: 10,
  },
  infoIcon: {
    width: 16,
    height: 16,
    marginTop: 2,
    marginRight: 10,
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
    borderRadius: 18,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cardButtonText: {
    color: '#fff',
    fontWeight: '800',
  },

})
