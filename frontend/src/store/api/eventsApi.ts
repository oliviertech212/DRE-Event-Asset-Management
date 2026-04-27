import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export interface Event {
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

export interface EventsResponse {
  data: Event[]
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
  }
}

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api` }),
  endpoints: (builder) => ({
    getEvents: builder.query<EventsResponse, { page?: number; limit?: number; category?: string; status?: string; search?: string }>({
      query: ({ page = 1, limit = 10, category, status, search }) => {
        const params = new URLSearchParams({ page: String(page), limit: String(limit) })
        if (category) params.append('category', category)
        if (status) params.append('status', status)
        if (search) params.append('search', search)
        return `/events?${params.toString()}`
      },
    }),
    getEventById: builder.query<Event, string>({
      query: (id) => `/events/${id}`,
    }),
  }),
})

export const { useGetEventsQuery, useGetEventByIdQuery } = eventsApi
