import * as React from 'react'

import { FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from 'react-native-paper'

import TabOneScreen from '../../features/shared/screens/TabOneScreen'
import { BottomTabParamList } from '../types'
import ChannelListScreen from '../../features/chat/screens/ChannelDiscoveryScreen'
import JoinedChannelListScreen from '../../features/chat/screens/JoinedChannelListScreen'

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  const { sizingMinor, sizingMajor } = useTheme()
  return (
    <FontAwesome
      size={sizingMajor.x4}
      style={{ marginBottom: -1 * sizingMinor.x1 }}
      {...props}
    />
  )
}

const BottomTab = createBottomTabNavigator<BottomTabParamList>()
export function BottomTabNavigator() {
  const { colors } = useTheme()
  return (
    <BottomTab.Navigator
      initialRouteName="ChannelDiscoveryScreen"
      screenOptions={{
        tabBarActiveTintColor: colors.chatPrimary,
        headerShown: false
      }}
    >
      <BottomTab.Screen
        name="ChannelDiscoveryScreen"
        component={JoinedChannelListScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="compass" color={color} />
          ),
          tabBarShowLabel: false
        }}
      />
      <BottomTab.Screen
        name="JoinedChannelList"
        component={ChannelListScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="comments" color={color} />
          ),
          tabBarShowLabel: false
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={TabOneScreen}
        options={{
          tabBarShowLabel: false,
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="id-card" color={color} />
        }}
      />
    </BottomTab.Navigator>
  )
}
