import React from 'react'
import { Title, useTheme } from 'react-native-paper'
import { View, TextInput, Text } from 'react-native'
import styled from 'styled-components'
import { FontAwesome } from '@expo/vector-icons'

interface ICusTextInput {
  title: string
  icon: any
  text: string
  setText: (input: string) => void
  password?: boolean
  placeholder?: string
  multiline?: boolean
}

export default function CusTextInput({
  title,
  icon,
  text,
  setText,
  password = false,
  placeholder = title,
  multiline = false
}: ICusTextInput) {
  const { colors, sizingMajor } = useTheme()
  return (
    <Wrapper>
      <Title>{title}</Title>
      <InputContainer>
        {multiline ? (
          <MultilineInputItem
            autoCapitalize="none"
            multiline
            secureTextEntry={password}
            placeholder={placeholder}
            onChangeText={(input) => setText(input)}
            value={text}
          />
        ) : (
          <InputItem
            secureTextEntry={password}
            placeholder={placeholder}
            onChangeText={(input) => setText(input)}
            value={text}
          />
        )}

        <SuffixIcon>
          <FontAwesome
            name={icon}
            size={sizingMajor.x3}
            color={colors.chatPrimary}
          />
        </SuffixIcon>
      </InputContainer>
    </Wrapper>
  )
}
const Wrapper = styled(View)`
  justify-content: center;
  height: ${({ theme }) => `${theme.sizingMajor.x9}px`};
  width: ${({ theme }) => `${theme.sizingMajor.x12}%`};
  border-radius: ${({ theme }) => `${theme.sizingMajor.x6 / 2}px`};
`
const SuffixIcon = styled(View)`
  position: absolute;
  height: ${({ theme }) => `${theme.sizingMajor.x5}px`};
  justify-content: center;
  right: ${({ theme }) => `${theme.sizingMajor.x1}px`};
`
const InputContainer = styled(View)`
  height: ${({ theme }) => `${theme.sizingMajor.x5}px`};
  width: ${({ theme }) => `${theme.sizingMajor.x12}%`};
`
const InputItem = styled(TextInput)`
  width: ${({ theme }) => `${theme.sizingMajor.x12}%`};
  padding-left: ${({ theme }) => `${theme.sizingMajor.x1}px`};
  height: ${({ theme }) => `${theme.sizingMajor.x5}px`};
  border-radius: ${({ theme }) => `${theme.sizingMajor.x1}px`};
  background-color: ${({ theme }) => `${theme.colors.chatSecondary}`};
`

const MultilineInputItem = styled(TextInput)`
  width: ${({ theme }) => `${theme.sizingMajor.x12}%`};
  padding-left: ${({ theme }) => `${theme.sizingMajor.x1}px`};
  padding-top: ${({ theme }) => `${theme.sizingMajor.x1}px`};
  height: ${({ theme }) => `${theme.sizingMajor.x10}px`};
  border-radius: ${({ theme }) => `${theme.sizingMajor.x1}px`};
  background-color: ${({ theme }) => `${theme.colors.chatSecondary}`};
`
