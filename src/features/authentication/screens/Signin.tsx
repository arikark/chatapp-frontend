import * as React from 'react'
import styled from 'styled-components'
import i18n from 'i18n-js'
import { View } from 'react-native'
import {
  Title,
  Subheading,
  Paragraph,
  Headline,
  Caption,
  Switch
} from 'react-native-paper'

import { useAppDispatch } from '../../shared/hooks/redux'
import { toggleTheme } from '../../shared/slices'
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
  const dispatch = useAppDispatch()
  const [isSwitchOn, setIsSwitchOn] = React.useState(false)
  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn)
    dispatch(toggleTheme())
  }

  return (
    <ScreenWrapper withScrollView>
      <Container>
        <Headline>Headline</Headline>
        <Title>Title</Title>
        <Subheading>
          {i18n.t('signIn.welcome')} {i18n.t('signIn.name')}
        </Subheading>
        <Paragraph>Paragraph</Paragraph>
        <Caption>Caption</Caption>
      </Container>
      <StyledTextInput label="Email" mode="outlined" />
      <TextInput label="Password" mode="outlined" />
      <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
    </ScreenWrapper>
  )
}
