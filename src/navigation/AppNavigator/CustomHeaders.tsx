import * as React from 'react'
import styled from 'styled-components'
import { useTheme } from 'react-native-paper'
import { TouchableOpacity, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Icon from '../../features/shared/components/Icon'

const HeaderText = styled(Text)`
  font-size: ${({ theme }) => `${theme.sizingMajor.x2}px`};
  font-weight: ${({ theme }) => `${theme.sizingMajor.x15}`}; ;
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
export const ChannelDiscoverHeader = () => {
  const { colors } = useTheme()
  const navigation = useNavigation()
  return (
    <HeaderContainer>
      <HeaderText>Discovery Nearby Channel</HeaderText>
      <CreateChannelButton
        onPress={() => navigation.navigate('ChannelCreation')}
      >
        <Icon name="plus-circle" color={colors.chatPrimary} />
      </CreateChannelButton>
    </HeaderContainer>
  )
}
