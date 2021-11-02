/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import {
  CompositeScreenProps,
  NavigatorScreenParams
} from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends AuthStackParamList,
        AppStackParamList,
        BottomTabParamList {}
  }
}

export type AuthStackParamList = {
  Welcome: undefined
  SignIn: undefined
  SignUp: undefined
  SetProfile: undefined
}
export type AuthStackScreenProps<Screen extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, Screen>

export type AppStackParamList = {
  BottomTabNavigator: NavigatorScreenParams<BottomTabParamList> | undefined
  Channel: undefined
  Thread: undefined
  ChannelCreation: undefined
  Modal: undefined
  NotFound: undefined
}
export type AppStackScreenProps<Screen extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, Screen>

export type BottomTabParamList = {
  ProfileScreen: undefined
  ChannelDiscoveryScreen: undefined
  JoinedChannelListScreen: undefined
}
export type BTabScreenProps<Screen extends keyof BottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, Screen>,
    NativeStackScreenProps<AppStackParamList>
  >
