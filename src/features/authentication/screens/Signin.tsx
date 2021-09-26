import * as React from 'react'
import styled from 'styled-components'
import { View } from 'react-native'
import {
  Divider,
  ProgressBar,
  Subheading,
  Text,
  useTheme
} from 'react-native-paper'

export function Signin() {
  const { colors, sizingMajor, fonts } = useTheme()
  const Container = styled(View)({
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    padding: sizingMajor.x1
  })
  return (
    <Container>
      <Text>Signin</Text>
    </Container>
  )
}
