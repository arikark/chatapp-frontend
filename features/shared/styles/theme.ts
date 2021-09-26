import { Sizing } from './sizing'
import * as colors from './colors'
import * as typography from './typography'

export const theme = {
  space: [Object.values(Sizing)],
  ...typography,
  ...colors,
}
