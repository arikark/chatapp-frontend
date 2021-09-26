import * as React from 'react'
import styled from 'styled-components'
import { View, Text } from 'react-native'

const Container = styled(View)({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
})

export default function TabTwoScreen() {
  return (
    <Container>
      <Text>TabTwoScreen</Text>
    </Container>
  )
}
