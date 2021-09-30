import React, { useMemo, useContext } from 'react'
import { ActivityIndicator, View } from 'react-native'
import styled from 'styled-components'
import { ChannelList } from 'stream-chat-expo'

import { ListPreviewMessage } from '../components/ListPreviewMessage'
import { AppContext, chatClient } from '../../../../App'

const filters = {
  members: { $in: ['Marvin', 'Test_1'] },
  type: 'messaging'
}
const options = {
  state: true,
  watch: true
}

export default function ChannelListScreen({ navigation }: { navigation: any }) {
  const setChannel = useContext(AppContext)?.setChannel

  const memoizedFilters = useMemo(() => filters, [])
  const [clientReady, setClientReady] = React.useState(false)

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
    <Container>
      {clientReady ? (
        <ChannelList
          PreviewMessage={ListPreviewMessage}
          filters={memoizedFilters}
          onSelect={(channel) => {
            setChannel(channel)
            navigation.navigate('Channel', {
              name: channel?.data?.name
            })
          }}
          options={options}
        />
      ) : (
        <ActivityIndicator size="large" />
      )}
    </Container>
  )
}

const Container = styled(View)`
  height: 100%;
`
