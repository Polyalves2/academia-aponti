import { useState } from 'react'
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import backIcon from '../assets/icon_seta.png'
import { StudentRegistration } from '../types/admin'

interface AdminStudentRegisterScreenProps {
  onBack: () => void
  onSubmit: (data: StudentRegistration) => void
}

export function AdminStudentRegisterScreen({ onBack, onSubmit }: AdminStudentRegisterScreenProps) {
  const [nome, setNome] = useState('')
  const [nascimento, setNascimento] = useState('')
  const [peso, setPeso] = useState('')
  const [genero, setGenero] = useState<'Feminino' | 'Masculino' | ''>('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [observacao, setObservacao] = useState('')
  const [cep, setCep] = useState('')
  const [bairro, setBairro] = useState('')
  const [endereco, setEndereco] = useState('')
  const [numero, setNumero] = useState('')
  const [instituicao, setInstituicao] = useState('')
  const [plano, setPlano] = useState<'Verao' | 'Inverno' | ''>('')
  const [valor, setValor] = useState('R$ 120,00')
  const [competencia, setCompetencia] = useState('Janeiro')
  const [vencimento, setVencimento] = useState('12/01/2026')
  const [tipoLancamento, setTipoLancamento] = useState<
    'Pendente' | 'Pago' | 'Atrasado' | 'Cancelado' | 'Cortesia' | ''
  >('Pendente')
  const [statusPlano, setStatusPlano] = useState<'Ativo' | 'Inativo' | ''>('Ativo')

  const handleSubmit = () => {
    const registration: StudentRegistration = {
      id: `${Date.now()}`,
      nome,
      nascimento,
      peso,
      genero,
      cpf,
      email,
      observacao,
      cep,
      bairro,
      endereco,
      numero,
      instituicao,
      plano,
      frequencia: '',
      valor,
      competencia,
      vencimento,
      tipoLancamento,
      statusPlano,
    }

    onSubmit(registration)
    Alert.alert('Dados cadastrados', 'c.')
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cadastro de dados do aluno 1</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} bounces={false}>
        <View style={styles.card}>
          <FormField
            label="Nome completo:"
            placeholder="Digite seu nome completo"
            value={nome}
            onChangeText={setNome}
          />

          <View style={styles.row}>
            <FormField
              label="Data de Nascimento"
              placeholder="00/00/0000"
              value={nascimento}
              onChangeText={setNascimento}
              flex
            />
            <FormField label="Peso:" placeholder="Digite seu peso" value={peso} onChangeText={setPeso} flex />
          </View>

          <View style={styles.row}>
            <GenderOption label="Feminino" active={genero === 'Feminino'} onPress={setGenero} />
            <GenderOption label="Masculino" active={genero === 'Masculino'} onPress={setGenero} />
          </View>

          <FormField label="CPF:" placeholder="Digite seu CPF" value={cpf} onChangeText={setCpf} />
          <FormField label="E-mail" placeholder="E-mail" value={email} onChangeText={setEmail} />
          <FormField
            label="Observacao"
            placeholder="Observacoes"
            value={observacao}
            onChangeText={setObservacao}
          />
          <FormField label="Cep" placeholder="00000-000" value={cep} onChangeText={setCep} />
          <FormField label="Bairro" placeholder="Digite seu bairro" value={bairro} onChangeText={setBairro} />
          <FormField
            label="Endereco"
            placeholder="Digite seu endereco"
            value={endereco}
            onChangeText={setEndereco}
          />
          <FormField label="Numero" placeholder="0000" value={numero} onChangeText={setNumero} />
          <FormField
            label="Instituicao de Ensino"
            placeholder="Digite"
            value={instituicao}
            onChangeText={setInstituicao}
          />
          <PlanPicker selected={plano} onSelect={setPlano} />

          <FinanceDropdown
            label="Tipo de Lancamento"
            value={tipoLancamento}
            options={['Pendente', 'Pago', 'Atrasado', 'Cancelado', 'Cortesia']}
            onSelect={setTipoLancamento}
          />

          <View style={styles.row}>
            <ReadOnlyField label="Tipo de plano" value={plano || 'Plano'} flex />
            <FormField label="Valor" placeholder="R$ 0,00" value={valor} onChangeText={setValor} flex />
          </View>

          <View style={styles.row}>
            <FormField
              label="Competencia"
              placeholder="Mes"
              value={competencia}
              onChangeText={setCompetencia}
              flex
            />
            <FormField
              label="Vencimento"
              placeholder="00/00/0000"
              value={vencimento}
              onChangeText={setVencimento}
              flex
            />
          </View>

          <View style={styles.row}>
            <ReadOnlyField label="Tipo de lancamento" value={tipoLancamento || 'Pendente'} flex />
            <FinanceDropdown
              label="Status do plano"
              value={statusPlano}
              options={['Ativo', 'Inativo']}
              onSelect={setStatusPlano}
              compact
            />
          </View>

          <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85} onPress={handleSubmit}>
            <Text style={styles.primaryButtonText}>Cadastrar dados</Text>
          </TouchableOpacity>
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

interface ReadOnlyFieldProps {
  label: string
  value: string
  flex?: boolean
}

function ReadOnlyField({ label, value, flex }: ReadOnlyFieldProps) {
  return (
    <View style={[styles.field, flex && styles.fieldFlex]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.readonlyBox}>
        <Text style={styles.readonlyValue}>{value}</Text>
      </View>
    </View>
  )
}

interface GenderOptionProps {
  label: 'Feminino' | 'Masculino'
  active: boolean
  onPress: (value: 'Feminino' | 'Masculino') => void
}

function GenderOption({ label, active, onPress }: GenderOptionProps) {
  return (
    <TouchableOpacity style={styles.genderRow} activeOpacity={0.8} onPress={() => onPress(label)}>
      <Text style={styles.genderLabel}>{label}</Text>
      <View style={[styles.genderBox, active && styles.genderBoxActive]}>
        {active ? <Text style={styles.genderMark}>x</Text> : null}
      </View>
    </TouchableOpacity>
  )
}

interface PlanPickerProps {
  selected: 'Verao' | 'Inverno' | ''
  onSelect: (value: 'Verao' | 'Inverno') => void
}

function PlanPicker({ selected, onSelect }: PlanPickerProps) {
  const [open, setOpen] = useState(false)
  const label = selected || 'Plano'

  return (
    <View style={styles.field}>
      <Text style={styles.label}>Tipo de plano contrato</Text>
      <View style={styles.planWrapper}>
        <TouchableOpacity
          style={styles.planField}
          activeOpacity={0.8}
          onPress={() => setOpen((prev) => !prev)}
        >
          <Text style={styles.planValue}>{label}</Text>
          <Text style={styles.planIcon}>{open ? '^' : 'v'}</Text>
        </TouchableOpacity>

        {open ? (
          <View style={styles.planList}>
            {(['Verao', 'Inverno'] as const).map((plan) => {
              const active = plan === selected
              return (
                <TouchableOpacity
                  key={plan}
                  style={[styles.planOption, active && styles.planOptionActive]}
                  onPress={() => {
                    onSelect(plan)
                    setOpen(false)
                  }}
                >
                  <Text style={[styles.planOptionText, active && styles.planOptionTextActive]}>{plan}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
        ) : null}
      </View>
    </View>
  )
}

interface FinanceDropdownProps<T extends string> {
  label: string
  value: T
  options: readonly T[]
  onSelect: (value: T) => void
  compact?: boolean
}

function FinanceDropdown<T extends string>({
  label,
  value,
  options,
  onSelect,
  compact,
}: FinanceDropdownProps<T>) {
  const [open, setOpen] = useState(false)

  return (
    <View style={[styles.field, compact && styles.fieldFlex]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.planWrapper}>
        <TouchableOpacity
          style={styles.planField}
          activeOpacity={0.8}
          onPress={() => setOpen((prev) => !prev)}
        >
          <Text style={styles.planValue}>{value}</Text>
          <Text style={styles.planIcon}>{open ? '^' : 'v'}</Text>
        </TouchableOpacity>

        {open ? (
          <View style={styles.planList}>
            {options.map((option) => {
              const active = option === value
              return (
                <TouchableOpacity
                  key={option}
                  style={[styles.planOption, active && styles.planOptionActive]}
                  onPress={() => {
                    onSelect(option)
                    setOpen(false)
                  }}
                >
                  <Text style={[styles.planOptionText, active && styles.planOptionTextActive]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
        ) : null}
      </View>
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
  readonlyBox: {
    backgroundColor: '#eef1f7',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#d2d8e6',
  },
  readonlyValue: {
    color: '#1b1b1b',
    fontWeight: '600',
  },
  genderRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#eef1f7',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#d2d8e6',
  },
  genderLabel: {
    color: '#1e3160',
    fontWeight: '800',
    fontSize: 15,
  },
  genderBox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#aab3c7',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  genderBoxActive: {
    borderColor: '#3b53a6',
    backgroundColor: '#e3e6f3',
  },
  genderMark: {
    color: '#1e3160',
    fontWeight: '800',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  planWrapper: {
    position: 'relative',
  },
  planField: {
    backgroundColor: '#eef1f7',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#d2d8e6',
  },
  planValue: {
    color: '#1e3160',
    fontWeight: '700',
    fontSize: 15,
  },
  planIcon: {
    color: '#1e3160',
    fontWeight: '800',
    fontSize: 14,
  },
  planList: {
    marginTop: 8,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d2d8e6',
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  planOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  planOptionActive: {
    backgroundColor: '#e3e6f3',
  },
  planOptionText: {
    color: '#1e3160',
    fontWeight: '700',
    fontSize: 15,
  },
  planOptionTextActive: {
    color: '#0f1b3d',
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
})
