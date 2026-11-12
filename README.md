# Car Show Registration System

Frontend task for Car Show 2027, hosted by AutoVista Events at the Sorsogon City Coliseum.

## Team

| Member | Role |
| --- | --- |
| Sofia Buitizon | Frontend Developer |
| Backend partner | Backend Developer (C# / .NET API in `backend/`) |

## Repository layout

```
Carshow_Buitizon-Frontend_SIA_Finals/
    backend/            C# solution (backend developer)
    frontend/           React app built with Vite, TypeScript and Tailwind CSS
    docs/
        screenshots/    captures required by the submission
    README.md
```

## Running the apps

Backend:

```
cd backend
dotnet run --project Api
```

Frontend:

```
cd frontend
npm install
npm run dev
```

The dashboard opens on `http://localhost:5173` and reads the API URL from
`frontend/.env.development` (`VITE_API_BASE_URL=http://localhost:5205`).

## Frontend checks

```
cd frontend
npm run lint
npm run build
```

## Switching between sample data and the real API

The dashboard can run with or without the backend. See `frontend/README.md` for the
two import lines involved.
