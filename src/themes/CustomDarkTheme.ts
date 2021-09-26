import { DarkTheme } from 'react-native-paper'
import { sizingMajor, sizingMinor } from './constants/sizing'
import { colors } from './constants/colors'

export const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    alert: colors.alert
  },
  sizingMajor,
  sizingMinor
}
