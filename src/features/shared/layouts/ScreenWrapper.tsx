import * as React from 'react'
import styled from 'styled-components'
import { ScrollView, ScrollViewProps, View, ViewProps } from 'react-native'
import { Edge, SafeAreaView } from 'react-native-safe-area-context'

type CustomScrollViewProps = ScrollViewProps & {
  children: React.ReactNode
  withScrollView?: boolean
  safeTop?: boolean
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
  safeTop = true,
  ...rest
}: CustomScrollViewProps) {
  const edges: Edge[] = safeTop ? ['left', 'right', 'top'] : ['left', 'right']

  return (
    <SafeAreaView edges={edges}>
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
