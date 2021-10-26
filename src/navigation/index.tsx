import * as React from 'react'

import AppNavigator from './AppNavigator'
import AuthNavigator from './AuthNavigator'
import { useAppDispatch, useAppSelector } from '../features/shared/hooks/redux'
import {
  selectStreamIOToken,
  setStreamToken,
  setToken
} from '../features/authentication/slice'
import { getToken } from '../features/shared/utils/secureStorage'
import LoadingScreen from '../features/shared/screens/LoadingSreen'
import { setProfile } from '../features/profile/slice'

export default function Navigation() {
  const [loading, setLoading] = React.useState(true)
  const dispatch = useAppDispatch()
  // Using stream token to prevent from directly navigating to app navigator
  // when finishing sign up. It should navigate to set profile screen.
  const streamToken = useAppSelector(selectStreamIOToken)
  React.useEffect(() => {
    const setUp = async () => {
      const token = await getToken('token')
      if (token) {
        dispatch(setToken(token))
      }
      const localStreamToken = await getToken('streamToken')
      if (localStreamToken) {
        dispatch(setStreamToken(localStreamToken))
      }
      const email = await getToken('email')
      const username = await getToken('username')
      const bio = await getToken('bio')
      const avatar = await getToken('avatar')
      dispatch(setProfile({ email, username, bio, avatar }))
      setLoading(false)
    }
    setUp()
  }, [])

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : streamToken ? (
        <AppNavigator />
      ) : (
        <AuthNavigator />
      )}
    </>
  )
}
