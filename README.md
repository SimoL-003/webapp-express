# MovieCatalogue – Backend Express

## Descrizione del progetto

MovieCatalogue è un’applicazione web per la gestione e la consultazione di un catalogo di film, con funzionalità di recensione e voto. Questo progetto rappresenta il backend, sviluppato in Express.js, che espone API RESTful per la gestione dei dati. Il frontend associato è sviluppato in React (vedi cartella `webapp-react`).

### Funzionalità principali

- Gestione CRUD dei film (creazione, lettura, aggiornamento, eliminazione)
- Gestione delle recensioni associate ai film
- Validazione e formattazione dei dati in ingresso tramite middleware dedicati
- Gestione degli errori e delle risposte HTTP
- Servizio di file statici (immagini, ecc.)

### Tecnologie utilizzate

- **Backend:**
  - Node.js
  - Express.js
  - MySQL
  - Middleware personalizzati per validazione e formattazione
- **Frontend:**
  - React (vedi cartella `webapp-react`)

### Logica generale

- Il backend espone API RESTful per la gestione di film e recensioni (es. `/api/movies`, `/api/movies/:id/reviews`)
- I dati vengono validati e formattati tramite middleware (es. `formatData.js`, `validateData.js`)
- Gli errori vengono gestiti centralmente e restituiti in formato strutturato
- Il backend serve anche file statici dalla cartella `public/`
- Il frontend React consuma queste API per mostrare, aggiungere e recensire i film

### Struttura delle cartelle principali

- `controllers/` – Logica di gestione delle rotte e delle risorse
- `database/` – Script SQL e connessione al database
- `functions/` – Funzioni di supporto
- `middlewares/` – Middleware per validazione, formattazione, gestione errori
- `public/` – File statici
- `routers/` – Definizione delle rotte API
- `app.js` – Entry point dell’applicazione

### Note aggiuntive

- Il backend è pensato per essere utilizzato insieme al frontend React (vedi `webapp-react`)
- Le risposte delle API sono strutturate per essere facilmente consumate dal frontend

---

Per dettagli sull’interfaccia utente e la logica client, consultare la cartella `webapp-react`.
