import type { RegistrationList, RegistrationQuery, RegistrationSummary } from '../types'

const baseUrl = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/+$/, '')

async function readJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`The API replied with status ${response.status}.`)
  }

  return (await response.json()) as T
}

export async function getRegistrations(
  query: RegistrationQuery,
  signal?: AbortSignal,
): Promise<RegistrationList> {
  const params = new URLSearchParams()

  if (query.participantName) {
    params.set('participantName', query.participantName)
  }

  if (query.type !== 'All') {
    params.set('type', query.type)
  }

  if (query.status !== 'All') {
    params.set('status', query.status)
  }

  params.set('page', String(query.page))
  params.set('pageSize', String(query.pageSize))

  const response = await fetch(`${baseUrl}/api/registrations?${params.toString()}`, { signal })

  return readJson<RegistrationList>(response)
}

export async function getSummary(signal?: AbortSignal): Promise<RegistrationSummary> {
  const response = await fetch(`${baseUrl}/api/registrations/summary`, { signal })

  return readJson<RegistrationSummary>(response)
}
