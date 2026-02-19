import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="min-h-[40vh] flex items-center justify-center p-8">
          <div className="text-center text-slate-400">
            <p className="font-medium text-slate-300 mb-2">Something went wrong</p>
            <p className="text-sm">Please refresh the page or try again later.</p>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
