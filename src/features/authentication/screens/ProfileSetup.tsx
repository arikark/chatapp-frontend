import * as React from 'react'
import styled from 'styled-components'
import i18n from 'i18n-js'
import { View } from 'react-native'
import {
  useTheme,
  Paragraph,
  Headline,
  Button,
  TextInput
} from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { useState } from 'react'
import { useUploadPhotoMutation } from '../../../store/api/userServices'

import ScreenWrapper from '../../shared/layouts/ScreenWrapper'
import ThemeSwitch from '../../shared/components/ThemeSwitch'
import ImagePortal from '../../shared/components/ImagePortal'

const Header = styled(View)`
  margin-top: ${({ theme }) => `${theme.sizingMajor.x2}px`};
  flex-direction: row;
  justify-content: space-between;
`
const ProfileTitle = styled(View)`
  font-family: ${({ theme }) => `${theme.fonts.medium.fontFamily}`};
  margin-top: ${({ theme }) => `${theme.sizingMajor.x4}px`};
`
const Container = styled(View)`
  background-color: ${({ theme }) => `${theme.colors.background}`};
  padding-left: ${({ theme }) => `${theme.sizingMajor.x4}px`};
  padding-right: ${({ theme }) => `${theme.sizingMajor.x4}px`};
`
const PhotoFrameWrapper = styled(View)`
  align-items: center;
  justify-content: center;
  margin-top: ${({ theme }) => `${theme.sizingMajor.x4}px`};
  margin-bottom: ${({ theme }) => `${theme.sizingMajor.x4}px`};
`
const UsernameInput = styled(TextInput)`
  margin-bottom: ${({ theme }) => `${theme.sizingMajor.x3}px`};
`
const BioInput = styled(TextInput)`
  margin-bottom: ${({ theme }) => `${theme.sizingMajor.x3}px`};
`
const LogoutButton = styled(Button)`
  color: ${({ theme }) => `${theme.colors.chatPrimary}`};
  flex: 0.2;
  align-self: flex-end;
`
const SetupButton = styled(Button)`
  margin-top: ${({ theme }) => `${theme.sizingMajor.x5}px`};
  border-color: ${({ theme }) => `${theme.colors.chatPrimary}`};
`

type ProfileSetupProps = {
  photo: string | undefined
  onPressLogout: () => void
  profilePhotoUploadMutation: () => void
}

export function ProfileSetup({
  photo,
  onPressLogout,
  profilePhotoUploadMutation
}: ProfileSetupProps) {
  const { colors } = useTheme()
  const [usernameInput, setUsernameInput] = useState('')
  const [bioInput, setBioInput] = useState('')
  const [setup, { isLoading, isError, error }] = useUploadPhotoMutation()

  const onSetupPress = async () => {
    if (usernameInput.length < 3) {
      alert('Username must contain more than 3 characters')
    }
    // const response = await setup({
    //     email: emailInput,
    //     username: usernameInput,
    //     bio: bioInput
    // })
    // console.log(response)
    // }
  }

  return (
    <ScreenWrapper>
      <KeyboardAwareScrollView>
        <Container>
          <Header>
            <ThemeSwitch />
            {/* <LogoutButton
              color={colors.chatPrimary}
              onPress={onPressLogout}
              uppercase={false}
            >
              Logout
            </LogoutButton> */}
          </Header>

          <ProfileTitle>
            <Headline>{i18n.t('profileSetup.title')}</Headline>
          </ProfileTitle>

          <PhotoFrameWrapper>
            <ImagePortal
              imageUploadMutation={useUploadPhotoMutation}
              image={photo}
            />
          </PhotoFrameWrapper>

          <UsernameInput
            label="Username"
            selectionColor={colors.chatPrimary}
            outlineColor={colors.chatPrimary}
            autoCorrect={false}
            mode="outlined"
            value={usernameInput}
            onChangeText={(usernameInput) => setUsernameInput(usernameInput)}
          />

          <BioInput
            label="Bio"
            selectionColor={colors.chatPrimary}
            outlineColor={colors.chatPrimary}
            autoCorrect={false}
            mode="outlined"
            value={bioInput}
            onChangeText={(bioInput) => setBioInput(bioInput)}
            multiline
          />

          {isError && <Paragraph>{error}</Paragraph>}
          <SetupButton
            mode="outlined"
            onPress={() => onSetupPress()}
            disabled={isLoading}
          >
            {i18n.t('profileSetup.submit')}
          </SetupButton>
        </Container>
      </KeyboardAwareScrollView>
    </ScreenWrapper>
  )
}
