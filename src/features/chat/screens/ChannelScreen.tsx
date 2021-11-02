import React, { useContext, useEffect } from 'react'
import { View, SafeAreaView, LogBox } from 'react-native'
import { Channel, Chat, MessageInput, MessageList } from 'stream-chat-expo'
import { useHeaderHeight } from '@react-navigation/elements'
import { Audio } from 'expo-av'
import styled from 'styled-components'

import { InputBox } from '../components/InputBox'
import { VoiceAttachment } from '../components/VoiceAttachment'
import { chatClient } from '../../../store/api'
import { AppContext } from '../../../navigation/AppNavigator'

export default function ChannelScreen({ navigation }: { navigation: any }) {
  const headerHeight = useHeaderHeight()
  const channels = useContext(AppContext)?.channels
  const threads = useContext(AppContext)?.threads
  const setThreads = useContext(AppContext)?.setThreads

  useEffect(() => {
    // Get microphone permission.
    const getPermission = async () => {
      try {
        await Audio.requestPermissionsAsync()
      } catch (err) {
        console.error('Failed to start  recording', err)
      }
    }

    getPermission()
  }, [headerHeight])

  return (
    <SafeAreaView>
      <Chat client={chatClient}>
        <Channel
          channel={channels}
          Input={InputBox}
          Card={VoiceAttachment}
          keyboardVerticalOffset={headerHeight}
          thread={threads}
        >
          <Container>
            <MessageList
              onThreadSelect={(thread: any) => {
                setThreads(thread)
                navigation.navigate('Thread')
              }}
            />
            <MessageInput />
          </Container>
        </Channel>
      </Chat>
    </SafeAreaView>
  )
}

const Container = styled(View)`
  flex: ${({ theme }) => `${theme.sizingMinor.x1}`};
`
