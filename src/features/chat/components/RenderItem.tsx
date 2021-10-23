import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Dimensions, View, Image, TouchableOpacity } from 'react-native'
import { Text, Title } from 'react-native-paper'
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
    <View>
      <ItemContainer onPress={navToChannel}>
        <ChannelAvatar
          source={{
            uri: item.data.image
          }}
        />
        <TextContainer>
          <ChannelName>{item.data.name}</ChannelName>
          <ChannelDesc>{item.data.description}</ChannelDesc>
        </TextContainer>
      </ItemContainer>
      <Divider />
    </View>
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
  height: ${({ theme }) => `${theme.sizingMajor.x8}px`};
  width: ${({ theme }) => `${theme.sizingMajor.x12}%`};
  padding-left: ${({ theme }) => `${theme.sizingMajor.x1}px`};
  flex-direction: row;
  align-items: center;
`
const Divider = styled(View)`
  height: ${({ theme }) => `${theme.sizingMinor.x1}px`};
  width: ${({ theme }) => `${theme.sizingMajor.x12}%`};
  background-color: ${({ theme }) => `${theme.colors.secondText}`};
  opacity: ${({ theme }) => `${theme.sizingMajor.x3 * 0.01}`};
`
const ChannelAvatar = styled(Image)`
  height: ${({ theme }) => `${theme.sizingMajor.x6}px`};
  width: ${({ theme }) => `${theme.sizingMajor.x6}px`};
  border-radius: ${({ theme }) => `${theme.sizingMajor.x6}px`};
`
const ChannelName = styled(Text)`
  font-family: Roboto_700Bold;
  font-size: ${({ theme }) => `${theme.sizingMajor.x2}px`};
`
const ChannelDesc = styled(Text)`
  color: ${({ theme }) => `${theme.colors.secondText}`};
`
const TextContainer = styled(View)`
  margin-left: ${({ theme }) => `${theme.sizingMajor.x1}px`};
  height: ${({ theme }) => `${theme.sizingMajor.x6}px`};
  justify-content: space-around;
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
