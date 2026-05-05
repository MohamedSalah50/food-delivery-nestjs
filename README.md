# OrderKing Food Delivery

## Tech Stack
- **Frontend**: Nuxt 4, Vue 3, Tailwind CSS
- **Backend**: NestJS, Prisma, PostgreSQL
- **Auth**: Supabase Auth
- **CI/CD**: GitHub Actions

## Setup

### Prerequisites
- Node.js 20+
- PostgreSQL (via Supabase)

### Backend
cd backend
npm install
cp .env.example .env
# Fill in your .env values
npx prisma migrate dev
npx prisma db seed
npm run start:dev

### Frontend
cd frontend
npm install
cp .env.example .env
# Fill in your .env values
npm run dev

## Environment Variables

### Backend `.env`
DATABASE_URL=
DIRECT_URL=
SUPABASE_URL=
SUPABASE_ANON_KEY=

### Frontend `.env`
SUPABASE_URL=
SUPABASE_ANON_KEY=