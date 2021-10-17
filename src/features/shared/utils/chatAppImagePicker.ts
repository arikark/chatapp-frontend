import * as ImagePicker from 'expo-image-picker'

export const chatAppImagePicker = async () => {
  const _image = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1
  })
  return _image
}
