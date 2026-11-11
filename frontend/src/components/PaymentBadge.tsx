import type { PaymentStatus } from '../types'

const paymentTones: Record<PaymentStatus, string> = {
  Unpaid: 'bg-[#F7E1DC] text-[#8C3A2E] ring-[#E3B8AF]',
  Partial: 'bg-[#FBEED2] text-[#8A5A12] ring-[#E4C88F]',
  Paid: 'bg-[#E3EFDD] text-[#2F5D34] ring-[#BED6B2]',
}

export function PaymentBadge({ status }: { status: PaymentStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${paymentTones[status]}`}
    >
      {status}
    </span>
  )
}
