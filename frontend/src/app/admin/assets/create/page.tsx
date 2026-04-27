'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/admin/DashboardLayout'
import { Upload, X, Loader2 } from 'lucide-react'
import { openUploadWidget } from '@/lib/cloudinary'
import { toast } from 'sonner'
import { useCreateAssetMutation } from '@/store/api/adminAssetsApi'
import { z } from 'zod'

const assetSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200, 'Title is too long'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(2000, 'Description is too long'),
  type: z.string().min(1, 'Type is required'),
  project: z.string().min(2, 'Project name must be at least 2 characters'),
  thumbnailUrl: z.string().url('Valid thumbnail URL is required').min(1, 'Thumbnail is required'),
  assetUrl: z.string().optional(),
  fileSize: z.string().optional(),
  status: z.string().min(1, 'Status is required'),
})

export default function CreateAssetPage() {
  const router = useRouter()
  const [createAsset, { isLoading }] = useCreateAssetMutation()
  const [thumbnailPreview, setThumbnailPreview] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
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
        setFormData({ ...formData, assetUrl: uploadedFile.url })
        toast.success('Asset file uploaded successfully')
      },
      onError: () => {
        toast.error('Failed to upload asset file')
      },
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    try {
      const validatedData = assetSchema.parse(formData)

      await createAsset({
        title: validatedData.title,
        description: validatedData.description,
        type: validatedData.type,
        project: validatedData.project,
        thumbnailUrl: validatedData.thumbnailUrl,
        assetUrl: validatedData.assetUrl || '',
        fileSize: validatedData.fileSize || '',
        status: validatedData.status,
      }).unwrap()

      toast.success('Asset created successfully')
      router.push('/admin/assets')
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {}
        error.issues.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message
          }
        })
        setErrors(fieldErrors)
        toast.error('Please fix the validation errors')
      } else {
        toast.error(error?.data?.message || 'Failed to create asset')
      }
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
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
            {errors.thumbnailUrl && <p className="text-red-500 text-xs mt-2">{errors.thumbnailUrl}</p>}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Asset Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={`w-full px-4 py-2.5 bg-black border rounded-lg text-white focus:outline-none ${
                  errors.title ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#ff8c42]'
                }`}
                placeholder="Warrior Character Pack"
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Asset Type *</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className={`w-full px-4 py-2.5 bg-black border rounded-lg text-white focus:outline-none ${
                  errors.type ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#ff8c42]'
                }`}
              >
                <option value="3D Model">3D Model</option>
                <option value="2D Asset">2D Asset</option>
                <option value="Audio">Audio</option>
                <option value="Video">Video</option>
                <option value="XR Asset">XR Asset</option>
              </select>
              {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Project *</label>
              <input
                type="text"
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                className={`w-full px-4 py-2.5 bg-black border rounded-lg text-white focus:outline-none ${
                  errors.project ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#ff8c42]'
                }`}
                placeholder="Pixel Realm"
              />
              {errors.project && <p className="text-red-500 text-xs mt-1">{errors.project}</p>}
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
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className={`w-full px-4 py-2.5 bg-black border rounded-lg text-white focus:outline-none ${
                  errors.status ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#ff8c42]'
                }`}
              >
                <option value="Draft">Draft</option>
                <option value="Active">Active</option>
                <option value="Archived">Archived</option>
              </select>
              {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">Description *</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`w-full px-4 py-2.5 bg-black border rounded-lg text-white focus:outline-none ${
                errors.description ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#ff8c42]'
              }`}
              placeholder="Describe the asset... (minimum 10 characters)"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            <p className="text-xs text-gray-500 mt-1">{formData.description.length} / 2000 characters</p>
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
              disabled={isLoading}
              className="flex items-center gap-2 bg-[#ff8c42] text-black px-6 py-2.5 rounded-lg font-semibold hover:bg-[#ff7a2e] transition-all disabled:opacity-50"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
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
