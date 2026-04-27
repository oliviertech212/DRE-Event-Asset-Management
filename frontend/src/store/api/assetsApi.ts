import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export interface Asset {
  id: string
  title: string
  description: string
  type: string
  status: string
  thumbnailUrl: string
  assetUrl: string
  project: string
  createdAt: string
  updatedAt: string
}

export interface AssetsResponse {
  data: Asset[]
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
  }
}

export const assetsApi = createApi({
  reducerPath: 'assetsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api` }),
  endpoints: (builder) => ({
    getAssets: builder.query<AssetsResponse, { page?: number; limit?: number; type?: string; status?: string; search?: string }>({
      query: ({ page = 1, limit = 10, type, status, search }) => {
        const params = new URLSearchParams({ page: String(page), limit: String(limit) })
        if (type) params.append('type', type)
        if (status) params.append('status', status)
        if (search) params.append('search', search)
        return `/assets?${params.toString()}`
      },
    }),
    getAssetById: builder.query<Asset, string>({
      query: (id) => `/assets/${id}`,
    }),
  }),
})

export const { useGetAssetsQuery, useGetAssetByIdQuery } = assetsApi
