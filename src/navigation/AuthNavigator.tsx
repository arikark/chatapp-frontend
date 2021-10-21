import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import {
  SignupScreen,
  Signin,
  ProfileSetup
} from '../features/authentication/screens'
import { AuthStackParamList } from './types'

export default function AuthNavigator() {
  const Stack = createNativeStackNavigator<AuthStackParamList>()
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileSetup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
