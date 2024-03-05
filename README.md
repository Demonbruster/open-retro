# Meeting Feedback Web App

The Meeting Feedback Web App is a platform designed to facilitate feedback collection during meetings or sessions. The app is structured around the concept of "Rooms," where an admin can create a meeting room and share the link with participants. Participants, in turn, can join the room and provide feedback on what aspects to improve, what to keep, and what to stop.

## Features

- **Room Creation**: Admin users can create meeting rooms.
- **Feedback Categories**: Users can submit feedback in three categories: Improve, Keep, and Stop.
- **Real-time Collaboration**: Participants can join the room and submit feedback in real-time.
- **Limited Voting**: Users are limited to a specific number of votes to ensure balanced feedback.


## Getting Started

### Prerequisites

- Node.js and pnpm installed on your machine.
- Firebase project set up for authentication 

### Steps

First, 
  - Create firebase app, 
  - Enable Email/Password and  Google sign-in method firebase auth, 
  - Set ADMIN_EMAIL and password,

Second, set .env.local

```
NEXT_PUBLIC_ADMIN_EMAIL=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

 Third, run the development server:

_*Don't forget to install dependencies*_

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## To Contribute
  - Create fork
  - Make improvement/fix 
  - Release PR
