import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useMemo, useState } from 'react'
import backIcon from '../assets/icon_seta.png'
import studentPhoto from '../assets/aluno_homem.jpg'
import studentFemalePhoto from '../assets/aluna_mulher.png'
import { StudentRegistration } from '../types/admin'

interface AdminStudentListScreenProps {
  registrations: StudentRegistration[]
  onBack: () => void
  onSelect: (registration: StudentRegistration) => void
  title?: string
}

const mockStudents: StudentRegistration[] = [
  {
    id: '857083',
    nome: 'Allan Henrique',
    nascimento: '10/02/2000',
    peso: '79',
    genero: 'Masculino',
    cpf: '06789009845',
    email: 'allan@forma.com',
    observacao: 'Aluno ativo',
    cep: '01000-000',
    bairro: 'Centro',
    endereco: 'Av. Brasil',
    numero: '1200',
    instituicao: 'Forma Academia',
    plano: 'Verao',
    frequencia: '25',
    valor: 'R$ 120,00',
    competencia: 'Janeiro',
    vencimento: '12/01/2026',
    tipoLancamento: 'Pendente',
    statusPlano: 'Ativo',
  },
  {
    id: '423678',
    nome: 'Ana Clara',
    nascimento: '',
    peso: '',
    genero: 'Feminino',
    cpf: '01234567890',
    email: 'ana@forma.com',
    observacao: '',
    cep: '',
    bairro: '',
    endereco: '',
    numero: '',
    instituicao: '',
    plano: 'Inverno',
    frequencia: '0',
    valor: 'R$ 110,00',
    competencia: 'Janeiro',
    vencimento: '12/01/2026',
    tipoLancamento: 'Pago',
    statusPlano: 'Ativo',
  },
  {
    id: '643790',
    nome: 'Cibili Santos',
    nascimento: '',
    peso: '',
    genero: 'Feminino',
    cpf: '11122233344',
    email: 'cibili@forma.com',
    observacao: '',
    cep: '',
    bairro: '',
    endereco: '',
    numero: '',
    instituicao: '',
    plano: 'Verao',
    frequencia: '21',
    valor: 'R$ 120,00',
    competencia: 'Janeiro',
    vencimento: '12/01/2026',
    tipoLancamento: 'Pendente',
    statusPlano: 'Ativo',
  },
  {
    id: '543789',
    nome: 'Eric de Melo',
    nascimento: '',
    peso: '',
    genero: 'Masculino',
    cpf: '22233344455',
    email: 'eric@forma.com',
    observacao: '',
    cep: '',
    bairro: '',
    endereco: '',
    numero: '',
    instituicao: '',
    plano: 'Verao',
    frequencia: '21',
    valor: 'R$ 120,00',
    competencia: 'Janeiro',
    vencimento: '12/01/2026',
    tipoLancamento: 'Pendente',
    statusPlano: 'Ativo',
  },
  {
    id: '757699',
    nome: 'Jose Matheus',
    nascimento: '',
    peso: '',
    genero: 'Masculino',
    cpf: '33344455566',
    email: 'jose@forma.com',
    observacao: '',
    cep: '',
    bairro: '',
    endereco: '',
    numero: '',
    instituicao: '',
    plano: 'Verao',
    frequencia: '15',
    valor: 'R$ 120,00',
    competencia: 'Janeiro',
    vencimento: '12/01/2026',
    tipoLancamento: 'Pendente',
    statusPlano: 'Ativo',
  },
  {
    id: '144567',
    nome: 'Maria Rita',
    nascimento: '',
    peso: '',
    genero: 'Feminino',
    cpf: '44455566677',
    email: 'maria.rita@forma.com',
    observacao: '',
    cep: '',
    bairro: '',
    endereco: '',
    numero: '',
    instituicao: '',
    plano: 'Inverno',
    frequencia: '23',
    valor: 'R$ 110,00',
    competencia: 'Janeiro',
    vencimento: '12/01/2026',
    tipoLancamento: 'Pago',
    statusPlano: 'Ativo',
  },
  {
    id: '535677',
    nome: 'Mario de Lima',
    nascimento: '',
    peso: '',
    genero: 'Masculino',
    cpf: '55566677788',
    email: 'mario@forma.com',
    observacao: '',
    cep: '',
    bairro: '',
    endereco: '',
    numero: '',
    instituicao: '',
    plano: 'Verao',
    frequencia: '5',
    valor: 'R$ 120,00',
    competencia: 'Janeiro',
    vencimento: '12/01/2026',
    tipoLancamento: 'Pendente',
    statusPlano: 'Ativo',
  },
  {
    id: '534797',
    nome: 'Maria Vitoria',
    nascimento: '',
    peso: '',
    genero: 'Feminino',
    cpf: '66677788899',
    email: 'maria.vitoria@forma.com',
    observacao: '',
    cep: '',
    bairro: '',
    endereco: '',
    numero: '',
    instituicao: '',
    plano: 'Verao',
    frequencia: '10',
    valor: 'R$ 120,00',
    competencia: 'Janeiro',
    vencimento: '12/01/2026',
    tipoLancamento: 'Pendente',
    statusPlano: 'Ativo',
  },
  {
    id: '534566',
    nome: 'Ricardo Souza',
    nascimento: '',
    peso: '',
    genero: 'Masculino',
    cpf: '77788899900',
    email: 'ricardo@forma.com',
    observacao: '',
    cep: '',
    bairro: '',
    endereco: '',
    numero: '',
    instituicao: '',
    plano: 'Verao',
    frequencia: '5',
    valor: 'R$ 120,00',
    competencia: 'Janeiro',
    vencimento: '12/01/2026',
    tipoLancamento: 'Pendente',
    statusPlano: 'Ativo',
  },
  {
    id: '682314',
    nome: 'Sofia Almeida',
    nascimento: '',
    peso: '',
    genero: 'Feminino',
    cpf: '88899900011',
    email: 'sofia@forma.com',
    observacao: '',
    cep: '',
    bairro: '',
    endereco: '',
    numero: '',
    instituicao: '',
    plano: 'Verao',
    frequencia: '1',
    valor: 'R$ 120,00',
    competencia: 'Janeiro',
    vencimento: '12/01/2026',
    tipoLancamento: 'Pendente',
    statusPlano: 'Ativo',
  },
]

