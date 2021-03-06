import React, { useState, useEffect, useContext } from 'react'
import {
  View,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform
} from 'react-native'
import styled from 'styled-components'
import { useTheme, Button } from 'react-native-paper'

import ScreenWrapper from '../../shared/layouts/ScreenWrapper'
import Icon from '../../shared/components/Icon'
import { useCreateChannelMutation } from '../../../store/api/chatServices'
import { chatAppImagePicker, chatAppCamera } from '../../shared/utils'
import { getCurrentLocation, setChannelId } from '../slice'
import { prepareChannelCreation } from '../../shared/utils/prepareChannelCreation'
import { chatClient } from '../../../store/api'
import CusTextInput from '../../shared/components/CusTextInput'
import { getAddress } from '../components/utilities'
import { AppContext } from '../../../navigation/AppNavigator'
import { useAppDispatch } from '../../shared/hooks/redux'

const ImageContainer = styled(ImageBackground)`
  height: ${({ theme }) => `${theme.sizingMajor.x14}px`};
  width: ${({ theme }) => `${theme.sizingMajor.x14}px`};
  border-radius: ${({ theme }) => `${theme.sizingMajor.x14}px`};
  overflow: hidden;
  background-color: ${({ theme }) => `${theme.colors.chatPrimary}`};
`
const UploadBtnContainer = styled(View)`
  flex-direction: row;
  position: absolute;
  justify-content: space-evenly;
  padding-top: ${({ theme }) => `${theme.sizingMajor.x2}px`};
  bottom: 0;
  right: 0;
  height: 25%;
  width: 100%;
  overflow: hidden;
  background-color: ${({ theme }) => `${theme.colors.surface}`};
  opacity: 0.8;
`

function ChannelCreationScreen({ navigation }: { navigation: any }) {
  const dispatch = useAppDispatch()
  const setChannels = useContext(AppContext)?.setChannels
  const [channelName, setChannelName] = useState<string>('')
  const [channelDesc, setChannelDesc] = useState<string>('')
  const [coordinate, setCoordinate] = useState<number[] | null>(null)
  const [address, setAddress] = useState<string>('')
  const [locationLoading, setLocationLoading] = useState(false)
  const { colors, sizingMajor } = useTheme()
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [createChannel, { isSuccess, isLoading, isError }] =
    useCreateChannelMutation()

  useEffect(() => {
    const getLocation = async () => {
      setLocationLoading(true)
      const coordinate = await getCurrentLocation()
      const location = await getAddress(coordinate)

      setAddress(location)
      setCoordinate(coordinate)
      setLocationLoading(false)
    }
    getLocation()
  }, [])
  const addImage = async () => {
    const _image = await chatAppImagePicker()
    if (!_image.cancelled) {
      setPreviewImage(_image.uri!)
    }
  }

  const openCamera = async () => {
    const _image = await chatAppCamera()
    if (_image && !_image.cancelled) {
      setPreviewImage(_image.uri!)
    }
  }

  const onSubmit = async () => {
    if (coordinate != null) {
      const result = prepareChannelCreation(
        channelName,
        channelDesc,
        previewImage!,
        coordinate
      )
      const res = await createChannel(result).unwrap()
      console.log(res)
      const filter = { type: 'messaging', id: { $eq: res.data.id } }
      const channels = await chatClient.queryChannels(filter)
      console.log(channels[0].cid)
      dispatch(setChannelId(channels[0].cid))

      setChannels(channels[0])

      navigation.navigate('Channel', {
        name: channels[0]?.data?.name
      })
    }
  }

  return (
    <KeyboardAvoid behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScreenWrapper>
          <Container>
            <ImageContainer
              source={
                previewImage
                  ? { uri: previewImage }
                  : require('../../../../assets/profile-photo-default.png')
              }
            >
              <UploadBtnContainer>
                <>
                  <TouchableOpacity onPress={openCamera}>
                    <Icon
                      name="camera"
                      size={sizingMajor.x3}
                      color={colors.chatPrimary}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={addImage}>
                    <Icon
                      name="image"
                      size={sizingMajor.x3}
                      color={colors.chatPrimary}
                    />
                  </TouchableOpacity>
                </>
              </UploadBtnContainer>
            </ImageContainer>
            <TextContainer>
              <CusTextInput
                title="Channel Name"
                text={channelName}
                placeholder="COMP90018"
                icon="gift"
                setText={setChannelName}
              />
            </TextContainer>
            <TextContainer>
              <CusTextInput
                title="Channel Description"
                text={channelDesc}
                placeholder="Have fun!!!"
                icon="comments"
                setText={setChannelDesc}
              />
            </TextContainer>
            <TextContainer>
              <CusTextInput
                editable={false}
                title="Current Location"
                text={address}
                placeholder="Your location"
                icon={null}
                setText={setAddress}
              />
            </TextContainer>
            <CreateButton
              mode="contained"
              loading={isLoading || locationLoading}
              onPress={() => onSubmit()}
              disabled={
                channelName === '' ||
                channelDesc === '' ||
                previewImage === null ||
                isLoading ||
                locationLoading
              }
            >
              CREATE
            </CreateButton>
          </Container>
        </ScreenWrapper>
      </TouchableWithoutFeedback>
    </KeyboardAvoid>
  )
}

export default ChannelCreationScreen

const KeyboardAvoid = styled(KeyboardAvoidingView)`
  flex: ${({ theme }) => `${theme.sizingMinor.x1}`};
`
const TextContainer = styled(View)`
  align-self: center;
  margin-top: ${({ theme }) => `${theme.sizingMajor.x2}px`};
  width: ${({ theme }) => `${theme.sizingMajor.x11}%`};
`
const Container = styled(View)`
  padding-top: ${({ theme }) => `${theme.sizingMajor.x3}px`};
  align-items: center;
  justify-content: center;
  flex: ${({ theme }) => `${theme.sizingMinor.x1}`};
`
const CreateButton = styled(Button)`
  margin-top: ${({ theme }) => `${theme.sizingMajor.x3}px`};
  margin-bottom: ${({ theme }) => `${theme.sizingMajor.x4}%`};
  width: ${({ theme }) => `${theme.sizingMajor.x10}%`};
  background-color: ${({ theme }) => `${theme.colors.chatPrimary}`};
`
