import type { RegistrationStatus } from '../types'

const statusLabels: Record<RegistrationStatus, string> = {
  Pending: 'Pending',
  Confirmed: 'Confirmed',
  CheckedIn: 'Checked in',
  Cancelled: 'Cancelled',
}

const statusTones: Record<RegistrationStatus, string> = {
  Pending: 'bg-[#FBEED2] text-[#8A5A12] ring-[#E4C88F]',
  Confirmed: 'bg-[#E3EFDD] text-[#2F5D34] ring-[#BED6B2]',
  CheckedIn: 'bg-[#E2ECF7] text-[#2A4F79] ring-[#B8CCE3]',
  Cancelled: 'bg-[#F7E1DC] text-[#8C3A2E] ring-[#E3B8AF]',
}

export function StatusBadge({ status }: { status: RegistrationStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusTones[status]}`}
    >
      {statusLabels[status]}
    </span>
  )
}
