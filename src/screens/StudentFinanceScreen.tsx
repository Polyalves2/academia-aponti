import { useEffect, useState } from 'react'
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import backIcon from '../assets/icon_seta.png'
import studentPhoto from '../assets/aluno_homem.jpg'

interface StudentFinanceScreenProps {
  onBack: () => void
}

const monthlyBills = [
  { month: 'Janeiro', status: 'Pago', dueDate: '10/01/2026', amount: 'R$ 129,90' },
  { month: 'Fevereiro', status: 'Pendente', dueDate: '10/02/2026', amount: 'R$ 129,90' },
  { month: 'Marco', status: 'Pendente', dueDate: '10/03/2026', amount: 'R$ 129,90' },
  { month: 'Abril', status: 'Pendente', dueDate: '10/04/2026', amount: 'R$ 129,90' },
  { month: 'Maio', status: 'Pendente', dueDate: '10/05/2026', amount: 'R$ 129,90' },
  { month: 'Junho', status: 'Pendente', dueDate: '10/06/2026', amount: 'R$ 129,90' },
  { month: 'Julho', status: 'Pendente', dueDate: '10/07/2026', amount: 'R$ 129,90' },
  { month: 'Agosto', status: 'Pendente', dueDate: '10/08/2026', amount: 'R$ 129,90' },
  { month: 'Setembro', status: 'Pendente', dueDate: '10/09/2026', amount: 'R$ 129,90' },
  { month: 'Outubro', status: 'Pendente', dueDate: '10/10/2026', amount: 'R$ 129,90' },
  { month: 'Novembro', status: 'Pendente', dueDate: '10/11/2026', amount: 'R$ 129,90' },
  { month: 'Dezembro', status: 'Pendente', dueDate: '10/12/2026', amount: 'R$ 129,90' },
]

