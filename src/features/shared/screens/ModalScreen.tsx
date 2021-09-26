import * as React from 'react'
import styled from 'styled-components'
import { View, Text } from 'react-native'
import { useTheme } from 'react-native-paper'

const Container = styled(View)({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
})

export default function ModalScreen() {
  return (
    <Container>
      <Text>Modal</Text>
    </Container>
  )
}
