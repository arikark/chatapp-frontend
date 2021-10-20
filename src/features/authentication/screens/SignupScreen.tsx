import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import i18n from 'i18n-js'
import { View, TouchableOpacity } from 'react-native'
import { Link } from '@react-navigation/native'
import {
  useTheme,
  TextInput,
  Headline,
  Button,
  Paragraph
} from 'react-native-paper'

import ScreenWrapper from '../../shared/layouts/ScreenWrapper'
import { useSignupMutation } from '../../../store/api/userServices'

const Container = styled(View)`
  background-color: ${({ theme }) => `${theme.colors.background}`};
  padding-left: ${({ theme }) => `${theme.sizingMajor.x4}px`};
  padding-right: ${({ theme }) => `${theme.sizingMajor.x4}px`};
`
const Body = styled(View)`
  flex-direction: column;
  width: 100%;
  margin-top: ${({ theme }) => `${theme.sizingMajor.x12}px`};
`
const SignupTitle = styled(Headline)`
  font-family: ${({ theme }) => `${theme.fonts.medium.fontFamily}`};
  margin-bottom: ${({ theme }) => `${theme.sizingMajor.x3}px`};
`
const CredentialInput = styled(TextInput)`
  margin-bottom: ${({ theme }) => `${theme.sizingMajor.x3}px`};
`
const SignupButton = styled(Button)`
  margin-top: ${({ theme }) => `${theme.sizingMajor.x5}px`};
  border-color: ${({ theme }) => `${theme.colors.chatPrimary}`};
`
const LinkToLogin = styled(Link)`
  margin-top: ${({ theme }) => `${theme.sizingMajor.x2}px`};
  align-self: flex-end;
  color: ${({ theme }) => `${theme.colors.chatPrimary}`};
`

export function SignupScreen() {
  const { colors } = useTheme()
  const [secured, toggleSecured] = useState(true)
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('')
  const emailInputRef = useRef<HTMLInputElement>(null)
  const [signup, { isLoading, isError, error }] = useSignupMutation()

  const onSignupPress = async () => {
    if (passwordInput !== confirmPasswordInput) {
      alert('Passwords do not match')
      return
    }
    const response = await signup({
      email: emailInput,
      password: passwordInput
    })
    console.log(response)
  }

  useEffect(() => {
    emailInputRef.current?.focus()
  }, [])
  return (
    <ScreenWrapper>
      <Container>
        <Body>
          <SignupTitle>{i18n.t('signup.title')}</SignupTitle>
          <CredentialInput
            // @ts-ignore
            ref={emailInputRef}
            label="Email"
            selectionColor={colors.chatPrimary}
            outlineColor={colors.chatPrimary}
            autoCorrect={false}
            mode="outlined"
            value={emailInput}
            onChangeText={(emailInput) => setEmailInput(emailInput)}
            disabled={isLoading}
            autoCapitalize="none"
          />
          <CredentialInput
            secureTextEntry={secured}
            label="Password"
            selectionColor={colors.chatPrimary}
            outlineColor={colors.chatPrimary}
            autoCorrect={false}
            mode="outlined"
            value={passwordInput}
            onChangeText={(passwordInput) => setPasswordInput(passwordInput)}
            right={
              <TextInput.Icon
                name="eye"
                onPress={() => toggleSecured(!secured)}
              />
            }
            disabled={isLoading}
          />
          <CredentialInput
            secureTextEntry={secured}
            label="Confirm Password"
            selectionColor={colors.chatPrimary}
            outlineColor={colors.chatPrimary}
            autoCorrect={false}
            mode="outlined"
            value={confirmPasswordInput}
            onChangeText={(confirmPasswordInput) =>
              setConfirmPasswordInput(confirmPasswordInput)
            }
            disabled={isLoading}
          />
          {isError && <Paragraph>{error}</Paragraph>}
          <SignupButton
            mode="outlined"
            onPress={() => onSignupPress()}
            disabled={isLoading}
          >
            {i18n.t('signup.submit')}
          </SignupButton>
        </Body>
        <LinkToLogin to={{ screen: 'Signin' }}>
          {i18n.t('signup.linkToLogin')}
        </LinkToLogin>
      </Container>
    </ScreenWrapper>
  )
}
