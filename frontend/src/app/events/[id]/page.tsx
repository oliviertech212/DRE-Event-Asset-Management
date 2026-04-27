'use client'

import { ArrowLeft, Calendar, MapPin, Users, Gamepad2 } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const eventData: Record<string, any> = {
  'evt-2026-003': {
    title: 'Swahili Esports Champions Season 3',
    category: 'Esports tournament',
    status: 'Live',
    statusColor: 'bg-green-500',
    startDate: 'Jun 25, 2026',
    endDate: 'Jun 29, 2026',
    location: 'Kigali Convention Centre',
    gameType: 'Real-Time Strategy',
    description: "Africa's premier esports championship returns for Season 3, featuring the best players across East and Central Africa competing in real-time strategy games. Hosted in Kigali, Rwanda — the heart of Africa's rising gaming scene.",
    participants: 128,
    capacity: 192,
    eventId: 'EVT-2026-003',
    createdBy: 'Olivier G.',
    createdAt: 'Apr 20, 2026',
    lastUpdated: 'Apr 25, 2026',
    icon: '🎮',
    gradient: 'from-purple-900/40 to-purple-600/20'
  }
}

export default function EventDetailPage() {
  const params = useParams()
  const eventId = params.id as string
  const event = eventData[eventId] || eventData['evt-2026-003']

  return (
    <div className="min-h-screen bg-black">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
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

      <div className="pt-24 pb-12">
        <div className={`h-64 bg-gradient-to-br ${event.gradient} flex items-center justify-center text-8xl border-b border-white/10`}>
          {event.icon}
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-6">
            <span className={`${event.statusColor} text-white text-sm px-4 py-2 rounded-full flex items-center gap-2`}>
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              {event.status} now
            </span>
            <span className="bg-[#ff8c42]/20 text-[#ff8c42] text-sm px-4 py-2 rounded-full">
              {event.category}
            </span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            {event.title}
          </h1>

          <p className="text-gray-400 text-lg mb-12">
            {event.startDate} — {event.endDate} · {event.location} · {event.gameType}
          </p>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Event details</h2>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <p className="text-gray-500 text-sm mb-2">TITLE</p>
                    <p className="text-white font-semibold">{event.title}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-2">CATEGORY</p>
                    <p className="text-white font-semibold">{event.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-2">START DATE</p>
                    <p className="text-white font-semibold">{event.startDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-2">END DATE</p>
                    <p className="text-white font-semibold">{event.endDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-2">LOCATION</p>
                    <p className="text-white font-semibold">{event.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-2">STATUS</p>
                    <p className="text-white font-semibold">{event.status}</p>
                  </div>
                </div>

                <div>
                  <p className="text-gray-500 text-sm mb-3">DESCRIPTION</p>
                  <p className="text-gray-300 leading-relaxed">{event.description}</p>
                </div>
              </div>

              <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Participants ({event.participants} registered)
                </h2>

                <div className="mb-6">
                  <p className="text-gray-500 text-sm mb-3">REGISTRATION CAPACITY</p>
                  <div className="relative h-3 bg-[#0a0a0a] rounded-full overflow-hidden">
                    <div 
                      className="absolute inset-y-0 left-0 bg-[#ff8c42] rounded-full"
                      style={{ width: `${(event.participants / event.capacity) * 100}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    {event.participants} / {event.capacity} registered
                    <span className="text-[#ff8c42] ml-2 font-semibold">
                      {Math.round((event.participants / event.capacity) * 100)}%
                    </span>
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { name: 'Elcid Kariuki', team: 'Team Neon Cave', location: 'Kenya', status: 'Confirmed', initials: 'EK' },
                    { name: 'Shiva Muramutsa', team: 'Team Pixel Realm', location: 'Rwanda', status: 'Pending', initials: 'SM' }
                  ].map((participant, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#ff8c42] rounded-full flex items-center justify-center text-black font-bold">
                          {participant.initials}
                        </div>
                        <div>
                          <p className="text-white font-semibold">{participant.name}</p>
                          <p className="text-sm text-gray-400">{participant.team} · {participant.location}</p>
                        </div>
                      </div>
                      <span className={`text-xs px-3 py-1.5 rounded-full ${
                        participant.status === 'Confirmed' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {participant.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Quick info</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Created by</p>
                    <p className="text-white font-semibold">{event.createdBy}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Created at</p>
                    <p className="text-white font-semibold">{event.createdAt}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Last updated</p>
                    <p className="text-white font-semibold">{event.lastUpdated}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Event ID</p>
                    <p className="text-white font-semibold font-mono text-sm">{event.eventId}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
