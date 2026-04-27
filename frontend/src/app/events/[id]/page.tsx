'use client'

import { ArrowLeft, Calendar, MapPin, Clock, Mail, Phone, Globe } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useGetEventByIdQuery } from '@/store/api/eventsApi'

const statusColors: Record<string, string> = {
  Published: 'bg-green-500',
  Draft: 'bg-gray-500',
  Live: 'bg-blue-500',
  Upcoming: 'bg-yellow-500',
}

export default function EventDetailPage() {
  const params = useParams()
  const eventId = params.id as string
  const { data: event, isLoading, error } = useGetEventByIdQuery(eventId)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-gray-400 text-xl">Loading event...</div>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-xl mb-4">Event not found</div>
          <Link href="/" className="text-[#ff8c42] hover:underline">
            Back to events
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to events
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-[#ff8c42] font-bold">Realm</span>
            <span className="text-white font-bold">Games</span>
          </div>
        </div>
      </nav>

      <div className="pt-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative h-[500px] overflow-hidden"
        >
          <Image
            src={event.thumbnailUrl}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className={`${statusColors[event.status] || 'bg-gray-500'} text-white text-sm px-4 py-2 rounded-full flex items-center gap-2`}>
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                {event.status}
              </span>
              <span className="bg-[#ff8c42]/20 text-[#ff8c42] text-sm px-4 py-2 rounded-full backdrop-blur-sm">
                {event.category}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl lg:text-6xl font-bold text-white mb-4"
            >
              {event.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-6 text-gray-300"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#ff8c42]" />
                <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#ff8c42]" />
                <span>{event.location}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8"
              >
                <h2 className="text-2xl font-bold text-white mb-4">About this event</h2>
                <p className="text-gray-300 leading-relaxed">{event.description}</p>
              </motion.div>

              {event.gallery && event.gallery.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Event Gallery</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {event.gallery.map((img: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="relative h-48 rounded-xl overflow-hidden group cursor-pointer"
                      >
                        <Image
                          src={img}
                          alt={`Gallery ${index + 1}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8"
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  Participants ({event.participants} registered)
                </h2>

                <div className="mb-6">
                  <p className="text-gray-500 text-sm mb-3">REGISTRATION CAPACITY</p>
                  <div className="relative h-3 bg-[#0a0a0a] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="absolute inset-y-0 left-0 bg-[#ff8c42] rounded-full"
                    />
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    {event.participants} / {event.maxParticipants} registered
                    <span className="text-[#ff8c42] ml-2 font-semibold">
                      {Math.round((event.participants / event.maxParticipants) * 100)}%
                    </span>
                  </p>
                </div>

             
              </motion.div>
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 sticky top-24"
              >
                <h3 className="text-xl font-bold text-white mb-6">Event Details</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Location</p>
                    <p className="text-white font-semibold">{event.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Date</p>
                    <p className="text-white font-semibold">{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Category</p>
                    <p className="text-white font-semibold">{event.category}</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                  <h4 className="text-sm font-semibold text-gray-400 mb-3">CONTACT</h4>
                  <a href={`mailto:${event.contactEmail}`} className="flex items-center gap-3 text-gray-300 hover:text-[#ff8c42] transition-colors">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{event.contactEmail}</span>
                  </a>
                  <a href={`tel:${event.contactPhone}`} className="flex items-center gap-3 text-gray-300 hover:text-[#ff8c42] transition-colors">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{event.contactPhone}</span>
                  </a>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-gray-500 text-xs mb-1">Event ID</p>
                  <p className="text-white font-mono text-sm">{event.id}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
