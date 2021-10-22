import React from 'react'
import styled from 'styled-components'
import { View, Text } from 'react-native'

import { Button } from 'react-native-paper'
import ScreenWrapper from '../../shared/layouts/ScreenWrapper'
import { useSignUpMutation } from '../../../store/api/userServices'

const Container = styled(View)`
  flex: ${({ theme }) => `${theme.sizingMinor.x1}`};
  justify-content: center;
  align-items: center;
`

export default function JoinedChannelListScreen() {
  const [signUp, { isSuccess, isLoading }] = useSignUpMutation()
  const signUpTest = async () => {
    const result = await signUp({
      email: 'wwafawf@gmail.com',
      password: 'wddawdawd'
    })
    console.log(result)
  }
  return (
    <ScreenWrapper>
      <Container>
        <Button mode="contained" onPress={signUpTest}>
          Test API
        </Button>
        <Text>My Joined Channels</Text>
      </Container>
    </ScreenWrapper>
  )
}
