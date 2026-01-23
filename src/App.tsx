import { useMemo, useState } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'
import { LandingScreen } from './screens/LandingScreen'
import { LoginScreen } from './screens/LoginScreen'
import { AdminScreen } from './screens/AdminScreen'
import { AdminStudentRegisterScreen } from './screens/AdminStudentRegisterScreen'
import { AdminStudentFinanceScreen } from './screens/AdminStudentFinanceScreen'
import { AdminStudentListScreen } from './screens/AdminStudentListScreen'
import { AdminStudentFrequencyScreen } from './screens/AdminStudentFrequencyScreen'
import { AdminProfessorRegisterScreen } from './screens/AdminProfessorRegisterScreen'
import { AdminProfessorListScreen } from './screens/AdminProfessorListScreen'
import { AdminProfessorProfileScreen } from './screens/AdminProfessorProfileScreen'
import { RecoverPasswordScreen } from './screens/RecoverPasswordScreen'
import { StudentScreen } from './screens/StudentScreen'
import { ProfileScreen } from './screens/ProfileScreen'
// import { ProfileDataScreen } from './screens/ProfileDataScreen'
import { ExerciseDetailScreen } from './screens/ExerciseDetailScreen'
import { StudentFinanceScreen } from './screens/StudentFinanceScreen'
import { UserProfile } from './types/profile'
import { trainings, Training } from './data/trainings'
import { StudentRegistration } from './types/admin'

type AppScreen =
  | 'landing'
  | 'login'
  | 'student'
  | 'admin'
  | 'adminStudentRegister'
  | 'adminProfessorRegister'
  | 'adminStudentList'
  | 'adminStudentFrequency'
  | 'adminStudentFinance'
  | 'adminProfessorList'
  | 'adminProfessorProfile'
  | 'profile'
  | 'studentFinance'
  | 'profileData'
  | 'trainingDetail'
  | 'recoverPassword'

