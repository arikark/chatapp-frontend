import * as React from 'react'

import { FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Signin } from '../features/authentication/screens'
import { RootStackParamList } from './types'

const Stack = createNativeStackNavigator<RootStackParamList>()

export function LandingNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={Signin}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
