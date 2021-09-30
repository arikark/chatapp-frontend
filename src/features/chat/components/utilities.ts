export const formatTime = (ms: number) => {
  return new Date(ms).toISOString().slice(14, 19)
}
