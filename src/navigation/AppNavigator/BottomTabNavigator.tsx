import * as React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from 'react-native-paper'
import styled from 'styled-components'

import ProfileContainer from '../../features/profile/containers/ProfileContainer'
import { BottomTabParamList } from '../types'
import ChannelDiscoveryScreen from '../../features/chat/screens/ChannelDiscoveryScreen'
import JoinedChannelListScreen from '../../features/chat/screens/JoinedChannelListScreen'
import Icon from '../../features/shared/components/Icon'
import { ChannelDiscoverHeader, JoinedChannelHeader } from './CustomHeaders'

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
        tabBarActiveTintColor: colors.chatPrimary
      }}
    >
      <BottomTab.Screen
        name="JoinedChannelListScreen"
        component={JoinedChannelListScreen}
        options={{
          headerTitle: (props) => <JoinedChannelHeader />,
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
          headerTitle: (props) => <ChannelDiscoverHeader />,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="compass" color={color} />
          ),
          tabBarShowLabel: false
        }}
      />
      <BottomTab.Screen
        name="ProfileScreen"
        component={ProfileContainer}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="id-card" color={color} />
        }}
      />
    </BottomTab.Navigator>
  )
}
