# Acowale Server

## Setup

```bash
cd server
npm install
copy .env.example .env
# Update DATABASE_URL in .env
npm run setup
npm run dev
```


## API Endpoints

- `GET /api/health`
- `GET /api/feedback`
- `GET /api/feedback?category=BUG&search=ui&page=1&limit=10`
- `POST /api/feedback`
- `GET /api/feedback/analytics`

## Scripts

- `npm run dev` - start the server in watch mode
- `npm run setup` - generate Prisma client, deploy migrations, and seed the database
- `npm run db:generate` - generate Prisma client
- `npm run db:migrate` - run migrations in development
- `npm run db:deploy` - deploy migrations to the database
- `npm run db:push` - push schema to the database
- `npm run db:seed` - run the seed script

## Notes

- Copy `.env.example` to `.env` and update `DATABASE_URL`.
- The server listens on `PORT` or `4000`.
- Feedback listing supports pagination using `page` and `limit` query parameters.
