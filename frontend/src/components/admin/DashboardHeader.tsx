'use client'

import { Menu, LogOut, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { logout } from '@/store/slices/authSlice'
import { toast } from 'sonner'

interface DashboardHeaderProps {
  onMenuClick: () => void
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    toast.success('Logged out successfully')
    router.push('/login')
  }

  return (
    <header className="bg-black border-b border-white/10 px-6 py-4">
      <div className="flex items-center justify-between">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-white hover:text-[#ff8c42] transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex-1 lg:flex-none"></div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#ff8c42] rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-black" />
            </div>
            <div className="hidden md:block">
              <p className="text-white text-sm font-semibold">{user?.name || 'Admin User'}</p>
              <p className="text-gray-400 text-xs">{user?.email || 'admin@digitalrealm.com'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-white transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
