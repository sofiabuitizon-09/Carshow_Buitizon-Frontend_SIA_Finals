import { useEffect, useState } from 'react'
import { getRegistrations, getSummary } from '../api/registrationsApi'
import { useDebounce } from '../hooks/useDebounce'
import type {
  RegistrationList,
  RegistrationStatus,
  RegistrationSummary,
  RegistrationType,
} from '../types'
import { KpiCards } from '../components/KpiCards'
import { RegistrationFilters } from '../components/RegistrationFilters'
import { RegistrationTable } from '../components/RegistrationTable'
import { Pagination } from '../components/Pagination'

export function RegistrationsPage() {
  const [search, setSearch] = useState('')
  const [type, setType] = useState<RegistrationType | 'All'>('All')
  const [status, setStatus] = useState<RegistrationStatus | 'All'>('All')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [list, setList] = useState<RegistrationList | null>(null)
  const [summary, setSummary] = useState<RegistrationSummary | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)

  const debouncedSearch = useDebounce(search, 400)
  const isFiltered = search.trim() !== '' || type !== 'All' || status !== 'All'

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    async function load() {
      setIsLoading(true)
      setError(null)

      try {
        const [rows, totals] = await Promise.all([
          getRegistrations(
            {
              participantName: debouncedSearch.trim(),
              type,
              status,
              page,
              pageSize,
            },
            controller.signal,
          ),
          getSummary(controller.signal),
        ])

        if (!active) {
          return
        }

        setList(rows)
        setSummary(totals)
      } catch (caught) {
        if (!active || controller.signal.aborted) {
          return
        }

        setError(
          caught instanceof Error
            ? caught.message
            : 'Something went wrong while loading registrations.',
        )
      } finally {
        if (active) {
          setIsLoading(false)
        }
      }
    }

    void load()

    return () => {
      active = false
      controller.abort()
    }
  }, [debouncedSearch, type, status, page, pageSize, attempt])

  function handleSearchChange(value: string) {
    setSearch(value)
    setPage(1)
  }

  function handleTypeChange(value: RegistrationType | 'All') {
    setType(value)
    setPage(1)
  }

  function handleStatusChange(value: RegistrationStatus | 'All') {
    setStatus(value)
    setPage(1)
  }

  function handlePageSizeChange(value: number) {
    setPageSize(value)
    setPage(1)
  }

  function handleClear() {
    setSearch('')
    setType('All')
    setStatus('All')
    setPage(1)
  }

  function handleRetry() {
    setAttempt((current) => current + 1)
  }

  const isEmpty = !isLoading && !error && list !== null && list.items.length === 0
  const totalPages = list?.totalPages ?? 1
  const rowCount = list?.totalCount ?? 0

  return (
    <main className="min-h-screen bg-[#FBF8F1]">
      <div className="mx-auto max-w-[1240px] px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-3 border-b border-[#E7DCC8] pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8A7C6C]">
              AutoVista Events · Sorsogon City Coliseum
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#2E2823] sm:text-3xl">
              Car Show 2027 registration dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-[#6F6455]">
              Daily view of exhibitors, competitors and VIP entries for the three-day show.
            </p>
          </div>
          <p className="inline-flex items-center gap-2 self-start rounded-full border border-[#E0D4BE] bg-[#F4EBDA] px-3 py-1.5 text-xs font-medium text-[#4A3F33] sm:self-auto">
            <span className="h-2 w-2 rounded-full bg-[#4F7A4A]" aria-hidden="true" />
            Live from the registrations API
          </p>
        </header>

        <div className="mt-5 flex flex-col gap-4">
          <KpiCards summary={summary} isLoading={isLoading && summary === null} />

          <RegistrationFilters
            search={search}
            type={type}
            status={status}
            disabled={isLoading}
            onSearchChange={handleSearchChange}
            onTypeChange={handleTypeChange}
            onStatusChange={handleStatusChange}
            onClear={handleClear}
          />

          <section className="overflow-hidden rounded-2xl border border-[#E7DCC8] bg-[#FBF8F1]">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EFE6D6] px-4 py-3">
              <h2 className="text-sm font-semibold text-[#2E2823]">Registrations</h2>
              {isLoading ? (
                <p className="text-xs text-[#8A7C6C]">Loading registrations…</p>
              ) : (
                <p className="text-xs text-[#8A7C6C]">
                  {rowCount} {rowCount === 1 ? 'record' : 'records'}
                </p>
              )}
            </div>

            {error ? (
              <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F7E1DC] text-[#8C3A2E]">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                    <path
                      d="M12 8v5m0 3.5v.5M10.3 4.6 3.6 16.4A2 2 0 0 0 5.3 19.4h13.4a2 2 0 0 0 1.7-3L13.7 4.6a2 2 0 0 0-3.4 0Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div>
                  <h3 className="text-base font-semibold text-[#2E2823]">Cannot reach the API</h3>
                  <p className="mt-1 max-w-md text-sm text-[#6F6455]">
                    {error} Make sure the backend is running, then load the dashboard again.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleRetry}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#4A3F33] px-4 py-2.5 text-sm font-medium text-[#FBF8F1] focus-visible:ring-2 focus-visible:ring-[#C9B79A]"
                >
                  <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                    <path
                      d="M15.5 8A5.5 5.5 0 1 0 16 11M15.5 8V4.5M15.5 8h-3.4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Try again
                </button>
              </div>
            ) : isEmpty ? (
              <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F4EBDA] text-[#8A6A45]">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                    <circle cx="11" cy="11" r="6.2" stroke="currentColor" strokeWidth="1.6" />
                    <path d="m15.6 15.6 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
                <div>
                  <h3 className="text-base font-semibold text-[#2E2823]">
                    No registrations match your filters
                  </h3>
                  <p className="mt-1 max-w-md text-sm text-[#6F6455]">
                    Try a shorter name, another type, or clear the filters to see the full list.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleClear}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#4A3F33] px-4 py-2.5 text-sm font-medium text-[#FBF8F1] focus-visible:ring-2 focus-visible:ring-[#C9B79A]"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                <RegistrationTable
                  registrations={list?.items ?? []}
                  isLoading={isLoading}
                  skeletonRows={pageSize}
                />

                {isLoading ? null : (
                  <Pagination
                    page={page}
                    pageSize={pageSize}
                    totalCount={rowCount}
                    totalPages={totalPages}
                    disabled={isLoading}
                    onPageChange={setPage}
                    onPageSizeChange={handlePageSizeChange}
                  />
                )}
              </>
            )}
          </section>

          {isFiltered ? (
            <p className="pb-2 text-xs text-[#8A7C6C]">
              Filters are applied by the API. Switching any filter starts again from page 1.
            </p>
          ) : null}
        </div>
      </div>
    </main>
  )
}
