import { useNavigate } from 'react-router-dom'
import Hero from '../components/Hero'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <Hero onExploreClick={() => navigate('/experience')} />
  )
}
