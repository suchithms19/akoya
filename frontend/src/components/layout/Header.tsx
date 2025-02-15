import segwiseLogo from '@/assets/segwise_ai_logo.jpg'

/**
 * Header component displaying the application logo and title
 */
export function Header() {
  return (
    <header className="mb-8 flex items-center gap-3">
      <img 
        src={segwiseLogo} 
        alt="Segwise AI Logo" 
        className="h-12 w-12 rounded object-contain"
      />
      <div>
        <h1 className="text-xl font-bold text-darkgreen">Segwise</h1>
      </div>
    </header>
  )
} 