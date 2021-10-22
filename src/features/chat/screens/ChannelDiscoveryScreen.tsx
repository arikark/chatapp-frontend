import React, { useMemo } from 'react'
import { ActivityIndicator, Platform, Image } from 'react-native'
import { ChannelList, Chat } from 'stream-chat-expo'

import { ListPreviewMessage } from '../components/ListPreviewMessage'
import { setChannel } from '../slice'
import { useAppDispatch } from '../../shared/hooks/redux'
import { chatClient } from '../../../store/api'
import ScreenWrapper from '../../shared/layouts/ScreenWrapper'

const filters = {
  members: { $in: ['616920082892cf7ac4e0133a'] },
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

  React.useEffect(() => {
    const userToken =
      Platform.OS === 'ios'
        ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiTWFydmluIn0.UprvGJuI3mnC08XOmG2rIYjjI2vd-tyelZHibs2SboI'
        : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjE2OTIwMDgyODkyY2Y3YWM0ZTAxMzNhIn0.RQSEP_XiMecfCx334cjucFYAAb3puwqB_SvWiWWYnJM'
    const user = {
      id: Platform.OS === 'ios' ? 'Marvin' : '616920082892cf7ac4e0133a'
    }
    console.log(user.id)
    const setupClient = async () => {
      await chatClient.connectUser(user, userToken)
      setClientReady(true)
    }
    setupClient()
  }, [])

  return (
    <ScreenWrapper safeTop={false}>
      {clientReady ? (
        <Chat client={chatClient}>
          <ChannelList
            PreviewAvatar={({ channel }: { channel: any }) => {
              return (
                <Image
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 15
                  }}
                  source={{
                    uri: channel?.data.image
                      ? channel?.data.image
                      : 'https://img1.baidu.com/it/u=1897719880,2867606276&fm=26&fmt=auto'
                  }}
                />
              )
            }}
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
