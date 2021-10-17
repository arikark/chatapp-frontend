import * as ImagePicker from 'expo-image-picker'

export const chatAppCamera = async () => {
  const permissionResult = await ImagePicker.requestCameraPermissionsAsync()
  if (permissionResult.granted === false) {
    alert("You've refused to allow this appp to access your camera!")
    return
  }
  const _image = await ImagePicker.launchCameraAsync()
  return _image
}
