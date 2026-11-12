import type { RegistrationStatus, RegistrationType } from '../types'

type RegistrationFiltersProps = {
  search: string
  type: RegistrationType | 'All'
  status: RegistrationStatus | 'All'
  disabled: boolean
  onSearchChange: (value: string) => void
  onTypeChange: (value: RegistrationType | 'All') => void
  onStatusChange: (value: RegistrationStatus | 'All') => void
  onClear: () => void
}

const fieldClass =
  'w-full rounded-xl border border-[#E0D4BE] bg-[#FBF8F1] px-3 py-2.5 text-sm text-[#2E2823] outline-none focus-visible:border-[#8B6B4A] focus-visible:ring-2 focus-visible:ring-[#C9B79A]'

const labelClass = 'mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-[#7A6E60]'

export function RegistrationFilters({
  search,
  type,
  status,
  disabled,
  onSearchChange,
  onTypeChange,
  onStatusChange,
  onClear,
}: RegistrationFiltersProps) {
  return (
    <section className="rounded-2xl border border-[#E7DCC8] bg-[#F4EBDA] p-4">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr_auto]">
        <div>
          <label htmlFor="participant-search" className={labelClass}>
            Participant name
          </label>
          <div className="relative">
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A7C6C]"
            >
              <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.6" />
              <path d="M13.2 13.2 17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              id="participant-search"
              type="search"
              value={search}
              disabled={disabled}
              placeholder="Search participant name…"
              autoComplete="off"
              onChange={(event) => onSearchChange(event.target.value)}
              className={`${fieldClass} pl-9`}
            />
          </div>
        </div>

        <div>
          <label htmlFor="type-filter" className={labelClass}>
            Registration type
          </label>
          <select
            id="type-filter"
            value={type}
            disabled={disabled}
            onChange={(event) => onTypeChange(event.target.value as RegistrationType | 'All')}
            className={fieldClass}
          >
            <option value="All">All</option>
            <option value="Exhibitor">Exhibitor</option>
            <option value="Competitor">Competitor</option>
            <option value="VIP">VIP</option>
          </select>
        </div>

        <div>
          <label htmlFor="status-filter" className={labelClass}>
            Status
          </label>
          <select
            id="status-filter"
            value={status}
            disabled={disabled}
            onChange={(event) => onStatusChange(event.target.value as RegistrationStatus | 'All')}
            className={fieldClass}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="CheckedIn">Checked in</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="button"
            onClick={onClear}
            disabled={disabled}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#D8CAB2] bg-[#FBF8F1] px-4 py-2.5 text-sm font-medium text-[#4A3F33] focus-visible:ring-2 focus-visible:ring-[#C9B79A] disabled:opacity-50 xl:w-auto"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
              <path
                d="M4 10a6 6 0 1 0 2-4.5M4 4v4h4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Clear filters
          </button>
        </div>
      </div>
    </section>
  )
}
