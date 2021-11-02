import React, { useContext } from 'react'
import { View, SafeAreaView } from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements'
import { Channel, Chat, Thread } from 'stream-chat-expo'
import styled from 'styled-components'

import { chatClient } from '../../../store/api'
import { AppContext } from '../../../navigation/AppNavigator'

export default function ThreadScreen() {
  const headerHeight = useHeaderHeight()
  const channels = useContext(AppContext)?.channels
  const threads = useContext(AppContext)?.threads
  const setThreads = useContext(AppContext)?.setThreads

  return (
    <SafeAreaView>
      <Chat client={chatClient}>
        <Channel
          channel={channels}
          keyboardVerticalOffset={headerHeight}
          thread={threads}
        >
          <Container>
            <Thread onThreadDismount={() => setThreads(null)} />
          </Container>
        </Channel>
      </Chat>
    </SafeAreaView>
  )
}

const Container = styled(View)`
  flex: ${({ theme }) => `${theme.sizingMinor.x1}`};
  justify-content: flex-start;
`
