import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Alert from '@mui/material/Alert'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Groups from './Groups'

const AdminLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsLoggedIn(true)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const response = await fetch('/api/auth/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'שם משתמש או סיסמה שגויים')
      }

      const data = await response.json()
      
      localStorage.setItem('token', data.token)
      localStorage.setItem('userRole', 'admin')
      localStorage.setItem('role', 'admin')
      localStorage.setItem('user', JSON.stringify(data.user))

      setSuccess(true)
      setUsername('')
      setPassword('')
      setIsLoggedIn(true)
    } catch (err) {
      setError(err.message || 'שגיאה בהתחברות')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userRole')
    localStorage.removeItem('role')
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    window.location.reload()
  }

  if (!isLoggedIn) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#f4f6fb',
          p: 2,
        }}
      >
        <Paper
          sx={{
            p: 4,
            maxWidth: 400,
            width: '100%',
            textAlign: 'right',
            direction: 'rtl',
          }}
        >
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, textAlign: 'center' }}>
            כניסת מנהל
          </Typography>

          <form onSubmit={handleSubmit}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                התחברות בוצעה בהצלחה!
              </Alert>
            )}

            <TextField
              fullWidth
              label="שם משתמש"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ mb: 2 }}
              disabled={loading}
              inputProps={{ dir: 'rtl' }}
            />

            <TextField
              fullWidth
              type="password"
              label="סיסמה"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }}
              disabled={loading}
              inputProps={{ dir: 'rtl' }}
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              sx={{ textTransform: 'none' }}
            >
              {loading ? 'מחובר...' : 'כנס למערכת'}
            </Button>
          </form>

          <Typography sx={{ mt: 3, fontSize: '0.9rem', color: '#666', textAlign: 'center' }}>
            כניסה מסוייגת למנהלים בלבד
          </Typography>
        </Paper>
      </Box>
    )
  }

  return (
    <Box sx={{ bgcolor: '#f4f6fb', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button color="inherit" onClick={handleLogout}>
            התנתק
          </Button>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
            ניהול פלטפורמת התרומות
          </Typography>
        </Toolbar>
      </AppBar>

      <Groups />
    </Box>
  )
}

export default AdminLogin
