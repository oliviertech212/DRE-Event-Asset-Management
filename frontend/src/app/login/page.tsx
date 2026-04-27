'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLoginMutation } from '@/store/api/authApi'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setCredentials } from '@/store/slices/authSlice'
import { Gamepad2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const [login, { isLoading }] = useLoginMutation()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin/dashboard')
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const result = await login(formData).unwrap()
      dispatch(setCredentials(result))
      toast.success('Login successful!')
      router.push('/admin/dashboard')
    } catch (error: any) {
      toast.error(error?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-[#ff8c42] rounded-xl flex items-center justify-center">
              <Gamepad2 className="w-10 h-10 text-black" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to Digital Realm Admin</p>
        </div>

        <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:border-[#ff8c42] focus:outline-none"
                placeholder="admin@digitalrealm.rw"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:border-[#ff8c42] focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-[#ff8c42] text-black font-semibold py-3 rounded-lg hover:bg-[#ff7a2e] transition-all disabled:opacity-50"
            >
              {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-center text-sm text-gray-400">
              Default credentials: admin@digitalrealm.rw / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
