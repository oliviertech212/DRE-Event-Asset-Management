'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import DashboardLayout from '@/components/admin/DashboardLayout'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'
import { openUploadWidget } from '@/lib/cloudinary'
import { toast } from 'sonner'
import { useUpdateEventMutation } from '@/store/api/adminEventsApi'
import { useGetEventByIdQuery } from '@/store/api/eventsApi'

export default function EditEventPage() {
  const router = useRouter()
  const params = useParams()
  const eventId = params.id as string
  const { data: event, isLoading: loadingEvent } = useGetEventByIdQuery(eventId)
  const [updateEvent, { isLoading }] = useUpdateEventMutation()
  const [imagePreview, setImagePreview] = useState('')
  const [galleryImages, setGalleryImages] = useState<string[]>([])
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
    contactEmail: '',
    contactPhone: '',
  })

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description,
        category: event.category,
        date: event.date?.split('T')[0] || '',
        location: event.location,
        maxParticipants: event.maxParticipants.toString(),
        status: event.status,
        thumbnailUrl: event.thumbnailUrl,
        gallery: event.gallery || [],
        contactEmail: event.contactEmail,
        contactPhone: event.contactPhone,
      })
      setImagePreview(event.thumbnailUrl)
      setGalleryImages(event.gallery || [])
    }
  }, [event])

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

    if (!formData.thumbnailUrl) {
      toast.error('Please upload a thumbnail image')
      return
    }

    if (!formData.date) {
      toast.error('Please select an event date')
      return
    }

    try {
      await updateEvent({
        id: eventId,
        data: {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          status: formData.status,
          date: formData.date,
          location: formData.location,
          thumbnailUrl: formData.thumbnailUrl,
          gallery: formData.gallery,
          maxParticipants: parseInt(formData.maxParticipants) || 100,
          contactEmail: formData.contactEmail,
          contactPhone: formData.contactPhone,
        },
      }).unwrap()

      toast.success('Event updated successfully')
      router.push('/admin/events')
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update event')
    }
  }

  if (loadingEvent) {
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
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">Edit Event</h1>
          <p className="text-gray-400 mt-1">Update event information</p>
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
              <label className="block text-sm font-semibold text-white mb-2">Event Date *</label>
              <div className="relative">
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-lg text-white focus:border-[#ff8c42] focus:outline-none [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:brightness-50 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                />
              </div>
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
              <label className="block text-sm font-semibold text-white mb-2">Max Participants *</label>
              <input
                type="number"
                required
                min="1"
                max="10000"
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

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Contact Email *</label>
              <input
                type="email"
                required
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-lg text-white focus:border-[#ff8c42] focus:outline-none"
                placeholder="events@digitalrealm.rw"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Contact Phone *</label>
              <input
                type="tel"
                required
                minLength={10}
                pattern="[0-9+\s()-]+"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-lg text-white focus:border-[#ff8c42] focus:outline-none"
                placeholder="+250 788 123 456"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">Description *</label>
            <textarea
              required
              rows={5}
              minLength={20}
              maxLength={5000}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-lg text-white focus:border-[#ff8c42] focus:outline-none"
              placeholder="Describe the event... (minimum 20 characters)"
            />
            <p className="text-xs text-gray-500 mt-1">{formData.description.length} / 5000 characters</p>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-white/10">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 bg-[#ff8c42] text-black px-6 py-2.5 rounded-lg font-semibold hover:bg-[#ff7a2e] transition-all disabled:opacity-50"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              Update Event
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
