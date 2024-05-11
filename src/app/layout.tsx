import './globals.css'

import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import Header from '@/components/header'

import { ShirtContextProvider } from './context/shirts-context'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: 'Ignite Shop',
  description: 'Projeto de uma loja de roupas',
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="pt-br">
      <body className={roboto.variable}>
        <div className="flex min-h-[100vh] flex-col items-start">
          <ShirtContextProvider>
            <Header />
            {children}
          </ShirtContextProvider>
        </div>
      </body>
    </html>
  )
}

export default RootLayout
