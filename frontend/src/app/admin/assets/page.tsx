'use client'

import DashboardLayout from '@/components/admin/DashboardLayout'
import { Plus, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'

const assets = [
  {
    id: 'asset-001',
    title: 'Warrior Character Pack',
    type: '3D Model',
    project: 'Pixel Realm',
    status: 'Active',
    size: '124 MB',
    icon: '🗡️'
  },
  {
    id: 'asset-002',
    title: 'African City Tileset',
    type: '2D Asset',
    project: 'Pixel Realm',
    status: 'Active',
    size: '56 MB',
    icon: '🏙️'
  },
]

export default function AdminAssetsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Digital Assets</h1>
            <p className="text-gray-400 mt-1">Manage game assets and resources</p>
          </div>
          <Link
            href="/admin/assets/create"
            className="flex items-center gap-2 bg-[#ff8c42] text-black px-5 py-2.5 rounded-lg font-semibold hover:bg-[#ff7a2e] transition-all"
          >
            <Plus className="w-5 h-5" />
            Add Asset
          </Link>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5">
            <p className="text-gray-400 text-sm">Total Assets</p>
            <p className="text-2xl font-bold text-white mt-1">156</p>
          </div>
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5">
            <p className="text-gray-400 text-sm">3D Models</p>
            <p className="text-2xl font-bold text-purple-500 mt-1">42</p>
          </div>
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5">
            <p className="text-gray-400 text-sm">2D Assets</p>
            <p className="text-2xl font-bold text-blue-500 mt-1">78</p>
          </div>
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5">
            <p className="text-gray-400 text-sm">Audio Files</p>
            <p className="text-2xl font-bold text-green-500 mt-1">36</p>
          </div>
        </div>

        <div className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black border-b border-white/10">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Asset</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Type</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Project</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Size</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset) => (
                  <tr key={asset.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#ff8c42]/20 rounded-lg flex items-center justify-center text-xl">
                          {asset.icon}
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">{asset.title}</p>
                          <p className="text-gray-400 text-xs">{asset.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-300 text-sm">{asset.type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-300 text-sm">{asset.project}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-400 text-sm">{asset.size}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-3 py-1.5 rounded-full bg-[#ff8c42]/20 text-[#ff8c42]">
                        {asset.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-[#ff8c42] hover:bg-[#ff8c42]/10 rounded transition-all">
                          <Edit className="w-4 h-4" />
                        </button>
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
