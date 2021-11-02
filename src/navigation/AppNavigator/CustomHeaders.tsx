import * as React from 'react'
import styled from 'styled-components'
import { Text, useTheme } from 'react-native-paper'
import { TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { FontAwesome } from '@expo/vector-icons'
import Icon from '../../features/shared/components/Icon'
import {
  useAppDispatch,
  useAppSelector
} from '../../features/shared/hooks/redux'
import {
  getCurrentChannel,
  getUsersLocation,
  setUsersLocation
} from '../../features/chat/slice'
import { useGetUsersMutation } from '../../store/api/userServices'

const HeaderText = styled(Text)`
  font-size: ${({ theme }) => `${theme.sizingMajor.x3}px`};
`
const HeaderContainer = styled(View)`
  flex-direction: row;
  width: ${({ theme }) => `${theme.sizingMajor.x12}%`};
  align-items: center;
  justify-content: space-between;
`
const CreateChannelButton = styled(TouchableOpacity)`
  margin-right: ${({ theme }) => `${theme.sizingMajor.x2}px`};
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
  const navigation = useNavigation()
  return (
    <HeaderContainer>
      <HeaderText>Discover Nearby Channels</HeaderText>
      <CreateChannelButton
        onPress={() => navigation.navigate('ChannelCreation')}
      />
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
  const curChannel = useAppSelector(getCurrentChannel)
  const [getUsers, { isSuccess, isLoading, isError }] = useGetUsersMutation()
  const onNav = async () => {
    const userList = curChannel.channel.state._channel._client.state.users
    const users = Object.keys(userList)
    console.log(users)
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
      <FontAwesome name="map" size={24} color={colors.primary} />
    </TouchableOpacity>
  )
}
