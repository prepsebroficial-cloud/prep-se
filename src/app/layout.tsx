import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AppStateProvider } from '@/hooks/useAppState'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Prep-se - Sua prevenção, sem burocracia',
  description: 'Agende online, pague com segurança e acompanhe sua jornada para acesso à medicação — tudo em um só lugar.',
  keywords: ['medicina', 'consulta online', 'telemedicina', 'prevenção', 'saúde'],
  authors: [{ name: 'Prep-se' }],
  openGraph: {
    title: 'Prep-se - Sua prevenção, sem burocracia',
    description: 'Agende online, pague com segurança e acompanhe sua jornada para acesso à medicação — tudo em um só lugar.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className={`${inter.className} h-full bg-gray-50 antialiased`}>
        <AppStateProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </AppStateProvider>
      </body>
    </html>
  )
}
