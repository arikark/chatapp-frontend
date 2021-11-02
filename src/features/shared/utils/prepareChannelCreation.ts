export const prepareChannelCreation = (
  name: string,
  description: string,
  uri: string,
  coordinate: number[]
) => {
  const data = new FormData()
  const photo = {
    ...{ uri },
    type: 'image',
    name: `USER.${uri}`
  }

  data.append('name', name)
  data.append('description', description)
  // @ts-ignore
  data.append('image', photo)
  // @ts-ignore
  data.append('coordinate', JSON.stringify(coordinate))
  return data
}
