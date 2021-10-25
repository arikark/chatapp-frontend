import React, { useState } from 'react'
import {
  Dimensions,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  TouchableOpacity
} from 'react-native'
import { Snackbar, useTheme } from 'react-native-paper'
import { FontAwesome } from '@expo/vector-icons'
import styled from 'styled-components'
import LottieView from 'lottie-react-native'
import { BlurView } from 'expo-blur'

import ImagePortal from '../../shared/components/ImagePortal'
import ScreenWrapper from '../../shared/layouts/ScreenWrapper'
import {
  useUpdateProfileMutation,
  useUploadPhotoMutation
} from '../../../store/api/userServices'
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux'
import { selectProfile } from '../../profile/slice'
import CusTextInput from '../../shared/components/CusTextInput'
import { selectUserId, setStreamToken } from '../slice'
import { chatClient } from '../../../store/api'
import { getToken } from '../../shared/utils/secureStorage'

const { width, height } = Dimensions.get('window')

function SetProfileScreen() {
  const { colors, sizingMajor } = useTheme()
  const { photo } = useAppSelector(selectProfile)
  const dispatch = useAppDispatch()
  const id = useAppSelector(selectUserId)
  const [update, { isSuccess, isLoading }] = useUpdateProfileMutation()

  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [isError, setIsError] = useState(false)
  const onDismissSnackBar = () => setIsError(false)

  const onSubmit = async () => {
    setLoading(true)

    const streamToken = await getToken('streamToken')
    if (username == '' || photo == undefined) {
      setIsError(true)
    } else {
      await chatClient.disconnectUser()
      await chatClient.connectUser(
        {
          id: id!,
          name: username,
          image: photo
        },
        streamToken
      )
      const result = await update({
        username,
        bio
      })

      dispatch(setStreamToken(streamToken))
    }
    setLoading(false)
  }
  return (
    <KeyboardAvoid behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <ScreenWrapper>
            <Title>Set Your Profile</Title>
            <Container>
              <PhotoFrameWrapper>
                <ImagePortal
                  imageUploadMutation={useUploadPhotoMutation}
                  image={photo}
                />
              </PhotoFrameWrapper>
              <InputContainer>
                <TextContainer>
                  <CusTextInput
                    title="Username"
                    text={username}
                    icon="user"
                    setText={setUsername}
                    placeholder="Username"
                  />
                </TextContainer>
                <TextContainer>
                  <CusTextInput
                    title="Bio"
                    text={bio}
                    icon="smile-o"
                    setText={setBio}
                    placeholder="Bio"
                    multiline
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
              Invalid information.
            </Snackbar>
          </ScreenWrapper>
          {loading && (
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

export default SetProfileScreen

const KeyboardAvoid = styled(KeyboardAvoidingView)`
  flex: ${({ theme }) => `${theme.sizingMinor.x1}`};
`
const Container = styled(View)`
  flex: ${({ theme }) => `${theme.sizingMinor.x1}`};
  justify-content: center;
`
const PhotoFrameWrapper = styled(View)`
  align-items: center;
  justify-content: center;
  margin-top: ${({ theme }) => `${theme.sizingMajor.x4}px`};
`

const InputContainer = styled(View)``

const Title = styled(Text)`
  align-self: center;
  margin-left: ${({ theme }) => `${theme.sizingMajor.x2}px`};
  margin-top: ${({ theme }) => `${theme.sizingMajor.x1}%`};
  font-size: ${({ theme }) => `${theme.sizingMajor.x4}px`};
  font-weight: bold;
`

const TextContainer = styled(View)`
  align-self: center;
  margin-top: ${({ theme }) => `${theme.sizingMajor.x2}px`};
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
const LottieContainer = styled(LottieView)`
  align-self: center;
  height: ${width * 0.8}px;
  width: ${width * 0.8}px;
`
const LoadingLayer = styled(BlurView)`
  position: absolute;
  z-index: ${({ theme }) => `${theme.sizingMajor.x3}`};
  height: ${height}px;
  width: ${width}px;
  justify-content: center;
  align-items: center;
`
