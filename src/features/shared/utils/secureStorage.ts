import * as SecureStore from 'expo-secure-store'

export const getToken = async (key: string) => {
  let result = await SecureStore.getItemAsync(key)
  if (result) {
    console.log("🔐 Here's your value 🔐 \n" + result)
  } else {
    result = null
    console.log('No values stored under that key.')
  }
  return result
}
export const saveToken = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value)
}
export const deleteToken = async (key: string) => {
  await SecureStore.deleteItemAsync(key)
}
