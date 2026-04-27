'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/admin/DashboardLayout'
import { Plus, Edit, Trash2, Eye, Search, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'
import { useGetAdminEventsQuery, useDeleteEventMutation } from '@/store/api/adminEventsApi'
import { toast } from 'sonner'
import Image from 'next/image'

const statusColors: Record<string, string> = {
  Published: 'bg-green-500/20 text-green-400',
  Draft: 'bg-gray-500/20 text-gray-400',
  Live: 'bg-blue-500/20 text-blue-400',
  Upcoming: 'bg-yellow-500/20 text-yellow-400',
}

export default function AdminEventsPage() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('')
  const { data, isLoading } = useGetAdminEventsQuery({ 
    page, 
    limit: 10, 
    search: search || undefined,
    category: category || undefined,
    status: status || undefined,
  })
  const [deleteEvent] = useDeleteEventMutation()

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return

    try {
      await deleteEvent(id).unwrap()
      toast.success('Event deleted successfully')
    } catch (error) {
      toast.error('Failed to delete event')
    }
  }

  const totalEvents = data?.pagination.totalItems || 0
  const liveEvents = data?.data.filter((e) => e.status === 'Live').length || 0
  const draftEvents = data?.data.filter((e) => e.status === 'Draft').length || 0

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Events</h1>
            <p className="text-gray-400 mt-1">Manage all gaming events</p>
          </div>
          <Link
            href="/admin/events/create"
            className="flex items-center gap-2 bg-[#ff8c42] text-black px-5 py-2.5 rounded-lg font-semibold hover:bg-[#ff7a2e] transition-all"
          >
            <Plus className="w-5 h-5" />
            Create Event
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5">
            <p className="text-gray-400 text-sm">Total Events</p>
            <p className="text-2xl font-bold text-white mt-1">{totalEvents}</p>
          </div>
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5">
            <p className="text-gray-400 text-sm">Live Events</p>
            <p className="text-2xl font-bold text-green-500 mt-1">{liveEvents}</p>
          </div>
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5">
            <p className="text-gray-400 text-sm">Draft Events</p>
            <p className="text-2xl font-bold text-yellow-500 mt-1">{draftEvents}</p>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search events..."
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
            value={category}
            onChange={(e) => {
              setCategory(e.target.value)
              setPage(1)
            }}
            className="px-4 py-2.5 bg-[#1a1a1a] border border-white/10 rounded-lg text-white focus:border-[#ff8c42] focus:outline-none"
          >
            <option value="">All Categories</option>
            <option value="Tournament">Tournament</option>
            <option value="Game Jam">Game Jam</option>
            <option value="Workshop">Workshop</option>
            <option value="VR / XR">VR / XR</option>
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
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
            <option value="Live">Live</option>
            <option value="Upcoming">Upcoming</option>
          </select>

          {(search || category || status) && (
            <button
              onClick={() => {
                setSearch('')
                setCategory('')
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
            <div className="text-center py-20 text-gray-400">Loading events...</div>
          ) : !data?.data.length ? (
            <div className="text-center py-20 text-gray-400">No events found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black border-b border-white/10">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Event</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Category</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Date</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Location</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Participants</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Status</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.map((event) => (
                    <tr key={event.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#ff8c42]/20">
                            {event.thumbnailUrl ? (
                              <Image
                                src={event.thumbnailUrl}
                                alt={event.title}
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
                            <p className="text-white font-semibold text-sm">{event.title}</p>
                            <p className="text-gray-400 text-xs">{event.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-300 text-sm">{event.category}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-300 text-sm">
                          {new Date(event.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-300 text-sm">{event.location}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[#ff8c42] font-semibold text-sm">
                          {event.participants}/{event.maxParticipants}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-3 py-1.5 rounded-full ${statusColors[event.status] || 'bg-gray-500/20 text-gray-400'}`}>
                          {event.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/events/${event.id}`}
                            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-all"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/admin/events/edit/${event.id}`}
                            className="p-2 text-gray-400 hover:text-[#ff8c42] hover:bg-[#ff8c42]/10 rounded transition-all"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(event.id, event.title)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded transition-all"
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
              Showing {((page - 1) * 10) + 1} to {Math.min(page * 10, data.pagination.totalItems)} of {data.pagination.totalItems} events
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
    </DashboardLayout>
  )
}
