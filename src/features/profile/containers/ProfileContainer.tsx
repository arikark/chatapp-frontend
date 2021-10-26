import * as React from 'react'

import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux'
import { clearProfile, selectProfile } from '../slice'
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
    await deleteToken('username')
    await deleteToken('bio')
    await deleteToken('avatar')
    await deleteToken('email')
    dispatch(clearProfile())
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
