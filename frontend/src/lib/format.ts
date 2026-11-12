export function formatPeso(value: number): string {
  return `₱${value.toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

const dateFormat = new Intl.DateTimeFormat('en-PH', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
  timeZone: 'Asia/Manila',
})

export function formatDateTime(value: string): string {
  return dateFormat.format(new Date(value)).replace(',', '')
}
