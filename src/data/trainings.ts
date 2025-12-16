export type TrainingExercise = {
  id: string
  nome: string
  series: number
  repeticoes: string
  peso: string
  intervalo: string
}

export type Training = {
  id: string
  titulo: string
  foco: string
  calorias: { min: number; max: number }
  objetivo: string
  tempo: { min: number; max: number }
  frequenciaSemanal: number
  areas: string[]
  imageKeywords: string[]
  exercicios: TrainingExercise[]
}

export const trainings: Training[] = [
  {
    id: 'treino_a',
    titulo: 'Treino A',
    foco: 'Pernas e Gluteos',
    calorias: { min: 350, max: 450 },
    objetivo: 'Hipertrofia',
    tempo: { min: 60, max: 75 },
    frequenciaSemanal: 2,
    areas: ['Pernas', 'Gluteos'],
    imageKeywords: ['pernas_gluteos', 'pernas', 'gluteos'],
    exercicios: [
      { id: 'a1', nome: 'Agachamento livre', series: 4, repeticoes: '8-10', peso: 'Progressivo', intervalo: '90s' },
      { id: 'a2', nome: 'Leg press', series: 4, repeticoes: '10-12', peso: 'Progressivo', intervalo: '80s' },
      { id: 'a3', nome: 'Cadeira extensora', series: 3, repeticoes: '12-15', peso: 'Moderado', intervalo: '60s' },
      { id: 'a4', nome: 'Afundo com halteres', series: 3, repeticoes: '12', peso: 'Leve', intervalo: '75s' },
      { id: 'a5', nome: 'Panturrilha em pe', series: 4, repeticoes: '15', peso: 'Moderado', intervalo: '45s' },
    ],
  },
  {
    id: 'treino_b',
    titulo: 'Treino B',
    foco: 'Peito e Triceps',
    calorias: { min: 300, max: 400 },
    objetivo: 'Hipertrofia',
    tempo: { min: 60, max: 70 },
    frequenciaSemanal: 2,
    areas: ['Peito', 'Triceps'],
    imageKeywords: ['peito_triceps', 'peito', 'triceps'],
    exercicios: [
      { id: 'b1', nome: 'Supino reto', series: 4, repeticoes: '8-10', peso: 'Progressivo', intervalo: '90s' },
      { id: 'b2', nome: 'Supino inclinado com halteres', series: 3, repeticoes: '10-12', peso: 'Moderado', intervalo: '75s' },
      { id: 'b3', nome: 'Crucifixo em maquina', series: 3, repeticoes: '12-15', peso: 'Leve', intervalo: '60s' },
      { id: 'b4', nome: 'Mergulho em banco', series: 3, repeticoes: '10-12', peso: 'Corpo', intervalo: '60s' },
      { id: 'b5', nome: 'Triceps testa', series: 3, repeticoes: '12', peso: 'Moderado', intervalo: '70s' },
    ],
  },
  {
    id: 'treino_c',
    titulo: 'Treino C',
    foco: 'Costas e Biceps',
    calorias: { min: 350, max: 450 },
    objetivo: 'Hipertrofia',
    tempo: { min: 60, max: 70 },
    frequenciaSemanal: 2,
    areas: ['Costas', 'Biceps'],
    imageKeywords: ['costas_biceps', 'costas', 'biceps'],
    exercicios: [
      { id: 'c1', nome: 'Barra fixa', series: 4, repeticoes: '8-10', peso: 'Corpo', intervalo: '90s' },
      { id: 'c2', nome: 'Remada curvada', series: 4, repeticoes: '10', peso: 'Progressivo', intervalo: '80s' },
      { id: 'c3', nome: 'Puxada frente', series: 3, repeticoes: '12', peso: 'Moderado', intervalo: '70s' },
      { id: 'c4', nome: 'Rosca direta', series: 3, repeticoes: '12', peso: 'Moderado', intervalo: '60s' },
      { id: 'c5', nome: 'Rosca alternada', series: 3, repeticoes: '12-14', peso: 'Leve', intervalo: '60s' },
    ],
  },
  {
    id: 'treino_d',
    titulo: 'Treino D',
    foco: 'Ombros e Trapezio',
    calorias: { min: 350, max: 450 },
    objetivo: 'Hipertrofia',
    tempo: { min: 60, max: 80 },
    frequenciaSemanal: 2,
    areas: ['Ombros', 'Trapezio'],
    imageKeywords: ['ombros_trapezio', 'ombros', 'trapezio'],
    exercicios: [
      { id: 'd1', nome: 'Desenvolvimento militar', series: 4, repeticoes: '8-10', peso: 'Moderado', intervalo: '90s' },
      { id: 'd2', nome: 'Elevacao lateral', series: 4, repeticoes: '12-15', peso: 'Leve', intervalo: '60s' },
      { id: 'd3', nome: 'Elevacao frontal', series: 3, repeticoes: '12', peso: 'Leve', intervalo: '60s' },
      { id: 'd4', nome: 'Remada alta', series: 3, repeticoes: '10-12', peso: 'Moderado', intervalo: '70s' },
      { id: 'd5', nome: 'Encolhimento com barra', series: 4, repeticoes: '12-15', peso: 'Progressivo', intervalo: '60s' },
    ],
  },
  {
    id: 'treino_e',
    titulo: 'Treino E',
    foco: 'Abdomen e Core',
    calorias: { min: 300, max: 350 },
    objetivo: 'Definicao',
    tempo: { min: 45, max: 60 },
    frequenciaSemanal: 2,
    areas: ['Abdomen', 'Core'],
    imageKeywords: ['abdomen_core', 'abdomen', 'core'],
    exercicios: [
      { id: 'e1', nome: 'Prancha abdominal', series: 4, repeticoes: '40s', peso: 'Corpo', intervalo: '30s' },
      { id: 'e2', nome: 'Elevacao de pernas', series: 3, repeticoes: '12-15', peso: 'Corpo', intervalo: '40s' },
      { id: 'e3', nome: 'Abdominal bicicleta', series: 3, repeticoes: '20', peso: 'Corpo', intervalo: '35s' },
      { id: 'e4', nome: 'Prancha lateral', series: 3, repeticoes: '30s', peso: 'Corpo', intervalo: '30s' },
      { id: 'e5', nome: 'Abdominal infra', series: 3, repeticoes: '15', peso: 'Corpo', intervalo: '40s' },
    ],
  },
  {
    id: 'treino_f',
    titulo: 'Treino F',
    foco: 'Full Body',
    calorias: { min: 450, max: 600 },
    objetivo: 'Condicionamento',
    tempo: { min: 70, max: 90 },
    frequenciaSemanal: 1,
    areas: ['Superior', 'Inferior'],
    imageKeywords: ['fullbody', 'superior', 'inferior'],
    exercicios: [
      { id: 'f1', nome: 'Burpee', series: 4, repeticoes: '15', peso: 'Corpo', intervalo: '60s' },
      { id: 'f2', nome: 'Swing com kettlebell', series: 4, repeticoes: '20', peso: 'Leve', intervalo: '60s' },
      { id: 'f3', nome: 'Levantamento terra', series: 3, repeticoes: '8-10', peso: 'Progressivo', intervalo: '90s' },
      { id: 'f4', nome: 'Push press', series: 3, repeticoes: '12', peso: 'Moderado', intervalo: '75s' },
      { id: 'f5', nome: 'Farmer walk', series: 3, repeticoes: '40m', peso: 'Moderado', intervalo: '60s' },
    ],
  },
  {
    id: 'treino_g',
    titulo: 'Treino G',
    foco: 'Cardio e Resistencia',
    calorias: { min: 400, max: 550 },
    objetivo: 'Emagrecimento',
    tempo: { min: 40, max: 60 },
    frequenciaSemanal: 2,
    areas: ['Cardio', 'Resistencia'],
    imageKeywords: ['cardio_resistencia', 'cardio', 'resistencia'],
    exercicios: [
      { id: 'g1', nome: 'Bike intervalada', series: 5, repeticoes: '1:1', peso: 'Leve', intervalo: '30s' },
      { id: 'g2', nome: 'Corrida em esteira', series: 4, repeticoes: '4 min forte', peso: 'Corpo', intervalo: '1 min' },
      { id: 'g3', nome: 'Corda naval', series: 5, repeticoes: '30s', peso: 'Corpo', intervalo: '45s' },
      { id: 'g4', nome: 'Remo ergometrico', series: 4, repeticoes: '500m', peso: 'Corpo', intervalo: '60s' },
      { id: 'g5', nome: 'Escada HIIT', series: 4, repeticoes: '45s', peso: 'Corpo', intervalo: '45s' },
    ],
  },
]

export const trainingMap: Record<string, Training> = trainings.reduce(
  (acc, training) => {
    acc[training.id] = training
    return acc
  },
  {} as Record<string, Training>,
)
