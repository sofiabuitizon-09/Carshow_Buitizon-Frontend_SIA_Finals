import type {
  PaymentStatus,
  Registration,
  RegistrationList,
  RegistrationQuery,
  RegistrationStatus,
  RegistrationSummary,
  RegistrationType,
} from '../types'

type Entry = [
  string,
  string,
  string,
  string,
  string,
  string,
  RegistrationType,
  RegistrationStatus,
  number,
  number,
]

const entries: Entry[] = [
  ['Juan Dela Cruz', '09171234567', 'juan.delacruz@example.com', '123 Rizal St., Naga City', 'Toyota Supra MK4', 'ABC 1234', 'Competitor', 'Confirmed', 2500, 1000],
  ['Maria Santos', '09182234568', 'maria.santos@example.com', '45 Magsaysay Ave., Sorsogon City', 'Honda Civic Type R', 'NCR 8842', 'Exhibitor', 'Confirmed', 1800, 1800],
  ['Ramon Villanueva', '09193345679', 'ramon.villanueva@example.com', '8 Bonifacio St., Legazpi City', 'Mitsubishi Lancer Evo IX', 'BIC 5521', 'Competitor', 'CheckedIn', 2500, 2500],
  ['Angela Reyes', '09204456780', 'angela.reyes@example.com', 'Purok 3, Bulan, Sorsogon', 'Mazda MX-5 Miata', 'SOR 7710', 'VIP', 'Confirmed', 3500, 1500],
  ['Mark Anthony Lim', '09215567891', 'mark.lim@example.com', '77 Quezon Blvd., Sorsogon City', 'Nissan Skyline R34', 'NCR 2201', 'Competitor', 'Pending', 2500, 0],
  ['Josefina Ramos', '09226678902', 'josefina.ramos@example.com', '12 Luna St., Gubat, Sorsogon', 'Suzuki Jimny', 'SOR 4455', 'Exhibitor', 'Confirmed', 1800, 1800],
  ['Carlo Mendoza', '09237789013', 'carlo.mendoza@example.com', 'Blk 4 Lot 9, Daraga, Albay', 'Subaru WRX STI', 'ALB 3030', 'Competitor', 'CheckedIn', 2500, 2500],
  ['Kristine Bautista', '09248890124', 'kristine.bautista@example.com', '29 Burgos St., Sorsogon City', 'Ford Mustang GT', 'NCR 9911', 'VIP', 'Confirmed', 3500, 3500],
  ['Renato Ocampo', '09259901235', 'renato.ocampo@example.com', 'San Isidro, Castilla, Sorsogon', 'Toyota Hilux Conquest', 'SOR 6621', 'Exhibitor', 'Pending', 1800, 0],
  ['Liza Fernandez', '09261012346', 'liza.fernandez@example.com', '5 Mabini St., Irosin, Sorsogon', 'Honda Jazz GK', 'SOR 1180', 'Exhibitor', 'Cancelled', 1800, 0],
  ['Dennis Aquino', '09272123457', 'dennis.aquino@example.com', '88 Araneta St., Legazpi City', 'Mitsubishi Montero Sport', 'ALB 7742', 'Exhibitor', 'Confirmed', 1800, 900],
  ['Patricia Gomez', '09283234568', 'patricia.gomez@example.com', '17 Panganiban Dr., Naga City', 'Hyundai Veloster', 'NCR 5009', 'Competitor', 'CheckedIn', 2500, 2500],
  ['Ferdinand Salazar', '09294345679', 'ferdinand.salazar@example.com', 'Poblacion, Matnog, Sorsogon', 'Isuzu D-Max', 'SOR 8834', 'Exhibitor', 'Pending', 1800, 0],
  ['Grace Villamor', '09305456780', 'grace.villamor@example.com', '31 Peñaranda St., Legazpi City', 'Mini Cooper S', 'ALB 6650', 'VIP', 'Confirmed', 3500, 3500],
  ['Alvin Navarro', '09316567891', 'alvin.navarro@example.com', '9 Zamora St., Sorsogon City', 'Toyota Corolla AE86', 'SOR 3001', 'Competitor', 'Confirmed', 2500, 1200],
  ['Michelle Padilla', '09327678902', 'michelle.padilla@example.com', '62 Rizal Ave., Gubat, Sorsogon', 'Kia Stinger', 'SOR 5112', 'Exhibitor', 'CheckedIn', 1800, 1800],
  ['Roberto Espino', '09338789013', 'roberto.espino@example.com', '4 Del Rosario St., Naga City', 'Chevrolet Camaro', 'NCR 7788', 'VIP', 'Pending', 3500, 1000],
  ['Catherine Diaz', '09349890124', 'catherine.diaz@example.com', '18 Roxas St., Sorsogon City', 'Honda CR-V', 'SOR 2034', 'Exhibitor', 'Confirmed', 1800, 1800],
  ['Emilio Tansiongco', '09350901235', 'emilio.tansiongco@example.com', 'Purok 7, Barcelona, Sorsogon', 'Nissan Navara', 'SOR 9477', 'Exhibitor', 'Cancelled', 1800, 0],
  ['Jasmine Robles', '09361012346', 'jasmine.robles@example.com', '40 Bonifacio Ave., Legazpi City', 'Mazda CX-5', 'ALB 1290', 'Competitor', 'CheckedIn', 2500, 2500],
  ['Nestor Cabrera', '09372123457', 'nestor.cabrera@example.com', '3 Plaridel St., Sorsogon City', 'Toyota Land Cruiser', 'NCR 4408', 'VIP', 'Confirmed', 3500, 2000],
  ['Diana Manalo', '09383234568', 'diana.manalo@example.com', '27 Rizal St., Bulan, Sorsogon', 'Suzuki Swift Sport', 'SOR 7756', 'Competitor', 'Pending', 2500, 0],
  ['Rogelio Pineda', '09394345679', 'rogelio.pineda@example.com', '11 Katipunan St., Irosin, Sorsogon', 'Ford Ranger Raptor', 'SOR 3390', 'Exhibitor', 'Confirmed', 1800, 900],
  ['Bianca Serrano', '09405456780', 'bianca.serrano@example.com', '55 Quezon Ave., Naga City', 'Audi A3 Sedan', 'NCR 6683', 'VIP', 'CheckedIn', 3500, 3500],
  ['Ernesto Lagman', '09416567891', 'ernesto.lagman@example.com', 'Purok 2, Casiguran, Sorsogon', 'Mitsubishi Strada', 'SOR 1219', 'Exhibitor', 'Pending', 1800, 0],
  ['Trisha Alcantara', '09427678902', 'trisha.alcantara@example.com', '20 Gomez St., Sorsogon City', 'Honda City RS', 'SOR 5567', 'Exhibitor', 'Confirmed', 1800, 1800],
  ['Victoriano Perez', '09438789013', 'victoriano.perez@example.com', '6 Mabini Ave., Legazpi City', 'Jeep Wrangler', 'ALB 8123', 'Competitor', 'Cancelled', 2500, 500],
  ['Sheila Marquez', '09449890124', 'sheila.marquez@example.com', '14 Arellano St., Sorsogon City', 'Toyota Yaris Cross', 'SOR 9902', 'VIP', 'CheckedIn', 3500, 3500],
]

