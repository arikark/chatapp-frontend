import * as React from 'react'
import styled from 'styled-components'
import { ScrollView, ScrollViewProps } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = ScrollViewProps & {
  children: React.ReactNode
  withScrollView?: boolean
}

export const Container = styled(ScrollView)<ScrollViewProps>`
  display: flex;
  background-color: ${({ theme }) => `${theme.colors.background}`};
`

export default function ScreenWrapper({
  children,
  withScrollView = false,
  ...rest
}: Props) {
  return (
    // <SafeAreaView edges={['left', 'right', 'bottom']}>
    <Container
      {...rest}
      scrollEnabled={withScrollView}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </Container>
    // </SafeAreaView>
  )
}
