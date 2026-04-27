'use client'

import { Search, Gamepad2, Calendar, MapPin, Users } from 'lucide-react'
import Link from 'next/link'

const events = [
  {
    id: 'evt-2026-003',
    title: 'Swahili Esports Champions Season 3',
    category: 'ESPORTS TOURNAMENT',
    status: 'Live',
    statusColor: 'bg-green-500',
    date: 'Jun 25 — 29, 2026',
    location: 'Kigali',
    participants: 128,
    gradient: 'from-purple-900/40 to-purple-600/20',
    icon: '🎮'
  },
  {
    id: 'evt-2026-004',
    title: 'Game Jam Kigali 2026 — African Worlds',
    category: 'GAME JAM',
    status: 'Upcoming',
    statusColor: 'bg-blue-500',
    date: 'Jul 12 — 14, 2026',
    location: 'Kigali',
    participants: 64,
    gradient: 'from-teal-900/40 to-teal-600/20',
    icon: '🕹️'
  },
  {
    id: 'evt-2026-005',
    title: 'WPGA Conference — Immersive Africa',
    category: 'VR / XR EXPERIENCE',
    status: 'Published',
    statusColor: 'bg-yellow-500',
    date: 'Aug 3, 2026',
    location: 'Nairobi',
    participants: 200,
    gradient: 'from-green-900/40 to-green-700/20',
    icon: '🥽'
  },
  {
    id: 'evt-2026-006',
    title: 'Game Dev Bootcamp — Unity for Africa',
    category: 'WORKSHOP',
    status: 'Draft',
    statusColor: 'bg-gray-500',
    date: 'Sep 5 — 7, 2026',
    location: 'Online',
    participants: 40,
    gradient: 'from-orange-900/40 to-orange-700/20',
    icon: '🎨'
  }
]

export default function EventsSection() {
  return (
    <section className="relative z-10 bg-black py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search events, assets..."
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-gray-500 focus:border-[#ff8c42] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button className="px-5 py-2.5 bg-[#ff8c42] text-black font-semibold rounded-lg">
              All
            </button>
            <button className="px-5 py-2.5 bg-[#1a1a1a] border border-white/10 text-gray-400 rounded-lg hover:border-[#ff8c42] hover:text-white transition-all">
              Tournament
            </button>
            <button className="px-5 py-2.5 bg-[#1a1a1a] border border-white/10 text-gray-400 rounded-lg hover:border-[#ff8c42] hover:text-white transition-all">
              Game Jam
            </button>
            <button className="px-5 py-2.5 bg-[#1a1a1a] border border-white/10 text-gray-400 rounded-lg hover:border-[#ff8c42] hover:text-white transition-all">
              Workshop
            </button>
            <button className="px-5 py-2.5 bg-[#1a1a1a] border border-white/10 text-gray-400 rounded-lg hover:border-[#ff8c42] hover:text-white transition-all">
              VR / XR
            </button>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-400 mb-8 tracking-wider">UPCOMING & LIVE EVENTS</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="group bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-[#ff8c42]/50 transition-all"
            >
              <div className={`h-48 bg-gradient-to-br ${event.gradient} flex items-center justify-center text-6xl`}>
                {event.icon}
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#ff8c42] text-xs font-semibold tracking-wider">
                    {event.category}
                  </span>
                  <span className={`${event.statusColor} text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5`}>
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
                    {event.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>Participants: <span className="text-[#ff8c42] font-semibold">{event.participants}</span></span>
                  </div>
                  <span className="text-[#ff8c42] text-sm font-semibold group-hover:translate-x-1 transition-transform">
                    View details →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
