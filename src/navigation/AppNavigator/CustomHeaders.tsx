import * as React from 'react'
import styled from 'styled-components'
import { Text, useTheme } from 'react-native-paper'
import { TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { FontAwesome } from '@expo/vector-icons'
import Icon from '../../features/shared/components/Icon'

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
      <HeaderText>Discover Channels</HeaderText>
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
