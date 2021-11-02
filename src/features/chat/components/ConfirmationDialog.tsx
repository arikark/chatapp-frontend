import React from 'react'
import { Button, Dialog, Portal } from 'react-native-paper'
import { useJoinChannelMutation } from '../../../store/api/chatServices'

export function ConfirmationDialog({
  navigation,
  channelName,
  channelId,
  isVisible,
  hideDialog
}: {
  navigation: any
  channelName: string
  channelId: string
  isVisible: boolean
  hideDialog: () => void
}) {
  const [joinChannel, { isSuccess, isLoading, isError }] =
    useJoinChannelMutation()

  const navToChannel = async () => {
    const result = await joinChannel({
      id: channelId,
      type: 'messaging'
    })
    console.log(result)

    // @ts-ignore
    if (result.data != undefined && result.data.code === 200) {
      hideDialog()
      navigation.navigate('Channel', {
        name: channelName
      })
    }
  }

  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={hideDialog}>
        <Dialog.Title>You want to join {channelName} ?</Dialog.Title>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Cancel</Button>
          <Button loading={isLoading} onPress={navToChannel}>
            Yes
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}
