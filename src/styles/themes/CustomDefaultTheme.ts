import { DefaultTheme, configureFonts } from 'react-native-paper'
import { sizingMajor, sizingMinor, fontConfig, colors } from '../constants'

export const CustomDefaultTheme = {
  ...DefaultTheme,
  // @ts-ignore
  fonts: configureFonts(fontConfig),
  colors: {
    ...DefaultTheme.colors,
    chatPrimary: colors.chatPrimary,
    secondText: colors.secondText
  },
  sizingMajor,
  sizingMinor
}
