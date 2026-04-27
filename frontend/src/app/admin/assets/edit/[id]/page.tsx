'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import DashboardLayout from '@/components/admin/DashboardLayout'
import { Upload, X, Loader2 } from 'lucide-react'
import { openUploadWidget } from '@/lib/cloudinary'
import { toast } from 'sonner'
import { useUpdateAssetMutation } from '@/store/api/adminAssetsApi'
import { useGetAssetByIdQuery } from '@/store/api/assetsApi'

export default function EditAssetPage() {
  const router = useRouter()
  const params = useParams()
  const assetId = params.id as string
  const { data: asset, isLoading: loadingAsset } = useGetAssetByIdQuery(assetId)
  const [updateAsset, { isLoading }] = useUpdateAssetMutation()
  const [thumbnailPreview, setThumbnailPreview] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '3D Model',
    project: '',
    thumbnailUrl: '',
    assetUrl: '',
    fileSize: '',
    status: 'Draft',
  })

  useEffect(() => {
    if (asset) {
      setFormData({
        title: asset.title,
        description: asset.description,
        type: asset.type,
        project: asset.project,
        thumbnailUrl: asset.thumbnailUrl,
        assetUrl: asset.assetUrl,
        fileSize: asset.fileSize || '',
        status: asset.status,
      })
      setThumbnailPreview(asset.thumbnailUrl)
    }
  }, [asset])

  const handleThumbnailUpload = () => {
    openUploadWidget({
      multiple: false,
      maxFiles: 1,
      folder: 'assets/thumbnails',
      onSuccess: (results) => {
        const uploadedImage = results[0]
        setFormData({ ...formData, thumbnailUrl: uploadedImage.url })
        setThumbnailPreview(uploadedImage.url)
        toast.success('Thumbnail uploaded successfully')
      },
      onError: () => {
        toast.error('Failed to upload thumbnail')
      },
    })
  }

  const handleAssetUpload = () => {
    openUploadWidget({
      multiple: false,
      maxFiles: 1,
      folder: 'assets/files',
      onSuccess: (results) => {
        const uploadedFile = results[0]
        setFormData({
          ...formData,
          assetUrl: uploadedFile.url,
          fileSize: uploadedFile.bytes ? `${(uploadedFile.bytes / (1024 * 1024)).toFixed(2)} MB` : '',
        })
        toast.success('Asset file uploaded successfully')
      },
      onError: () => {
        toast.error('Failed to upload asset file')
      },
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.thumbnailUrl) {
      toast.error('Please upload a thumbnail image')
      return
    }

    if (!formData.assetUrl) {
      toast.error('Please upload an asset file')
      return
    }

    try {
      await updateAsset({
        id: assetId,
        data: {
          title: formData.title,
          description: formData.description,
          type: formData.type,
          project: formData.project,
          thumbnailUrl: formData.thumbnailUrl,
          assetUrl: formData.assetUrl,
          fileSize: formData.fileSize,
          status: formData.status,
        },
      }).unwrap()

      toast.success('Asset updated successfully')
      router.push('/admin/assets')
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update asset')
    }
  }

  if (loadingAsset) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 text-[#ff8c42] animate-spin" />
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">Edit Asset</h1>
          <p className="text-gray-400 mt-1">Update asset information</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Asset Thumbnail *</label>
            <p className="text-xs text-gray-400 mb-3">Preview image for asset card</p>
            {thumbnailPreview ? (
              <div className="relative inline-block w-full">
                <img
                  src={thumbnailPreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setThumbnailPreview('')
                    setFormData({ ...formData, thumbnailUrl: '' })
                  }}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleThumbnailUpload}
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/20 rounded-lg hover:bg-white/5 transition-colors"
              >
                <Upload className="w-10 h-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-400">Click to upload thumbnail</p>
                <p className="text-xs text-gray-500 mt-1">Powered by Cloudinary</p>
              </button>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">Asset File *</label>
            <p className="text-xs text-gray-400 mb-3">Upload the actual asset file</p>
            <div className="space-y-3">
              {formData.assetUrl && (
                <div className="flex items-center justify-between p-4 bg-black border border-white/10 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium">File uploaded</p>
                    <p className="text-xs text-gray-400 mt-1 truncate">{formData.assetUrl}</p>
                    {formData.fileSize && <p className="text-xs text-gray-500 mt-1">{formData.fileSize}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, assetUrl: '', fileSize: '' })}
                    className="ml-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              <button
                type="button"
                onClick={handleAssetUpload}
                className="flex items-center justify-center gap-2 w-full py-4 border-2 border-dashed border-white/20 rounded-lg hover:bg-white/5 transition-colors text-gray-400"
              >
                <Upload className="w-5 h-5" />
                <span className="text-sm">{formData.assetUrl ? 'Replace Asset File' : 'Upload Asset File'}</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Asset Title *</label>
              <input
                type="text"
                required
                minLength={3}
                maxLength={200}
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-lg text-white focus:border-[#ff8c42] focus:outline-none"
                placeholder="Swahili Warrior Character"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Asset Type *</label>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-lg text-white focus:border-[#ff8c42] focus:outline-none"
              >
                <option value="3D Model">3D Model</option>
                <option value="2D Asset">2D Asset</option>
                <option value="Audio">Audio</option>
                <option value="Video">Video</option>
                <option value="XR Asset">XR Asset</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Project Name *</label>
              <input
                type="text"
                required
                minLength={2}
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-lg text-white focus:border-[#ff8c42] focus:outline-none"
                placeholder="Swahili Legends"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Status *</label>
              <select
                required
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-lg text-white focus:border-[#ff8c42] focus:outline-none"
              >
                <option value="Draft">Draft</option>
                <option value="Active">Active</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">Description *</label>
            <textarea
              required
              rows={5}
              minLength={10}
              maxLength={2000}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-lg text-white focus:border-[#ff8c42] focus:outline-none"
              placeholder="Describe the asset... (minimum 10 characters)"
            />
            <p className="text-xs text-gray-500 mt-1">{formData.description.length} / 2000 characters</p>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-white/10">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 bg-[#ff8c42] text-black px-6 py-2.5 rounded-lg font-semibold hover:bg-[#ff7a2e] transition-all disabled:opacity-50"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              Update Asset
            </button>
            <button
              type="button"
              onClick={() => router.push('/admin/assets')}
              className="px-6 py-2.5 border border-white/10 text-white rounded-lg hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
