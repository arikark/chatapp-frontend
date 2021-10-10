import { DarkTheme, configureFonts } from 'react-native-paper'
import { sizingMajor, sizingMinor, fontConfig, colors } from '../constants'

export const CustomDarkTheme = {
  ...DarkTheme,
  // @ts-ignore
  fonts: configureFonts(fontConfig),
  colors: {
    ...DarkTheme.colors,
    alert: colors.alert,
    secondText: colors.secondText
  },
  sizingMajor,
  sizingMinor
}
