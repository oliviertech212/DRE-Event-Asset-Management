'use client'

import { Trophy, Package } from 'lucide-react'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Fixed Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="https://www.digitalrealm-entertainment.com/wp-content/uploads/2023/09/image_7fa9d09c-effe-4ebb-8bb5-541316597e8820230212_005845.jpg"
          alt="Gaming Background"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="inline-block">
            <span className="text-[#ff8c42] text-sm font-semibold tracking-wider border border-[#ff8c42]/30 px-4 py-2 rounded-full">
              RWANDA'S FIRST AFRICAN INDIE GAME STUDIO
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
            Let There Be{' '}
            <span className="text-[#ff8c42]">African</span>
            <br />
            Games.
          </h1>

          <p className="text-gray-400 text-lg max-w-xl">
            Manage esports events, digital assets and creator tools — all in one dashboard built for Africa's gaming ecosystem.
          </p>

          <div className="flex gap-4">
            <button className="px-8 py-4 bg-[#ff8c42] text-black font-semibold rounded-lg hover:bg-[#ff7a2e] transition-all flex items-center gap-2">
              MANAGE EVENTS →
            </button>
            <button className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-lg hover:border-white hover:bg-white/5 transition-all">
              BROWSE ASSETS
            </button>
          </div>
        </div>

        {/* Right Content - Feature Cards */}
        <div className="space-y-6">
          <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#ff8c42]/50 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-[#ff8c42]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Trophy className="w-7 h-7 text-[#ff8c42]" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-white">Event Management</h3>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">LIVE</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Create and manage esports tournaments, game jams and workshops. Track status, participants and linked assets in one place.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#ff8c42]/50 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-[#ff8c42]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Package className="w-7 h-7 text-[#ff8c42]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Asset Library</h3>
                <p className="text-gray-400 text-sm">
                  2D/3D models, UI kits, XR packs — categorize, link to events, track ownership.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
