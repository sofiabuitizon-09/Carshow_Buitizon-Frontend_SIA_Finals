import type { RegistrationList, RegistrationQuery, RegistrationSummary } from '../types'
import * as liveApi from './registrationsApi'
import * as sampleData from './sample-data'

const useLiveApi = import.meta.env.VITE_DATA_SOURCE === 'api'

export const usingSampleData = !useLiveApi

export function getRegistrations(
  query: RegistrationQuery,
  signal?: AbortSignal,
): Promise<RegistrationList> {
  return useLiveApi ? liveApi.getRegistrations(query, signal) : sampleData.getRegistrations(query)
}

export function getSummary(signal?: AbortSignal): Promise<RegistrationSummary> {
  return useLiveApi ? liveApi.getSummary(signal) : sampleData.getSummary()
}
