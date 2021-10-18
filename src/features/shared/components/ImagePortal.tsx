// Ideallly would wrap this in a container and pass the rtk query hooks as props, but not able to.

import React, { useState } from 'react'
import { useTheme, ActivityIndicator } from 'react-native-paper'
import styled from 'styled-components'
import { View, TouchableOpacity, ImageBackground } from 'react-native'
import i18n from 'i18n-js'

import Icon from './Icon'
import { prepareFileUpload, chatAppImagePicker, chatAppCamera } from '../utils'
import Dialog from './Dialog'

const Container = styled(ImageBackground)`
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

type ImageFrameProps = {
  image: string | undefined
  // TODO:not sure how to type this
  imageUploadMutation: any
}

const ImageActivityIndicator = styled(ActivityIndicator)`
  position: absolute;
  top: 50%;
  left: 50%;
  right: 50%;
  bottom: 50%;

  /* margin-top: ${({ theme }) => `${theme.sizingMajor.x10}px`}; */
`

export default function ImagePortal({
  image,
  imageUploadMutation
}: ImageFrameProps) {
  const { colors, sizingMajor } = useTheme()

  const [uploadImage, { isSuccess, isLoading, isError }] = imageUploadMutation()
  const [previewImage, setPreviewImage] = useState<string | null>()

  const addImage = async () => {
    const _image = await chatAppImagePicker()
    if (!_image.cancelled) {
      setPreviewImage(_image.uri)
    }
  }

  const openCamera = async () => {
    const _image = await chatAppCamera()
    if (_image && !_image.cancelled) {
      setPreviewImage(_image.uri)
    }
  }
  const uploadImageToS3 = async (image: string) => {
    const imageFile = prepareFileUpload(image)
    const result = await uploadImage(imageFile).unwrap()
    console.log(result)
    setPreviewImage(undefined)
  }
  const displayImage = previewImage ? previewImage : image
  return (
    <Container
      source={{ uri: displayImage }}
      defaultSource={require('../../../../assets/profile-photo-default.png')}
    >
      {isLoading && (
        <ImageActivityIndicator color={colors.chatPrimary} size="large" />
      )}
      <UploadBtnContainer>
        {!previewImage ? (
          // Edit Image Icons
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
            <TouchableOpacity
              onPress={() => uploadImageToS3(previewImage)}
              disabled={isLoading}
            >
              <Icon
                name="check"
                size={sizingMajor.x3}
                color={colors.chatPrimary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPreviewImage(null)}
              disabled={isLoading}
            >
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
