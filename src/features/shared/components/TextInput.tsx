import * as React from 'react'
import { TextInput as TextInputPaper } from 'react-native-paper'

type Props = React.ComponentProps<typeof TextInputPaper> & {
  label: string
  mode?: 'outlined' | 'flat'
}

export function TextInput({ label, ...rest }: Props) {
  const [text, setText] = React.useState('')
  return (
    <TextInputPaper
      {...rest}
      label={label}
      mode="outlined"
      value={text}
      onChangeText={(text) => setText(text)}
    />
  )
}
