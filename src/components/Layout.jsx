import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ParticleBackground from './ParticleBackground'

export default function Layout() {
  return (
    <div className="min-h-screen bg-dark flex flex-col relative overflow-x-hidden">
      <ParticleBackground />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pb-32 pt-14 sm:pt-16">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}
