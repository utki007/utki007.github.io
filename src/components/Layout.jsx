import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <Navbar />
      <main className="flex-1 pb-32">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
