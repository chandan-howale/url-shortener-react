import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './components/LandingPage'
import AboutPage from './components/AboutPage'
import RegisterPage from './components/RegisterPage'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import LoginPage from './components/LoginPage'
import { Toaster } from 'react-hot-toast'

function App() {

  return (    
    <Router>
    <NavBar />
    <Toaster />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
    <Footer />
    </Router>
  )
}

export default App
