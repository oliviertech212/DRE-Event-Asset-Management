'use client'

import { useEffect } from 'react'
import { useGetMeQuery } from '@/store/api/authApi'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setUser, logout } from '@/store/slices/authSlice'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()
  const { token } = useAppSelector((state) => state.auth)
  const { data: user, error } = useGetMeQuery(undefined, {
    skip: !token,
  })

  useEffect(() => {
    if (user) {
      dispatch(setUser(user))
    }
  }, [user, dispatch])

  useEffect(() => {
    if (error) {
      dispatch(logout())
    }
  }, [error, dispatch])

  return <>{children}</>
}
