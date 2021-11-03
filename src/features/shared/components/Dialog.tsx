import React, { useState } from 'react'
import {
  Dialog as Component,
  Portal,
  Paragraph,
  Button
} from 'react-native-paper'

export default function Dialog({
  title,
  body,
  isVisible
}: {
  title?: string
  body?: string
  isVisible: boolean
}) {
  const [visible, setVisible] = useState(isVisible)
  const toggle = () => setVisible(!visible)
  return (
    <Portal>
      <Component visible={visible} onDismiss={toggle}>
        {title && <Component.Title>{title}</Component.Title>}
        <Component.Content>
          {body && <Paragraph>{body}</Paragraph>}
        </Component.Content>
        <Component.Actions>
          <Button onPress={toggle}>Done</Button>
        </Component.Actions>
      </Component>
    </Portal>
  )
}
