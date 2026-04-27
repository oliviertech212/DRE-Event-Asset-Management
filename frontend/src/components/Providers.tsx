'use client'

import { Provider } from 'react-redux'
import { store } from '@/store'
import { Toaster } from 'sonner'
import AuthProvider from './AuthProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Toaster position="top-right" richColors />
        {children}
      </AuthProvider>
    </Provider>
  )
}
