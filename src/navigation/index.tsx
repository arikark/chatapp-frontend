import * as React from 'react'

import AppNavigator from './AppNavigator'
import AuthNavigator from './AuthNavigator'
import { useAppDispatch, useAppSelector } from '../features/shared/hooks/redux'
import { selectToken, setToken } from '../features/authentication/slice'
import { getToken } from '../features/shared/utils/secureStorage'
import LoadingScreen from '../features/shared/screens/LoadingSreen'

export default function Navigation() {
  const [loading, setLoading] = React.useState(true)
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectToken)
  React.useEffect(() => {
    getToken('token').then((res) => {
      if (res) {
        dispatch(setToken(res))
      }
      setLoading(false)
    })
  }, [])

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : token ? (
        <AppNavigator />
      ) : (
        <AuthNavigator />
      )}
    </>
  )
}
