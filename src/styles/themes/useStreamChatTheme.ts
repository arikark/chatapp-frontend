import { useEffect, useState } from 'react'
import type { DeepPartial, Theme } from 'stream-chat-expo'
import { useAppSelector } from '../../features/shared/hooks/redux'
import { selectTheme } from '../slices'

// Have to add this theme since Stream doesn't naturally suppor RN paper's theme.
export const useStreamChatTheme = () => {
  const colorScheme = useAppSelector(selectTheme)
  const getChatStyle = (): DeepPartial<Theme> => ({
    avatar: {
      image: {
        height: 32,
        width: 32
      }
    },
    colors: colorScheme
      ? {
          accent_blue: '#005FFF',
          accent_green: '#20E070',
          accent_red: '#FF3742',
          bg_gradient_end: '#101214',
          bg_gradient_start: '#070A0D',
          black: '#FFFFFF',
          blue_alice: '#00193D',
          border: '#141924',
          grey: '#7A7A7A',
          grey_gainsboro: '#2D2F2F',
          grey_whisper: '#1C1E22',
          icon_background: '#FFFFFF',
          modal_shadow: '#000000',
          overlay: '#00000066',
          overlay_dark: '#FFFFFFCC',
          shadow_icon: '#00000080',
          targetedMessageBackground: '#302D22',
          transparent: 'transparent',
          white: '#101418',
          white_smoke: '#13151B',
          white_snow: '#070A0D'
        }
      : {
          accent_blue: '#005FFF',
          accent_green: '#20E070',
          accent_red: '#FF3742',
          bg_gradient_end: '#F7F7F7',
          bg_gradient_start: '#FCFCFC',
          black: '#000000',
          blue_alice: '#E9F2FF',
          border: '#00000014',
          grey: '#7A7A7A',
          grey_gainsboro: '#DBDBDB',
          grey_whisper: '#ECEBEB',
          icon_background: '#FFFFFF',
          modal_shadow: '#00000099',
          overlay: '#00000033',
          overlay_dark: '#00000099',
          shadow_icon: '#00000040',
          targetedMessageBackground: '#FBF4DD',
          transparent: 'transparent',
          white: '#FFFFFF',
          white_smoke: '#F2F2F2',
          white_snow: '#FCFCFC'
        },
    imageGallery: {
      blurType: colorScheme ? 'dark' : 'light'
    },
    spinner: {
      height: 15,
      width: 15
    }
  })
  const [chatStyle, setChatStyle] = useState(getChatStyle())

  useEffect(() => {
    setChatStyle(getChatStyle())
  }, [colorScheme])

  return chatStyle
}
