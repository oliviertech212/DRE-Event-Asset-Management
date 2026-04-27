'use client'

import { Gamepad2, LogIn } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/store/hooks'

export default function Navbar() {
  const router = useRouter()
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  const handleManageClick = () => {
    if (isAuthenticated) {
      router.push('/admin/dashboard')
    } else {
      router.push('/login')
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-[#ff8c42] rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
            <Gamepad2 className="w-7 h-7 text-black" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-lg tracking-wide">DIGITAL REALM</span>
            <span className="text-[#ff8c42] text-xs tracking-wider">ENTERTAINMENT</span>
          </div>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
            About
          </Link>
          <button
            onClick={handleManageClick}
            className="flex items-center gap-2 px-5 py-2.5 bg-transparent border border-white/20 text-white rounded-lg hover:border-[#ff8c42] hover:text-[#ff8c42] transition-all"
          >
            <LogIn className="w-4 h-4" />
            {isAuthenticated ? 'Dashboard' : 'Login'}
          </button>
        </div>
      </div>
    </nav>
  )
}
