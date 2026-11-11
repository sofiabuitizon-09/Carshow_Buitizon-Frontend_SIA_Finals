# Car Show 2027 Registration Dashboard

React, TypeScript, Vite and Tailwind CSS frontend for the Car Show Registration System.

## Features

- KPI cards for total registrations, total payments, uncollected payments, confirmed,
  checked in and collection rate, all taken from `GET /api/registrations/summary`.
- Registrations table with registration number, date, participant, car, type, status,
  fee, amount paid and payment badge.
- Participant name search debounced at 400 ms, plus registration type and status filters.
- Pagination with page numbers, a result summary and a page-size selector (5, 10, 20).
- Loading skeletons, empty state and error state with a retry button.

## Run

```
npm install
npm run dev
```

The API base URL lives in `.env.development`:

```
VITE_API_BASE_URL=http://localhost:5205
```

## Sample data or the real API

Both modules export `getRegistrations(query)` and `getSummary()`, so only the import in
`src/pages/RegistrationsPage.tsx` changes.

Real API:

```
import { getRegistrations, getSummary } from '../api/registrationsApi'
```

Sample data:

```
import { getRegistrations, getSummary } from '../api/sample-data'
```

The sample module holds 28 registrations and filters, pages and totals them in the
browser. The API module sends the filters as query parameters to the C# backend.

## Checks

```
npm run lint
npm run build
```