function App() {
  const [activeScreen, setActiveScreen] = useState<AppScreen>('landing')
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Allan Henrique Barbosa da Silva',
    age: 24,
    weight: '79 kg',
    matricula: '857083',
    professor: 'Ellen Fernanda da Silva Lima',
    email: 'allan.henrique@email.com',
    phone: '(11) 99999-0000',
    address: 'Av. Brasil, 1200 - Centro, São Paulo',
    photoUri: undefined,
  })
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null)
  const [completedTrainingIds, setCompletedTrainingIds] = useState<Record<string, boolean>>({})
  const [recoverEmail, setRecoverEmail] = useState('aluno@forma.com')
  const [studentRegistrations, setStudentRegistrations] = useState<StudentRegistration[]>([])
  const [selectedStudent, setSelectedStudent] = useState<StudentRegistration | null>(null)

  const updateProfile = (changes: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...changes }))
  }

  const handleTrainingCheckIn = (trainingId: string) => {
    setCompletedTrainingIds((prev) => {
      if (prev[trainingId]) {
        return prev
      }
      return { ...prev, [trainingId]: true }
    })
  }

  const screen = useMemo(() => {
    switch (activeScreen) {
      case 'landing':
        return <LandingScreen onLogin={() => setActiveScreen('login')} />
      case 'login':
        return (
          <LoginScreen
            onBackHome={() => setActiveScreen('landing')}
            onLoginSuccess={(role) =>
              setActiveScreen(role === 'Administrador' ? 'admin' : 'student')
            }
            onForgotPassword={(email) => {
              setRecoverEmail(email)
              setActiveScreen('recoverPassword')
            }}
          />
        )
      case 'admin':
        return (
          <AdminScreen
            onBackHome={() => setActiveScreen('landing')}
            onRegisterStudent={() => setActiveScreen('adminStudentRegister')}
            onRegisterProfessor={() => setActiveScreen('adminProfessorRegister')}
            onOpenTotal={() => setActiveScreen('adminStudentList')}
            onOpenFrequency={() => setActiveScreen('adminStudentFrequency')}
            onOpenProfessorTotal={() => setActiveScreen('adminProfessorList')}
          />
        )
      case 'adminStudentRegister':
        return (
          <AdminStudentRegisterScreen
            onBack={() => setActiveScreen('admin')}
            onSubmit={(registration) => {
              setStudentRegistrations((prev) => [registration, ...prev])
            }}
          />
        )
      case 'adminProfessorRegister':
        return <AdminProfessorRegisterScreen onBack={() => setActiveScreen('admin')} />
      case 'adminProfessorList':
        return (
          <AdminProfessorListScreen
            onBack={() => setActiveScreen('admin')}
            onSelect={() => setActiveScreen('adminProfessorProfile')}
          />
        )
      case 'adminProfessorProfile':
        return <AdminProfessorProfileScreen onBack={() => setActiveScreen('adminProfessorList')} />
      case 'adminStudentList':
        return (
          <AdminStudentListScreen
            registrations={studentRegistrations}
            onBack={() => setActiveScreen('admin')}
            onSelect={(registration) => {
              setSelectedStudent(registration)
              setActiveScreen('adminStudentFinance')
            }}
          />
        )
      case 'adminStudentFrequency':
        return (
          <AdminStudentFrequencyScreen
            registrations={studentRegistrations}
            onBack={() => setActiveScreen('admin')}
            onSelect={(registration) => {
              setSelectedStudent(registration)
              setActiveScreen('adminStudentFinance')
            }}
          />
        )
      case 'adminStudentFinance':
        return selectedStudent ? (
          <AdminStudentFinanceScreen
            registration={selectedStudent}
            onBack={() => setActiveScreen('adminStudentList')}
          />
        ) : (
          <AdminStudentListScreen
            registrations={studentRegistrations}
            onBack={() => setActiveScreen('adminStudentConsultMenu')}
            onSelect={(registration) => {
              setSelectedStudent(registration)
              setActiveScreen('adminStudentFinance')
            }}
          />
        )
      case 'student':
        return (
          <StudentScreen
            profile={profile}
            completedTrainingIds={completedTrainingIds}
            onBackHome={() => setActiveScreen('landing')}
            onOpenProfile={() => setActiveScreen('profile')}
            onViewTraining={(training) => {
              setSelectedTraining(training)
              setActiveScreen('trainingDetail')
            }}
          />
        )
      case 'profile':
        return (
          <ProfileScreen
            profile={profile}
            onBack={() => setActiveScreen('student')}
            onUpdateProfile={updateProfile}
            onNavigateToData={() => setActiveScreen('profileData')}
            onOpenFinance={() => setActiveScreen('studentFinance')}
          />
        )
      case 'studentFinance':
        return <StudentFinanceScreen onBack={() => setActiveScreen('profile')} />
      // case 'profileData':
      //   return (
      //     <ProfileDataScreen
      //       profile={profile}
      //       onBack={() => setActiveScreen('profile')}
      //       onSave={(data) => {
      //         updateProfile(data)
      //         setActiveScreen('profile')
      //       }}
      //     />
      //   )
      case 'trainingDetail':
        return selectedTraining ? (
          <ExerciseDetailScreen
            training={selectedTraining}
            profile={profile}
            onBack={() => setActiveScreen('student')}
            onOpenProfile={() => setActiveScreen('profile')}
            onCheckIn={handleTrainingCheckIn}
            isCompleted={Boolean(completedTrainingIds[selectedTraining.id])}
          />
        ) : (
          <StudentScreen
            profile={profile}
            completedTrainingIds={completedTrainingIds}
            onBackHome={() => setActiveScreen('landing')}
            onOpenProfile={() => setActiveScreen('profile')}
            onViewTraining={(training) => {
              setSelectedTraining(training)
              setActiveScreen('trainingDetail')
            }}
          />
        )
      case 'recoverPassword':
        return (
          <RecoverPasswordScreen
            email={recoverEmail}
            onBack={() => setActiveScreen('login')}
            onComplete={() => setActiveScreen('login')}
          />
        )
      default:
        return null
    }
  }, [
    activeScreen,
    profile,
    selectedTraining,
    recoverEmail,
    studentRegistrations,
    selectedStudent,
    completedTrainingIds,
  ])

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#041228" />
      <View style={styles.screen}>{screen}</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#041228',
  },
  screen: {
    flex: 1,
  },
})

export default App
