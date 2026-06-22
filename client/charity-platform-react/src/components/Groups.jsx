import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'

const Groups = () => {
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [formData, setFormData] = useState({ name: '', target: '' })
  const [submitting, setSubmitting] = useState(false)

  const userRole = typeof window !== 'undefined' ? window.localStorage.getItem('userRole') || window.localStorage.getItem('role') : null
  const isAdmin = userRole === 'admin'

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/groups')
        if (!response.ok) {
          throw new Error(`שגיאה בטעינת הקבוצות: ${response.status}`)
        }
        const data = await response.json()
        setGroups(data)
      } catch (err) {
        setError(err.message || 'שגיאה בטעינת הקבוצות')
      } finally {
        setLoading(false)
      }
    }

    fetchGroups()
  }, [])

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setFormData({ name: '', target: '' })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      alert('נא להזין שם קבוצה')
      return
    }
    if (!formData.target || isNaN(formData.target) || formData.target <= 0) {
      alert('נא להזין יעד תרומה חוקי (מספר חיובי)')
      return
    }

    setSubmitting(true)
    try {
      const token = localStorage.getItem('token')
      
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({
          name: formData.name,
          target: Number(formData.target)
        }),
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('אינך מורשה להוסיף קבוצה. רק מנהלים יכולים להוסיף קבוצות.')
        } else if (response.status === 403) {
          throw new Error('אינך מנהל. רק מנהלים יכולים להוסיף קבוצות.')
        }
        throw new Error(`שגיאה בהוספת הקבוצה: ${response.status}`)
      }

      const newGroup = await response.json()
      setGroups((prev) => [...prev, newGroup])
      handleCloseDialog()
      alert('הקבוצה נוספה בהצלחה!')
    } catch (err) {
      alert('שגיאה בהוספת הקבוצה: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 960, mx: 'auto', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2, direction: 'rtl' }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#172136' }}>
          רשימת קבוצות
        </Typography>
        {isAdmin && (
          <Button variant="contained" color="primary" sx={{ textTransform: 'none' }} onClick={handleOpenDialog}>
            ניהול קבוצות
          </Button>
        )}
      </Box>

      <Paper elevation={2} sx={{ p: 3, bgcolor: '#fff' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" sx={{ textAlign: 'right' }}>
            {error}
          </Typography>
        ) : groups.length === 0 ? (
          <Typography sx={{ textAlign: 'right', color: '#4f5e7a' }}>
            אין קבוצות קיימות.
          </Typography>
        ) : (
          <Box sx={{ display: 'grid', gap: 2 }}>
            {groups.map((group) => (
              <Paper key={group._id || group.id} sx={{ p: 2, border: '1px solid #e0e3eb', textAlign: 'right' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  {group.name}
                </Typography>
                <Typography sx={{ color: '#7a8ba4', fontSize: '0.95rem' }}>
                  יעד תרומה: {group.target} שקל
                </Typography>
              </Paper>
            ))}
          </Box>
        )}
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: 'right', direction: 'rtl' }}>הוספת קבוצה חדשה</DialogTitle>
        <DialogContent sx={{ direction: 'rtl', pt: 2 }}>
          <TextField
            fullWidth
            label="שם הקבוצה"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            inputProps={{ dir: 'rtl' }}
          />
          <TextField
            fullWidth
            label="יעד תרומה (שקלים)"
            name="target"
            type="number"
            value={formData.target}
            onChange={handleInputChange}
            inputProps={{ dir: 'rtl', min: 0 }}
          />
        </DialogContent>
        <DialogActions sx={{ direction: 'rtl', p: 2 }}>
          <Button onClick={handleCloseDialog} disabled={submitting}>
            ביטול
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary" disabled={submitting}>
            {submitting ? 'שולח...' : 'הוסף קבוצה'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Groups
