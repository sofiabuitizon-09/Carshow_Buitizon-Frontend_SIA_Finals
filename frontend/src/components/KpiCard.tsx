type KpiCardProps = {
  label: string
  value: string
  hint?: string
}

export function KpiCard({ label, value, hint }: KpiCardProps) {
  return (
    <div className="rounded-2xl border border-[#E7DCC8] bg-[#F4EBDA] px-4 py-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#7A6E60]">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-[#2E2823]">{value}</p>
      {hint ? <p className="mt-1 text-xs text-[#8A7C6C]">{hint}</p> : null}
    </div>
  )
}
