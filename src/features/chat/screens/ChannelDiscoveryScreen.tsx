import React, { useEffect, useState } from 'react'
import { FlatList, Text, TouchableOpacity } from 'react-native'
import { ActivityIndicator, useTheme } from 'react-native-paper'

import styled from 'styled-components'
import { getCurrentLocation } from '../slice'
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux'
import { chatClient } from '../../../store/api'
import ScreenWrapper from '../../shared/layouts/ScreenWrapper'
import { selectStreamIOToken } from '../../authentication/slice'
import { getToken } from '../../shared/utils/secureStorage'
import { EmptyCompoent, RenderItem } from '../components/RenderItem'
import { useFetchNearbyMutation } from '../../../store/api/chatServices'
import { RangeDialog } from '../components/RangeDialog'

export default function ChannelListScreen({ navigation }: { navigation: any }) {
  const dispatch = useAppDispatch()
  const { colors } = useTheme()
  const [clientReady, setClientReady] = useState(false)
  const [channelList, setChannelList] = useState<any>([])
  const [isRefreshed, setIsRefreshed] = useState(false)
  const streamToke = useAppSelector(selectStreamIOToken)
  const [range, setRange] = useState('1km')
  const [fetchChannels, { isSuccess, isLoading, isError }] =
    useFetchNearbyMutation()

  const [dialogVisible, setVisible] = useState(false)
  const showDialog = () => setVisible(true)
  const hideDialog = () => setVisible(false)

  useEffect(() => {
    const setupClient = async () => {
      const userId = await getToken('userId')
      const user = {
        id: userId!
      }
      await chatClient.disconnectUser()
      await chatClient.connectUser(user, streamToke)
      await refreshed()
      setClientReady(true)
    }
    setupClient()
  }, [])

  const getRange = (range: string) => {
    switch (range) {
      case '1km':
        return 1000
      case '3km':
        return 3000
      case '5km':
        return 5000
    }
  }
  const refreshed = async () => {
    setIsRefreshed(true)
    const coordinate = await getCurrentLocation()
    const selectedRange = getRange(range)
    const result = await fetchChannels({
      range: selectedRange!,
      location: coordinate
    })
    console.log(result)
    const filterChannelList: string[] = []

    // @ts-ignore
    if (result.data != undefined && result.data.data.length != 0) {
      // @ts-ignore
      result.data.data.forEach((element) => filterChannelList.push(element.id))

      const filter = {
        id: { $in: filterChannelList },
        type: 'messaging'
      }
      const channels = await chatClient.queryChannels(filter!)
      setChannelList(channels)
    }
    setIsRefreshed(false)
  }

  return (
    <ScreenWrapper safeTop={false}>
      {clientReady ? (
        <>
          <FlatList
            refreshing={isRefreshed}
            onRefresh={refreshed}
            data={channelList}
            ListEmptyComponent={EmptyCompoent}
            renderItem={(item) => (
              <RenderItem
                {...item}
                navigation={navigation}
                dispatch={dispatch}
              />
            )}
            keyExtractor={(item) => item.id}
          />
          <RangeButton onPress={showDialog}>
            <RangeText>{range}</RangeText>
          </RangeButton>
          <RangeDialog
            range={range}
            setRange={setRange}
            isVisible={dialogVisible}
            hideDialog={hideDialog}
          />
        </>
      ) : (
        <LoadingIcon size="large" color={colors.chatPrimary} animating />
      )}
    </ScreenWrapper>
  )
}

const RangeButton = styled(TouchableOpacity)`
  position: absolute;
  bottom: ${({ theme }) => `${theme.sizingMajor.x3}px`};
  right: ${({ theme }) => `${theme.sizingMajor.x3}px`};
  background-color: ${({ theme }) => `${theme.colors.chatPrimary}`};
  height: ${({ theme }) => `${theme.sizingMajor.x6}px`};
  width: ${({ theme }) => `${theme.sizingMajor.x6}px`};
  border-radius: ${({ theme }) => `${theme.sizingMajor.x3}px`};
  justify-content: center;
  align-items: center;
`

const RangeText = styled(Text)`
  font-size: ${({ theme }) => `${theme.sizingMajor.x2}px`};
  color: ${({ theme }) => `${theme.colors.surface}`};
  font-weight: bold;
`
const LoadingIcon = styled(ActivityIndicator)`
  margin-top: ${({ theme }) => `${theme.sizingMajor.x3}px`};
`
