'use client'

import { Wand2, Image as ImageIcon, Globe, Music } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const assets = [
  {
    id: 'asset-001',
    title: 'Warrior Character Pack',
    type: '3D Model',
    project: 'Pixel Realm',
    status: 'Active',
    statusColor: 'bg-[#ff8c42]',
    size: '124 MB',
    icon: Wand2,
    bgColor: 'bg-gradient-to-br from-amber-900/20 to-amber-700/10',
    imageUrl: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&q=80'
  },
  {
    id: 'asset-002',
    title: 'African City Tileset',
    type: '2D Asset',
    project: 'Pixel Realm',
    status: 'Active',
    statusColor: 'bg-[#ff8c42]',
    size: '56 MB',
    icon: ImageIcon,
    bgColor: 'bg-gradient-to-br from-blue-900/20 to-blue-700/10',
    imageUrl: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&q=80'
  },
  {
    id: 'asset-003',
    title: 'VR Training Env — Hospital',
    type: 'XR Asset',
    project: 'Realm XR',
    status: 'Draft',
    statusColor: 'bg-gray-500',
    size: '880 MB',
    icon: Globe,
    bgColor: 'bg-gradient-to-br from-teal-900/20 to-teal-700/10',
    imageUrl: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=400&q=80'
  },
  {
    id: 'asset-004',
    title: 'Afro Beats Soundtrack',
    type: 'Audio',
    project: 'Realm Games',
    status: 'Active',
    statusColor: 'bg-[#ff8c42]',
    size: '18 MB',
    icon: Music,
    bgColor: 'bg-gradient-to-br from-purple-900/20 to-purple-700/10',
    imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80'
  }
]

export default function AssetsSection() {
  return (
    <section className="relative z-10 bg-[#0a0a0a] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold text-gray-400 mb-8 tracking-wider"
        >
          DIGITAL ASSETS
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {assets.map((asset, index) => {
            const Icon = asset.icon
            return (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-[#ff8c42]/50 transition-all group cursor-pointer"
              >
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={asset.imageUrl}
                    alt={asset.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 ${asset.bgColor}`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-[#1a1a1a]/80 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <Icon className="w-8 h-8 text-[#ff8c42]" />
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#ff8c42] transition-colors">
                    {asset.title}
                  </h3>

                  <p className="text-sm text-gray-400">
                    {asset.type} · {asset.project}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <span className={`${asset.statusColor} text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5`}>
                      <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                      {asset.status}
                    </span>
                    <span className="text-gray-500 text-xs">{asset.size}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
