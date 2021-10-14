import * as React from 'react'
import styled from 'styled-components'
import { ScrollView, ScrollViewProps, View, ViewProps } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type CustomScrollViewProps = ScrollViewProps & {
  children: React.ReactNode
  withScrollView?: boolean
}

const ScrollContainer = styled(ScrollView)<CustomScrollViewProps>`
  display: flex;
  background-color: ${({ theme }) => `${theme.colors.background}`};
  height: 100%;
`
const ViewContainer = styled(View)<ViewProps>`
  display: flex;
  background-color: ${({ theme }) => `${theme.colors.background}`};
  height: 100%;
`

export default function ScreenWrapper({
  children,
  withScrollView = false,
  ...rest
}: CustomScrollViewProps) {
  return (
    <SafeAreaView edges={['left', 'right', 'top']}>
      {withScrollView ? (
        <ScrollContainer
          {...rest}
          scrollEnabled={withScrollView}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollContainer>
      ) : (
        <ViewContainer {...rest}>{children}</ViewContainer>
      )}
    </SafeAreaView>
  )
}
