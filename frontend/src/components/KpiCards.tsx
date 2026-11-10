import type { RegistrationSummary } from '../types'
import { formatPeso } from '../lib/format'
import { KpiCard } from './KpiCard'

type KpiCardsProps = {
  summary: RegistrationSummary | null
  isLoading: boolean
}

function KpiPlaceholder() {
  return (
    <div className="rounded-2xl border border-[#E7DCC8] bg-[#F4EBDA] px-4 py-4">
      <div className="h-2.5 w-20 animate-pulse rounded-full bg-[#E3D6BF]" />
      <div className="mt-3 h-6 w-24 animate-pulse rounded-md bg-[#E3D6BF]" />
      <div className="mt-2 h-2 w-28 animate-pulse rounded-full bg-[#EBE0CC]" />
    </div>
  )
}

export function KpiCards({ summary, isLoading }: KpiCardsProps) {
  if (isLoading || !summary) {
    return (
      <section aria-label="Event totals" className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_item, index) => (
          <KpiPlaceholder key={index} />
        ))}
      </section>
    )
  }

  const rate = summary.totalFees > 0 ? Math.round((summary.totalPayments / summary.totalFees) * 100) : 0

  return (
    <section aria-label="Event totals" className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
      <KpiCard label="Total registrations" value={String(summary.totalRegistrations)} hint="All entries" />
      <KpiCard label="Total payments" value={formatPeso(summary.totalPayments)} hint="Collected so far" />
      <KpiCard label="Uncollected" value={formatPeso(summary.uncollectedPayments)} hint="Still to collect" />
      <KpiCard label="Confirmed" value={String(summary.confirmed)} hint="Ready to display" />
      <KpiCard label="Checked in" value={String(summary.checkedIn)} hint="Already on site" />
      <KpiCard label="Collection rate" value={`${rate}%`} hint={`of ${formatPeso(summary.totalFees)}`} />
    </section>
  )
}
