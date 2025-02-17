import { useNavigate , Link } from 'react-router-dom'
import segwiseLogo from '@/assets/segwise_ai_logo.jpg'
import { Check } from 'lucide-react'

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6FF66] to-[#CCFF33]">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-4 md:p-6 max-w-7xl mx-auto w-full">
        <Link to="https://www.segwise.ai/" className="flex items-center gap-2">
          <img 
            src={segwiseLogo} 
            alt="Segwise AI logo" 
            className="h-12 w-12 rounded"
          />
          <span className="text-2xl font-bold text-darkgreen">Segwise</span>
        </Link>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/home')}
            className="hidden md:inline-flex px-8 py-3 text-sm font-bold bg-white text-gray-700 hover:text-darkgreen shadow-lg rounded-xl transition-colors"
          >
            Login
          </button>
          <button 
            onClick={() => navigate('/home')}
            className="bg-black text-white hover:bg-black/90 px-8 py-3 hover:text-lightgreen  rounded-xl text-sm font-bold transition-colors shadow-lg"
          >
            Start For Free
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center px-4 text-center max-w-7xl mx-auto pt-12 md:pt-20">
        <div className="inline-flex items-center gap-2 bg-white/80 px-4 py-1.5 rounded-full mb-8 shadow-lg">
          <span className="text-xs font-bold bg-blue-200 text-blue-950 px-2.5 py-0.5 rounded-full">NEW</span>
          <span className="text-md font-bold text-blue-950">We&apos;ve raised $1.6M 🚀</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-4xl">
          Copilot to Boost Return on Ad Spend for Games and Apps!
        </h1>

        <p className="text-lg md:text-xl text-gray-600 font-medium mb-12 max-w-[410px]">
          Catch campaign issues faster and discover key drivers behind your top creatives with AI.
        </p>

        <div className="flex flex-col items-center gap-4">
          <button 
            onClick={() => navigate('/home')}
            className="bg-black text-white hover:text-lightgreen hover:bg-black/80 px-12 py-4 rounded-xl text-lg font-bold transition-colors shadow-lg group"
          >
            14 Day Free Trial <span className="group-hover:translate-x-0.5 transition-transform inline-block">→</span>
          </button>
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <Check className="h-6 w-6 text-gray-600" />
            No credit card or engineers required
          </p>
        </div>
      </main>
    </div>
  )
}

export default LandingPage

