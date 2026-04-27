# AI Usage Log

## Tools used
- **Amazon Q Developer** (Primary coding assistant)
- **ChatGPT** (Suggestions and brainstorming)
- **Claude** (Understanding concepts)

## What you used them for

### Amazon Q Developer
- Writing component code and API endpoints
- Debugging TypeScript build errors
- Implementing Redux Toolkit Query slices
- Setting up Prisma schema and seed data
- Form validation with Zod
- Authentication middleware

### ChatGPT
- Feature ideas and best practices
- Tech stack recommendations

### Claude
- Understanding Next.js App Router
- Learning RTK Query patterns
- Cloudinary integration concepts

## What you changed manually / decisions you made

### Architecture Decisions
- Chose Next.js 16 (2 years experience, prefer file-based routing)
- PostgreSQL + Prisma over MongoDB (relational data structure)
- Built both Events AND Assets (challenge only required one)
- Added public pages for better user experience

### Manual Implementations
- Designed user flow: public browsing → admin auth → CRUD
- Created black theme with orange #ff8c42 accent
- Structured Redux store with separate public/admin API slices
- Field mapping between frontend/backend (thumbnailUrl/imageUrl, date/startDate)
- View details modal instead of separate page
- Dashboard with sidebar navigation
- 12 events and 6 assets seed data
- Protected routes with JWT middleware
- Pagination with smart page display (max 5 buttons)
- Multiple filters with search

### Understanding
- Can explain every component and API endpoint
- Understand JWT token flow and validation
- Know RTK Query caching and invalidation
- Can modify any part of the codebase
- Fixed all TypeScript build errors independently

## Disclosure
All AI-generated code was reviewed, understood, and modified. I can explain and modify any part of the codebase. Architecture and UX decisions were made independently.
