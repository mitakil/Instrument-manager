export function formatDate(value) {
  if (!value) return '-'
  return new Date(value).toLocaleDateString('en-GB', { dateStyle: 'medium' })
}

export function formatDateTime(value) {
  if (!value) return undefined
  return new Date(value).toLocaleString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}
