import React, { useState } from 'react'
import { ActivityIndicator, Pressable, Text, View } from 'react-native'
import { useMessageContext } from 'stream-chat-expo'
import styled from 'styled-components'
import { useTheme } from 'react-native-paper'
import { Audio, AVPlaybackStatus } from 'expo-av'
import { FontAwesome } from '@expo/vector-icons'

import { formatTime } from './utilities'

// This component is used for showing voice message.
export const VoiceAttachment = (props: any) => {
  const { colors, sizingMajor } = useTheme()
  const { message } = useMessageContext()

  const [currentPositionSec, setCurrentPositionSec] = useState(0)
  const [loadingAudio, setLoadingAudio] = useState(false)
  const [paused, setPaused] = useState(false)
  const [playTime, setPlayTime] = useState('0')
  const [sound, setSound] = React.useState<any>(undefined)

  const currentDurationSec = props.audio_length
  const duration = formatTime(props.audio_length)

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound')
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  const onStartPlay = async () => {
    setPaused(false)

    if (sound !== undefined) {
      await sound.playAsync()
    } else {
      setLoadingAudio(true)

      // Update play time while playing audio.
      const _onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
        if (status.isLoaded === true) {
          setCurrentPositionSec(status.positionMillis)
          setPlayTime(formatTime(status.positionMillis))

          if (status.positionMillis === status.durationMillis) {
            // If finish playing audio, it will automatically stop.
            onStopPlay()
          }
        }
      }

      const newSound = new Audio.Sound()
      newSound.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate)

      const source = {
        uri: props.asset_url
      }
      // Load the audio (raw voice message file).
      await newSound.loadAsync(source, {}, true)
      setSound(newSound)

      // Playing audio.
      newSound.playAsync().finally(() => {
        setLoadingAudio(false)
      })
    }
  }

  const onPausePlay = async () => {
    setPaused(true)
    await sound.pauseAsync()
  }

  const onStopPlay = async () => {
    setPaused(false)

    // Reset play time.
    setCurrentPositionSec(0)
    setPlayTime('0')

    if (sound !== undefined) {
      await sound.stopAsync()
      sound.unloadAsync()
    }
    setSound(undefined)
  }

  if (props.type !== 'voice-message') {
    return null
  }

  return (
    <Container>
      <AudioPlayerContainer>
        {message.status === 'sending' || loadingAudio ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : currentPositionSec > 0 && !paused ? (
          <PressableBtn onPress={onPausePlay}>
            <FontAwesome
              name="pause"
              size={sizingMajor.x3}
              color={colors.primary}
            />
          </PressableBtn>
        ) : (
          <PressableBtn onPress={onStartPlay}>
            <FontAwesome
              name="play"
              size={sizingMajor.x3}
              color={colors.primary}
            />
          </PressableBtn>
        )}
        <ProgressIndicatorContainer>
          <ProgressLine
            style={{
              width: `${(currentPositionSec / currentDurationSec) * 100}%`
            }}
          />
        </ProgressIndicatorContainer>
      </AudioPlayerContainer>
      <ProgressDetailsContainer>
        <ProgressDetailsText>Progress: {playTime}</ProgressDetailsText>
        <ProgressDetailsText>Duration: {duration}</ProgressDetailsText>
      </ProgressDetailsContainer>
    </Container>
  )
}

const Container = styled(View)`
  padding: ${({ theme }) => `${theme.sizingMinor.x5}px`};
  width: ${({ theme }) => `${theme.sizingMajor.x14}px`};
`
const AudioPlayerContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`
const ProgressDetailsContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`
const ProgressDetailsText = styled(Text)`
  padding: ${({ theme }) =>
    `${theme.sizingMinor.x0}px ${theme.sizingMinor.x5}px`};
  color: ${({ theme }) => `${theme.colors.secondText}`};
  font-size: ${({ theme }) => `${theme.sizingMajor.x1}px`};
`
const ProgressIndicatorContainer = styled(View)`
  flex: ${({ theme }) => `${theme.sizingMinor.x1}`};
  background-color: white;
`
const ProgressLine = styled(View)`
  border: ${({ theme }) => `${theme.sizingMinor.x1}px`} solid black;
`
const PressableBtn = styled(Pressable)`
  height: ${({ theme }) => `${theme.sizingMajor.x4}px`};
  width: ${({ theme }) => `${theme.sizingMajor.x4}px`};
  justify-content: center;
  align-items: center;
`
