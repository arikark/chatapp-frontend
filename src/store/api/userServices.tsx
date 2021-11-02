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
    profile: {
      avatar: string
      id: string
    }
  }
}
export interface LoginRequest {
  email: string
  password: string
}
export interface SignUpRequest {
  email: string
  password: string
}
export interface UpdateProfileRequest {
  username: string
  bio: string
}
export interface GetUsersResponse {
  data: {
    location: number[][]
  }
}
export interface GetUsersRequest {
  users: string[]
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
    }),
    updateProfile: builder.mutation<{ data: IProfile }, UpdateProfileRequest>({
      query: (updatedProfile) => ({
        url: 'user/update',
        method: 'POST',
        body: updatedProfile
      })
    }),
    getUsers: builder.mutation<GetUsersResponse, GetUsersRequest>({
      query: (updatedProfile) => ({
        url: 'user/getusers',
        method: 'POST',
        body: updatedProfile
      })
    })
  }),
  overrideExisting: true
})

export const {
  useLoginMutation,
  useSignUpMutation,
  useUploadPhotoMutation,
  useUpdateProfileMutation,
  useGetUsersMutation
} = userServices
