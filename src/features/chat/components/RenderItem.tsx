import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Dimensions, View, Image, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import styled from 'styled-components'
import LottieView from 'lottie-react-native'

import { setChannel } from '../slice'

const { width, height } = Dimensions.get('window')

export function RenderItem({
  item,
  navigation,
  dispatch
}: {
  item: any
  navigation: any
  dispatch: any
}) {
  const navToChannel = () => {
    console.log('pressed')
    console.log(item.data.name)
    dispatch(setChannel(item))
    navigation.navigate('Channel', {
      name: item.data.name
    })
  }
  return (
    <ItemContainer onPress={navToChannel}>
      <ChannelAvatar
        source={{
          uri: item.data.image
        }}
      />
      <Text>{item.data.name}</Text>
      <Text>{item.data.description}</Text>
    </ItemContainer>
  )
}
export function EmptyCompoent() {
  return (
    <EmptyContainer>
      <EmptyText>  No nearby groups☀️</EmptyText>
      <LottieContainer
        autoPlay
        source={require('../../../../assets/location-search.json')}
      />
    </EmptyContainer>
  )
}
const ItemContainer = styled(TouchableOpacity)`
  height: ${({ theme }) => `${theme.sizingMajor.x5}px`};
  width: ${({ theme }) => `${theme.sizingMajor.x12}%`};
  flex-direction: row;
  border: ${({ theme }) => `${theme.sizingMinor.x1}px`}
    ${({ theme }) => `${theme.colors.chatPrimary}`} solid;
`
const ChannelAvatar = styled(Image)`
  height: ${({ theme }) => `${theme.sizingMajor.x5}px`};
  width: ${({ theme }) => `${theme.sizingMajor.x5}px`};
`
const EmptyContainer = styled(View)`
  margin-top: ${({ theme }) => `${theme.sizingMajor.x3}px`};
  align-self: center;
  align-items: center;
`
const EmptyText = styled(Text)`
  font-size: ${({ theme }) => `${theme.sizingMajor.x3}px`};
`
const LottieContainer = styled(LottieView)`
  align-self: center;
  margin-top: ${({ theme }) => `${theme.sizingMajor.x2}px`};
  height: ${width * 0.5}px;
  width: ${width * 0.5}px;
`
