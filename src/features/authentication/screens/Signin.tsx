import * as React from 'react'
import styled from 'styled-components'
import { View } from 'react-native'
import {
  useTheme,
  Title,
  Subheading,
  Paragraph,
  Headline,
  Caption
} from 'react-native-paper'
import { TextInput } from '../../shared/components/TextInput'
import ScreenWrapper from '../../shared/layouts/ScreenWrapper'

const Container = styled(View)`
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => `${theme.colors.alert}`};
`
const StyledTextInput = styled(TextInput)`
  margin: ${({ theme }) => `${theme.sizingMajor.x1}px`};
`
export function Signin() {
  const { colors } = useTheme()
  const CustomTitle = styled(Title)({
    color: colors.accent
  })
  return (
    <ScreenWrapper withScrollView>
      <Container>
        <Headline>Headline</Headline>
        <CustomTitle>Title</CustomTitle>
        <Subheading>Subheading</Subheading>
        <Paragraph>Paragraph</Paragraph>
        <Caption>Caption</Caption>
      </Container>
      <StyledTextInput label="Email" mode="outlined" />
      <TextInput label="Password" mode="outlined" />
    </ScreenWrapper>
  )
}
