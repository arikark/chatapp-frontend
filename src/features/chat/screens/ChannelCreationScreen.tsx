import React, { useState } from 'react'
import { View, ImageBackground, TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { useTheme, Button, TextInput } from 'react-native-paper'
import * as Location from 'expo-location'
import { LocationObject } from 'expo-location'

import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux'
import ScreenWrapper from '../../shared/layouts/ScreenWrapper'
import Icon from '../../shared/components/Icon'
import { useCreateChannelMutation } from '../../../store/api/chatServices'
import {
  prepareFileUpload,
  chatAppImagePicker,
  chatAppCamera
} from '../../shared/utils'
import { getCurrentChannel, getCurrentThread, setThread } from '../slice'

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
  const [channelName, setChannelName] = useState<string>('')
  const [channelDesc, setChannelDesc] = useState<string>('')
  const [location, setLocation] = useState<LocationObject | null>(null)
  const [locationLoading, setLocationLoading] = useState(false)
  const { colors, sizingMajor } = useTheme()
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [createChannel, { isSuccess, isLoading, isError }] =
    useCreateChannelMutation()

  // const { email, username, bio, photo } = useAppSelector(selectProfile)

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

  const getLocation = async () => {
    setLocationLoading(true)
    const location = await Location.getCurrentPositionAsync({})
    setLocationLoading(false)
    return location
  }
  const onSubmit = async () => {
    const currentLocation = await getLocation()
    const chatAvatar = prepareFileUpload(previewImage!)
    console.log(channelName, channelDesc, chatAvatar, currentLocation)
    await createChannel({
      channelName,
      channelDesc,
      chatAvatar,
      currentLocation
    })
    navigation.navigate('Thread')
  }

  return (
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

        <CustomTextInput
          mode="outlined"
          label="Channel Name"
          value={channelName}
          onChangeText={(text) => setChannelName(text)}
        />
        <CustomTextInput
          mode="outlined"
          label="Description"
          value={channelDesc}
          onChangeText={(text) => setChannelDesc(text)}
        />
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
  )
}

export default ChannelCreationScreen

const CustomTextInput = styled(TextInput)`
  margin-top: ${({ theme }) => `${theme.sizingMajor.x3}px`};
  width: ${({ theme }) => `${theme.sizingMajor.x10}%`};
`
const Container = styled(View)`
  padding-top: ${({ theme }) => `${theme.sizingMajor.x3}px`};
  align-items: center;
  flex: ${({ theme }) => `${theme.sizingMinor.x1}`};
`
const CreateButton = styled(Button)`
  margin-top: ${({ theme }) => `${theme.sizingMajor.x3}px`};
  width: ${({ theme }) => `${theme.sizingMajor.x10}%`};
  background-color: ${({ theme }) => `${theme.colors.chatPrimary}`};
`
