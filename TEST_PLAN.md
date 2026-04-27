# Test Plan

## Testing Approach
All backend APIs tested using Postman. Collection covers authentication, CRUD operations, pagination, filtering, and search.

## Test 1: Authentication Flow with JWT
**What**: Test registration, login, and protected route access
**Why**: Ensures only authenticated users can manage events/assets
**Result**:  Token auto-capture working, protected routes secured

## Test 2: Events CRUD Operations
**What**: Test create, read, update, delete lifecycle
**Why**: Core feature - admins must manage events properly
**Result**:  Full CRUD working, field mapping handled correctly

## Test 3: Pagination and Filtering
**What**: Test pagination, category/status filters, and search
**Why**: Essential for browsing 12 events and 6 assets efficiently
**Result**:  All filters working, pagination resets on filter change

## Test 4: Admin vs Public Authorization
**What**: Test admin endpoints require auth, public endpoints don't
**Why**: Security - protect admin operations, allow public browsing
**Result**:  Middleware working, public routes accessible, admin routes protected

## Test 5: Data Validation
**What**: Test input validation and error messages
**Why**: Prevent bad data, provide clear feedback
**Result**:  Zod frontend validation + backend validation working, errors displayed in red

## Test 6: Status Filter with Search
**What**: Test status filter combined with search functionality
**Why**: Spec requirement - users need to filter by status while searching
**Result**:  Status filters working on both events (Draft/Published/Live/Upcoming) and assets (Draft/Active/Archived), works seamlessly with search and pagination

## Test 7: Unique Title Validation
**What**: Test duplicate title prevention for events and assets
**Why**: Spec requirement - item names must be unique to avoid confusion
**Result**:  Backend validates uniqueness (case-insensitive), returns 400 with "already exists" error message

## Coverage Summary
 Authentication (3 endpoints)
 Events CRUD (9 endpoints + 2 uniqueness tests)
 Assets CRUD (9 endpoints + 2 uniqueness tests)
 Pagination, filtering, search
 Status filters (Draft/Published/Archived)
 Protected routes
 Form validation
 Uniqueness validation

**Total Endpoints Tested**: 24
**Postman Collection**: Digital_Realm_API.postman_collection.json
