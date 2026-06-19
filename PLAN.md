# Meteo App — Roadmap di sviluppo

## Context
L'app attualmente ha: ricerca città via geocoding Open-Meteo, fetch della temperatura corrente, e un rendering base. Tutto vive in `App.tsx`. L'utente vuole una roadmap con feature in difficoltà crescente, partendo dalla separazione dei componenti.

---

## Fase 1 — Struttura e refactoring (facile)
- **Separare i componenti**: estrarre `SearchBar` (input + bottone) e `WeatherCard` (visualizzazione meteo) da `App.tsx`
- **Tipi condivisi**: creare `src/types/weather.ts` per le interfacce (`WeatherData`, `GeoLocation`, ecc.)
- **Custom hook**: estrarre la logica di fetch in `src/hooks/useWeather.ts` — così `App` rimane pulita e orchestrativa

## Fase 2 — Dati meteo più ricchi (facile-medio)
- **Più dati correnti**: aggiungere umidità, vento, condizione meteo (codice WMO → icona/descrizione)
- **Icone meteo**: mappare i weather code di Open-Meteo a icone (es. sole, nuvola, pioggia)
- **Nome città visualizzato**: mostrare il nome della località trovata dal geocoding, non solo i dati

## Fase 3 — Previsioni (medio)
- **Forecast giornaliero**: aggiungere previsioni a 7 giorni (temp min/max, condizione) usando `daily` dell'API
- **Forecast orario**: grafico o lista delle temperature nelle prossime 24h usando `hourly`
- **Layout a card/griglia**: organizzare i dati in card con Tailwind + shadcn

## Fase 4 — Geolocalizzazione (medio)
- **Posizione del dispositivo**: usare `navigator.geolocation` per ottenere lat/lon dell'utente (con richiesta permesso)
- **Meteo automatico al load**: se l'utente concede il permesso, mostrare subito il meteo della posizione attuale
- **Fallback**: se il permesso è negato, mostrare solo la barra di ricerca

## Fase 5 — Luoghi preferiti (medio-difficile)
- **Salvare località**: bottone "aggiungi ai preferiti" che salva in `localStorage`
- **Lista preferiti**: sezione dedicata con le città salvate, click per vedere il meteo
- **Rimuovere preferiti**: gestione completa CRUD sui preferiti
- **Persistenza**: i preferiti sopravvivono al refresh della pagina

## Fase 6 — UX e polish (medio-difficile)
- **Loading states**: skeleton/spinner durante le fetch
- **Error handling**: gestire errori di rete, città non trovata, API down
- **Debounce/autocomplete**: suggerimenti mentre l'utente digita il nome della città
- **Dark mode**: toggle light/dark (shadcn ha già il supporto via classe `.dark`)
- **Responsive design**: layout che funziona bene su mobile

## Fase 7 — Feature avanzate (difficile)
- **Grafici**: visualizzare temperature con una libreria di charting (es. Recharts, già compatibile con shadcn)
- **PWA**: service worker per uso offline e installazione su dispositivo
- **i18n**: supporto multilingua (italiano/inglese)

---

## Verifica
Ad ogni fase: `npm run build` per verificare che compili, `npm run dev` per testare nel browser, `npm run lint` per la qualità del codice.
