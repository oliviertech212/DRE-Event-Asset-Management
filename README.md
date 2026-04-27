# Digital Realm - Event & Asset Management

A full-stack application for managing gaming events and digital assets with a modern admin dashboard, real-time data, and Cloudinary integration.

## Live Demo

- **Frontend**: [https://dre-event-asset-management.vercel.app](https://dre-event-asset-management.vercel.app)
- **Backend API**: [https://dre-event-asset-management.onrender.com](https://dre-event-asset-management.onrender.com)

## Features

### Public Features
- Browse gaming events with search, category filters, and pagination
- Explore digital assets (3D models, 2D assets, audio, video, XR assets)
- Fully responsive design with smooth animations
- Event detail pages with image galleries and participant information
- Modern UI with black theme and orange accent colors

### Admin Dashboard
- JWT authentication with protected routes
- Real-time dashboard with statistics and recent items
- Full CRUD operations for events and assets
- Advanced filtering, search, and pagination
- Cloudinary integration for image and file uploads
- Form validation with Zod
- View details modal for quick asset preview
- Intuitive admin interface with sidebar navigation

## Tech Stack

### Frontend
- **Framework**: Next.js 16.2.4 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **State Management**: Redux Toolkit 2.11.2 with RTK Query
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: Zod validation
- **Notifications**: Sonner
- **Image Upload**: Cloudinary

### Backend
- **Runtime**: Node.js with Express
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (jsonwebtoken)
- **Security**: bcryptjs, cors
- **Validation**: Express Validator

## Project Structure

```
DRE-event-asset-fullstck-challenge/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx                    # Landing page
│   │   │   ├── login/page.tsx              # Login page
│   │   │   ├── events/[id]/page.tsx        # Event detail page
│   │   │   └── admin/
│   │   │       ├── dashboard/page.tsx      # Admin dashboard
│   │   │       ├── events/                 # Events management
│   │   │       │   ├── page.tsx            # Events list
│   │   │       │   ├── create/page.tsx     # Create event
│   │   │       │   └── edit/[id]/page.tsx  # Edit event
│   │   │       └── assets/                 # Assets management
│   │   │           ├── page.tsx            # Assets list
│   │   │           ├── create/page.tsx     # Create asset
│   │   │           └── edit/[id]/page.tsx  # Edit asset
│   │   ├── components/
│   │   │   ├── Navbar.tsx                  # Main navigation
│   │   │   ├── HeroSection.tsx             # Landing hero
│   │   │   ├── EventsSection.tsx           # Events grid
│   │   │   ├── AssetsSection.tsx           # Assets grid
│   │   │   └── admin/
│   │   │       ├── DashboardLayout.tsx     # Admin layout
│   │   │       └── Sidebar.tsx             # Admin sidebar
│   │   ├── store/
│   │   │   ├── index.ts                    # Redux store
│   │   │   ├── authSlice.ts                # Auth state
│   │   │   └── api/
│   │   │       ├── authApi.ts              # Auth endpoints
│   │   │       ├── eventsApi.ts            # Public events
│   │   │       ├── assetsApi.ts            # Public assets
│   │   │       ├── adminEventsApi.ts       # Admin events CRUD
│   │   │       └── adminAssetsApi.ts       # Admin assets CRUD
│   │   └── lib/
│   │       └── cloudinary.ts               # Cloudinary upload
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.ts           # Auth logic
│   │   │   ├── eventController.ts          # Events CRUD
│   │   │   └── assetController.ts          # Assets CRUD
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   ├── eventRoutes.ts
│   │   │   └── assetRoutes.ts
│   │   ├── middleware/
│   │   │   └── authMiddleware.ts           # JWT verification
│   │   ├── prisma/
│   │   │   └── schema.prisma               # Database schema
│   │   └── server.ts                       # Express app
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- Cloudinary account (for image uploads)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/digital_realm"
JWT_SECRET="your-secret-key"
PORT=3001
```

4. Run Prisma migrations:
```bash
npx prisma migrate dev
npx prisma generate
```

5. Seed database (optional):
```bash
npm run seed
```

6. Start development server:
```bash
npm run dev
```

Backend runs on [http://localhost:3001](http://localhost:3001)

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
```

4. Start development server:
```bash
npm run dev
```

Frontend runs on [http://localhost:3000](http://localhost:3000)

5. Build for production:
```bash
npm run build
npm start
```

## Default Admin Credentials

```
Email: admin@digitalrealm.rw
Password: admin123
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Events (Public)
- `GET /api/events` - Get all events (with pagination, filters, search)
- `GET /api/events/:id` - Get event by ID

### Events (Admin - Protected)
- `GET /api/events/admin` - Get all events for admin
- `POST /api/events` - Create event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Assets (Public)
- `GET /api/assets` - Get all assets (with pagination, filters, search)
- `GET /api/assets/:id` - Get asset by ID

### Assets (Admin - Protected)
- `GET /api/assets/admin` - Get all assets for admin
- `POST /api/assets` - Create asset
- `PUT /api/assets/:id` - Update asset
- `DELETE /api/assets/:id` - Delete asset

## Key Features Implementation

### Authentication Flow
- JWT tokens stored in localStorage
- Auto-login on page refresh via `/api/auth/me`
- Protected routes with redirect to login
- Logout clears token and redirects

### Data Management
- RTK Query for efficient data fetching and caching
- Optimistic updates with automatic cache invalidation
- Pagination with smart page number display (up to 5 buttons)
- Real-time search with debouncing
- Multi-filter support (category, type, status)

### File Uploads
- Cloudinary widget integration
- Support for images (thumbnails, galleries)
- Support for asset files (3D models, audio, video)
- Automatic file size calculation
- Preview before upload

### Form Validation
- Zod schema validation
- Real-time error display
- Red error messages below fields
- Character counters for text fields
- Required field indicators

## Database Schema

### User
- id, name, email, password, role, createdAt, updatedAt

### Event
- id, title, description, category, imageUrl, gallery[], startDate, endDate, time, location, venue, address, email, phone, maxParticipants, participants, status, published, createdAt, updatedAt

### Asset
- id, title, description, type, thumbnailUrl, assetUrl, project, fileSize, status, published, createdAt, updatedAt

## Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Backend (Render)
1. Create new Web Service
2. Connect GitHub repository
3. Add environment variables
4. Deploy

## License

MIT License - feel free to use this project for learning and development.

## Author

Built with love for Digital Realm Events
