import React, { useMemo } from 'react'
import { ActivityIndicator, View } from 'react-native'
import styled from 'styled-components'
import { ChannelList, Chat } from 'stream-chat-expo'

import { ListPreviewMessage } from '../components/ListPreviewMessage'
import { setChannel } from '../slice'
import { useAppDispatch } from '../../shared/hooks/redux'
import { chatClient } from '../../../store/api'
import ScreenWrapper from '../../shared/layouts/ScreenWrapper'

const filters = {
  members: { $in: ['Marvin', 'Test_1'] },
  type: 'messaging'
}
const options = {
  state: true,
  watch: true
}

export default function ChannelListScreen({ navigation }: { navigation: any }) {
  const dispatch = useAppDispatch()
  const memoizedFilters = useMemo(() => filters, [])
  const [clientReady, setClientReady] = React.useState(false)

  // Temp user info for testing.
  const userToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiTWFydmluIn0.UprvGJuI3mnC08XOmG2rIYjjI2vd-tyelZHibs2SboI'
  const user = {
    id: 'Marvin'
  }

  React.useEffect(() => {
    const setupClient = async () => {
      await chatClient.connectUser(user, userToken)
      setClientReady(true)
    }
    setupClient()
  }, [])

  return (
    <ScreenWrapper>
      {clientReady ? (
        <Chat client={chatClient}>
          <ChannelList
            PreviewMessage={ListPreviewMessage}
            filters={memoizedFilters}
            onSelect={(channel: any) => {
              dispatch(setChannel(channel))
              navigation.navigate('Channel', {
                name: channel?.data?.name
              })
            }}
            options={options}
          />
        </Chat>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </ScreenWrapper>
  )
}
