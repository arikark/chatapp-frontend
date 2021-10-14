import React from 'react'
import { View, SafeAreaView } from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements'
import { Channel, Chat, Thread } from 'stream-chat-expo'
import styled from 'styled-components'

import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux'
import { getCurrentChannel, getCurrentThread, setThread } from '../slice'
import { chatClient } from '../../../store/api'

export default function ThreadScreen() {
  const dispatch = useAppDispatch()

  const curChannel = useAppSelector(getCurrentChannel)
  const curThread = useAppSelector(getCurrentThread)
  const headerHeight = useHeaderHeight()

  return (
    <SafeAreaView>
      <Chat client={chatClient}>
        <Channel
          channel={curChannel}
          keyboardVerticalOffset={headerHeight}
          thread={curThread}
        >
          <Container>
            <Thread onThreadDismount={() => dispatch(setThread(null))} />
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
