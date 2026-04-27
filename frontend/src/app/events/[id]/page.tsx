'use client'

import { ArrowLeft, Calendar, MapPin, Users, Clock, Mail, Phone, Globe } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'

const eventData: Record<string, any> = {
  'evt-2026-003': {
    title: 'Swahili Esports Champions Season 3',
    category: 'Esports tournament',
    status: 'Live',
    statusColor: 'bg-green-500',
    startDate: 'Jun 25, 2026',
    endDate: 'Jun 29, 2026',
    time: '10:00 AM - 6:00 PM',
    location: 'Kigali Convention Centre',
    address: 'KN 4 Ave, Kigali, Rwanda',
    gameType: 'Real-Time Strategy',
    description: "Africa's premier esports championship returns for Season 3, featuring the best players across East and Central Africa competing in real-time strategy games. Hosted in Kigali, Rwanda — the heart of Africa's rising gaming scene.",
    fullDescription: "Join us for the most anticipated esports event in East Africa! The Swahili Esports Champions Season 3 brings together the region's top gaming talent for an unforgettable tournament experience. Watch as elite players battle it out in intense real-time strategy matches, with live commentary, professional production, and exciting prizes. Whether you're a hardcore gamer or just curious about the esports scene, this event promises entertainment, community, and the celebration of African gaming culture.",
    participants: 128,
    capacity: 192,
    eventId: 'EVT-2026-003',
    createdBy: 'Olivier G.',
    createdAt: 'Apr 20, 2026',
    lastUpdated: 'Apr 25, 2026',
    email: 'events@digitalrealm.rw',
    phone: '+250 788 123 456',
    website: 'https://digitalrealm-entertainment.com',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80',
      'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&q=80',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80',
    ],
    gradient: 'from-purple-900/40 to-purple-600/20'
  },
  'evt-2026-004': {
    title: 'Game Jam Kigali 2026 — African Worlds',
    category: 'Game Jam',
    status: 'Upcoming',
    statusColor: 'bg-blue-500',
    startDate: 'Jul 12, 2026',
    endDate: 'Jul 14, 2026',
    time: '9:00 AM - 9:00 PM',
    location: 'Impact Hub Kigali',
    address: 'Norrsken House, KG 7 Ave, Kigali',
    gameType: 'Game Development',
    description: "A 48-hour game development marathon where creators build games inspired by African stories, culture, and innovation. Teams compete for prizes while learning from industry mentors.",
    fullDescription: "Game Jam Kigali 2026 is where creativity meets culture! Over 48 intense hours, developers, artists, designers, and storytellers will collaborate to create unique games that celebrate African narratives. With workshops, mentorship sessions, and networking opportunities, this jam is perfect for both beginners and experienced developers. Join us to push your creative boundaries, learn new skills, and be part of a movement that's putting African game development on the global map.",
    participants: 64,
    capacity: 80,
    eventId: 'EVT-2026-004',
    createdBy: 'Sarah M.',
    createdAt: 'May 10, 2026',
    lastUpdated: 'May 15, 2026',
    email: 'gamejam@digitalrealm.rw',
    phone: '+250 788 456 789',
    website: 'https://gamejam.digitalrealm.rw',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80',
      'https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
    ],
    gradient: 'from-teal-900/40 to-teal-600/20'
  }
}

export default function EventDetailPage() {
  const params = useParams()
  const eventId = params.id as string
  const event = eventData[eventId] || eventData['evt-2026-003']

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
            src={event.imageUrl}
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
              <span className={`${event.statusColor} text-white text-sm px-4 py-2 rounded-full flex items-center gap-2`}>
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
                <span>{event.startDate} — {event.endDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#ff8c42]" />
                <span>{event.time}</span>
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
                <p className="text-gray-300 leading-relaxed mb-4">{event.description}</p>
                <p className="text-gray-400 leading-relaxed">{event.fullDescription}</p>
              </motion.div>

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
                      whileInView={{ width: `${(event.participants / event.capacity) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="absolute inset-y-0 left-0 bg-[#ff8c42] rounded-full"
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
                    { name: 'Shiva Muramutsa', team: 'Team Pixel Realm', location: 'Rwanda', status: 'Pending', initials: 'SM' },
                    { name: 'Amara Okafor', team: 'Team Lagos Lions', location: 'Nigeria', status: 'Confirmed', initials: 'AO' }
                  ].map((participant, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-xl hover:bg-[#0a0a0a]/50 transition-colors"
                    >
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
                    </motion.div>
                  ))}
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
                    <p className="text-gray-400 text-sm">{event.address}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Date & Time</p>
                    <p className="text-white font-semibold">{event.startDate} — {event.endDate}</p>
                    <p className="text-gray-400 text-sm">{event.time}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Category</p>
                    <p className="text-white font-semibold">{event.gameType}</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                  <h4 className="text-sm font-semibold text-gray-400 mb-3">CONTACT</h4>
                  <a href={`mailto:${event.email}`} className="flex items-center gap-3 text-gray-300 hover:text-[#ff8c42] transition-colors">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{event.email}</span>
                  </a>
                  <a href={`tel:${event.phone}`} className="flex items-center gap-3 text-gray-300 hover:text-[#ff8c42] transition-colors">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{event.phone}</span>
                  </a>
                  <a href={event.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-[#ff8c42] transition-colors">
                    <Globe className="w-4 h-4" />
                    <span className="text-sm">Visit Website</span>
                  </a>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-gray-500 text-xs mb-1">Event ID</p>
                  <p className="text-white font-mono text-sm">{event.eventId}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
