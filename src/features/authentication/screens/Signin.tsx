import * as React from 'react'
import styled from 'styled-components'
import i18n from 'i18n-js'
import { View, Button } from 'react-native'
import { Subheading, Paragraph, Caption, Headline } from 'react-native-paper'

import { TextInput } from '../../shared/components/TextInput'
import ScreenWrapper from '../../shared/layouts/ScreenWrapper'

import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux'
import {
  useLoginMutation,
  useSignUpMutation
} from '../../../store/api/userServices'
import {
  logout,
  selectStreamIOToken,
  selectToken
} from '../../authentication/slice'

const Container = styled(View)`
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => `${theme.colors.alert}`};
`
const StyledTextInput = styled(TextInput)`
  margin: ${({ theme }) => `${theme.sizingMajor.x1}px`};
`
function SignUpButton() {
  const [signUp, { isSuccess, isLoading }] = useSignUpMutation()

  return (
    <>
      {isLoading ? (
        <Headline> Loading </Headline>
      ) : (
        <Button
          title="SignUp"
          onPress={async () => {
            signUp({
              email: 'marvinshuang@email.com',
              username: 'arikark',
              password: 'abc123'
            })
          }}
        />
      )}
    </>
  )
}
function LoginButton() {
  const [login, { isSuccess, isLoading }] = useLoginMutation()
  return (
    <>
      {isLoading ? (
        <Headline> Loading </Headline>
      ) : (
        <Button
          title="Login"
          onPress={async () => {
            login({
              email: 'marvinshuang@email.com',
              password: 'abc123'
            })
          }}
        />
      )}
    </>
  )
}
function Logout() {
  const dispatch = useAppDispatch()
  return (
    <Button
      title="logout"
      onPress={async () => {
        dispatch(logout())
      }}
    />
  )
}

export function Signin() {
  const streamIOToken = useAppSelector(selectStreamIOToken)
  const token = useAppSelector(selectToken)
  return (
    <ScreenWrapper withScrollView>
      <Container>
        <SignUpButton />
        <LoginButton />
        <Logout />
        <Subheading>
          {i18n.t('signIn.welcome')} {i18n.t('signIn.name')}
        </Subheading>
        {streamIOToken && <Paragraph>{streamIOToken}</Paragraph>}
        {token && <Paragraph>{token}</Paragraph>}
        <Caption>Caption</Caption>
      </Container>
      <StyledTextInput label="Email" mode="outlined" />
      <TextInput label="Password" mode="outlined" />
    </ScreenWrapper>
  )
}
