import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import Dashboard from '@/pages/Dashboard'
import LandingPage from '@/pages/LandingPage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page without sidebar */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Routes with sidebar */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Dashboard />} />
          {/* Add other routes that need sidebar here */}
        </Route>
      </Routes>
    </Router>
  )
}

export default App
