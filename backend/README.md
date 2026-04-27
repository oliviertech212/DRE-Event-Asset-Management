# Digital Realm Backend API

Backend API for Digital Realm Event & Asset Management built with Node.js, Express, Prisma, and PostgreSQL.

## Features

- ✅ RESTful API with Express
- ✅ PostgreSQL database with Prisma ORM
- ✅ JWT authentication
- ✅ CRUD operations for Events and Assets
- ✅ Pagination and filtering
- ✅ Image URLs from Cloudinary (frontend)
- ✅ TypeScript support

## Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Create `.env` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/digital_realm?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this"
PORT=5000
```

### 3. Setup Database

```bash
# Generate Prisma Client
npm run prisma:generate

# Push schema to database
npm run prisma:push

# Seed initial data
npm run seed
```

### 4. Run Development Server

```bash
npm run dev
```

Server runs on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Events
- `GET /api/events` - Get all published events (public)
- `GET /api/events/admin` - Get all events with pagination (protected)
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create event (protected)
- `PUT /api/events/:id` - Update event (protected)
- `DELETE /api/events/:id` - Delete event (protected)

**Query Parameters for filtering:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `category` - Filter by category
- `status` - Filter by status
- `search` - Search in title, description, location

### Assets
- `GET /api/assets` - Get all published assets (public)
- `GET /api/assets/admin` - Get all assets with pagination (protected)
- `GET /api/assets/:id` - Get asset by ID
- `POST /api/assets` - Create asset (protected)
- `PUT /api/assets/:id` - Update asset (protected)
- `DELETE /api/assets/:id` - Delete asset (protected)

**Query Parameters for filtering:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `type` - Filter by type
- `status` - Filter by status
- `search` - Search in title, description, project

## Default Admin Credentials

```
Email: admin@digitalrealm.rw
Password: admin123
```

## Database Schema

### User
- id, email, password, name, role, createdAt, updatedAt

### Event
- id, title, description, category, imageUrl, gallery[], startDate, endDate, time, location, venue, address, email, phone, website, maxParticipants, participants, status, published, createdById, createdAt, updatedAt

### Asset
- id, title, description, type, project, thumbnailUrl, assetUrl, fileSize, status, published, createdById, createdAt, updatedAt

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:push` - Push schema to database
- `npm run prisma:studio` - Open Prisma Studio
- `npm run seed` - Seed database with initial data
