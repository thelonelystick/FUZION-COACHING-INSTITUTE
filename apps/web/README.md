# FUZION COACHING INSTITUTE

A premium coaching institute management experience built with React, TypeScript, Vite, Firebase, and Tailwind CSS.

## Firebase setup

Create a local environment file based on [.env.example](.env.example) and populate the Firebase values:

```bash
cp .env.example .env
```

Required variables:

- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_PROJECT_ID
- VITE_FIREBASE_STORAGE_BUCKET
- VITE_FIREBASE_MESSAGING_SENDER_ID
- VITE_FIREBASE_APP_ID
- VITE_FIREBASE_MEASUREMENT_ID

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```
