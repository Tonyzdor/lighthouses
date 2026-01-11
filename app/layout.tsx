import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lighthouses - Годовые цели',
  description: 'Планирование целей от года к дню',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
