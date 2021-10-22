import React from 'react'
import { useTheme } from 'react-native-paper'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function BackButton() {
  const { colors, sizingMajor } = useTheme()
  const navigation = useNavigation()
  return (
    <Wrapper onPress={() => navigation.goBack()}>
      <Ionicons
        name="caret-back-outline"
        size={sizingMajor.x5}
        color={colors.chatPrimary}
      />
    </Wrapper>
  )
}

const Wrapper = styled(TouchableOpacity)`
  justify-content: center;
  height: ${({ theme }) => `${theme.sizingMajor.x6}px`};
  width: ${({ theme }) => `${theme.sizingMajor.x6}px`};
  border-radius: ${({ theme }) => `${theme.sizingMajor.x6 / 2}px`};
  background-color: ${({ theme }) => `${theme.colors.chatSecondary}`};
`
