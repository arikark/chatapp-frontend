import React, { useContext } from 'react'
import {
  Dimensions,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Pressable
} from 'react-native'
import { Text } from 'react-native-paper'
import styled from 'styled-components'
import LottieView from 'lottie-react-native'
import { LinearGradient } from 'expo-linear-gradient'

import { getListOrCarousel } from '../slice'
import { useAppSelector } from '../../shared/hooks/redux'
import { AppContext } from '../../../navigation/AppNavigator'

const { width, height } = Dimensions.get('window')

export function RenderItem({
  item,
  setChannelName,
  setChannelId,
  showDialog,
  dispatch
}: {
  item: any
  setChannelName: any
  setChannelId: any
  showDialog: any
  dispatch: any
}) {
  const isList = useAppSelector(getListOrCarousel)
  const setChannels = useContext(AppContext)?.setChannels
  const navToChannel = () => {
    console.log('pressed')
    console.log(item.data.name)
    console.log(item.data.id)
    showDialog()
    setChannelName(item.data.name)
    setChannelId(item.data.id)
    setChannels(item)
  }
  return (
    <View>
      {isList.isList ? (
        <>
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
        </>
      ) : (
        <CarouselContainer onPress={navToChannel}>
          <CarouselCard>
            <CarouselLinear
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={['#B060EF', '#379FFF']}
            />
            <CarouselAvatar
              source={{
                uri: item.data.image
              }}
            />
            <CarouselChannelName>{item.data.name}</CarouselChannelName>
            <CarouselChannelDesc>{item.data.description}</CarouselChannelDesc>
          </CarouselCard>
        </CarouselContainer>
      )}
    </View>
  )
}
export function EmptyCompoent() {
  return (
    <EmptyContainer>
      <EmptyText>  No nearby groups☀️</EmptyText>
      {/* Mr.Futuristic (2018) https://lottiefiles.com/4199-location-search */}
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
const CarouselContainer = styled(Pressable)`
  flex: ${({ theme }) => `${theme.sizingMinor.x1}`};
  width: ${width}px;
  justify-content: center;
  align-items: center;
`
const CarouselCard = styled(View)`
  height: ${height * 0.5}px;
  width: ${width * 0.7}px;
  align-items: center;
  justify-content: center;
`
const CarouselLinear = styled(LinearGradient)`
  position: absolute;
  border-radius: ${({ theme }) => `${theme.sizingMajor.x3}px`};
  height: ${({ theme }) => `${theme.sizingMajor.x12}%`};
  width: ${({ theme }) => `${theme.sizingMajor.x12}%`};
  top: ${({ theme }) => `${theme.sizingMinor.x0}`};
`
const CarouselAvatar = styled(Image)`
  height: ${width * 0.5}px;
  width: ${width * 0.5}px;
  border-radius: ${width * 0.5}px;
`
const CarouselChannelName = styled(Text)`
  color: ${({ theme }) => `${theme.colors.white}`};
  font-family: Roboto_500Medium;
  font-size: ${({ theme }) => `${theme.sizingMajor.x4}px`};
  margin-top: ${({ theme }) => `${theme.sizingMajor.x5}px`};
`
const CarouselChannelDesc = styled(Text)`
  color: ${({ theme }) => `${theme.colors.white}`};
  opacity: ${({ theme }) => `${theme.sizingMajor.x8 * 0.01} `};
  font-size: ${({ theme }) => `${theme.sizingMajor.x3}px`};
`
