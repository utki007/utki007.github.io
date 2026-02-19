import { useNavigate } from 'react-router-dom'
import Hero from '../components/Hero'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="-mt-14 sm:-mt-16 pt-14 sm:pt-16">
      <Hero onExploreClick={() => navigate('/experience')} />
    </div>
  )
}
