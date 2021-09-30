import React, { useContext } from 'react'
import { View, SafeAreaView } from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements'
import { Channel, Thread } from 'stream-chat-expo'
import styled from 'styled-components'

import { AppContext } from '../../../../App'

export default function ThreadScreen({
  route,
  navigation
}: {
  route: any
  navigation: any
}) {
  const channel = useContext(AppContext)?.channel
  const thread = useContext(AppContext)?.thread
  const setThread = useContext(AppContext)?.setThread

  const headerHeight = useHeaderHeight()

  return (
    <SafeAreaView>
      <Channel
        channel={channel}
        keyboardVerticalOffset={headerHeight}
        thread={thread}
      >
        <Container>
          <Thread onThreadDismount={() => setThread(null)} />
        </Container>
      </Channel>
    </SafeAreaView>
  )
}

const Container = styled(View)`
  flex: 1;
  justify-content: flex-start;
`
