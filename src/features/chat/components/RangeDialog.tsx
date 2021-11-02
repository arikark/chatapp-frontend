import React from 'react'
import { Button, Dialog, Portal, RadioButton } from 'react-native-paper'

export function RangeDialog({
  range,
  setRange,
  isVisible,
  hideDialog
}: {
  range: string
  setRange: any
  isVisible: boolean
  hideDialog: () => void
}) {
  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={hideDialog}>
        <Dialog.Title>Select Range</Dialog.Title>
        <Dialog.Content>
          <RadioButton.Group
            onValueChange={(newValue) => setRange(newValue)}
            value={range}
          >
            <RadioButton.Item label="1 km" value="1km" />
            <RadioButton.Item label="3 km" value="3km" />
            <RadioButton.Item label="5 km" value="5km" />
          </RadioButton.Group>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}
