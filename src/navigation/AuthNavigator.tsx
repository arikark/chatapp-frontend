import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { AuthStackParamList } from './types'
import SignupScreen from '../features/authentication/screens/SignupScreen'
import SetProfileScreen from '../features/authentication/screens/SetProfileScreen'
import WelcomeScreen from '../features/authentication/screens/WelcomeScreen'
import SigninScreen from '../features/authentication/screens/SigninScreen'

export default function AuthNavigator() {
  const Stack = createNativeStackNavigator<AuthStackParamList>()
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={SigninScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SetProfile"
        component={SetProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
