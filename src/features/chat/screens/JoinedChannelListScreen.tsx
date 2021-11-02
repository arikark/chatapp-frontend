import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { Image } from 'react-native'
import { Text, ActivityIndicator, useTheme } from 'react-native-paper'
import { ChannelList, Chat } from 'stream-chat-expo'

import ScreenWrapper from '../../shared/layouts/ScreenWrapper'
import { chatClient } from '../../../store/api'
import { useAppSelector } from '../../shared/hooks/redux'
import { selectStreamIOToken } from '../../authentication/slice'
import { ListPreviewMessage } from '../components/ListPreviewMessage'
import { getToken } from '../../shared/utils/secureStorage'
import { AppContext } from '../../../navigation/AppNavigator'

const options = {
  state: true,
  watch: true
}
export default function JoinedChannelListScreen({
  navigation
}: {
  navigation: any
}) {
  const { colors, sizingMajor } = useTheme()
  const [clientReady, setClientReady] = useState(false)
  const streamToken = useAppSelector(selectStreamIOToken)
  const [filter, setFilter] = useState({})
  const setChannels = useContext(AppContext)?.setChannels
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
            PreviewTitle={({ channel }: { channel: any }) => (
              <PreviewTitleText>{channel?.data.name}</PreviewTitleText>
            )}
            PreviewAvatar={({ channel }: { channel: any }) => {
              return (
                <AvatarImage
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
              //
              setChannels(channel)
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
const AvatarImage = styled(Image)`
  height: ${({ theme }) => `${theme.sizingMajor.x7}px`};
  width: ${({ theme }) => `${theme.sizingMajor.x7}px`};
  border-radius: ${({ theme }) => `${theme.sizingMajor.x7 / 2}px`};
`
const PreviewTitleText = styled(Text)`
  font-family: Roboto_500Medium;
  font-size: ${({ theme }) => `${theme.sizingMinor.x5 * 4}px`};
`
