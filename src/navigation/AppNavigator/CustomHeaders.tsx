import React from 'react'
import styled from 'styled-components'
import { Text, useTheme } from 'react-native-paper'
import { TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

import Icon from '../../features/shared/components/Icon'
import {
  useAppDispatch,
  useAppSelector
} from '../../features/shared/hooks/redux'
import {
  getCurrentChannelId,
  setListOrCarousel,
  setUsersLocation
} from '../../features/chat/slice'
import { useGetUsersMutation } from '../../store/api/userServices'
import { chatClient } from '../../store/api'

const HeaderText = styled(Text)`
  font-family: Roboto_700Bold;
  font-size: ${({ theme }) => `${theme.sizingMajor.x3}px`};
`
const HeaderContainer = styled(View)`
  flex-direction: row;
  width: ${({ theme }) => `${theme.sizingMajor.x12}%`};
  align-items: center;
  justify-content: space-between;
`
const CreateChannelButton = styled(TouchableOpacity)`
  margin-right: ${({ theme }) => `${theme.sizingMajor.x1}px`};
  justify-content: center;
`
export const JoinedChannelHeader = () => {
  const { colors } = useTheme()
  const navigation = useNavigation()
  return (
    <HeaderContainer>
      <HeaderText>Joined Channels</HeaderText>
      <CreateChannelButton
        onPress={() => navigation.navigate('ChannelCreation')}
      >
        <Icon name="plus-circle" color={colors.chatPrimary} />
      </CreateChannelButton>
    </HeaderContainer>
  )
}
export const ChannelDiscoverHeader = () => {
  const dispatch = useAppDispatch()
  const { colors, sizingMajor } = useTheme()
  const toggleList = () => {
    console.log('press toggle')
    dispatch(setListOrCarousel())
  }
  return (
    <HeaderContainer>
      <HeaderText>Discover Nearby Channels</HeaderText>
      <CreateChannelButton onPress={toggleList}>
        <Ionicons
          name="grid"
          size={sizingMajor.x3}
          color={colors.chatPrimary}
        />
      </CreateChannelButton>
    </HeaderContainer>
  )
}

export const ChannelHeaderBackBtn = () => {
  const { colors } = useTheme()
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('JoinedChannelListScreen')}
    >
      <FontAwesome name="chevron-left" size={24} color={colors.chatPrimary} />
    </TouchableOpacity>
  )
}

export const ChannelHeaderMap = () => {
  const { colors } = useTheme()
  const dispatch = useAppDispatch()
  const navigation = useNavigation()
  const channelId = useAppSelector(getCurrentChannelId)
  const [getUsers, { isSuccess, isLoading, isError }] = useGetUsersMutation()
  const onNav = async () => {
    const cid = channelId.channelId
    console.log(cid)
    const filter = {
      cid,
      type: 'messaging'
    }

    // @ts-ignore
    const channels = await chatClient.queryChannels(filter!)
    // @ts-ignore
    const channelMembers = await channels[0].queryMembers({})
    const users: string[] = []
    for (let i = 0; i < channelMembers.members.length; i++) {
      // @ts-ignore
      users.push(channelMembers.members[i].user_id)
    }
    const result = await getUsers({
      users
    })

    // @ts-ignore
    const locations = result.data.location
    if (locations) {
      console.log(locations)
    }
    dispatch(setUsersLocation(locations))
    navigation.navigate('Map')
  }
  return (
    <TouchableOpacity onPress={onNav}>
      <FontAwesome name="map" size={24} color={colors.chatPrimary} />
    </TouchableOpacity>
  )
}
