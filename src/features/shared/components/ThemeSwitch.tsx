import * as React from 'react'
import { Switch, useTheme } from 'react-native-paper'
import styled from 'styled-components'
import { View } from 'react-native'

import { toggleTheme } from '../slices'
import { useAppDispatch } from '../hooks/redux'
import Icon from './Icon'

const Container = styled(View)`
  flex-direction: row;
  align-items: center;
`
const ThemeIcon = styled(Icon)`
  margin-left: ${({ theme }) => `${theme.sizingMajor.x1}px`};
`
export default function ThemeSwitch() {
  const dispatch = useAppDispatch()
  const { colors } = useTheme()
  const [isSwitchOn, setIsSwitchOn] = React.useState(false)
  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn)
    dispatch(toggleTheme())
  }
  return (
    <Container>
      <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      {isSwitchOn && <ThemeIcon name="moon-o" color={colors.primary} />}
      {!isSwitchOn && <ThemeIcon name="sun-o" color={colors.chatPrimary} />}
    </Container>
  )
}
