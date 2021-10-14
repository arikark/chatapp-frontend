export * from './CustomDefaultTheme'
export * from './CustomDarkTheme'

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      chatPrimary: string
      secondText: string
    }
    interface ThemeSizingMajor {
      x1: number
      x2: number
      x3: number
      x4: number
      x5: number
      x6: number
      x7: number
      x8: number
      x9: number
      x10: number
      x11: number
      x12: number
      x13: number
    }
    interface ThemeSizingMinor {
      x0: number
      x1: number
      x2: number
      x3: number
      x4: number
      x5: number
      x6: number
      x7: number
    }
    interface Theme {
      sizingMajor: ThemeSizingMajor
      sizingMinor: ThemeSizingMinor
    }
  }
}
