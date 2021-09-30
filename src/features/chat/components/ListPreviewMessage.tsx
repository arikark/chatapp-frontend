import React from 'react'
import { Text, View } from 'react-native'
import { ChannelPreviewMessage } from 'stream-chat-expo'
import { FontAwesome } from '@expo/vector-icons'
import styled from 'styled-components'
import { useTheme } from 'react-native-paper'

export const ListPreviewMessage = ({
  latestMessagePreview
}: {
  latestMessagePreview: any
}) => {
  const { colors, sizingMajor } = useTheme()
  const latestMessageAttachments =
    latestMessagePreview.messageObject?.attachments

  if (
    latestMessageAttachments &&
    latestMessageAttachments.length === 1 &&
    latestMessageAttachments[0].type === 'voice-message'
  ) {
    return (
      <VoiceMessagePreview>
        <FontAwesome
          name="volume-up"
          size={sizingMajor.x3}
          color={colors.primary}
        />
        <VoiceMessagePreviewText>Voice Message</VoiceMessagePreviewText>
      </VoiceMessagePreview>
    )
  }

  return <ChannelPreviewMessage latestMessagePreview={latestMessagePreview} />
}

const VoiceMessagePreview = styled(View)`
  flex-direction: row;
`
const VoiceMessagePreviewText = styled(Text)`
  margin: ${({ theme }) =>
    `${theme.sizingMinor.x0}px ${theme.sizingMinor.x5}px`};
  color: ${({ theme }) => `${theme.colors.secondText}`};
  font-size: ${({ theme }) => `${theme.sizingMajor.x1}px`};
`
