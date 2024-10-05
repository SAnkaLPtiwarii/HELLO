import './globals.css'
import 'react-toastify/dist/ReactToastify.css'

export const metadata = {
  title: 'VSell Mobile App',
  description: 'A mobile e-commerce application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}