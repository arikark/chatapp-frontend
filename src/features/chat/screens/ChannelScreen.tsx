import React, { useEffect } from 'react'
import { View, SafeAreaView } from 'react-native'
import { Channel, Chat, MessageInput, MessageList } from 'stream-chat-expo'
import { useHeaderHeight } from '@react-navigation/elements'
import { Audio } from 'expo-av'
import styled from 'styled-components'

import { InputBox } from '../components/InputBox'
import { VoiceAttachment } from '../components/VoiceAttachment'
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux'
import { getCurrentChannel, getCurrentThread, setThread } from '../slice'
import { chatClient } from '../../shared/api'

export default function ChannelScreen({ navigation }: { navigation: any }) {
  const dispatch = useAppDispatch()
  const curChannel = useAppSelector(getCurrentChannel)
  const curThread = useAppSelector(getCurrentThread)
  const headerHeight = useHeaderHeight()

  useEffect(() => {
    const getPermission = async () => {
      try {
        await Audio.requestPermissionsAsync()
      } catch (err) {
        console.error('Failed to start recording', err)
      }
    }

    getPermission()
  }, [headerHeight])

  return (
    <SafeAreaView>
      <Chat client={chatClient}>
        <Channel
          channel={curChannel.channel}
          Input={InputBox}
          Card={VoiceAttachment}
          keyboardVerticalOffset={headerHeight}
          thread={curThread}
        >
          <Container>
            <MessageList
              onThreadSelect={(thread: any) => {
                dispatch(setThread(thread))
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
