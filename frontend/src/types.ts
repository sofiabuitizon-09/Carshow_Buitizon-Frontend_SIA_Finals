export type RegistrationType = 'Exhibitor' | 'Competitor' | 'VIP'

export type RegistrationStatus = 'Pending' | 'Confirmed' | 'CheckedIn' | 'Cancelled'

export type PaymentStatus = 'Unpaid' | 'Partial' | 'Paid'

export type Registration = {
  id: string
  registrationNumber: string
  registrationDate: string
  participantName: string
  contactNumber: string
  email: string
  address: string
  carMakeModel: string
  plateNumber: string
  registrationType: RegistrationType
  status: RegistrationStatus
  registrationFee: number
  amountPaid: number
  paymentStatus: PaymentStatus
}

export type RegistrationList = {
  items: Registration[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
}

export type RegistrationSummary = {
  totalRegistrations: number
  confirmed: number
  checkedIn: number
  pending: number
  cancelled: number
  totalFees: number
  totalPayments: number
  uncollectedPayments: number
}

export type RegistrationQuery = {
  participantName: string
  type: RegistrationType | 'All'
  status: RegistrationStatus | 'All'
  page: number
  pageSize: number
}
