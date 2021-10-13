// Ideallly would wrap this in a container and pass the rtk query hooks as props, but not able to.

import React, { useState } from 'react'
import { useTheme, ActivityIndicator } from 'react-native-paper'
import styled from 'styled-components'
import { Image, View, TouchableOpacity } from 'react-native'
import i18n from 'i18n-js'

import Icon from '../../shared/components/Icon'
import { useUploadPhotoMutation } from '../../../store/api/userServices'
import {
  prepareFileUpload,
  chatAppImagePicker,
  chatAppCamera
} from '../../shared/utils'
import Dialog from '../../shared/components/Dialog'

const Container = styled(View)`
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
const Photo = styled(Image)`
  width: 100%;
  height: 100%;
`

type PhotoFrameProps = {
  profilePhoto: string | undefined
}

const PhotoActivityIndicator = styled(ActivityIndicator)`
  margin-top: ${({ theme }) => `${theme.sizingMajor.x10}px`};
`

export default function PhotoFrame({ profilePhoto }: PhotoFrameProps) {
  const { colors, sizingMajor } = useTheme()

  const [uploadPhoto, { isSuccess, isLoading, isError }] =
    useUploadPhotoMutation()
  const [image, setImage] = useState<string | null>()

  const addImage = async () => {
    const _image = await chatAppImagePicker()
    if (!_image.cancelled) {
      setImage(_image.uri)
    }
  }

  const openCamera = async () => {
    const _image = await chatAppCamera()
    if (_image && !_image.cancelled) {
      setImage(_image.uri)
    }
  }
  const uploadImage = async (image: string) => {
    const imageFile = prepareFileUpload(image)
    const result = await uploadPhoto(imageFile).unwrap()
    console.log(result)
    setImage(undefined)
  }
  const displayImage = image ? image : profilePhoto
  return (
    <Container>
      {isLoading ? (
        <PhotoActivityIndicator color={colors.surface} size="large" />
      ) : (
        // inluclde loading spinner when fetching from s3
        displayImage && <Photo source={{ uri: displayImage }} />
      )}
      <UploadBtnContainer>
        {!image ? (
          // Edit photo Icons
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
        ) : (
          // Confirmation Icons
          <>
            <TouchableOpacity onPress={() => uploadImage(image)}>
              <Icon
                name="check"
                size={sizingMajor.x3}
                color={colors.chatPrimary}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setImage(null)}>
              <Icon
                name="times"
                size={sizingMajor.x3}
                color={colors.chatPrimary}
              />
            </TouchableOpacity>
          </>
        )}
        <Dialog
          body={i18n.t('profile.failedUploadErrorMessage')}
          isVisible={isError}
        />
      </UploadBtnContainer>
    </Container>
  )
}
