# Fitness Calendar

Fitness Calendar is a web application designed to help users plan, track, and manage their fitness routines and goals. The app provides a calendar interface for scheduling workouts, tracking progress, and staying motivated.

## Features

- Interactive calendar for scheduling workouts
- Track daily, weekly, and monthly fitness activities
- Set and monitor fitness goals
- Responsive design for desktop and mobile

## Environment Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v20.18.1)
- [npm](https://www.npmjs.com/) (10.8.2)
- [Git](https://git-scm.com/) (git version 2.39.5)
- [nvm](https://github.com/nvm-sh/nvm) (0.40.1)

### Installation

Clone the repository:

```bash
git clone https://github.com/your-username/fitness-calendar.git
cd fitness-calendar
```

Install dependencies:

```bash
npm install
# or
yarn install
```

## Running the Application

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub.
2. Go to [Vercel](https://vercel.com/) and import your repository.
3. Follow the prompts to deploy.

### Manual Deployment

Build the application:

```bash
npm run build
# or
yarn build
```

Start the production server:

```bash
npm start
# or
yarn start
```

## Environment Variables

Create a `.env.local` file in the root directory and add any required environment variables. Refer to `.env.example` if available.

---

Feel free to contribute or open issues for suggestions and bug reports!