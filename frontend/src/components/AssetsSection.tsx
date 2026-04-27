'use client'

import { Wand2, Image as ImageIcon, Globe, Music } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { useGetAssetsQuery } from '@/store/api/assetsApi'

const assetTypes = ['All', '3D Model', '2D Asset', 'Audio', 'Video', 'XR Asset']

const typeIcons: Record<string, any> = {
  '3D Model': Wand2,
  '2D Asset': ImageIcon,
  'XR Asset': Globe,
  Audio: Music,
  Video: ImageIcon,
}

const statusColors: Record<string, string> = {
  Active: 'bg-[#ff8c42]',
  Draft: 'bg-gray-500',
  Archived: 'bg-red-500',
}

export default function AssetsSection() {
  const [type, setType] = useState('All')
  const [page, setPage] = useState(1)

  const { data, isLoading } = useGetAssetsQuery({
    page,
    limit: 8,
    type: type === 'All' ? undefined : type,
  })

  return (
    <section className="relative z-10 bg-[#0a0a0a] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 flex-wrap">
            {assetTypes.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-5 py-2.5 rounded-lg font-semibold transition-all ${
                  type === t
                    ? 'bg-[#ff8c42] text-black'
                    : 'bg-[#1a1a1a] border border-white/10 text-gray-400 hover:border-[#ff8c42] hover:text-white'
                }`}
              >
                {t}
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
          DIGITAL ASSETS
        </motion.h2>

        {isLoading ? (
          <div className="text-center py-20 text-gray-400">Loading assets...</div>
        ) : !data?.data.length ? (
          <div className="text-center py-20 text-gray-400">No assets found</div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.data.map((asset, index) => {
                const Icon = typeIcons[asset.type] || ImageIcon
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
                        src={asset.thumbnailUrl}
                        alt={asset.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40" />
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
                        <span
                          className={`${
                            statusColors[asset.status] || 'bg-gray-500'
                          } text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5`}
                        >
                          <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                          {asset.status}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
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
    </section>
  )
}