const openingTime = Date.UTC(2027, 1, 8, 0, 30)

const identifiers = entries.map(
  (_entry, index) =>
    `7c4b1d2e-0000-4000-8000-${String(index + 1).padStart(12, '0')}`,
)

const feeLookup: Registration[] = entries.map((entry, index) => {
  const [name, contact, email, address, car, plate, type, status, fee, paid] = entry
  const paymentStatus: PaymentStatus = paid <= 0 ? 'Unpaid' : paid >= fee ? 'Paid' : 'Partial'

  return {
    id: identifiers[index],
    registrationNumber: `CS27-${String(index + 1).padStart(4, '0')}`,
    registrationDate: new Date(openingTime + index * 5_400_000).toISOString(),
    participantName: name,
    contactNumber: contact,
    email,
    address,
    carMakeModel: car,
    plateNumber: plate,
    registrationType: type,
    status,
    registrationFee: fee,
    amountPaid: paid,
    paymentStatus,
  }
})

function tally(list: Registration[]): RegistrationSummary {
  const totalFees = list.reduce((sum, row) => sum + row.registrationFee, 0)
  const totalPayments = list.reduce((sum, row) => sum + row.amountPaid, 0)
  const countOf = (status: RegistrationStatus) =>
    list.filter((row) => row.status === status).length

  return {
    totalRegistrations: list.length,
    confirmed: countOf('Confirmed'),
    checkedIn: countOf('CheckedIn'),
    pending: countOf('Pending'),
    cancelled: countOf('Cancelled'),
    totalFees,
    totalPayments,
    uncollectedPayments: totalFees - totalPayments,
  }
}

export async function getRegistrations(query: RegistrationQuery): Promise<RegistrationList> {
  const term = query.participantName.trim().toLowerCase()

  const matched = feeLookup.filter((row) => {
    const nameMatch = !term || row.participantName.toLowerCase().includes(term)
    const typeMatch = query.type === 'All' || row.registrationType === query.type
    const statusMatch = query.status === 'All' || row.status === query.status

    return nameMatch && typeMatch && statusMatch
  })

  const totalCount = matched.length
  const totalPages = Math.max(1, Math.ceil(totalCount / query.pageSize))
  const start = (query.page - 1) * query.pageSize

  return {
    items: matched.slice(start, start + query.pageSize),
    page: query.page,
    pageSize: query.pageSize,
    totalCount,
    totalPages,
  }
}

export async function getSummary(): Promise<RegistrationSummary> {
  return tally(feeLookup)
}
