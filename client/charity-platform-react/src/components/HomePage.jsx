import { useState } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Form from './Form'
import '../App.css'

const HomePage = () => {
  const [open, setOpen] = useState(false)

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f4f6fb',
        p: 3,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 720, textAlign: 'center' }}>
        <Box sx={{ mb: 4, color: '#54607a', fontSize: '1rem', lineHeight: 1.8 }}>
          לחיצה על הכפתור תפתח את הטופס למילוי הנתונים.
        </Box>

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => setOpen(true)}
          sx={{
            borderRadius: 8,
            px: 5,
            py: 1.8,
            boxShadow: 3,
            textTransform: 'none',
            fontSize: '1rem',
          }}
        >
          לחץ כאן לתרומה
        </Button>
      </Box>

      <Form open={open} onClose={() => setOpen(false)} />
    </Box>
  )
}

export default HomePage