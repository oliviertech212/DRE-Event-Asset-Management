'use client'

import DashboardLayout from '@/components/admin/DashboardLayout'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import Link from 'next/link'

const events = [
  {
    id: 'evt-2026-003',
    title: 'Swahili Esports Champions Season 3',
    category: 'Tournament',
    status: 'Live',
    date: 'Jun 25 — 29, 2026',
    location: 'Kigali',
    participants: 128,
    imageUrl: '🎮'
  },
  {
    id: 'evt-2026-004',
    title: 'Game Jam Kigali 2026',
    category: 'Game Jam',
    status: 'Upcoming',
    date: 'Jul 12 — 14, 2026',
    location: 'Kigali',
    participants: 64,
    imageUrl: '🕹️'
  },
]

export default function AdminEventsPage() {
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
            <p className="text-2xl font-bold text-white mt-1">24</p>
          </div>
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5">
            <p className="text-gray-400 text-sm">Live Events</p>
            <p className="text-2xl font-bold text-green-500 mt-1">3</p>
          </div>
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5">
            <p className="text-gray-400 text-sm">Draft Events</p>
            <p className="text-2xl font-bold text-yellow-500 mt-1">5</p>
          </div>
        </div>

        <div className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden">
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
                {events.map((event) => (
                  <tr key={event.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center text-xl">
                          {event.imageUrl}
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
                      <span className="text-gray-300 text-sm">{event.date}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-300 text-sm">{event.location}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[#ff8c42] font-semibold text-sm">{event.participants}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-3 py-1.5 rounded-full ${
                        event.status === 'Live' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
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
                        <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
