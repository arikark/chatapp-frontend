import React, { useState } from 'react'
import {
  Dimensions,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import { Button, Snackbar } from 'react-native-paper'
import styled from 'styled-components'
import LottieView from 'lottie-react-native'

import { useSignUpMutation } from '../../../store/api/userServices'
import BackButton from '../../shared/components/BackButton'
import CusTextInput from '../../shared/components/CusTextInput'
import ScreenWrapper from '../../shared/layouts/ScreenWrapper'
import { saveToken } from '../../shared/utils/secureStorage'

const { width } = Dimensions.get('window')

function SignupScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signUp, { isSuccess, isLoading }] = useSignUpMutation()

  const [isError, setIsError] = useState(false)
  const onDismissSnackBar = () => setIsError(false)

  const onSubmit = async () => {
    console.log(email)
    console.log(password)

    const result = await signUp({
      email,
      password
    })
    // @ts-ignore
    if (result.data) {
      console.log(result)
      // @ts-ignore
      await saveToken('streamToken', result.data.data.auth.streamIOToken)
      // @ts-ignore
      await saveToken('token', result.data.data.auth.token)
      // @ts-ignore
      await saveToken('userId', result.data.data.profile.id)
      navigation.navigate('SetProfile')
    } else {
      setIsError(true)
    }
  }
  return (
    <KeyboardAvoid behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScreenWrapper>
          <Container>
            <BackBtn>
              <BackButton />
            </BackBtn>
            <Title>Create Account</Title>
            {/* Muhammad Hamza Jamil (2021) https://lottiefiles.com/77862-chatting */}
            <LottieContainer
              autoPlay
              source={require('../../../../assets/chat-lottie.json')}
            />
            <InputContainer>
              <TextContainer>
                <CusTextInput
                  title="Email"
                  text={email}
                  icon="envelope-o"
                  setText={setEmail}
                  placeholder="Email"
                />
              </TextContainer>
              <TextContainer>
                <CusTextInput
                  title="Password"
                  text={password}
                  icon="eye-slash"
                  setText={setPassword}
                  password
                />
              </TextContainer>
            </InputContainer>

            <CreateButton
              disabled={isLoading}
              loading={isLoading}
              onPress={onSubmit}
              mode="contained"
            >
              Create Account
            </CreateButton>
          </Container>
          <Snackbar
            visible={isError}
            action={{
              label: 'DONE'
            }}
            onDismiss={onDismissSnackBar}
          >
            Invalid Email.
          </Snackbar>
        </ScreenWrapper>
      </TouchableWithoutFeedback>
    </KeyboardAvoid>
  )
}

export default SignupScreen

const BackBtn = styled(View)`
  position: absolute;
  top: ${({ theme }) => `${theme.sizingMajor.x3}px`};
  left: ${({ theme }) => `${theme.sizingMajor.x3}px`};
`
const KeyboardAvoid = styled(KeyboardAvoidingView)`
  flex: ${({ theme }) => `${theme.sizingMinor.x1}`};
`
const Container = styled(View)`
  flex: ${({ theme }) => `${theme.sizingMinor.x1}`};
  justify-content: center;
`
const InputContainer = styled(View)`
  margin-top: ${({ theme }) => `${theme.sizingMajor.x1}%`};
`
const Title = styled(Text)`
  align-self: center;
  margin-left: ${({ theme }) => `${theme.sizingMajor.x2}px`};
  margin-top: ${({ theme }) => `${theme.sizingMajor.x1}%`};
  font-size: ${({ theme }) => `${theme.sizingMajor.x4}px`};
  font-weight: bold;
`
const LottieContainer = styled(LottieView)`
  align-self: center;
  margin-top: ${({ theme }) => `${theme.sizingMajor.x2}px`};
  height: ${width * 0.5}px;
  width: ${width * 0.5}px;
`
const TextContainer = styled(View)`
  align-self: center;
  margin-top: ${({ theme }) => `${theme.sizingMajor.x2}px`};
  width: ${({ theme }) => `${theme.sizingMajor.x11}%`};
`
const CreateButton = styled(Button)`
  margin-top: ${({ theme }) => `${theme.sizingMajor.x1}%`};
  width: ${({ theme }) => `${theme.sizingMajor.x7}%`};
  align-self: center;
  background-color: ${({ theme }) => `${theme.colors.chatPrimary}`};
`
