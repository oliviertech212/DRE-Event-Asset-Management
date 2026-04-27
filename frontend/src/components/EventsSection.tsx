'use client'

import { Search, Calendar, MapPin, Users } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { useGetEventsQuery } from '@/store/api/eventsApi'

const categories = ['All', 'Tournament', 'Game Jam', 'Workshop', 'VR / XR']

const statusColors: Record<string, string> = {
  Published: 'bg-green-500',
  Draft: 'bg-gray-500',
  Live: 'bg-blue-500',
  Upcoming: 'bg-yellow-500',
}

export default function EventsSection() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [page, setPage] = useState(1)

  const { data, isLoading } = useGetEventsQuery({
    page,
    limit: 8,
    category: category === 'All' ? undefined : category,
    search: search || undefined,
  })

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 w-full bg-black py-20"
    >
      <div className="absolute inset-0 bg-black/90 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-gray-500 focus:border-[#ff8c42] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2.5 rounded-lg font-semibold transition-all ${
                  category === cat
                    ? 'bg-[#ff8c42] text-black'
                    : 'bg-[#1a1a1a] border border-white/10 text-gray-400 hover:border-[#ff8c42] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold text-gray-400 mb-8 tracking-wider"
        >
          UPCOMING & LIVE EVENTS
        </motion.h2>

        {isLoading ? (
          <div className="text-center py-20 text-gray-400">Loading events...</div>
        ) : !data?.data.length ? (
          <div className="text-center py-20 text-gray-400">No events found</div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-6">
              {data.data.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    href={`/events/${event.id}`}
                    className="group bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-[#ff8c42]/50 transition-all block"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={event.thumbnailUrl}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[#ff8c42] text-xs font-semibold tracking-wider">
                          {event.category.toUpperCase()}
                        </span>
                        <span
                          className={`${
                            statusColors[event.status] || 'bg-gray-500'
                          } text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5`}
                        >
                          <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                          {event.status}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white group-hover:text-[#ff8c42] transition-colors">
                        {event.title}
                      </h3>

                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {new Date(event.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Users className="w-4 h-4" />
                          <span>
                            Participants:{' '}
                            <span className="text-[#ff8c42] font-semibold">
                              {event.participants}/{event.maxParticipants}
                            </span>
                          </span>
                        </div>
                        <span className="text-[#ff8c42] text-sm font-semibold group-hover:translate-x-1 transition-transform">
                          View details →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {data.pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-[#1a1a1a] border border-white/10 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#ff8c42] transition-all"
                >
                  Previous
                </button>
                <span className="text-gray-400">
                  Page {page} of {data.pagination.totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(data.pagination.totalPages, p + 1))}
                  disabled={page === data.pagination.totalPages}
                  className="px-4 py-2 bg-[#1a1a1a] border border-white/10 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#ff8c42] transition-all"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </motion.section>
  )
}
