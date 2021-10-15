import React from 'react'
import styled from 'styled-components'
import { View, Text } from 'react-native'

import ScreenWrapper from '../../shared/layouts/ScreenWrapper'

const Container = styled(View)`
  flex: ${({ theme }) => `${theme.sizingMinor.x1}`};
  justify-content: center;
  align-items: center;
`

export default function JoinedChannelListScreen() {
  return (
    <ScreenWrapper>
      <Container>
        <Text>My Joined Channels</Text>
      </Container>
    </ScreenWrapper>
  )
}
