import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Signin } from '../features/authentication/screens'
import { AuthStackParamList } from './types'

export default function AuthNavigator() {
  const Stack = createNativeStackNavigator<AuthStackParamList>()
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={Signin}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
