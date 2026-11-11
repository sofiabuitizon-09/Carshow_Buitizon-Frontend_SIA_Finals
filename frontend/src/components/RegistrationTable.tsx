import type { Registration } from '../types'
import { formatDateTime, formatPeso } from '../lib/format'
import { PaymentBadge } from './PaymentBadge'
import { StatusBadge } from './StatusBadge'

type RegistrationTableProps = {
  registrations: Registration[]
  isLoading: boolean
  skeletonRows: number
}

function SkeletonRow() {
  return (
    <tr className="border-t border-[#EFE6D6]">
      {Array.from({ length: 8 }).map((_cell, index) => (
        <td key={index} className="px-4 py-4">
          <div className="h-3 w-full max-w-[110px] animate-pulse rounded-full bg-[#EADFCC]" />
        </td>
      ))}
    </tr>
  )
}

export function RegistrationTable({ registrations, isLoading, skeletonRows }: RegistrationTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[960px] border-collapse text-left text-sm">
        <thead>
          <tr className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#7A6E60]">
            <th scope="col" className="px-4 py-3">Registration no.</th>
            <th scope="col" className="px-4 py-3">Date</th>
            <th scope="col" className="px-4 py-3">Participant</th>
            <th scope="col" className="px-4 py-3">Car</th>
            <th scope="col" className="px-4 py-3">Type</th>
            <th scope="col" className="px-4 py-3">Status</th>
            <th scope="col" className="px-4 py-3 text-right">Fee / Paid</th>
            <th scope="col" className="px-4 py-3">Payment</th>
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? Array.from({ length: skeletonRows }).map((_row, index) => <SkeletonRow key={index} />)
            : registrations.map((registration) => (
                <tr key={registration.id} className="border-t border-[#EFE6D6] align-top">
                  <td className="px-4 py-4 font-mono text-xs font-medium text-[#4A3F33]">
                    {registration.registrationNumber}
                  </td>
                  <td className="px-4 py-4 text-xs text-[#6F6455]">
                    {formatDateTime(registration.registrationDate)}
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-medium text-[#2E2823]">{registration.participantName}</p>
                    <p className="mt-0.5 text-xs text-[#8A7C6C]">{registration.contactNumber}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-[#3A332B]">{registration.carMakeModel}</p>
                    <p className="mt-0.5 text-xs text-[#8A7C6C]">{registration.plateNumber}</p>
                  </td>
                  <td className="px-4 py-4 text-[#3A332B]">{registration.registrationType}</td>
                  <td className="px-4 py-4">
                    <StatusBadge status={registration.status} />
                  </td>
                  <td className="px-4 py-4 text-right whitespace-nowrap">
                    <p className="font-medium text-[#2E2823]">{formatPeso(registration.registrationFee)}</p>
                    <p className="mt-0.5 text-xs text-[#8A7C6C]">{formatPeso(registration.amountPaid)}</p>
                  </td>
                  <td className="px-4 py-4">
                    <PaymentBadge status={registration.paymentStatus} />
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  )
}
