'use client'

import { Calendar, Package, LayoutDashboard, ChevronRight, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Gamepad2 } from 'lucide-react'

const menuItems = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Events',
    href: '/admin/events',
    icon: Calendar,
  },
  {
    title: 'Assets',
    href: '/admin/assets',
    icon: Package,
  },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div
      className={`fixed lg:static z-30 inset-y-0 left-0 w-64 bg-black border-r border-white/10 flex flex-col transition-transform duration-300 ${
        !isOpen && '-translate-x-full lg:translate-x-0'
      }`}
    >
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#ff8c42] rounded-xl flex items-center justify-center">
            <Gamepad2 className="w-6 h-6 text-black" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-sm">DIGITAL REALM</span>
            <span className="text-[#ff8c42] text-xs">ADMIN</span>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden text-white">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-[#ff8c42] text-black'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.title}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4" />}
                </div>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
