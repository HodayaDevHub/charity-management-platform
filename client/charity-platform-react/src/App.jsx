import { useState, useEffect } from 'react'
import HomePage from './components/HomePage'
import AdminLogin from './components/AdminLogin'

function App() {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('userRole') || localStorage.getItem('role')
    if (token && role === 'admin') {
      setIsAdmin(true)
    }
  }, [])

  return isAdmin ? <AdminLogin /> : <HomePage />
}

export default App
