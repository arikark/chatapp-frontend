import * as React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from 'react-native-paper'
import styled from 'styled-components'

import Profile from '../../features/profile/containers/Profile'
import { BottomTabParamList } from '../types'
import ChannelDiscoveryScreen from '../../features/chat/screens/ChannelDiscoveryScreen'
import JoinedChannelListScreen from '../../features/chat/screens/JoinedChannelListScreen'
import Icon from '../../features/shared/components/Icon'

const TabBarIcon = styled(Icon)`
  margin-bottom: ${({ theme }) => `-${theme.sizingMinor.x1}px`};
`

const BottomTab = createBottomTabNavigator<BottomTabParamList>()
export function BottomTabNavigator() {
  const { colors } = useTheme()
  return (
    <BottomTab.Navigator
      initialRouteName="JoinedChannelListScreen"
      screenOptions={{
        tabBarActiveTintColor: colors.chatPrimary,
        headerShown: false
      }}
    >
      <BottomTab.Screen
        name="JoinedChannelListScreen"
        component={JoinedChannelListScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="comments" color={color} />
          ),
          tabBarShowLabel: false
        }}
      />
      <BottomTab.Screen
        name="ChannelDiscoveryScreen"
        component={ChannelDiscoveryScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="compass" color={color} />
          ),
          tabBarShowLabel: false
        }}
      />
      <BottomTab.Screen
        name="ProfileScreen"
        component={Profile}
        options={{
          tabBarShowLabel: false,
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="id-card" color={color} />
        }}
      />
    </BottomTab.Navigator>
  )
}
