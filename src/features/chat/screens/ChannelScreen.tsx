import React, { useContext, useEffect } from 'react'
import { View, SafeAreaView } from 'react-native'
import { Channel, MessageInput, MessageList } from 'stream-chat-expo'
import { useHeaderHeight } from '@react-navigation/elements'
import { Audio } from 'expo-av'
import styled from 'styled-components'

import { InputBox } from '../components/InputBox'
import { VoiceAttachment } from '../components/VoiceAttachment'
import { AppContext } from '../../../../App'

export default function ChannelScreen({ navigation }: { navigation: any }) {
  const channel = useContext(AppContext)?.channel
  const thread = useContext(AppContext)?.thread
  const setThread = useContext(AppContext)?.setThread

  const headerHeight = useHeaderHeight()

  useEffect(() => {
    const getPermission = async () => {
      try {
        console.log('Requesting permissions..')
        await Audio.requestPermissionsAsync()
      } catch (err) {
        console.error('Failed to start recording', err)
      }
    }

    getPermission()
  }, [headerHeight])

  return (
    <SafeAreaView>
      <Channel
        channel={channel}
        Input={InputBox}
        Card={VoiceAttachment}
        keyboardVerticalOffset={headerHeight}
        thread={thread}
      >
        <Container>
          <MessageList
            onThreadSelect={(thread) => {
              setThread(thread)
              navigation.navigate('Thread')
            }}
          />
          <MessageInput />
        </Container>
      </Channel>
    </SafeAreaView>
  )
}

const Container = styled(View)`
  flex: 1;
`
