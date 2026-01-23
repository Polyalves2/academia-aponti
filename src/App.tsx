import { useMemo, useState } from 'react'
import { Alert, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'
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
import { ExerciseDetailScreen } from './screens/ExerciseDetailScreen'
import { StudentFinanceScreen } from './screens/StudentFinanceScreen'
import { ProfessorScreen } from './screens/ProfessorScreen'
import { ProfessorStudentTrainingScreen } from './screens/ProfessorStudentTrainingScreen'
import { ProfessorStudentTrainingListScreen } from './screens/ProfessorStudentTrainingListScreen'
import { ProfessorTrainingChangesScreen } from './screens/ProfessorTrainingChangesScreen'
import { ProfessorPointScreen } from './screens/ProfessorPointScreen'
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
  | 'professor'
  | 'professorProfile'
  | 'professorStudents'
  | 'professorStudentTraining'
  | 'professorStudentTrainingList'
  | 'professorTrainingChanges'
  | 'professorPoint'
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
  const [isProfessorTrainingView, setIsProfessorTrainingView] = useState(false)
  const [trainingRecommendations, setTrainingRecommendations] = useState<Record<string, string[]>>({})
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

  const handleAddRecommendation = (trainingId: string, text: string) => {
    setTrainingRecommendations((prev) => {
      const next = prev[trainingId] ? [...prev[trainingId], text] : [text]
      return { ...prev, [trainingId]: next }
    })
  }

  const handleRemoveRecommendation = (trainingId: string, index: number) => {
    setTrainingRecommendations((prev) => {
      const list = prev[trainingId] || []
      const next = list.filter((_, idx) => idx !== index)
      return { ...prev, [trainingId]: next }
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
              setActiveScreen(
                role === 'Administrador' ? 'admin' : role === 'Professor' ? 'professor' : 'student',
              )
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
              setIsProfessorTrainingView(false)
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
      case 'professor':
        return (
          <ProfessorScreen
            onBackHome={() => setActiveScreen('landing')}
            onOpenProfile={() => setActiveScreen('professorProfile')}
            onRegisterPoint={() => setActiveScreen('professorPoint')}
            onOpenStudents={() => setActiveScreen('professorStudents')}
          />
        )
      case 'professorPoint':
        return <ProfessorPointScreen onBack={() => setActiveScreen('professor')} />
      case 'professorProfile':
        return <AdminProfessorProfileScreen onBack={() => setActiveScreen('professor')} />
      case 'professorStudents':
        return (
          <AdminStudentListScreen
            registrations={studentRegistrations}
            onBack={() => setActiveScreen('professor')}
            onSelect={(registration) => {
              setSelectedStudent(registration)
              setActiveScreen('professorStudentTraining')
            }}
            title=""
          />
        )
      case 'professorStudentTraining':
        return selectedStudent ? (
          <ProfessorStudentTrainingScreen
            registration={selectedStudent}
            onBack={() => setActiveScreen('professorStudents')}
            onOpenTrainings={() => setActiveScreen('professorStudentTrainingList')}
          />
        ) : (
          <AdminStudentListScreen
            registrations={studentRegistrations}
            onBack={() => setActiveScreen('professor')}
            onSelect={(registration) => {
              setSelectedStudent(registration)
              setActiveScreen('professorStudentTraining')
            }}
            title=""
          />
        )
      case 'professorStudentTrainingList':
        return (
          <ProfessorStudentTrainingListScreen
            onBack={() => setActiveScreen('professorStudentTraining')}
            onViewTraining={(training) => {
              setSelectedTraining(training)
              setIsProfessorTrainingView(true)
              setActiveScreen('trainingDetail')
            }}
            onOpenChanges={() => setActiveScreen('professorTrainingChanges')}
          />
        )
      case 'professorTrainingChanges':
        return (
          <ProfessorTrainingChangesScreen
            onBack={() => setActiveScreen('professorStudentTrainingList')}
            onSubmit={() => Alert.alert('Alteracao salva', 'Alteracao registrada com sucesso.')}
          />
        )
      case 'studentFinance':
        return <StudentFinanceScreen onBack={() => setActiveScreen('profile')} />
      case 'trainingDetail':
        return selectedTraining ? (
          <ExerciseDetailScreen
            training={selectedTraining}
            profile={profile}
            onBack={() =>
              setActiveScreen(isProfessorTrainingView ? 'professorStudentTrainingList' : 'student')
            }
            onOpenProfile={() => setActiveScreen('profile')}
            onCheckIn={handleTrainingCheckIn}
            isCompleted={Boolean(completedTrainingIds[selectedTraining.id])}
            showCheckIn={!isProfessorTrainingView}
            showProfessorTools={isProfessorTrainingView}
            recommendations={trainingRecommendations[selectedTraining.id] || []}
            onAddRecommendation={handleAddRecommendation}
            onRemoveRecommendation={handleRemoveRecommendation}
          />
        ) : (
          <StudentScreen
            profile={profile}
            completedTrainingIds={completedTrainingIds}
            onBackHome={() => setActiveScreen('landing')}
            onOpenProfile={() => setActiveScreen('profile')}
            onViewTraining={(training) => {
              setSelectedTraining(training)
              setIsProfessorTrainingView(false)
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
    isProfessorTrainingView,
    trainingRecommendations,
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
