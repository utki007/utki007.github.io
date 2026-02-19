import TechnicalSkillsSection from '../components/TechnicalSkillsSection'
import ErrorBoundary from '../components/ErrorBoundary'

export default function SkillsPage() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        <TechnicalSkillsSection />
      </div>
    </ErrorBoundary>
  )
}
