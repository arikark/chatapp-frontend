import * as React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Signin } from '../../features/authentication/screens'
import { LandingStackParamList } from '../types'

const Stack = createNativeStackNavigator<LandingStackParamList>()

export function LandingNavigator() {
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
