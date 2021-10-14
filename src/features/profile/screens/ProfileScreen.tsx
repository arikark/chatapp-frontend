import * as React from 'react'
import styled from 'styled-components'
import i18n from 'i18n-js'
import { View, Image } from 'react-native'
import { useTheme, Paragraph, Headline, Button } from 'react-native-paper'

import ScreenWrapper from '../../shared/layouts/ScreenWrapper'
import ThemeSwitch from '../../shared/components/ThemeSwitch'

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
const ProfilePhoto = styled(Image)`
  align-self: center;
  margin-top: ${({ theme }) => `${theme.sizingMajor.x6}px`};
  width: ${({ theme }) => `${theme.sizingMajor.x13}px`};
  height: ${({ theme }) => `${theme.sizingMajor.x13}px`};
  padding-left: ${({ theme }) => `${theme.sizingMajor.x4}px`};
  padding-right: ${({ theme }) => `${theme.sizingMajor.x4}px`};
  border-radius: ${({ theme }) => `${theme.sizingMajor.x10}px`};
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
  margin-top: ${({ theme }) => `${theme.sizingMajor.x2}px`};
`
const LogoutButton = styled(Button)`
  color: ${({ theme }) => `${theme.colors.chatPrimary}`};
  flex: 0.2;
  align-self: flex-end;
`
type ProfileScreenProps = {
  email: string | null
  username: string | null
  bio: string | null
  photo: string | null
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
        <ProfilePhoto
          source={{
            uri: `${photo}`
          }}
        />
        <Name>{username}</Name>
        <Headline>{i18n.t('profile.bioHeading')}</Headline>
        <BioContainer>
          <Paragraph>{bio}</Paragraph>
        </BioContainer>
      </Container>
    </ScreenWrapper>
  )
}
