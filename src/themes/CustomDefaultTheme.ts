import { DefaultTheme } from 'react-native-paper'
import { sizingMajor, sizingMinor } from './constants/sizing'
import { colors } from './constants/colors'

export const CustomDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    alert: colors.alert
  },
  sizingMajor,
  sizingMinor
}
