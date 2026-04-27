'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/admin/DashboardLayout'
import { Plus, Edit, Trash2, Search, Image as ImageIcon, Eye, X, Download } from 'lucide-react'
import Link from 'next/link'
import { useGetAdminAssetsQuery, useDeleteAssetMutation } from '@/store/api/adminAssetsApi'
import { toast } from 'sonner'
import Image from 'next/image'

const statusColors: Record<string, string> = {
  Active: 'bg-[#ff8c42]/20 text-[#ff8c42]',
  Draft: 'bg-gray-500/20 text-gray-400',
  Archived: 'bg-red-500/20 text-red-400',
}

export default function AdminAssetsPage() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [selectedAsset, setSelectedAsset] = useState<any>(null)
  const { data, isLoading } = useGetAdminAssetsQuery({
    page,
    limit: 10,
    search: search || undefined,
    type: type || undefined,
    status: status || undefined,
  })
  const [deleteAsset] = useDeleteAssetMutation()

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return

    try {
      await deleteAsset(id).unwrap()
      toast.success('Asset deleted successfully')
    } catch (error) {
      toast.error('Failed to delete asset')
    }
  }

  const totalAssets = data?.pagination.totalItems || 0
  const modelAssets = data?.data.filter((a) => a.type === '3D Model').length || 0
  const assetAssets = data?.data.filter((a) => a.type === '2D Asset').length || 0
  const audioAssets = data?.data.filter((a) => a.type === 'Audio').length || 0

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Digital Assets</h1>
            <p className="text-gray-400 mt-1">Manage game assets and resources</p>
          </div>
          <Link
            href="/admin/assets/create"
            className="flex items-center gap-2 bg-[#ff8c42] text-black px-5 py-2.5 rounded-lg font-semibold hover:bg-[#ff7a2e] transition-all"
          >
            <Plus className="w-5 h-5" />
            Add Asset
          </Link>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5">
            <p className="text-gray-400 text-sm">Total Assets</p>
            <p className="text-2xl font-bold text-white mt-1">{totalAssets}</p>
          </div>
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5">
            <p className="text-gray-400 text-sm">3D Models</p>
            <p className="text-2xl font-bold text-purple-500 mt-1">{modelAssets}</p>
          </div>
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5">
            <p className="text-gray-400 text-sm">2D Assets</p>
            <p className="text-2xl font-bold text-blue-500 mt-1">{assetAssets}</p>
          </div>
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5">
            <p className="text-gray-400 text-sm">Audio Files</p>
            <p className="text-2xl font-bold text-green-500 mt-1">{audioAssets}</p>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search assets..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-500 focus:border-[#ff8c42] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value)
              setPage(1)
            }}
            className="px-4 py-2.5 bg-[#1a1a1a] border border-white/10 rounded-lg text-white focus:border-[#ff8c42] focus:outline-none"
          >
            <option value="">All Types</option>
            <option value="3D Model">3D Model</option>
            <option value="2D Asset">2D Asset</option>
            <option value="Audio">Audio</option>
            <option value="Video">Video</option>
            <option value="XR Asset">XR Asset</option>
          </select>

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value)
              setPage(1)
            }}
            className="px-4 py-2.5 bg-[#1a1a1a] border border-white/10 rounded-lg text-white focus:border-[#ff8c42] focus:outline-none"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
            <option value="Archived">Archived</option>
          </select>

          {(search || type || status) && (
            <button
              onClick={() => {
                setSearch('')
                setType('')
                setStatus('')
                setPage(1)
              }}
              className="px-4 py-2.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-all"
            >
              Clear Filters
            </button>
          )}
        </div>

        <div className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden">
          {isLoading ? (
            <div className="text-center py-20 text-gray-400">Loading assets...</div>
          ) : !data?.data.length ? (
            <div className="text-center py-20 text-gray-400">No assets found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black border-b border-white/10">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Asset</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Type</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Project</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Size</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Status</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.map((asset) => (
                    <tr key={asset.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#ff8c42]/20">
                            {asset.thumbnailUrl ? (
                              <Image
                                src={asset.thumbnailUrl}
                                alt={asset.title}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[#ff8c42]">
                                <ImageIcon className="w-6 h-6" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-white font-semibold text-sm">{asset.title}</p>
                            <p className="text-gray-400 text-xs">{asset.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-300 text-sm">{asset.type}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-300 text-sm">{asset.project}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-400 text-sm">{asset.fileSize || 'N/A'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-3 py-1.5 rounded-full ${statusColors[asset.status] || 'bg-gray-500/20 text-gray-400'}`}>
                          {asset.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedAsset(asset)}
                            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-500/10 rounded transition-all"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <Link
                            href={`/admin/assets/edit/${asset.id}`}
                            className="p-2 text-gray-400 hover:text-[#ff8c42] hover:bg-[#ff8c42]/10 rounded transition-all"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(asset.id, asset.title)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded transition-all"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {data && data.pagination.totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">
              Showing {((page - 1) * 10) + 1} to {Math.min(page * 10, data.pagination.totalItems)} of {data.pagination.totalItems} assets
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-[#1a1a1a] border border-white/10 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#ff8c42] transition-all"
              >
                Previous
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, data.pagination.totalPages) }, (_, i) => {
                  let pageNum;
                  if (data.pagination.totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= data.pagination.totalPages - 2) {
                    pageNum = data.pagination.totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`w-10 h-10 rounded-lg transition-all ${
                        page === pageNum
                          ? 'bg-[#ff8c42] text-black font-semibold'
                          : 'bg-[#1a1a1a] border border-white/10 text-white hover:border-[#ff8c42]'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setPage((p) => Math.min(data.pagination.totalPages, p + 1))}
                disabled={page === data.pagination.totalPages}
                className="px-4 py-2 bg-[#1a1a1a] border border-white/10 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#ff8c42] transition-all"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {selectedAsset && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedAsset(null)}>
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-[#1a1a1a] border-b border-white/10 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Asset Details</h2>
              <button
                onClick={() => setSelectedAsset(null)}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="relative w-full h-64 rounded-lg overflow-hidden bg-black">
                {selectedAsset.thumbnailUrl ? (
                  <Image  
                    src={selectedAsset.thumbnailUrl}
                    alt={selectedAsset.title}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600">
                    <ImageIcon className="w-20 h-20" />
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Title</p>
                  <p className="text-white font-semibold">{selectedAsset.title}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Type</p>
                  <p className="text-white font-semibold">{selectedAsset.type}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Project</p>
                  <p className="text-white font-semibold">{selectedAsset.project}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">File Size</p>
                  <p className="text-white font-semibold">{selectedAsset.fileSize || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Status</p>
                  <span className={`inline-block text-xs px-3 py-1.5 rounded-full ${statusColors[selectedAsset.status] || 'bg-gray-500/20 text-gray-400'}`}>
                    {selectedAsset.status}
                  </span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Created</p>
                  <p className="text-white font-semibold">{new Date(selectedAsset.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <p className="text-gray-400 text-sm mb-2">Description</p>
                <p className="text-white leading-relaxed">{selectedAsset.description}</p>
              </div>

              {selectedAsset.assetUrl && (
                <div>
                  <p className="text-gray-400 text-sm mb-2">Asset File</p>
                  <a
                    href={selectedAsset.assetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#ff8c42] text-black px-4 py-2.5 rounded-lg font-semibold hover:bg-[#ff7a2e] transition-all w-fit"
                  >
                    <Download className="w-4 h-4" />
                    Download Asset
                  </a>
                </div>
              )}

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <Link
                  href={`/admin/assets/edit/${selectedAsset.id}`}
                  className="flex items-center gap-2 bg-[#ff8c42] text-black px-5 py-2.5 rounded-lg font-semibold hover:bg-[#ff7a2e] transition-all"
                >
                  <Edit className="w-4 h-4" />
                  Edit Asset
                </Link>
                <button
                  onClick={() => setSelectedAsset(null)}
                  className="px-5 py-2.5 border border-white/10 text-white rounded-lg hover:bg-white/5 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
