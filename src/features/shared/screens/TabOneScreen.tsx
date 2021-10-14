import * as React from 'react'
import styled from 'styled-components'
import { View, Text } from 'react-native'

const Container = styled(View)({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
})

export default function TabOneScreen() {
  return (
    <Container>
      <Text>My Profile Screen</Text>
    </Container>
  )
}
