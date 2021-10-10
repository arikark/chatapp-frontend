import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import {
  AttachButton,
  SendButton,
  useChatContext,
  useMessageInputContext,
  useMessagesContext,
  ImageUploadPreview,
  FileUploadPreview,
  AutoCompleteInput,
  useChannelContext
} from 'stream-chat-expo'
import { FontAwesome } from '@expo/vector-icons'
import { Audio } from 'expo-av'
import { RecordingOptions } from 'expo-av/build/Audio'
import styled from 'styled-components'
import { useTheme } from 'react-native-paper'

import { formatTime, uuidv4 } from './utilities'

// This option is used for getting a same format recording file in both iOS and Android.
const CUSTOM_RECORDING_OPTIONS_PRESET_HIGH_QUALITY: RecordingOptions = {
  isMeteringEnabled: true,
  android: {
    extension: '.m4a',
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000
  },
  ios: {
    extension: '.m4a',
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
    outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false
  }
}

// This component is used for the chat input area.
export const InputBox = () => {
  // Following variables are common Stream.io variables for sending file,
  // updating message type, etc.
  const { client } = useChatContext()
  const {
    text,
    giphyActive,
    imageUploads,
    fileUploads,
    toggleAttachmentPicker
  } = useMessageInputContext()
  const { updateMessage } = useMessagesContext()
  const { channel } = useChannelContext()

  // Recording states.
  const [recordingActive, setRecordingActive] = useState(false)
  const [recordSecs, setRecordSecs] = useState(0)
  const [recordTime, setRecordTime] = useState('0')
  const [recording, setRecording] = useState<any>()

  const { colors, sizingMajor } = useTheme()

  const sendVoiceMessage = async (uri: string) => {
    const uuid = uuidv4()

    // Compose a message object to be sent.
    const message = {
      attachments: [
        {
          asset_url: uri,
          type: 'voice-message',
          audio_length: recordSecs
        }
      ],
      mentioned_users: [],
      id: `${client.user!.id}-${uuid}`
    }

    // Add the message optimistically to local state first.
    updateMessage(message)

    // Upload the file to cdn.
    const res = await channel!.sendFile(uri, 'recording.m4a', 'audio/mp4')
    message.attachments[0].asset_url = res.file

    await channel!.sendMessage(message)
  }

  const startRecording = async () => {
    setRecordingActive(true)

    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true
      })

      const _onRecordingStatusUpdate = (status: any) => {
        setRecordSecs(status.durationMillis)
        setRecordTime(formatTime(status.durationMillis))
      }

      const { recording } = await Audio.Recording.createAsync(
        CUSTOM_RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
        _onRecordingStatusUpdate
      )

      setRecording(recording)
      console.log('Recording started')
    } catch (err) {
      console.error('Failed to start recording', err)
    }
  }

  const stopRecording = async () => {
    setRecordingActive(false)
    console.log('Stopping recording..')

    let recordingTooShort: boolean = false
    recording
      .stopAndUnloadAsync()
      .then((status: any) => {
        if (status.durationMillis <= 2000) {
          recordingTooShort = true
        }
      })
      .then(() => {
        if (!recordingTooShort) {
          const uri = recording.getURI()
          sendVoiceMessage(uri).catch((err) => {
            console.log(err)
          })
        }
        setRecording(undefined)
      })
  }

  const emptyInput =
    !text && !imageUploads.length && !fileUploads.length && !giphyActive

  return (
    <Container>
      <ImageUploadPreview />
      <FileUploadPreview />
      <InputContainer>
        {!recordingActive ? (
          <InputComponent>
            <AttachButton handleOnPress={toggleAttachmentPicker} />
            <AutoCompleteInputContainer>
              <AutoCompleteInput />
            </AutoCompleteInputContainer>
          </InputComponent>
        ) : (
          <RecordingContainer>
            <Text>Recording Voice {recordTime}</Text>
          </RecordingContainer>
        )}
        {emptyInput ? (
          <RecordingBtn onLongPress={startRecording} onPressOut={stopRecording}>
            <FontAwesome
              name="microphone"
              size={sizingMajor.x3}
              color={colors.primary}
            />
          </RecordingBtn>
        ) : (
          <SendButton />
        )}
      </InputContainer>
    </Container>
  )
}

const Container = styled(View)`
  width: ${({ theme }) => `${theme.sizingMajor.x12}%`};
`
const InputContainer = styled(View)`
  width: ${({ theme }) => `${theme.sizingMajor.x12}%`};
  flex-direction: row;
  align-items: center;
  height: ${({ theme }) => `${theme.sizingMajor.x5}px`};
`
const AutoCompleteInputContainer = styled(View)`
  margin: ${({ theme }) =>
    `${theme.sizingMinor.x0}px ${theme.sizingMajor.x1}px`};
  padding: ${({ theme }) =>
    `${theme.sizingMajor.x1}px ${theme.sizingMinor.x0}px`};
  justify-content: center;
`
const InputComponent = styled(View)`
  flex: ${({ theme }) => `${theme.sizingMinor.x1}`};
  flex-direction: row;
  align-items: center;
`
const RecordingContainer = styled(View)`
  flex: ${({ theme }) => `${theme.sizingMinor.x1}`}; ;
`
const RecordingBtn = styled(TouchableOpacity)`
  height: ${({ theme }) => `${theme.sizingMajor.x4}px`};
  width: ${({ theme }) => `${theme.sizingMajor.x4}px`};
`
