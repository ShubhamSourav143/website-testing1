import '../styles/globals.css'
import ClientLayout from '../components/layout/ClientLayout'

export const metadata = {
  title: 'IIT KGP Animal Welfare - Protecting Every Life Since 2019',
  description: 'Registered NGO dedicated to rescuing, protecting, and giving new hope to stray, abandoned, and special-needs animals at IIT Kharagpur.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
