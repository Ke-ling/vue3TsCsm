export function formatTime(utcString: string) {
  const d = new Date(utcString)
  const date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
  return date
}
