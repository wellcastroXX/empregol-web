/** Tipos do domínio de autenticação, espelhando os DTOs da empregol-api. */

export type UserRole = 'athlete' | 'contractor'

/** Um contratante é agente (pessoa física) ou clube (pessoa jurídica). */
export type ContractorKind = 'agent' | 'club'

export type DominantFoot = 'LEFT' | 'RIGHT' | 'BOTH'
export type AthleteLevel = 'PROFESSIONAL' | 'AMATEUR' | 'YOUTH'
export type Gender = 'MALE' | 'FEMALE'

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

export interface Session {
  accessToken: string
  /**
   * A API devolve o refresh, mas **não expõe endpoint para trocá-lo**. Fica
   * guardado para quando existir; hoje a sessão dura o tempo do access token.
   */
  refreshToken: string
}

/** Usuário autenticado, já achatado do envelope da API. */
export interface AuthUser {
  id: string
  email: string
  role: UserRole
  /** `agent` ou `club` quando role é contractor. */
  kind?: ContractorKind
  nome: string
  telefone?: string
  emailVerificado: boolean
  avatarUrl?: string
}

export interface AuthResult {
  session: Session
  user: AuthUser
}

export interface LoginCredentials {
  email: string
  password: string
}

/** Cadastro de atleta — todos obrigatórios exceto os marcados. */
export interface AthleteRegisterPayload {
  email: string
  password: string
  fullName: string
  /** Só dígitos; a máscara é removida antes de enviar. */
  cpf: string
  /** ISO `AAAA-MM-DD`. */
  birthDate: string
  phone: string
  naturalidade: string
  /** Sigla curta enviada à API (ex.: `ATA`). */
  position: string
  dominantFoot: DominantFoot
  height: number
  weight: number
  level: AthleteLevel
  gender?: Gender
  expectedSalary?: number
  videoUrl?: string
}

export interface ContractorRegisterPayload {
  type: 'AGENT' | 'CLUB'
  email: string
  password: string
  name: string
  phone: string
  /** Obrigatório para agente. */
  cpf?: string
  /** Obrigatório para clube. */
  cnpj?: string
  companyName?: string
  socialMedia?: string
  additionalInfo?: string
}

export type RegisterPayload =
  | ({ role: 'athlete' } & AthleteRegisterPayload)
  | ({ role: 'contractor' } & ContractorRegisterPayload)

/** Formato bruto do usuário devolvido pela API. */
export interface ApiUser {
  id: string
  email: string
  role: 'ATHLETE' | 'AGENT' | 'CLUB'
  emailVerified?: boolean
  athlete?: { fullName: string; phone: string; avatarUrl?: string | null } | null
  contractor?: { name: string; phone: string; type: string; avatarUrl?: string | null } | null
}

export interface ApiLoginData {
  accessToken: string
  refreshToken: string
  user: ApiUser
}

/** Achata o usuário da API no formato usado pela interface. */
export function toAuthUser(user: ApiUser): AuthUser {
  const base = {
    id: user.id,
    email: user.email,
    emailVerificado: user.emailVerified ?? false,
  }

  if (user.role === 'ATHLETE' && user.athlete) {
    return {
      ...base,
      role: 'athlete',
      nome: user.athlete.fullName,
      telefone: user.athlete.phone,
      avatarUrl: user.athlete.avatarUrl ?? undefined,
    }
  }

  if (user.contractor) {
    return {
      ...base,
      role: 'contractor',
      kind: user.contractor.type === 'CLUB' ? 'club' : 'agent',
      nome: user.contractor.name,
      telefone: user.contractor.phone,
      avatarUrl: user.contractor.avatarUrl ?? undefined,
    }
  }

  throw new Error('Perfil de usuário incompleto retornado pela API.')
}
