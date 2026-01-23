import { useState } from 'react'
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { UserProfile } from '../types/profile'
import backIcon from '../assets/icon_seta.png'

interface ProfileDataScreenProps {
  profile: UserProfile
  onBack: () => void
  onSave: (data: Partial<UserProfile>) => void
}

export function ProfileDataScreen({ profile, onBack, onSave }: ProfileDataScreenProps) {
  const [email, setEmail] = useState(profile.email)
  const [phone, setPhone] = useState(profile.phone)
  const [address, setAddress] = useState(profile.address)

  const handleSave = () => {
    onSave({ email, phone, address })
    Alert.alert('Dados atualizados', 'As informacoes foram salvas com sucesso.')
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dados cadastrais</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} bounces keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.description}>
            Atualize seus dados de contato. Essas informacoes sao usadas para comunicados importantes.
          </Text>

          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Telefone</Text>
            <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Endereco</Text>
            <TextInput
              style={[styles.input, styles.multiline]}
              value={address}
              onChangeText={setAddress}
              multiline
              numberOfLines={3}
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
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
    flexGrow: 1,
    backgroundColor: '#e6e6ee',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
  },
  card: {
    backgroundColor: '#f7f7fb',
    borderRadius: 22,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  description: {
    color: '#384057',
    marginBottom: 18,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    color: '#1e3160',
    fontWeight: '800',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#c8cee2',
  },
  multiline: {
    textAlignVertical: 'top',
    minHeight: 90,
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: '#1f4fc6',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: '800',
  },
})
