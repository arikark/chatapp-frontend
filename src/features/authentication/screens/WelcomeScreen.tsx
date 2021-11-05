import React from 'react'
import { Dimensions, View, Text } from 'react-native'
import styled from 'styled-components'
import LottieView from 'lottie-react-native'

import { Button, useTheme } from 'react-native-paper'
import ScreenWrapper from '../../shared/layouts/ScreenWrapper'

const { width } = Dimensions.get('window')

function WelcomeScreen({ navigation }: { navigation: any }) {
  const { colors } = useTheme()

  return (
    <ScreenWrapper>
      <Container>
        {/* Mikhail Voloshin (2021) https://lottiefiles.com/48405-mobile-chat-dialog-application-interface */}
        <LottieContainer
          autoPlay
          source={require('../../../../assets/mobile-chat.json')}
        />
        <Slogan>Chat with people nearby!</Slogan>
        <BtnContainer>
          <SignUpBtn
            onPress={() => navigation.navigate('SignUp')}
            color={colors.chatPrimary}
            mode="outlined"
          >
            Sign Up
          </SignUpBtn>
          <LogInBtn
            onPress={() => navigation.navigate('SignIn')}
            mode="contained"
          >
            Log in
          </LogInBtn>
        </BtnContainer>
      </Container>
    </ScreenWrapper>
  )
}

export default WelcomeScreen

const Container = styled(View)`
  flex: ${({ theme }) => `${theme.sizingMinor.x1}`};
  align-items: center;
  justify-content: center;
`
const Slogan = styled(Text)`
  font-size: ${({ theme }) => `${theme.sizingMajor.x3}px`};
`
const BtnContainer = styled(View)`
  margin-top: ${({ theme }) => `${theme.sizingMajor.x8}px`};
  flex-direction: row;
  justify-content: space-around;
  width: ${width * 0.8}px;
`
const LogInBtn = styled(Button)`
  justify-content: center;
  background-color: ${({ theme }) => `${theme.colors.chatPrimary}`};
`
const SignUpBtn = styled(Button)`
  color: ${({ theme }) => `${theme.colors.chatPrimary}`};
  border-color: ${({ theme }) => `${theme.colors.chatPrimary}`};
  border-width: ${({ theme }) => `${theme.sizingMinor.x2}px`};
`
const LottieContainer = styled(LottieView)`
  align-self: center;
  height: ${width}px;
  width: ${width}px;
`
