# Dev Journal

## Problems and solutions

### 1. ZodError Property Issue
**Problem**: Build failed - "Property 'errors' does not exist on type 'ZodError'"
**Fixed**: Changed `error.errors` to `error.issues` (Zod uses `issues` array)

### 2. Image Component Empty String Error
**Problem**: Next.js Image crashed when thumbnailUrl was empty string
**Fixed**: Added fallback placeholder when thumbnailUrl is falsy

### 3. Backend Field Name Mismatch
**Problem**: Frontend expected `thumbnailUrl` but backend returned `imageUrl`
**Fixed**: Added response transformation in controller to map fields consistently

### 4. Calendar Icon Not Visible
**Problem**: Date input calendar icon invisible on black background
**Fixed**: Added Tailwind classes `[&::-webkit-calendar-picker-indicator]:invert`

### 5. Pagination Empty Pages
**Problem**: Filters stayed on page 5 but only 2 pages existed
**Fixed**: Reset page to 1 when filters change

### 6. Protected Routes Not Redirecting
**Problem**: Users accessed admin pages without auth
**Fixed**: Check `isAuthenticated` state, redirect to login, auto-login via `/api/auth/me`

### 7. Form Validation Errors Not Showing
**Problem**: Zod errors weren't displaying
**Fixed**: Mapped Zod issues to field errors using `err.path[0]`, displayed with red text

### 8. Cloudinary Upload Not Working
**Problem**: Widget wasn't loading
**Fixed**: Script injection with success/error callbacks, configured upload preset

### 9. Auth State Not Persisting
**Problem**: User logged out on refresh
**Fixed**: Store token in localStorage, call `/api/auth/me` on load

### 10. TypeScript minLength Type Error
**Problem**: `minLength="10"` failed - expected number not string
**Fixed**: Changed to `minLength={10}` (React expects number type)
