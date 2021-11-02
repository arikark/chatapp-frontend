import React, { useEffect, useState } from 'react'
import { FlatList, Text, TouchableOpacity } from 'react-native'
import { ActivityIndicator, useTheme } from 'react-native-paper'

import styled from 'styled-components'
import { getCurrentLocation } from '../slice'
import { useAppDispatch } from '../../shared/hooks/redux'
import { chatClient } from '../../../store/api'
import ScreenWrapper from '../../shared/layouts/ScreenWrapper'
import { EmptyCompoent, RenderItem } from '../components/RenderItem'
import { useFetchNearbyMutation } from '../../../store/api/chatServices'
import { RangeDialog } from '../components/RangeDialog'
import { ConfirmationDialog } from '../components/ConfirmationDialog'

export default function ChannelListScreen({ navigation }: { navigation: any }) {
  const dispatch = useAppDispatch()
  const { colors } = useTheme()
  const [fetchChannels] = useFetchNearbyMutation()

  const [clientReady, setClientReady] = useState(false)
  const [channelList, setChannelList] = useState<any>([])
  const [isRefreshed, setIsRefreshed] = useState(false)

  const [range, setRange] = useState('1km')
  const [rangeVisible, setRangeVisible] = useState(false)
  const showRangeDialog = () => setRangeVisible(true)
  const hideRangeDialog = () => setRangeVisible(false)

  const [channelName, setChannelName] = useState('')
  const [channelId, setChannelId] = useState('')
  const [confirmVisible, setConfirmVisiblle] = useState(false)
  const showConfirmDialog = () => setConfirmVisiblle(true)
  const hideConfirmDialog = () => setConfirmVisiblle(false)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await refreshed()
    })

    return unsubscribe
  }, [navigation])

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
      // @ts-ignore
      const channels = await chatClient.queryChannels(filter!)
      setChannelList(channels)
    } else {
      console.log('empty')
      setChannelList([])
    }
    setClientReady(true)
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
                setChannelName={setChannelName}
                setChannelId={setChannelId}
                showDialog={showConfirmDialog}
                dispatch={dispatch}
              />
            )}
            keyExtractor={(item) => item.id}
          />
          <RangeButton onPress={showRangeDialog}>
            <RangeText>{range}</RangeText>
          </RangeButton>
          <ConfirmationDialog
            channelName={channelName}
            channelId={channelId}
            navigation={navigation}
            isVisible={confirmVisible}
            hideDialog={hideConfirmDialog}
          />
          <RangeDialog
            range={range}
            setRange={setRange}
            isVisible={rangeVisible}
            hideDialog={hideRangeDialog}
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
