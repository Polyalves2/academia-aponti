import { useMemo, useState } from 'react'
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import backIcon from '../assets/icon_seta.png'
import studentPhoto from '../assets/aluno_homem.jpg'
import { StudentRegistration } from '../types/admin'

interface AdminStudentFinanceScreenProps {
  registration: StudentRegistration
  onBack: () => void
}

const lancamentoOptions = ['Atrasado', 'Cancelado', 'Cortesia', 'Pago', 'Pendente'] as const
const statusOptions = ['Ativo', 'Inativo'] as const

export function AdminStudentFinanceScreen({ registration, onBack }: AdminStudentFinanceScreenProps) {
  const [tipoLancamento, setTipoLancamento] = useState<(typeof lancamentoOptions)[number]>(
    registration.tipoLancamento || 'Pendente',
  )
  const [statusPlano, setStatusPlano] = useState<(typeof statusOptions)[number]>(
    registration.statusPlano || 'Ativo',
  )
  const [openDropdown, setOpenDropdown] = useState<'lancamento' | 'status' | null>(null)

  const nome = registration.nome || 'Aluno'
  const cpf = registration.cpf || '00000000000'
  const matricula = useMemo(() => (registration.id ? registration.id.slice(-6) : '857083'), [registration.id])
  const plano = registration.plano || 'Verao'
  const frequencia = registration.frequencia || '10'
  const valor = registration.valor || 'R$ 120,00'
  const competencia = registration.competencia || 'Janeiro'
  const vencimento = registration.vencimento || '12/01/2026'
  const email = registration.email || 'email@forma.com'
  const observacao = registration.observacao || 'Observacoes'
  const cep = registration.cep || '00000-000'
  const bairro = registration.bairro || 'Bairro'
  const endereco = registration.endereco || 'Endereco'
  const numero = registration.numero || '0000'
  const instituicao = registration.instituicao || 'Instituicao de Ensino'

  const toggleDropdown = (key: 'lancamento' | 'status') => {
    setOpenDropdown((prev) => (prev === key ? null : key))
  }

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
        <View style={styles.card}>
          <View style={styles.photoWrap}>
            <Image source={studentPhoto} style={styles.photo} resizeMode="cover" />
            <View style={styles.closeBadge}>
              <Text style={styles.closeText}>x</Text>
            </View>
          </View>

          <Text style={styles.frequency}>
            Frequência: <Text style={styles.frequencyValue}>{frequencia}</Text>
          </Text>

          <Field label="Nome completo:" value={nome} />

          <View style={styles.row}>
            <Field label="CPF:" value={cpf} flex />
            <Field label="Matrícula:" value={matricula} flex />
          </View>

          <Dropdown
            label="Tipo de lançamento"
            value={tipoLancamento}
            open={openDropdown === 'lancamento'}
            onToggle={() => toggleDropdown('lancamento')}
            options={lancamentoOptions}
            onSelect={(value) => {
              setTipoLancamento(value)
              setOpenDropdown(null)
            }}
          />

          <Field label="Tipo de plano contrato" value={plano} />

          <View style={styles.row}>
            <Field label="Tipo de plano" value={plano} flex />
            <Field label="Valor" value={valor} flex />
          </View>

          <View style={styles.row}>
            <Field label="Competência" value={competencia} flex />
            <Field label="Vencimento" value={vencimento} flex />
          </View>

          <Dropdown
            label="Status do plano"
            value={statusPlano}
            open={openDropdown === 'status'}
            onToggle={() => toggleDropdown('status')}
            options={statusOptions}
            onSelect={(value) => {
              setStatusPlano(value)
              setOpenDropdown(null)
            }}
          />

          <Field label="E-mail" value={email} />

          <Field label="Observação" value={observacao} />

          <View style={styles.row}>
            <Field label="CEP" value={cep} flex />
            <Field label="Bairro" value={bairro} flex />
          </View>

          <View style={styles.row}>
            <Field label="Endereço" value={endereco} flex />
            <Field label="Número" value={numero} flex />
          </View>

          <Field label="Instituição de Ensino" value={instituicao} />
        </View>
      </ScrollView>
    </View>
  )
}

interface FieldProps {
  label: string
  value: string
  flex?: boolean
}

function Field({ label, value, flex }: FieldProps) {
  return (
    <View style={[styles.field, flex && styles.fieldFlex]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueBox}>
        <Text style={styles.valueText}>{value}</Text>
      </View>
    </View>
  )
}

interface DropdownProps<T extends string> {
  label: string
  value: T
  open: boolean
  options: readonly T[]
  onToggle: () => void
  onSelect: (value: T) => void
  compact?: boolean
}

function Dropdown<T extends string>({
  label,
  value,
  open,
  options,
  onToggle,
  onSelect,
  compact,
}: DropdownProps<T>) {
  return (
    <View style={[styles.field, compact && styles.fieldCompact]}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.dropdownField} onPress={onToggle} activeOpacity={0.8}>
        <Text style={styles.dropdownValue}>{value}</Text>
        <Text style={styles.dropdownIcon}>{open ? '^' : 'v'}</Text>
      </TouchableOpacity>
      <Modal transparent visible={open} animationType="fade" onRequestClose={onToggle}>
        <Pressable style={styles.modalOverlay} onPress={onToggle}>
          <Pressable style={styles.modalCard}>
            <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator contentContainerStyle={styles.modalContent}>
              {options.map((option) => (
                <Pressable key={option} style={styles.dropdownOption} onPress={() => onSelect(option)}>
                  <Text style={styles.dropdownOptionText}>{option}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
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
    paddingHorizontal: 18,
    paddingBottom: 26,
  },
  card: {
    backgroundColor: '#f1f1f4',
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
  },
  photoWrap: {
    alignSelf: 'center',
    marginTop: -6,
    marginBottom: 10,
    width: 90,
    height: 90,
    borderRadius: 45,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photo: {
    width: '100%',
    height: '140%',
    transform: [{ translateY: 24 }],
  },
  closeBadge: {
    position: 'absolute',
    right: -8,
    top: -8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2b2b2b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: '#ffffff',
    fontWeight: '800',
  },
  frequency: {
    textAlign: 'center',
    color: '#6a6f86',
    fontWeight: '700',
    marginBottom: 8,
  },
  frequencyValue: {
    color: '#3b53a6',
    fontWeight: '800',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  field: {
    marginBottom: 12,
  },
  fieldCompact: {
    flex: 1,
  },
  fieldFlex: {
    flex: 1,
  },
  label: {
    color: '#4862cc',
    fontWeight: '800',
    marginBottom: 6,
  },
  valueBox: {
    backgroundColor: '#dedede',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  valueText: {
    color: '#1c1c1c',
    fontWeight: '600',
  },
  dropdownField: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#cfd4e6',
  },
  dropdownValue: {
    color: '#1d2b6a',
    fontWeight: '700',
  },
  dropdownIcon: {
    color: '#1d2b6a',
    fontWeight: '800',
  },
  dropdownOption: {
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  dropdownOptionText: {
    color: '#1d2b6a',
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(8, 15, 30, 0.35)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modalCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 6,
    maxHeight: 320,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
  },
  modalScroll: {
    maxHeight: 300,
  },
  modalContent: {
    paddingVertical: 4,
  },
})
