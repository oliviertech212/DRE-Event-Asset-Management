# Design Notes

## Architecture choice

### Frontend: Next.js 16 with App Router
- **Why**: 2 years of experience with Next.js, excellent file-based routing system, built-in optimization
- **Benefits**: Server-side rendering for public pages, automatic code splitting, TypeScript support
- **Structure**: Separate routes for public pages (`/`, `/events/[id]`) and admin dashboard (`/admin/*`)

### Backend: Node.js + Express + PostgreSQL + Prisma
- **Why**: Simple CRUD operations don't require Python/Django complexity, strong familiarity with Node.js ecosystem
- **Benefits**: Fast development, excellent TypeScript support, Prisma ORM simplifies database operations
- **Security**: JWT authentication middleware protects admin routes, bcrypt for password hashing

### State Management: Redux Toolkit with RTK Query
- **Why**: Centralized state management, automatic caching, optimistic updates
- **Benefits**: Separate API slices for public and admin endpoints, automatic cache invalidation on mutations

### Styling: Tailwind CSS 4
- **Why**: Rapid UI development, consistent design system, responsive utilities
- **Theme**: Black background (#000000, #0a0a0a, #1a1a1a) with orange accent (#ff8c42) for gaming aesthetic

## Data model / state model

### Database Schema (Prisma)
```
User: id, name, email, password, role, timestamps
Event: id, title, description, category, imageUrl, gallery[], startDate, endDate, 
       time, location, venue, address, email, phone, maxParticipants, participants, 
       status, published, createdById, timestamps
Asset: id, title, description, type, thumbnailUrl, assetUrl, project, fileSize, 
       status, published, createdById, timestamps
```

### State Management
- **Auth State**: User info, token, authentication status (localStorage persistence)
- **API Cache**: RTK Query manages server state with automatic invalidation
- **Form State**: Local component state with Zod validation

### Field Mapping
Backend uses different field names than frontend for consistency:
- `imageUrl` (backend) → `thumbnailUrl` (frontend)
- `startDate` (backend) → `date` (frontend)
- `email` (backend) → `contactEmail` (frontend)
- `phone` (backend) → `contactPhone` (frontend)

## Edge cases handled

1. **Authentication**
   - Auto-login on page refresh via `/api/auth/me` endpoint
   - Token expiration handling with redirect to login
   - Protected routes check authentication before rendering

2. **Image Handling**
   - Fallback placeholders for missing thumbnails to prevent empty string errors
   - Cloudinary upload error handling with user notifications

3. **Pagination**
   - Smart page number display (max 5 buttons) for large datasets
   - Filters reset pagination to page 1 to avoid empty results
   - Item counter shows current range (e.g., "Showing 1 to 10 of 45")

4. **Form Validation**
   - Zod schema validation with detailed error messages
   - Red error text below each field for clarity
   - Character counters for description fields
   - Required field indicators

5. **Data Fetching**
   - Loading states during API calls
   - Empty states when no data exists
   - Error handling with toast notifications

6. **TypeScript Build**
   - Fixed ZodError.issues vs errors property
   - Corrected minLength/maxLength types (number vs string)
   - Added optional fileSize to Asset interface

7. **Status Filtering (Spec Update)**
   - Events: Status filters (Draft/Published/Live/Upcoming) work with search
   - Assets: Status filters (Draft/Active/Archived) work with search
   - Frontend: Dropdown filters on admin events and assets pages
   - Backend: Query parameter filtering combined with search
   - Filters reset pagination to page 1 for consistent results

8. **Unique Title Validation (Spec Update)**
   - Case-insensitive uniqueness check on create and update
   - Backend validates before database insertion
   - Returns 400 error with clear message: "An event/asset with this title already exists"
   - Frontend displays error message from backend via toast notification
   - Update operations exclude current item from uniqueness check

## Risks and mitigations

### Risk: Backend cold start on Render free tier
**Mitigation**: Loading states inform users, consider upgrading to paid tier for production

### Risk: Cloudinary upload failures
**Mitigation**: Error handling with user-friendly messages, retry option available

### Risk: JWT token theft
**Mitigation**: HTTPS only in production, short token expiration, httpOnly cookies recommended for future

### Risk: Large image galleries affecting performance
**Mitigation**: Cloudinary automatic optimization, lazy loading images, limit gallery to 10 images

### Risk: SQL injection
**Mitigation**: Prisma ORM parameterizes all queries automatically

### Risk: Duplicate titles causing confusion
**Mitigation**: Case-insensitive uniqueness validation on backend, clear error messages to users

### Risk: Unauthorized access to admin routes
**Mitigation**: JWT middleware validates tokens on every protected endpoint, frontend route guards

## Future Improvements
- Public registration flow for event attendees
- Marketplace for digital assets with transactions
- Email notifications for event reminders
- Real-time participant updates with WebSockets
- Advanced analytics dashboard for admin
- Social sharing features for events
- User profiles and saved events
