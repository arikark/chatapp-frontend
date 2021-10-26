export const formatTime = (ms: number) => {
  return new Date(ms).toISOString().slice(14, 19)
}

export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const getAddress = async (coordinate: number[]) => {
  let result = ''
  await fetch(
    `http://api.positionstack.com/v1/reverse?access_key=551d0dc77cea0e050b241ce215c54051&query=${coordinate[0]},${coordinate[1]}`,
    {
      method: 'GET'
    }
  )
    .then((response) => response.json())
    .then((responseJson) => {
      result = responseJson.data[0].name
    })
    .catch((error) => {
      console.error(error)
    })
  return result
}
