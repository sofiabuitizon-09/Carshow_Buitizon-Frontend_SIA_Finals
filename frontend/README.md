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

The dashboard opens on the bundled sample data, so `npm run dev` shows 28 rows without
a backend. `.env.development` controls which module is used:

```
VITE_DATA_SOURCE=demo
```

`demo` reads `src/api/sample-data.ts`; `api` reads the C# endpoints through
`src/api/registrationsApi.ts`. Both modules expose the same `getRegistrations` and
`getSummary` functions, and `src/api/index.ts` picks one of them, so the page does not
change. The header pill reads "Sample data (offline)" in demo mode and "Live from the
registrations API" in api mode.

The sample module holds 28 registrations and filters, pages and totals them in the
browser. The API module sends the filters as query parameters to the C# backend. Its
records are separate from the ones in the Carillo frontend, so the two projects never
share the same rows.

## Checks

```
npm run lint
npm run build
```
