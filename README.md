# Verifi — BGV Platform Frontend

> A calm, fast workspace for moving every background-verification case from intake to decision.

![Angular 17](https://img.shields.io/badge/Angular-17-DD0031?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?logo=typescript&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-18A999)

## The experience

**Verifi** is the web console for the BGV Platform. It gives verification teams one focused place to register candidates, collect evidence, manage checks, and ask contextual AI questions about a case.

```text
New candidate  →  Upload evidence  →  Run verification checks  →  Clear or reject
                         ↘ AI extraction + case support ↗
```

## Highlights

| Workspace feature | What it gives your team |
| --- | --- |
| Candidate directory | Searchable, at-a-glance case queue with lifecycle status |
| Case detail view | Candidate context, contact details, and position in one place |
| Evidence management | Upload, download, delete, and inspect submitted documents |
| Smart extraction | Review structured data extracted from supported PDF and image documents |
| Verification board | Add and update identity, education, employment, address, credit, reference, and criminal-record checks |
| AI case support | Ask focused questions about a candidate’s documents or verification process |
| Thoughtful interface | Responsive standalone Angular components with light and dark themes |

## Built with

- **Angular 17** with standalone components and the Angular router
- **TypeScript 5.4**, RxJS, and Angular reactive forms
- A Spring Boot REST API through the local `/api` proxy
- A custom visual system using Inter, Space Grotesk, and IBM Plex Mono

## Run locally

### Prerequisites

- Node.js **18+**
- npm
- The [BGV Platform backend](../backend/README.md) running on port `8080`

### Install and start

```bash
npm install
npm start
```

Open [http://localhost:4200](http://localhost:4200). During development, Angular proxies every `/api` call to `http://localhost:8080`, so the browser works with a single local origin.

## Commands

```bash
# Development server
npm start

# Production build
npm run build

# Rebuild on changes
npm run watch
```

Production output is written to `dist/bgv-frontend/`.

## Screens and flow

```text
/
└── Candidates
    ├── Create a candidate case
    └── Open /candidates/:id
        ├── Candidate overview
        ├── Documents + extraction results
        ├── Verification checks
        └── AI support chat
```

## Connecting to the API

The frontend calls the API through `src/app/services/api.service.ts`. Local routing is defined in `proxy.conf.json`; the backend permits the Angular development origin through CORS.

For a different deployed API, configure your reverse proxy to forward `/api` to the backend, or update the application’s API base URL strategy before building.

## Project structure

```text
src/app/
├── components/  # documents, checks, and AI chat
├── pages/       # candidate list and case detail pages
├── models/      # shared API types and enums
├── services/    # REST API client
├── app.routes.ts
└── app.component.ts
```

## Document compatibility

The backend accepts PDF, JPG/JPEG, PNG, DOC, and DOCX uploads (up to 20 MB by default). AI extraction is available for PDF, JPEG, and PNG documents when the backend has a valid Gemini configuration.

---

Designed to make sensitive verification work feel clear, deliberate, and under control.