export function AdminStudentListScreen({
  registrations,
  onBack,
  onSelect,
  title = '',
}: AdminStudentListScreenProps) {
  const [query, setQuery] = useState('')
  const normalize = (value: string) =>
    value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const list = useMemo(() => {
    const merged = new Map<string, StudentRegistration>()
    mockStudents.forEach((student) => merged.set(student.id, student))
    registrations.forEach((student) => merged.set(student.id, student))
    return Array.from(merged.values())
  }, [registrations])
  const formatMatricula = (id: string) => {
    if (!id) {
      return '0000'
    }
    return id.slice(-4)
  }
  const ordered = [...list].sort((a, b) =>
    (a.nome || '').localeCompare(b.nome || '', 'pt-BR', { sensitivity: 'base' }),
  )
  const filtered = useMemo(() => {
    const term = normalize(query.trim())
    if (!term) {
      return ordered
    }
    return ordered.filter((student) => {
      const name = normalize(student.nome || '')
      const matricula = normalize(formatMatricula(student.id))
      return name.includes(term) || matricula.includes(term)
    })
  }, [ordered, query])

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>
        {title ? <Text style={styles.headerTitle}>{title}</Text> : <View style={styles.headerSpacer} />}
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchIcon}>
          <View style={styles.searchLens} />
          <View style={styles.searchHandle} />
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Alunos matriculados"
          placeholderTextColor="#9aa2b1"
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <ScrollView contentContainerStyle={styles.list} bounces keyboardShouldPersistTaps="handled">
      {filtered
        .filter((student) => {
          const name = (student.nome || '').trim()
          return name && normalize(name) !== 'aluno'
        })
        .map((student) => {
          const isAllan = (student.nome || '').toLowerCase().includes('allan')
          return (
            <TouchableOpacity
              key={student.id}
              style={styles.item}
              onPress={() => {
                if (isAllan) {
                  onSelect(student)
                }
              }}
              activeOpacity={isAllan ? 0.7 : 1}
            >
              {student.genero === 'Feminino' ? (
                <View style={styles.avatarFrame}>
                  <Image source={studentFemalePhoto} style={styles.avatarFemaleImage} />
                </View>
              ) : (
                <View style={styles.avatarFrame}>
                  <Image source={studentPhoto} style={styles.avatar} />
                </View>
              )}
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{student.nome || 'Aluno'}</Text>
                <Text style={styles.itemSub}>
                  Matricula: {formatMatricula(student.id)}
                </Text>
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
  itemSub: {
    color: '#5a647a',
    marginTop: 2,
    fontSize: 12,
  },
  itemArrow: {
    color: '#9aa4bd',
    fontWeight: '800',
    fontSize: 16,
  },
})
