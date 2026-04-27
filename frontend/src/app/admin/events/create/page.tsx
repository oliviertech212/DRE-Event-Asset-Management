'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/admin/DashboardLayout'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'
import { openUploadWidget } from '@/lib/cloudinary'
import { toast } from 'sonner'

export default function CreateEventPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState('')
  const [galleryImages, setGalleryImages] = useState<string[]>([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Tournament',
    startDate: '',
    endDate: '',
    location: '',
    venue: '',
    maxParticipants: '',
    status: 'Draft',
    imageUrl: '',
    gallery: [] as string[],
  })

  const handleImageUpload = () => {
    openUploadWidget({
      multiple: false,
      maxFiles: 1,
      folder: 'events/thumbnails',
      onSuccess: (results) => {
        const uploadedImage = results[0]
        setFormData({ ...formData, imageUrl: uploadedImage.url })
        setImagePreview(uploadedImage.url)
        toast.success('Thumbnail uploaded successfully')
      },
      onError: () => {
        toast.error('Failed to upload thumbnail')
      },
    })
  }

  const handleGalleryUpload = () => {
    openUploadWidget({
      multiple: true,
      maxFiles: 10,
      folder: 'events/gallery',
      onSuccess: (results) => {
        const newImages = results.map((r) => r.url)
        const updatedGallery = [...galleryImages, ...newImages]
        setGalleryImages(updatedGallery)
        setFormData({ ...formData, gallery: updatedGallery })
        toast.success(`${results.length} image(s) uploaded successfully`)
      },
      onError: () => {
        toast.error('Failed to upload images')
      },
    })
  }

  const removeGalleryImage = (index: number) => {
    const updatedGallery = galleryImages.filter((_, i) => i !== index)
    setGalleryImages(updatedGallery)
    setFormData({ ...formData, gallery: updatedGallery })
    toast.success('Image removed')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    setTimeout(() => {
      toast.success('Event created successfully')
      router.push('/admin/events')
    }, 1000)
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">Create Event</h1>
          <p className="text-gray-400 mt-1">Add a new gaming event</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Event Thumbnail *</label>
            <p className="text-xs text-gray-400 mb-3">Main image for event card</p>
            {imagePreview ? (
              <div className="relative inline-block w-full">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview('')
                    setFormData({ ...formData, imageUrl: '' })
                  }}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleImageUpload}
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/20 rounded-lg hover:bg-white/5 transition-colors"
              >
                <Upload className="w-10 h-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-400">Click to upload event thumbnail</p>
                <p className="text-xs text-gray-500 mt-1">Powered by Cloudinary</p>
              </button>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">Gallery Images (Optional)</label>
            <p className="text-xs text-gray-400 mb-3">Additional images for event detail page</p>
            <div className="space-y-4">
              {galleryImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {galleryImages.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="absolute top-1 right-1 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <button
                type="button"
                onClick={handleGalleryUpload}
                className="flex items-center justify-center gap-2 w-full py-4 border-2 border-dashed border-white/20 rounded-lg hover:bg-white/5 transition-colors text-gray-400"
              >
                <ImageIcon className="w-5 h-5" />
                <span className="text-sm">
                  {galleryImages.length > 0 ? `Add More Images (${galleryImages.length} uploaded)` : 'Upload Gallery Images'}
                </span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Event Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-lg text-white focus:border-[#ff8c42] focus:outline-none"
                placeholder="Swahili Esports Champions"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Category *</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-lg text-white focus:border-[#ff8c42] focus:outline-none"
              >
                <option value="Tournament">Tournament</option>
                <option value="Game Jam">Game Jam</option>
                <option value="Workshop">Workshop</option>
                <option value="VR / XR">VR / XR</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Start Date *</label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-lg text-white focus:border-[#ff8c42] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">End Date *</label>
              <input
                type="date"
                required
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-lg text-white focus:border-[#ff8c42] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Location *</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-lg text-white focus:border-[#ff8c42] focus:outline-none"
                placeholder="Kigali, Rwanda"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Venue *</label>
              <input
                type="text"
                required
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-lg text-white focus:border-[#ff8c42] focus:outline-none"
                placeholder="Kigali Convention Centre"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Max Participants</label>
              <input
                type="number"
                value={formData.maxParticipants}
                onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-lg text-white focus:border-[#ff8c42] focus:outline-none"
                placeholder="192"
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
                <option value="Published">Published</option>
                <option value="Live">Live</option>
                <option value="Upcoming">Upcoming</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">Description *</label>
            <textarea
              required
              rows={5}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-lg text-white focus:border-[#ff8c42] focus:outline-none"
              placeholder="Describe the event..."
            />
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-white/10">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-[#ff8c42] text-black px-6 py-2.5 rounded-lg font-semibold hover:bg-[#ff7a2e] transition-all disabled:opacity-50"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Create Event
            </button>
            <button
              type="button"
              onClick={() => router.push('/admin/events')}
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
