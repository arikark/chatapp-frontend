import * as React from 'react'

import AppNavigator from './AppNavigator'
import AuthNavigator from './AuthNavigator'
import { useAppDispatch, useAppSelector } from '../features/shared/hooks/redux'
import {
  selectStreamIOToken,
  setStreamToken
} from '../features/authentication/slice'
import { getToken } from '../features/shared/utils/secureStorage'
import LoadingScreen from '../features/shared/screens/LoadingSreen'

export default function Navigation() {
  const [loading, setLoading] = React.useState(true)
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectStreamIOToken)
  React.useEffect(() => {
    getToken('streamToken').then((res) => {
      if (res) {
        dispatch(setStreamToken(res))
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
