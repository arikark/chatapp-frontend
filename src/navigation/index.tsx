import * as React from 'react'

import AppNavigator from './AppNavigator'
import AuthNavigator from './AuthNavigator'
import { useAppSelector } from '../features/shared/hooks/redux'
import { selectToken } from '../features/authentication/slice'

export default function Navigation() {
  const token = useAppSelector(selectToken)
  const isLoggedIn = token
  return <>{isLoggedIn ? <AppNavigator /> : <AuthNavigator />}</>
}
