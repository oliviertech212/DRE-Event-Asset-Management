'use client'

import DashboardLayout from '@/components/admin/DashboardLayout'
import { Calendar, Package, Users, TrendingUp, Eye } from 'lucide-react'
import { useGetAdminEventsQuery } from '@/store/api/adminEventsApi'
import { useGetAdminAssetsQuery } from '@/store/api/adminAssetsApi'
import Link from 'next/link'
import Image from 'next/image'

export default function AdminDashboardPage() {
  const { data: eventsData } = useGetAdminEventsQuery({ page: 1, limit: 5 })
  const { data: assetsData } = useGetAdminAssetsQuery({ page: 1, limit: 5 })

  const totalEvents = eventsData?.pagination.totalItems || 0
  const totalAssets = assetsData?.pagination.totalItems || 0
  const liveEvents = eventsData?.data.filter((e) => e.status === 'Live').length || 0
  const totalParticipants = eventsData?.data.reduce((sum, e) => sum + (e.participants || 0), 0) || 0

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome to Digital Realm Admin</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#ff8c42]/20 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-[#ff8c42]" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-gray-400 text-sm">Total Events</p>
            <p className="text-3xl font-bold text-white mt-1">{totalEvents}</p>
            <Link href="/admin/events" className="text-xs text-[#ff8c42] mt-2 inline-block hover:underline">View all events</Link>
          </div>

          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#ff8c42]/20 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-[#ff8c42]" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-gray-400 text-sm">Digital Assets</p>
            <p className="text-3xl font-bold text-white mt-1">{totalAssets}</p>
            <Link href="/admin/assets" className="text-xs text-[#ff8c42] mt-2 inline-block hover:underline">View all assets</Link>
          </div>

          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#ff8c42]/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-[#ff8c42]" />
              </div>
            </div>
            <p className="text-gray-400 text-sm">Participants</p>
            <p className="text-3xl font-bold text-white mt-1">{totalParticipants}</p>
            <p className="text-xs text-gray-500 mt-2">Across all events</p>
          </div>

          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <p className="text-gray-400 text-sm">Live Events</p>
            <p className="text-3xl font-bold text-white mt-1">{liveEvents}</p>
            <p className="text-xs text-gray-500 mt-2">Currently active</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Recent Events</h3>
              <Link href="/admin/events" className="text-sm text-[#ff8c42] hover:underline">View all</Link>
            </div>
            <div className="space-y-3">
              {eventsData?.data.slice(0, 5).map((event) => (
                <Link key={event.id} href={`/admin/events/edit/${event.id}`} className="flex items-center gap-4 p-3 bg-[#0a0a0a] rounded-lg hover:bg-white/5 transition-all">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#ff8c42]/20">
                    {event.thumbnailUrl ? (
                      <Image
                        src={event.thumbnailUrl}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">🎮</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm truncate">{event.title}</p>
                    <p className="text-gray-400 text-xs">{new Date(event.date).toLocaleDateString()} · {event.location}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                    event.status === 'Live' ? 'bg-green-500/20 text-green-400' :
                    event.status === 'Published' ? 'bg-blue-500/20 text-blue-400' :
                    event.status === 'Upcoming' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>{event.status}</span>
                </Link>
              ))}
              {!eventsData?.data.length && (
                <p className="text-center text-gray-500 py-8">No events yet</p>
              )}
            </div>
          </div>

          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Recent Assets</h3>
              <Link href="/admin/assets" className="text-sm text-[#ff8c42] hover:underline">View all</Link>
            </div>
            <div className="space-y-3">
              {assetsData?.data.slice(0, 5).map((asset) => (
                <Link key={asset.id} href={`/admin/assets/edit/${asset.id}`} className="flex items-center gap-4 p-3 bg-[#0a0a0a] rounded-lg hover:bg-white/5 transition-all">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#ff8c42]/20">
                    {asset.thumbnailUrl ? (
                      <Image
                        src={asset.thumbnailUrl}
                        alt={asset.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-6 h-6 text-[#ff8c42]" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm truncate">{asset.title}</p>
                    <p className="text-gray-400 text-xs">{asset.type} · {asset.fileSize || 'N/A'}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                    asset.status === 'Active' ? 'bg-[#ff8c42]/20 text-[#ff8c42]' :
                    asset.status === 'Draft' ? 'bg-gray-500/20 text-gray-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>{asset.status}</span>
                </Link>
              ))}
              {!assetsData?.data.length && (
                <p className="text-center text-gray-500 py-8">No assets yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
