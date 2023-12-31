import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { fetchAppConfigs } from '../data/models/app_configs'
import { AppConfigsProvider } from '../components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: process.env.APP_NAME,
  description: process.env.APP_DESCRIPTION,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let appConfigs;
  try {
    appConfigs = await fetchAppConfigs();
  } catch (error) {
    console.log(error);
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <AppConfigsProvider value={appConfigs}>
          {children}
        </AppConfigsProvider>
      </body>
    </html>
  )
}
