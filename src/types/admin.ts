export interface StudentRegistration {
  id: string
  nome: string
  nascimento: string
  peso: string
  genero: 'Feminino' | 'Masculino' | ''
  cpf: string
  email: string
  observacao: string
  cep: string
  bairro: string
  endereco: string
  numero: string
  instituicao: string
  plano: 'Verao' | 'Inverno' | ''
  frequencia: string
  valor: string
  competencia: string
  vencimento: string
  tipoLancamento: 'Pendente' | 'Pago' | 'Atrasado' | 'Cancelado' | 'Cortesia' | ''
  statusPlano: 'Ativo' | 'Inativo' | ''
}