export function StudentFinanceScreen({ onBack }: StudentFinanceScreenProps) {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const pendingBills = monthlyBills.filter((bill) => bill.status !== 'Pago')
  const selectedBill = pendingBills.find((bill) => bill.month === selectedMonth) ?? null
  useEffect(() => {
    if (!pendingBills.some((bill) => bill.month === selectedMonth)) {
      setSelectedMonth(null)
    }
  }, [pendingBills, selectedMonth])

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Financeiro</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} bounces keyboardShouldPersistTaps="handled">
        <View style={styles.profileCard}>
          <View style={styles.profilePhotoFrame}>
            <Image source={studentPhoto} style={styles.profilePhoto} />
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.profileStatus}>Status: Ativo</Text>
          </View>
          <View style={styles.sectionButton}>
            <Text style={styles.sectionButtonText}>Financeiro</Text>
          </View>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.infoLine}>
            <Text style={styles.infoLabel}>Aluno: </Text>
            <Text style={styles.infoValue}>Allan Henrique Barbosa da Silva</Text>
          </Text>
          <Text style={styles.infoLine}>
            <Text style={styles.infoLabel}>Matricula: </Text>
            <Text style={styles.infoValue}>857083</Text>
          </Text>
          <Text style={styles.infoLine}>
            <Text style={styles.infoLabel}>E-mail: </Text>
            <Text style={styles.infoValue}>allan.henrique@gmail.com</Text>
          </Text>
          <Text style={styles.infoLine}>
            <Text style={styles.infoLabel}>Plano: </Text>
            <Text style={styles.infoValue}>Verao</Text>
          </Text>
        </View>

        <View style={styles.dropdownCard}>
          <View style={styles.dropdownHeader}>
            <TouchableOpacity
              style={[styles.dropdownPill, isDropdownOpen && styles.dropdownPillActive]}
              onPress={() => setIsDropdownOpen((prev) => !prev)}
            >
              <Text style={[styles.dropdownTitle, isDropdownOpen && styles.dropdownTitleActive]}>Mensalidades</Text>
              <View style={[styles.dropdownChevron, isDropdownOpen && styles.dropdownChevronActive]} />
            </TouchableOpacity>
            <View style={styles.closeSpacer} />
          </View>

          <View style={styles.selectionBox}>
            <View style={styles.selectionColumn}>
              <Text style={styles.selectionLabel}>Mes</Text>
              <Text style={styles.selectionValue}>{selectedBill ? selectedBill.month : 'Selecione um mes'}</Text>
            </View>
            <View style={styles.selectionDivider} />
            <View style={styles.selectionColumn}>
              <Text style={styles.selectionLabel}>Valor</Text>
              <Text style={styles.selectionValue}>{selectedBill ? selectedBill.amount : '--'}</Text>
            </View>
          </View>

          {isDropdownOpen ? (
            <View style={styles.monthList}>
              <ScrollView
                style={styles.monthScroll}
                contentContainerStyle={styles.monthScrollContent}
                showsVerticalScrollIndicator
              >
                {pendingBills.map((bill) => (
                  <Pressable
                    key={bill.month}
                    style={({ hovered, pressed }) => [
                      styles.monthRow,
                      hovered && styles.monthRowHover,
                      pressed && styles.monthRowPressed,
                      selectedMonth === bill.month && styles.monthRowSelected,
                    ]}
                  >
                    <View style={styles.monthLeft}>
                      <Pressable
                        hitSlop={8}
                        style={({ pressed }) => [
                          styles.monthBox,
                          pressed && styles.monthBoxPressed,
                          selectedMonth === bill.month && styles.monthBoxSelected,
                        ]}
                        onPress={() => {
                          setSelectedMonth(bill.month)
                          setIsDropdownOpen(false)
                        }}
                      >
                        {selectedMonth === bill.month ? <View style={styles.monthBoxFill} /> : null}
                      </Pressable>
                      <Text style={[styles.monthText, selectedMonth === bill.month && styles.monthTextSelected]}>
                        {bill.month}
                      </Text>
                    </View>
                    <Text style={styles.monthArrow}>{'>'}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          ) : null}
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() =>
            Alert.alert(
              'Boleto',
              selectedMonth ? `Boleto de ${selectedMonth} pronto para baixar.` : 'Nenhuma mensalidade em aberto.',
            )
          }
        >
          <Text style={styles.primaryButtonText}>Baixar boleto</Text>
        </TouchableOpacity>
      </ScrollView>
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
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 18,
  },
  content: {
    backgroundColor: '#e6e6ee',
    flexGrow: 1,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    gap: 18,
  },
  profileCard: {
    alignItems: 'center',
    gap: 10,
  },
  profilePhotoFrame: {
    width: 90,
    height: 90,
    borderRadius: 18,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePhoto: {
    width: '100%',
    height: '130%',
    transform: [{ translateY: 14 }],
  },
  profileStatus: {
    color: '#1e3160',
    fontWeight: '800',
  },
  statusBadge: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#d7dced',
  },
  sectionButton: {
    width: '100%',
    backgroundColor: '#1f148a',
    borderRadius: 18,
    paddingVertical: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  sectionButtonText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 16,
  },
  infoBlock: {
    gap: 4,
  },
  infoLine: {
    color: '#1e3160',
  },
  infoLabel: {
    fontWeight: '800',
  },
  infoValue: {
    fontWeight: '600',
  },
  dropdownCard: {
    backgroundColor: '#f7f7fb',
    borderRadius: 20,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    gap: 12,
  },
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownPill: {
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  dropdownPillActive: {
    backgroundColor: '#eef0ff',
  },
  dropdownTitle: {
    color: '#5c67d2',
    fontWeight: '800',
  },
  dropdownTitleActive: {
    color: '#3f49b8',
  },
  dropdownChevron: {
    width: 10,
    height: 10,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#5c67d2',
    transform: [{ rotate: '45deg' }],
  },
  dropdownChevronActive: {
    borderColor: '#3f49b8',
  },
  closeSpacer: {
    width: 22,
    height: 22,
  },
  selectionBox: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e2e5f0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectionColumn: {
    flex: 1,
  },
  selectionDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#e2e5f0',
    marginHorizontal: 12,
  },
  selectionLabel: {
    color: '#6b7486',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 2,
  },
  selectionValue: {
    color: '#1f2a44',
    fontWeight: '800',
  },
  monthList: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    maxHeight: 240,
    borderWidth: 1,
    borderColor: '#e2e5f0',
  },
  monthScroll: {
    maxHeight: 230,
  },
  monthScrollContent: {
    paddingVertical: 6,
  },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e5f0',
  },
  monthRowHover: {
    backgroundColor: '#f3f5ff',
  },
  monthRowPressed: {
    backgroundColor: '#e8ecff',
  },
  monthRowSelected: {
    backgroundColor: '#eef1ff',
  },
  monthLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  monthBox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#a8b0c5',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthBoxPressed: {
    borderColor: '#7d86b3',
  },
  monthBoxSelected: {
    backgroundColor: '#e4e7ff',
    borderColor: '#5c67d2',
  },
  monthBoxFill: {
    width: 8,
    height: 8,
    borderRadius: 2,
    backgroundColor: '#5c67d2',
  },
  monthText: {
    color: '#6a74c8',
    fontWeight: '700',
  },
  monthTextSelected: {
    color: '#3f49b8',
  },
  monthArrow: {
    color: '#a3a9bf',
    fontWeight: '800',
  },
  primaryButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#4f66b6',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '800',
  },
})
