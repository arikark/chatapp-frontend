import * as React from 'react'

import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux'
import { selectProfile } from '../slice'
import { logout } from '../../authentication/slice'
import ProfileScreen from '../screens/ProfileScreen'
import { useUploadPhotoMutation } from '../../../store/api/userServices'
import { deleteToken } from '../../shared/utils/secureStorage'

export default function ProfileContainer() {
  const dispatch = useAppDispatch()
  const onPressLogout = async () => {
    await deleteToken('token')
    await deleteToken('streamToken')
    await deleteToken('userId')
    dispatch(logout())
  }
  const { email, username, bio, photo } = useAppSelector(selectProfile)
  console.log(useAppSelector(selectProfile))
  return (
    <>
      <ProfileScreen
        {...{
          email,
          username,
          bio,
          photo,
          onPressLogout
        }}
        profilePhotoUploadMutation={useUploadPhotoMutation}
      />
    </>
  )
}
