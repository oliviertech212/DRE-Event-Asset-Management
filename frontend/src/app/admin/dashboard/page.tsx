import DashboardLayout from '@/components/admin/DashboardLayout'
import { Calendar, Package, Users, TrendingUp } from 'lucide-react'

export default function AdminDashboardPage() {
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
            <p className="text-3xl font-bold text-white mt-1">24</p>
            <p className="text-xs text-green-500 mt-2">+12% from last month</p>
          </div>

          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#ff8c42]/20 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-[#ff8c42]" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-gray-400 text-sm">Digital Assets</p>
            <p className="text-3xl font-bold text-white mt-1">156</p>
            <p className="text-xs text-green-500 mt-2">+8% from last month</p>
          </div>

          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#ff8c42]/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-[#ff8c42]" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-gray-400 text-sm">Participants</p>
            <p className="text-3xl font-bold text-white mt-1">1,284</p>
            <p className="text-xs text-green-500 mt-2">+24% from last month</p>
          </div>

          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <p className="text-gray-400 text-sm">Live Events</p>
            <p className="text-3xl font-bold text-white mt-1">3</p>
            <p className="text-xs text-gray-500 mt-2">Currently active</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Recent Events</h3>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 bg-[#0a0a0a] rounded-lg">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center text-2xl">
                    🎮
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold text-sm">Event Title {i}</p>
                    <p className="text-gray-400 text-xs">Jun 25, 2026 · Kigali</p>
                  </div>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">Live</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Recent Assets</h3>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 bg-[#0a0a0a] rounded-lg">
                  <div className="w-12 h-12 bg-[#ff8c42]/20 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-[#ff8c42]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold text-sm">Asset Name {i}</p>
                    <p className="text-gray-400 text-xs">3D Model · 124 MB</p>
                  </div>
                  <span className="text-xs bg-[#ff8c42]/20 text-[#ff8c42] px-2 py-1 rounded-full">Active</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
