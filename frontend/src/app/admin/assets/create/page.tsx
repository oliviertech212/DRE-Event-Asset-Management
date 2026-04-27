'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/admin/DashboardLayout'
import { Upload, X, Loader2 } from 'lucide-react'
import { openUploadWidget } from '@/lib/cloudinary'
import { toast } from 'sonner'

export default function CreateAssetPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [thumbnailPreview, setThumbnailPreview] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '3D Model',
    project: '',
    fileSize: '',
    status: 'Draft',
    thumbnailUrl: '',
    assetUrl: '',
  })

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
    })
  }

  const handleAssetUpload = () => {
    openUploadWidget({
      multiple: false,
      maxFiles: 1,
      folder: 'assets/files',
      onSuccess: (results) => {
        const uploadedFile = results[0]
        setFormData({ ...formData, assetUrl: uploadedFile.url })
        toast.success('Asset file uploaded successfully')
      },
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    setTimeout(() => {
      toast.success('Asset created successfully')
      router.push('/admin/assets')
    }, 1000)
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">Add Asset</h1>
          <p className="text-gray-400 mt-1">Upload a new digital asset</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Asset Thumbnail *</label>
            {thumbnailPreview ? (
              <div className="relative inline-block w-full">
                <img
                  src={thumbnailPreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
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
                className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-white/20 rounded-lg hover:bg-white/5 transition-colors"
              >
                <Upload className="w-10 h-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-400">Click to upload thumbnail</p>
                <p className="text-xs text-gray-500 mt-1">Powered by Cloudinary</p>
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Asset Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-lg text-white focus:border-[#ff8c42] focus:outline-none"
                placeholder="Warrior Character Pack"
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
                <option value="XR Asset">XR Asset</option>
                <option value="UI Kit">UI Kit</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Project *</label>
              <input
                type="text"
                required
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-lg text-white focus:border-[#ff8c42] focus:outline-none"
                placeholder="Pixel Realm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">File Size</label>
              <input
                type="text"
                value={formData.fileSize}
                onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-lg text-white focus:border-[#ff8c42] focus:outline-none"
                placeholder="124 MB"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-white mb-2">Status *</label>
              <select
                required
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-lg text-white focus:border-[#ff8c42] focus:outline-none"
              >
                <option value="Draft">Draft</option>
                <option value="Active">Active</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">Description *</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-lg text-white focus:border-[#ff8c42] focus:outline-none"
              placeholder="Describe the asset..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">Asset File (Optional)</label>
            <button
              type="button"
              onClick={handleAssetUpload}
              className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-white/20 rounded-lg hover:bg-white/5 transition-colors w-full justify-center"
            >
              <Upload className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-400">
                {formData.assetUrl ? 'File Uploaded ✓' : 'Upload Asset File'}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-white/10">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-[#ff8c42] text-black px-6 py-2.5 rounded-lg font-semibold hover:bg-[#ff7a2e] transition-all disabled:opacity-50"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Create Asset
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
