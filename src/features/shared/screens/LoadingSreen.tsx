import * as React from 'react'
import styled from 'styled-components'
import { View, Image, Dimensions } from 'react-native'
import { ActivityIndicator, useTheme } from 'react-native-paper'

const { width } = Dimensions.get('window')

export default function LoadingScreen() {
  const { colors } = useTheme()
  return (
    <Container>
      <Logo
        resizeMode="contain"
        source={require('../../../../assets/icon.png')}
      />
      <ActivityIndicator size="large" animating color={colors.chatPrimary} />
    </Container>
  )
}
const Container = styled(View)`
  flex: ${({ theme }) => `${theme.sizingMinor.x1}`};
  align-items: center;
  justify-content: center;
`
const Logo = styled(Image)`
  height: ${width * 0.8}px;
  height: ${width * 0.8}px;
  margin-bottom: ${({ theme }) => `${theme.sizingMajor.x3}px`};
`
