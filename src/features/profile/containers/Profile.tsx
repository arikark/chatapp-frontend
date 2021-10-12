import * as React from 'react'

import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux'
import { selectProfile } from '../slice'
import { logout } from '../../authentication/slice'
import ProfileScreen from '../screens/ProfileScreen'

export default function Profile() {
  const dispatch = useAppDispatch()
  const onPressLogout = async () => dispatch(logout())
  const { email, username, bio, photo } = useAppSelector(selectProfile)
  return (
    <>
      <ProfileScreen {...{ email, username, bio, photo, onPressLogout }} />
    </>
  )
}
