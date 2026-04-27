import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export interface AdminAsset {
  id: string
  title: string
  description: string
  type: string
  project: string
  thumbnailUrl: string
  assetUrl: string
  fileSize: string
  status: string
  createdAt: string
  updatedAt: string
}

export interface AdminAssetsResponse {
  data: AdminAsset[]
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
  }
}

export interface CreateAssetRequest {
  title: string
  description: string
  type: string
  project: string
  thumbnailUrl: string
  assetUrl: string
  fileSize?: string
  status: string
}

export const adminAssetsApi = createApi({
  reducerPath: 'adminAssetsApi',
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
  tagTypes: ['AdminAssets'],
  endpoints: (builder) => ({
    getAdminAssets: builder.query<AdminAssetsResponse, { page?: number; limit?: number; type?: string; status?: string; search?: string }>({
      query: ({ page = 1, limit = 10, type, status, search }) => {
        const params = new URLSearchParams({ page: String(page), limit: String(limit) })
        if (type) params.append('type', type)
        if (status) params.append('status', status)
        if (search) params.append('search', search)
        return `/assets/admin?${params.toString()}`
      },
      providesTags: ['AdminAssets'],
    }),
    createAsset: builder.mutation<AdminAsset, CreateAssetRequest>({
      query: (body) => ({
        url: '/assets',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['AdminAssets'],
    }),
    updateAsset: builder.mutation<AdminAsset, { id: string; data: Partial<CreateAssetRequest> }>({
      query: ({ id, data }) => ({
        url: `/assets/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['AdminAssets'],
    }),
    deleteAsset: builder.mutation<void, string>({
      query: (id) => ({
        url: `/assets/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AdminAssets'],
    }),
  }),
})

export const {
  useGetAdminAssetsQuery,
  useCreateAssetMutation,
  useUpdateAssetMutation,
  useDeleteAssetMutation,
} = adminAssetsApi
