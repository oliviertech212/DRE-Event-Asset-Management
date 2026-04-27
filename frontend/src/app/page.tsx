import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import EventsSection from '@/components/EventsSection'
import AssetsSection from '@/components/AssetsSection'

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <EventsSection />
      <AssetsSection />
    </main>
  )
}
