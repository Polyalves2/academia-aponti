import { useMemo, useState } from 'react'
import {
  Animated,
  Image,
  ImageBackground,
  ImageSourcePropType,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { BrandWordmark } from '../components/BrandWordmark'
import alunoHomem from '../assets/aluno_homem.jpg'
import iconAvaliar from '../assets/icon_avaliar.png'
import iconFicha from '../assets/icon_ficha.png'
import iconSenha from '../assets/icon_senha.png'
import iconSair from '../assets/icon_sair.png'
import iconSeta from '../assets/icon_seta.png'
import maqExtensora from '../assets/maq_extensora.jpg'
import maqBike from '../assets/maq_bike.jpg'
import maqCrucifixo from '../assets/maq_crucifixo.jpg'
import maqAbdutora from '../assets/maq_abdutora.png'

type Exercise = {
  name: string
  image: ImageSourcePropType
  equipment?: string
  sets: { rep: number; serie: number; weight: string; date: string }[]
}

interface StudentScreenProps {
  onBackHome: () => void
}

const drawerWidth = Platform.OS === 'web' ? 310 : 280
const drawerClosedOffset = Platform.OS === 'web' ? drawerWidth + 60 : drawerWidth + 40

const exercises: Exercise[] = [
  {
    name: 'Máquina Extensora',
    equipment: 'Extensora',
    image: maqExtensora,
    sets: [
      { rep: 3, serie: 10, weight: '35kg', date: '15/11/25' },
      { rep: 3, serie: 10, weight: '35kg', date: '08/11/25' },
      { rep: 3, serie: 10, weight: '35kg', date: '02/11/25' },
    ],
  },
  {
    name: 'Bicicleta Ergométrica',
    equipment: 'Bike Ergométrica',
    image: maqBike,
    sets: [
      { rep: 4, serie: 12, weight: 'Corpo', date: '17/11/25' },
      { rep: 4, serie: 12, weight: 'Corpo', date: '10/11/25' },
      { rep: 4, serie: 12, weight: 'Corpo', date: '03/11/25' },
    ],
  },
  {
    name: 'Crucifixo Peitoral',
    equipment: 'Máquina Peitoral',
    image: maqCrucifixo,
    sets: [
      { rep: 3, serie: 12, weight: '25kg', date: '12/11/25' },
      { rep: 3, serie: 12, weight: '25kg', date: '05/11/25' },
      { rep: 3, serie: 12, weight: '25kg', date: '29/10/25' },
    ],
  },
  {
    name: 'Máquina Abdutora',
    equipment: 'Máquina Abdutora',
    image: maqAbdutora,
    sets: [
      { rep: 3, serie: 10, weight: '35kg', date: '15/11/25' },
      { rep: 3, serie: 10, weight: '35kg', date: '08/11/25' },
      { rep: 3, serie: 10, weight: '35kg', date: '02/11/25' },
    ],
  },
]

const profile = {
  name: 'Allan Henrique',
  matricula: '857083',
  idade: 24,
  peso: '79 kg',
  avatar: alunoHomem,
}

export function StudentScreen({ onBackHome }: StudentScreenProps) {
  const [search, setSearch] = useState('')
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({})
  const profilePanelAnim = useMemo(() => new Animated.Value(1), [])

  const filteredExercises = useMemo(() => {
    const query = search.toLowerCase()
    return exercises.filter((exercise) => exercise.name.toLowerCase().includes(query))
  }, [search])

  const toggleCompleted = (exerciseName: string) => {
    setCompletedExercises((prev) => ({
      ...prev,
      [exerciseName]: !prev[exerciseName],
    }))
  }

  const openProfilePanel = () => {
    setIsProfileOpen(true)
    Animated.timing(profilePanelAnim, {
      toValue: 0,
      duration: 180,
      useNativeDriver: true,
    }).start()
  }

  const closeProfilePanel = () => {
    Animated.timing(profilePanelAnim, {
      toValue: 1,
      duration: 160,
      useNativeDriver: true,
    }).start(() => setIsProfileOpen(false))
  }

  const drawerTranslate = useMemo(
    () =>
      profilePanelAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, drawerClosedOffset],
      }),
    [profilePanelAnim],
  )

  const selectedExerciseCompleted = selectedExercise ? completedExercises[selectedExercise.name] : false

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackHome}>
          <BrandWordmark size="lg" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.avatarButton} onPress={openProfilePanel}>
          <Image source={profile.avatar} style={styles.avatar} resizeMode="cover" />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <View style={styles.searchCard}>
          <View style={styles.searchInputWrapper}>
            <View style={styles.searchIcon}>
              <View style={styles.searchCircle} />
              <View style={styles.searchHandle} />
            </View>
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquisar"
              placeholderTextColor="#bfc5d3"
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <View style={styles.filterLineLong} />
            <View style={styles.filterLineMid} />
            <View style={styles.filterLineShort} />
          </TouchableOpacity>
        </View>

        <View style={styles.dayHeader}>
          <View style={styles.dayLine} />
          <Text style={styles.dayTitle}>Segunda-feira</Text>
          <View style={styles.dayLine} />
        </View>

        <ScrollView contentContainerStyle={styles.grid}>
          {filteredExercises.map((exercise) => (
            <TouchableOpacity key={exercise.name} style={styles.card} onPress={() => setSelectedExercise(exercise)}>
              <View style={styles.cardImage}>
                <Image source={exercise.image} style={styles.cardImageInner} resizeMode="contain" />
              </View>
              <View style={styles.cardFooter}>
                <Text style={styles.cardTitle}>{exercise.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {isProfileOpen && (
        <View style={styles.drawerOverlay}>
          <TouchableOpacity style={styles.drawerScrim} onPress={closeProfilePanel} />
          <Animated.View style={[styles.drawerCard, { transform: [{ translateX: drawerTranslate }] }]}>
            <Image source={profile.avatar} style={styles.drawerAvatar} resizeMode="cover" />
            <View style={styles.drawerInfoGroup}>
              <View style={styles.drawerInfoChip}>
                <Text style={styles.drawerInfoText}>Nome: {profile.name}</Text>
              </View>
              <View style={styles.drawerInfoChip}>
                <Text style={styles.drawerInfoText}>Matrícula: {profile.matricula}</Text>
              </View>
              <View style={styles.drawerInfoChip}>
                <Text style={styles.drawerInfoText}>Idade: {profile.idade} anos</Text>
              </View>
              <View style={styles.drawerInfoChip}>
                <Text style={styles.drawerInfoText}>Peso: {profile.peso}</Text>
              </View>
            </View>

            <View style={styles.drawerActionGroup}>
              {[
                { label: 'Avaliar professor', icon: iconAvaliar },
                { label: 'Baixar avaliação', icon: iconFicha },
                { label: 'Alterar senha', icon: iconSenha },
                { label: 'Sair', icon: iconSair },
              ].map((action) => (
                <TouchableOpacity key={action.label} style={styles.drawerAction}>
                  <Image source={action.icon} style={styles.drawerActionIcon} />
                  <Text style={styles.drawerActionText}>{action.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        </View>
      )}

      {selectedExercise && (
        <View style={styles.detailScreen}>
          <View style={styles.detailHeader}>
            <TouchableOpacity style={styles.detailNavButton} onPress={() => setSelectedExercise(null)}>
              <Image source={iconSeta} style={styles.detailNavIcon} />
            </TouchableOpacity>
            <Text style={styles.detailHeaderTitle}>Exercício</Text>
            <Image source={profile.avatar} style={styles.detailHeaderAvatar} />
          </View>

          <ScrollView style={styles.detailScroll} contentContainerStyle={styles.detailContent}>
            <ImageBackground
              source={selectedExercise.image}
              style={styles.detailImage}
              imageStyle={styles.detailImageInner}
            />

            <TouchableOpacity
              style={[styles.detailActionButton, selectedExerciseCompleted && styles.detailActionButtonDone]}
              onPress={() => toggleCompleted(selectedExercise.name)}
            >
              <Text
                style={[
                  styles.detailActionButtonText,
                  selectedExerciseCompleted && styles.detailActionButtonDoneText,
                ]}
              >
                {selectedExerciseCompleted ? 'Concluído' : 'Marcar como concluído'}
              </Text>
            </TouchableOpacity>

            <View style={styles.detailCard}>
              <View style={styles.detailCardHeader}>
                <Text style={styles.detailCardTitle}>{selectedExercise.name}</Text>
              </View>

              {selectedExercise.sets.map((set, index) => (
                <View key={`${selectedExercise.name}-${index}`} style={styles.detailSetRow}>
                  <View style={styles.detailSetCell}>
                    <Text style={styles.detailSetLabel}>Rep</Text>
                    <Text style={styles.detailSetValue}>{set.rep}</Text>
                  </View>
                  <View style={styles.detailSetCell}>
                    <Text style={styles.detailSetLabel}>Série</Text>
                    <Text style={styles.detailSetValue}>{set.serie}</Text>
                  </View>
                  <View style={styles.detailSetCell}>
                    <Text style={styles.detailSetLabel}>Peso</Text>
                    <Text style={styles.detailSetValue}>{set.weight}</Text>
                  </View>
                  <View style={styles.detailSetCell}>
                    <Text style={styles.detailSetLabel}>Data</Text>
                    <Text style={styles.detailSetValue}>{set.date}</Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#083061',
    paddingTop: 24,
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarButton: {
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
  body: {
    flex: 1,
    marginTop: 16,
    backgroundColor: '#fdfdfd',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: -2 },
  },
  searchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f4f6fb',
    borderRadius: 24,
    paddingHorizontal: 10,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  searchIcon: {
    width: 32,
    height: 32,
    marginRight: 10,
    position: 'relative',
  },
  searchCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 3,
    borderColor: '#1e1e1e',
    position: 'absolute',
    top: 4,
    left: 2,
  },
  searchHandle: {
    width: 12,
    height: 3,
    backgroundColor: '#1e1e1e',
    position: 'absolute',
    transform: [{ rotate: '45deg' }],
    bottom: 7,
    right: 4,
    borderRadius: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: '#212227',
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  filterLineLong: {
    width: 22,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#1d1d1f',
  },
  filterLineMid: {
    width: 16,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#1d1d1f',
    marginVertical: 3,
  },
  filterLineShort: {
    width: 10,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#1d1d1f',
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 12,
  },
  dayLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#cfd3df',
  },
  dayTitle: {
    marginHorizontal: 12,
    color: '#0f0f0f',
    fontWeight: '800',
    fontSize: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  card: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 26,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    overflow: 'hidden',
  },
  cardImage: {
    height: 140,
    backgroundColor: '#f0f2f7',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  cardImageInner: {
    width: '100%',
    height: '100%',
  },
  cardFooter: {
    backgroundColor: '#1c47c1',
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#ffffff',
    fontWeight: '700',
    textAlign: 'center',
  },
  drawerOverlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  drawerScrim: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  drawerCard: {
    width: drawerWidth,
    backgroundColor: '#0c3c78',
    borderTopLeftRadius: 28,
    borderBottomLeftRadius: 28,
    padding: 18,
    marginRight: Platform.OS === 'web' ? -20 : -40,
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: -4, height: 0 },
  },
  drawerLogo: {
    width: 150,
    height: 36,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  drawerAvatar: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    marginBottom: 14,
  },
  drawerInfoGroup: {
    marginBottom: 10,
  },
  drawerInfoChip: {
    backgroundColor: '#2b4ad3',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  drawerInfoText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  drawerActionGroup: {
    marginTop: 16,
  },
  drawerAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2b4ad3',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  drawerActionIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  drawerActionText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  detailScreen: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#041b3d',
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 50 : 32,
    paddingBottom: 12,
    paddingHorizontal: 20,
    backgroundColor: '#083061',
  },
  detailNavButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#062549',
  },
  detailNavIcon: {
    width: 20,
    height: 20,
    tintColor: '#ffffff',
    transform: [{ rotate: '180deg' }],
    resizeMode: 'contain',
  },
  detailHeaderTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '800',
  },
  detailHeaderAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  detailScroll: {
    flex: 1,
  },
  detailContent: {
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 60,
    backgroundColor: '#041b3d',
  },
  detailImage: {
    width: '100%',
    height: 260,
    marginTop: 20,
    borderRadius: 22,
    backgroundColor: '#ffffff',
  },
  detailImageInner: {
    borderRadius: 22,
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  detailActionButton: {
    marginTop: 18,
    borderRadius: 20,
    backgroundColor: '#1b4fd1',
    paddingVertical: 12,
    alignItems: 'center',
  },
  detailActionButtonDone: {
    backgroundColor: '#0b2f7d',
    borderWidth: 2,
    borderColor: '#7ee1ff',
  },
  detailActionButtonText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 16,
  },
  detailActionButtonDoneText: {
    color: '#7ee1ff',
  },
  detailCard: {
    marginTop: 18,
    borderRadius: 24,
    backgroundColor: '#0a2c80',
    overflow: 'hidden',
  },
  detailCardHeader: {
    backgroundColor: '#113fba',
    paddingVertical: 14,
    alignItems: 'center',
  },
  detailCardTitle: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 18,
  },
  detailSetRow: {
    flexDirection: 'row',
    padding: 12,
  },
  detailSetCell: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 10,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailSetLabel: {
    color: '#0a2c80',
    fontSize: 12,
    fontWeight: '700',
  },
  detailSetValue: {
    color: '#1a1a1a',
    fontSize: 16,
    fontWeight: '800',
    marginTop: 2,
  },
})
