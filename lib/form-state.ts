export type SignUpFormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[],
				confirmPassword?: string[]
      }
      message?: string,
      success?: boolean
    }
  | undefined

export type SignInFormState =
  | {
      error?: {
        email?: string[]
        password?: string[]
      }
      success?: boolean
      message?: string
    }
  | undefined