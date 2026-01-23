import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useMemo, useState } from 'react'
import backIcon from '../assets/icon_seta.png'
import studentPhoto from '../assets/aluno_homem.jpg'
import professorFemalePhoto from '../assets/aluna_mulher.png'

interface AdminProfessorListScreenProps {
  onBack: () => void
  onSelect?: () => void
}

const professors = [
  { id: '1', nome: 'Alice Santos', genero: 'Feminino' },
  { id: '2', nome: 'Ana Clara Souza', genero: 'Feminino' },
  { id: '3', nome: 'Clara Mendes', genero: 'Feminino' },
  { id: '4', nome: 'Ellen Fernanda da Silva Lima', genero: 'Feminino' },
  { id: '5', nome: 'Paulo Henrique Silva', genero: 'Masculino' },
]

export function AdminProfessorListScreen({ onBack, onSelect }: AdminProfessorListScreenProps) {
  const [query, setQuery] = useState('')
  const normalize = (value: string) =>
    value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const filtered = useMemo(() => {
    const term = normalize(query.trim())
    if (!term) {
      return professors
    }
    return professors.filter((professor) => normalize(professor.nome).includes(term))
  }, [query])
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Admin</Text>
        <Image source={studentPhoto} style={styles.headerAvatar} />
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchIcon}>
          <View style={styles.searchLens} />
          <View style={styles.searchHandle} />
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar professor"
          placeholderTextColor="#9aa2b1"
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <ScrollView contentContainerStyle={styles.list} bounces keyboardShouldPersistTaps="handled">
        {filtered.map((professor) => {
          const isEllen = professor.nome.toLowerCase().includes('ellen')
          return (
            <TouchableOpacity
              key={professor.id}
              style={styles.item}
              activeOpacity={isEllen ? 0.8 : 1}
              onPress={() => {
                if (isEllen) {
                  onSelect?.()
                }
              }}
            >
            {professor.genero === 'Feminino' ? (
              <View style={styles.avatarFrame}>
                <Image source={professorFemalePhoto} style={styles.avatarFemaleImage} />
              </View>
            ) : (
              <View style={styles.avatarFrame}>
                <Image source={studentPhoto} style={styles.avatar} />
              </View>
            )}
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{professor.nome}</Text>
            </View>
            <Text style={styles.itemArrow}>{'>'}</Text>
            </TouchableOpacity>
          )
        })}
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
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 18,
    marginBottom: 8,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#d0d6e4',
  },
  searchIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
    position: 'relative',
  },
  searchLens: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#8f97a8',
  },
  searchHandle: {
    position: 'absolute',
    width: 7,
    height: 2,
    backgroundColor: '#8f97a8',
    right: 0,
    bottom: 1,
    transform: [{ rotate: '45deg' }],
    borderRadius: 1,
  },
  searchInput: {
    flex: 1,
    color: '#1b1b1b',
    paddingVertical: 2,
    fontSize: 15,
    minHeight: 22,
  },
  list: {
    paddingHorizontal: 18,
    paddingBottom: 20,
    gap: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  avatar: {
    width: '100%',
    height: '140%',
    transform: [{ translateY: 12 }],
  },
  avatarFrame: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarFemaleImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    color: '#2e3f84',
    fontWeight: '800',
  },
  itemArrow: {
    color: '#9aa4bd',
    fontWeight: '800',
    fontSize: 16,
  },
})
