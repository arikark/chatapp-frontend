import * as React from 'react'
import styled from 'styled-components'
import i18n from 'i18n-js'
import { View } from 'react-native'
import { useTheme, Paragraph, Headline, Button } from 'react-native-paper'

import ScreenWrapper from '../../shared/layouts/ScreenWrapper'
import ThemeSwitch from '../../shared/components/ThemeSwitch'
import PhotoFrame from '../components/PhotoFrame'

const Header = styled(View)`
  margin-top: ${({ theme }) => `${theme.sizingMajor.x2}px`};
  flex-direction: row;
  justify-content: space-between;
`
const Container = styled(View)`
  background-color: ${({ theme }) => `${theme.colors.background}`};
  padding-left: ${({ theme }) => `${theme.sizingMajor.x4}px`};
  padding-right: ${({ theme }) => `${theme.sizingMajor.x4}px`};
`
const PhotoFrameWrapper = styled(View)`
  align-items: center;
  justify-content: center;
  margin-top: ${({ theme }) => `${theme.sizingMajor.x6}px`};
`
const BioContainer = styled(View)`
  width: 100%;
  margin-top: ${({ theme }) => `${theme.sizingMajor.x2}px`};
  padding: ${({ theme }) => `${theme.sizingMajor.x1}px`};
  justify-content: center;
  background-color: ${({ theme }) => `${theme.colors.chatPrimary}`};
  border-radius: ${({ theme }) => `${theme.sizingMajor.x1}px`};
`
const Name = styled(Headline)`
  align-self: center;
  font-family: ${({ theme }) => `${theme.fonts.medium.fontFamily}`};
  margin-top: ${({ theme }) => `${theme.sizingMajor.x3}px`};
`
const Email = styled(Headline)`
  align-self: center;
  font-family: ${({ theme }) => `${theme.fonts.medium.fontFamily}`};
  margin-bottom: ${({ theme }) => `${theme.sizingMajor.x3}px`};
`
const LogoutButton = styled(Button)`
  color: ${({ theme }) => `${theme.colors.chatPrimary}`};
  flex: 0.2;
  align-self: flex-end;
`
type ProfileScreenProps = {
  email: string | undefined
  username: string | undefined
  bio: string | undefined
  photo: string | undefined
  onPressLogout: () => void
}

export default function ProfileScreen({
  email,
  username,
  bio,
  photo,
  onPressLogout
}: ProfileScreenProps) {
  const { colors } = useTheme()
  return (
    <ScreenWrapper>
      <Container>
        <Header>
          <ThemeSwitch />
          <LogoutButton
            color={colors.chatPrimary}
            onPress={onPressLogout}
            uppercase={false}
          >
            Logout
          </LogoutButton>
        </Header>
        <PhotoFrameWrapper>
          <PhotoFrame profilePhoto={photo} />
        </PhotoFrameWrapper>
        <Name>{username}</Name>
        <Email>{email}</Email>
        <Headline>{i18n.t('profile.bioHeading')}</Headline>
        <BioContainer>
          <Paragraph>{bio}</Paragraph>
        </BioContainer>
      </Container>
    </ScreenWrapper>
  )
}
