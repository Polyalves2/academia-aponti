import { useCallback } from 'react'
import { Alert, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { UserProfile } from '../types/profile'

interface ProfileScreenProps {
  profile: UserProfile
  onBack: () => void
  onUpdateProfile: (changes: Partial<UserProfile>) => void
  onNavigateToData: () => void
}

export function ProfileScreen({ profile, onBack, onUpdateProfile }: ProfileScreenProps) {
  const pickImage = useCallback(
    async (source: 'camera' | 'library') => {
      try {
        if (source === 'camera') {
          const permission = await ImagePicker.requestCameraPermissionsAsync()
          if (!permission.granted) {
            Alert.alert('Permissao necessaria', 'Precisamos acessar sua camera para tirar uma foto.')
            return
          }
        } else {
          const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
          if (!permission.granted) {
            Alert.alert('Permissao necessaria', 'Precisamos acessar suas fotos para escolher uma imagem.')
            return
          }
        }

        const result =
          source === 'camera'
            ? await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.7,
              })
            : await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.7,
              })

        if (!result.canceled && result.assets?.length) {
          onUpdateProfile({ photoUri: result.assets[0].uri })
        }
      } catch (error) {
        console.warn('Erro ao selecionar imagem', error)
      }
    },
    [onUpdateProfile],
  )

  const handlePhotoPress = () => {
    if (Platform.OS === 'web') {
      pickImage('library')
      return
    }

    Alert.alert('Atualizar foto', 'Como deseja adicionar uma foto?', [
      { text: 'Camera', onPress: () => pickImage('camera') },
      { text: 'Galeria', onPress: () => pickImage('library') },
      { text: 'Cancelar', style: 'cancel' },
    ])
  }

  const actionButtons = [
    { label: 'Financeiro', onPress: () => Alert.alert('Financeiro', 'Funcionalidade em breve.') },
    { label: 'Check-in', onPress: () => Alert.alert('Check-in', 'Funcionalidade em breve.') },
    { label: 'Baixar avaliacao', onPress: () => Alert.alert('Baixar avaliacao', 'Funcionalidade em breve.') },
  ]

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} bounces={false}>
        <View style={styles.card}>
          <TouchableOpacity style={styles.photoBox} onPress={handlePhotoPress} activeOpacity={0.8}>
            {profile.photoUri ? (
              <Image source={{ uri: profile.photoUri }} style={styles.photo} />
            ) : (
              <Text style={styles.photoPlaceholder}>Upload</Text>
            )}
          </TouchableOpacity>

          <ProfileField label="Nome completo:" value={profile.name} />

          <View style={styles.fieldRow}>
            <ProfileField label="Idade:" value={`${profile.age} anos`} flex />
            <ProfileField label="Peso:" value={profile.weight} flex />
          </View>

          <ProfileField label="Matricula:" value={profile.matricula} />
          <ProfileField label="Professor(a):" value={profile.professor} />
        </View>

        <View style={styles.buttonGroup}>
          {actionButtons.map((button) => (
            <TouchableOpacity key={button.label} style={styles.actionButton} onPress={button.onPress}>
              <Text style={styles.actionButtonText}>{button.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

interface ProfileFieldProps {
  label: string
  value: string
  flex?: boolean
}

function ProfileField({ label, value, flex }: ProfileFieldProps) {
  return (
    <View style={[styles.field, flex && styles.fieldFlex]}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.fieldValueWrapper}>
        <Text style={styles.fieldValue}>{value}</Text>
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
    padding: 10,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '800',
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
    gap: 20,
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
  photoBox: {
    width: 110,
    height: 110,
    borderRadius: 18,
    backgroundColor: '#1a3f8b',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 22,
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
  },
  photoPlaceholder: {
    color: '#ffffff',
    fontWeight: '800',
  },
  field: {
    marginBottom: 14,
  },
  fieldFlex: {
    flex: 1,
  },
  fieldRow: {
    flexDirection: 'row',
    gap: 16,
  },
  fieldLabel: {
    color: '#1e3160',
    fontWeight: '800',
    marginBottom: 4,
  },
  fieldValueWrapper: {
    backgroundColor: '#e3e6f1',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  fieldValue: {
    color: '#242c3f',
    fontWeight: '600',
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#1f4fc6',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  actionButtonText: {
    color: '#ffffff',
    fontWeight: '800',
  },
})
