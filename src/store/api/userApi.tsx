import { Api } from '.'
import { IProfile, IAuth } from './interfaces'

export interface AuthResponse {
  data: {
    auth: IAuth
    profile: IProfile
  }
}
export interface LoginRequest {
  email: string
  password: string
}
export interface SignUpRequest {
  email: string
  username: string
  password: string
  bio: string
  photoUrl: string
}

export const userApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials
      })
    }),
    signUp: builder.mutation<AuthResponse, SignUpRequest>({
      query: (credentials) => ({
        url: 'auth/signUp',
        method: 'POST',
        body: credentials
      })
    })
  }),
  overrideExisting: true
})

export const { useLoginMutation, useSignUpMutation } = userApi
