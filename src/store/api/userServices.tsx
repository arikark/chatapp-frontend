import { api } from '.'
import { IProfile, IAuth } from './interfaces'

export interface AuthResponse {
  data: {
    auth: IAuth
    profile: IProfile
  }
}
interface PhotoUploadResponse {
  data: {
    url: string
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
}

export const userServices = api.injectEndpoints({
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
    }),
    uploadPhoto: builder.mutation<PhotoUploadResponse, FormData>({
      query: (photo) => ({
        url: 'user/photo',
        method: 'POST',
        body: photo
      })
    })
  }),
  overrideExisting: true
})

export const { useLoginMutation, useSignUpMutation, useUploadPhotoMutation } =
  userServices
