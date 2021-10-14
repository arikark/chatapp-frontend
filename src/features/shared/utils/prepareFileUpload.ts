export const prepareFileUpload = (uri: string) => {
  const data = new FormData()
  const photo = {
    ...{ uri },
    type: 'image',
    name: `USER.${uri}`
  }
  // @ts-ignore
  data.append('photo', photo)
  return data
}
