import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { View, Text, Image, Dimensions } from 'react-native'
import { ActivityIndicator, Button, useTheme } from 'react-native-paper'
import { ChannelList, Chat } from 'stream-chat-expo'

import ScreenWrapper from '../../shared/layouts/ScreenWrapper'
import { chatClient } from '../../../store/api'
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux'
import { selectStreamIOToken } from '../../authentication/slice'
import { ListPreviewMessage } from '../components/ListPreviewMessage'
import { setChannel } from '../slice'
import { getToken } from '../../shared/utils/secureStorage'

const options = {
  state: true,
  watch: true
}
export default function JoinedChannelListScreen({
  navigation
}: {
  navigation: any
}) {
  const dispatch = useAppDispatch()
  const { colors } = useTheme()
  const [clientReady, setClientReady] = useState(false)
  const streamToken = useAppSelector(selectStreamIOToken)
  const [filter, setFilter] = useState({})

  useEffect(() => {
    let isSubscribed = true

    const setupClient = async () => {
      const userId = await getToken('userId')
      const user = {
        id: userId!
      }
      setFilter({
        members: { $in: [userId] },
        type: 'messaging'
      })

      await chatClient.disconnectUser()
      await chatClient.connectUser(user, streamToken)

      setClientReady(true)
    }
    setupClient()
    return () => {
      isSubscribed = false
    }
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
            filters={filter}
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
        <LoadingIcon size="large" color={colors.chatPrimary} animating />
      )}
    </ScreenWrapper>
  )
}
const LoadingIcon = styled(ActivityIndicator)`
  margin-top: ${({ theme }) => `${theme.sizingMajor.x3}px`};
`
