import * as React from 'react'

import { FontAwesome } from '@expo/vector-icons'
import { useTheme } from 'react-native-paper'

export default function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color?: string
}) {
  const { sizingMajor } = useTheme()
  return <FontAwesome size={sizingMajor.x4} {...props} />
}
