import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export interface AdminEvent {
  id: string
  title: string
  description: string
  category: string
  status: string
  date: string
  location: string
  thumbnailUrl: string
  gallery: string[]
  participants: number
  maxParticipants: number
  contactEmail: string
  contactPhone: string
  createdAt: string
  updatedAt: string
}

export interface AdminEventsResponse {
  data: AdminEvent[]
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
  }
}

export interface CreateEventRequest {
  title: string
  description: string
  category: string
  status: string
  date: string
  location: string
  thumbnailUrl: string
  gallery: string[]
  maxParticipants: number
  contactEmail: string
  contactPhone: string
}

export const adminEventsApi = createApi({
  reducerPath: 'adminEventsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['AdminEvents'],
  endpoints: (builder) => ({
    getAdminEvents: builder.query<AdminEventsResponse, { page?: number; limit?: number; category?: string; status?: string; search?: string }>({
      query: ({ page = 1, limit = 50, category, status, search }) => {
        const params = new URLSearchParams({ page: String(page), limit: String(limit) })
        if (category) params.append('category', category)
        if (status) params.append('status', status)
        if (search) params.append('search', search)
        return `/events/admin?${params.toString()}`
      },
      providesTags: ['AdminEvents'],
    }),
    createEvent: builder.mutation<AdminEvent, CreateEventRequest>({
      query: (body) => ({
        url: '/events',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['AdminEvents'],
    }),
    updateEvent: builder.mutation<AdminEvent, { id: string; data: Partial<CreateEventRequest> }>({
      query: ({ id, data }) => ({
        url: `/events/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['AdminEvents'],
    }),
    deleteEvent: builder.mutation<void, string>({
      query: (id) => ({
        url: `/events/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AdminEvents'],
    }),
  }),
})

export const {
  useGetAdminEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = adminEventsApi
