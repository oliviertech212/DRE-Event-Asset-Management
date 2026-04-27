'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/admin/DashboardLayout'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'
import { openUploadWidget } from '@/lib/cloudinary'
import { toast } from 'sonner'
import { useCreateEventMutation } from '@/store/api/adminEventsApi'
import { useAppSelector } from '@/store/hooks'
import { z } from 'zod'

const eventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200, 'Title is too long'),
  description: z.string().min(20, 'Description must be at least 20 characters').max(5000, 'Description is too long'),
  category: z.string().min(1, 'Category is required'),
  date: z.string().min(1, 'Event date is required'),
  location: z.string().min(3, 'Location must be at least 3 characters'),
  maxParticipants: z.string().min(1, 'Max participants is required'),
  status: z.string().min(1, 'Status is required'),
  thumbnailUrl: z.string().url('Valid thumbnail URL is required').min(1, 'Thumbnail is required'),
  contactEmail: z.string().email('Valid email is required'),
  contactPhone: z.string().min(10, 'Phone must be at least 10 characters'),
  gallery: z.array(z.string()),
})

type EventFormData = z.infer<typeof eventSchema>

export default function CreateEventPage() {
  const router = useRouter()
  const user = useAppSelector((state) => state.auth.user)
  const [createEvent, { isLoading }] = useCreateEventMutation()
  const [imagePreview, setImagePreview] = useState('')
  const [galleryImages, setGalleryImages] = useState<string[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Tournament',
    date: '',
    location: '',
    maxParticipants: '',
    status: 'Draft',
    thumbnailUrl: '',
    gallery: [] as string[],
    contactEmail: user?.email || '',
    contactPhone: '',
  })

  const handleImageUpload = () => {
    openUploadWidget({
      multiple: false,
      maxFiles: 1,
      folder: 'events/thumbnails',
      onSuccess: (results) => {
        const uploadedImage = results[0]
        setFormData({ ...formData, thumbnailUrl: uploadedImage.url })
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
    setErrors({})

    try {
      const validatedData = eventSchema.parse(formData)

      await createEvent({
        title: validatedData.title,
        description: validatedData.description,
        category: validatedData.category,
        status: validatedData.status,
        date: validatedData.date,
        location: validatedData.location,
        thumbnailUrl: validatedData.thumbnailUrl,
        gallery: validatedData.gallery,
        maxParticipants: parseInt(validatedData.maxParticipants) || 100,
        contactEmail: validatedData.contactEmail,
        contactPhone: validatedData.contactPhone,
      }).unwrap()

      toast.success('Event created successfully')
      router.push('/admin/events')
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
        toast.error(error?.data?.message || 'Failed to create event')
      }
    }
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
                onClick={handleImageUpload}
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg hover:bg-white/5 transition-colors"
              >
                <Upload className="w-10 h-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-400">Click to upload event thumbnail</p>
                <p className="text-xs text-gray-500 mt-1">Powered by Cloudinary</p>
              </button>
            )}
            {errors.thumbnailUrl && <p className="text-red-500 text-xs mt-2">{errors.thumbnailUrl}</p>}
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
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={`w-full px-4 py-2.5 bg-black border rounded-lg text-white focus:outline-none ${
                  errors.title ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#ff8c42]'
                }`}
                placeholder="Swahili Esports Champions"
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={`w-full px-4 py-2.5 bg-black border rounded-lg text-white focus:outline-none ${
                  errors.category ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#ff8c42]'
                }`}
              >
                <option value="Tournament">Tournament</option>
                <option value="Game Jam">Game Jam</option>
                <option value="Workshop">Workshop</option>
                <option value="VR / XR">VR / XR</option>
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Event Date *</label>
              <div className="relative">
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className={`w-full px-4 py-2.5 bg-black border rounded-lg text-white focus:outline-none [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:brightness-50 [&::-webkit-calendar-picker-indicator]:cursor-pointer ${
                    errors.date ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#ff8c42]'
                  }`}
                />
              </div>
              {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Location *</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className={`w-full px-4 py-2.5 bg-black border rounded-lg text-white focus:outline-none ${
                  errors.location ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#ff8c42]'
                }`}
                placeholder="Kigali, Rwanda"
              />
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Max Participants *</label>
              <input
                type="number"
                min="1"
                max="10000"
                value={formData.maxParticipants}
                onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                className={`w-full px-4 py-2.5 bg-black border rounded-lg text-white focus:outline-none ${
                  errors.maxParticipants ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#ff8c42]'
                }`}
                placeholder="192"
              />
              {errors.maxParticipants && <p className="text-red-500 text-xs mt-1">{errors.maxParticipants}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Status *</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className={`w-full px-4 py-2.5 bg-black border rounded-lg text-white focus:outline-none ${
                  errors.status ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#ff8c42]'
                }`}
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
                <option value="Live">Live</option>
                <option value="Upcoming">Upcoming</option>
              </select>
              {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Contact Email *</label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className={`w-full px-4 py-2.5 bg-black border rounded-lg text-white focus:outline-none ${
                  errors.contactEmail ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#ff8c42]'
                }`}
                placeholder="events@digitalrealm.rw"
              />
              {errors.contactEmail && <p className="text-red-500 text-xs mt-1">{errors.contactEmail}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Contact Phone *</label>
              <input
                type="tel"
                minLength={10}
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                className={`w-full px-4 py-2.5 bg-black border rounded-lg text-white focus:outline-none ${
                  errors.contactPhone ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#ff8c42]'
                }`}
                placeholder="+250 788 123 456"
              />
              {errors.contactPhone && <p className="text-red-500 text-xs mt-1">{errors.contactPhone}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">Description *</label>
            <textarea
              rows={5}
              minLength={20}
              maxLength={5000}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`w-full px-4 py-2.5 bg-black border rounded-lg text-white focus:outline-none ${
                errors.description ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#ff8c42]'
              }`}
              placeholder="Describe the event... (minimum 20 characters)"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            <p className="text-xs text-gray-500 mt-1">{formData.description.length} / 5000 characters</p>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-white/10">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 bg-[#ff8c42] text-black px-6 py-2.5 rounded-lg font-semibold hover:bg-[#ff7a2e] transition-all disabled:opacity-50"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
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
