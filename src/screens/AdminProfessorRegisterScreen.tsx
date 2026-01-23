import { useEffect, useRef, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import backIcon from '../assets/icon_seta.png'

interface AdminProfessorRegisterScreenProps {
  onBack: () => void
}

export function AdminProfessorRegisterScreen({ onBack }: AdminProfessorRegisterScreenProps) {
  const [nome, setNome] = useState('')
  const [idade, setIdade] = useState('')
  const [peso, setPeso] = useState('')
  const [cpf, setCpf] = useState('')
  const [cref, setCref] = useState('')
  const [email, setEmail] = useState('')
  const [contato1, setContato1] = useState('')
  const [contato2, setContato2] = useState('')
  const [observacao, setObservacao] = useState('')
  const [cep, setCep] = useState('')
  const [nascimento, setNascimento] = useState('')
  const [endereco, setEndereco] = useState('')
  const [numero, setNumero] = useState('')
  const [maisInformacoes, setMaisInformacoes] = useState('')
  const [instituicao, setInstituicao] = useState('')
  const [feedback, setFeedback] = useState('')
  const returnTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (returnTimeoutRef.current) {
        clearTimeout(returnTimeoutRef.current)
      }
    }
  }, [])

  const handleSubmit = () => {
    setFeedback('Professor cadastrado com sucesso.')
    if (returnTimeoutRef.current) {
      clearTimeout(returnTimeoutRef.current)
    }
    returnTimeoutRef.current = setTimeout(() => {
      onBack()
    }, 700)
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cadastro de dados do professor</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} bounces keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <FormField
            label="Nome do professor:"
            placeholder="Digite seu nome completo"
            value={nome}
            onChangeText={setNome}
          />

          <View style={styles.row}>
            <FormField label="Idade:" placeholder="Digite sua idade" value={idade} onChangeText={setIdade} flex />
            <FormField label="Peso:" placeholder="Digite seu peso" value={peso} onChangeText={setPeso} flex />
          </View>

          <FormField label="CPF:" placeholder="Digite seu CPF" value={cpf} onChangeText={setCpf} />
          <FormField label="CREF:" placeholder="Digite sua CREF" value={cref} onChangeText={setCref} />
          <FormField label="E-mail" placeholder="E-mail" value={email} onChangeText={setEmail} />
          <FormField label="Contato 1:" placeholder="Contato do aluno" value={contato1} onChangeText={setContato1} />
          <FormField label="Contato 2:" placeholder="Contato de Emer" value={contato2} onChangeText={setContato2} />
          <FormField label="Observações" placeholder="Observações" value={observacao} onChangeText={setObservacao} />
          <FormField label="CEP" placeholder="00000-000" value={cep} onChangeText={setCep} />
          <FormField label="Nascimento" placeholder="Digite sua idade" value={nascimento} onChangeText={setNascimento} />
          <FormField label="Endereço" placeholder="Digite seu endereço" value={endereco} onChangeText={setEndereco} />
          <FormField label="Número" placeholder="0000" value={numero} onChangeText={setNumero} />
          <FormField
            label="Mais informações"
            placeholder=""
            value={maisInformacoes}
            onChangeText={setMaisInformacoes}
          />
          <FormField
            label="Instituição de Ensino"
            placeholder="Digite"
            value={instituicao}
            onChangeText={setInstituicao}
          />

          <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85} onPress={handleSubmit}>
            <Text style={styles.primaryButtonText}>Cadastrar dados</Text>
          </TouchableOpacity>

          {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}
        </View>
      </ScrollView>
    </View>
  )
}

interface FormFieldProps {
  label: string
  placeholder: string
  value: string
  onChangeText: (value: string) => void
  flex?: boolean
}

function FormField({ label, placeholder, value, onChangeText, flex }: FormFieldProps) {
  return (
    <View style={[styles.field, flex && styles.fieldFlex]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#9fa5b5"
        value={value}
        onChangeText={onChangeText}
      />
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
  },
  card: {
    backgroundColor: '#f7f7fb',
    borderRadius: 22,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  field: {
    marginBottom: 14,
  },
  fieldFlex: {
    flex: 1,
  },
  label: {
    color: '#1e3160',
    fontWeight: '800',
    marginBottom: 8,
    fontSize: 14,
  },
  input: {
    backgroundColor: '#eef1f7',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    color: '#1b1b1b',
    borderWidth: 1,
    borderColor: '#d2d8e6',
    fontSize: 16,
    lineHeight: 20,
  },
  primaryButton: {
    marginTop: 6,
    backgroundColor: '#3b53a6',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '800',
  },
  feedback: {
    color: '#1e3160',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 10,
  },
})
