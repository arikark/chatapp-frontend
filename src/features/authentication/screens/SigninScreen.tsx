import React, { useState } from 'react'
import {
  Dimensions,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity
} from 'react-native'
import { Snackbar, useTheme } from 'react-native-paper'
import styled from 'styled-components'
import LottieView from 'lottie-react-native'
import { BlurView } from 'expo-blur'

import { FontAwesome } from '@expo/vector-icons'
import { useLoginMutation } from '../../../store/api/userServices'
import BackButton from '../../shared/components/BackButton'
import CusTextInput from '../../shared/components/CusTextInput'
import ScreenWrapper from '../../shared/layouts/ScreenWrapper'
import { saveToken } from '../../shared/utils/secureStorage'
import { useAppDispatch } from '../../shared/hooks/redux'
import { setStreamToken, setToken } from '../slice'
import { setProfile } from '../../profile/slice'

const { width, height } = Dimensions.get('window')

function SigninScreen({ navigation }: { navigation: any }) {
  const dispatch = useAppDispatch()
  const { colors, sizingMajor } = useTheme()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [logIn, { isSuccess, isLoading }] = useLoginMutation()

  const [isError, setIsError] = useState(false)
  const onDismissSnackBar = () => setIsError(false)

  const onSubmit = async () => {
    if (email == '' || password == '') {
      setIsError(true)
    } else {
      const result = await logIn({
        email,
        password
      })

      // @ts-ignore
      if (result.data) {
        console.log(result)
        // @ts-ignore
        const username = result.data.data.profile.username
        // @ts-ignore
        const bio = result.data.data.profile.bio
        // @ts-ignore
        const avatar = result.data.data.profile.avatar
        // @ts-ignore
        const email = result.data.data.profile.email

        // @ts-ignore
        await saveToken('streamToken', result.data.data.auth.streamIOToken)
        // @ts-ignore
        await saveToken('token', result.data.data.auth.token)
        // @ts-ignore
        await saveToken('userId', result.data.data.profile.id)

        await saveToken('username', username)
        await saveToken('bio', bio)
        await saveToken('avatar', avatar)
        await saveToken('email', email)
        dispatch(setProfile({ email, username, bio, avatar }))
        // @ts-ignore
        dispatch(setStreamToken(result.data.data.auth.streamIOToken))
      } else {
        setIsError(true)
      }
    }
  }
  return (
    <KeyboardAvoid behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <ScreenWrapper>
            <Container>
              <BackBtn>
                <BackButton />
              </BackBtn>
              <Title>Log In</Title>
              <LottieContainer
                autoPlay
                source={require('../../../../assets/login-page.json')}
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

              <BottomSpacer>
                <NavButton onPress={onSubmit}>
                  <FontAwesome
                    name="chevron-right"
                    size={sizingMajor.x5}
                    color={colors.chatPrimary}
                  />
                </NavButton>
              </BottomSpacer>
            </Container>
            <Snackbar
              visible={isError}
              action={{
                label: 'DONE'
              }}
              onDismiss={onDismissSnackBar}
            >
              Wrong Email or Password.
            </Snackbar>
          </ScreenWrapper>
          {isLoading && (
            <LoadingLayer tint="dark" intensity={sizingMajor.x11}>
              <LottieContainer
                autoPlay
                source={require('../../../../assets/loading.json')}
              />
            </LoadingLayer>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoid>
  )
}

export default SigninScreen

const BackBtn = styled(View)`
  position: absolute;
  z-index: ${({ theme }) => `${theme.sizingMajor.x3}`};
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
const InputContainer = styled(View)``
const Title = styled(Text)`
  align-self: center;
  margin-left: ${({ theme }) => `${theme.sizingMajor.x2}px`};
  margin-top: ${({ theme }) => `${theme.sizingMajor.x1}%`};
  font-size: ${({ theme }) => `${theme.sizingMajor.x4}px`};
  font-weight: bold;
`
const LottieContainer = styled(LottieView)`
  align-self: center;
  height: ${width * 0.8}px;
  width: ${width * 0.8}px;
`
const TextContainer = styled(View)`
  align-self: center;
  margin-top: ${({ theme }) => `${theme.sizingMajor.x1}px`};
  width: ${({ theme }) => `${theme.sizingMajor.x11}%`};
`

const BottomSpacer = styled(View)`
  justify-content: center;
  align-items: center;
  height: ${({ theme }) => `${theme.sizingMajor.x3}%`};
  width: ${({ theme }) => `${theme.sizingMajor.x12}%`};
`
const NavButton = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  padding-left: ${({ theme }) => `${theme.sizingMajor.x1}px`};
  height: ${({ theme }) => `${theme.sizingMajor.x7}px`};
  width: ${({ theme }) => `${theme.sizingMajor.x7}px`};
  border-radius: ${({ theme }) => `${theme.sizingMajor.x7 / 2}px`};
  background-color: ${({ theme }) => `${theme.colors.chatSecondary}`};
`
const LoadingLayer = styled(BlurView)`
  position: absolute;
  z-index: ${({ theme }) => `${theme.sizingMajor.x3}`};
  height: ${height}px;
  width: ${width}px;
  justify-content: center;
  align-items: center;
`
