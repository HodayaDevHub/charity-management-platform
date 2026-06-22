import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import MenuItem from '@mui/material/MenuItem'

const Form = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" dir="rtl">
      <DialogTitle sx={{ bgcolor: '#f7fafc', color: '#172136', fontWeight: 700, textAlign: 'right' }}>
        טופס תרומה רשמי
      </DialogTitle>

      <DialogContent dividers sx={{ bgcolor: '#ffffff', p: 3, textAlign: 'right' }}>
        <Typography mb={2} sx={{ color: '#4d5f7a', textAlign: 'right' }}>
          מלא/י את הפרטים מטה כדי להשלים את התרומה בצורה בטוחה ומכובדת.
        </Typography>

        <Box component="form" sx={{ display: 'grid', gap: 2, direction: 'rtl', textAlign: 'right' }}>
          <TextField
            label="סכום תרומה (₪)"
            placeholder="הכנס סכום"
            type="number"
            name="amount"
            fullWidth
            variant="outlined"
            InputProps={{ inputProps: { min: 1, dir: 'rtl' } }}
          />

          <Typography variant="subtitle1" sx={{ color: '#24335c', fontWeight: 700, mt: 1 }}>
            פרטי תורם
          </Typography>
          <TextField
            label="שם מלא"
            placeholder="הכנס שם מלא"
            name="donorName"
            fullWidth
            variant="outlined"
            inputProps={{ dir: 'rtl' }}
          />
          <TextField
            label="אימייל"
            placeholder="הכנס אימייל"
            type="email"
            name="donorEmail"
            fullWidth
            variant="outlined"
            inputProps={{ dir: 'rtl' }}
          />
          <TextField
            label="טלפון"
            placeholder="הכנס טלפון"
            name="donorPhone"
            fullWidth
            variant="outlined"
            inputProps={{ dir: 'rtl' }}
          />

          <TextField
            select
            label="נציג"
            name="representative"
            defaultValue=""
            fullWidth
            variant="outlined"
            sx={{
              direction: 'rtl',
              '& .MuiOutlinedInput-root': { textAlign: 'right' },
              '& .MuiSelect-select': { direction: 'rtl', textAlign: 'right', paddingRight: '16px' },
            }}
            SelectProps={{
              displayEmpty: true,
            }}
          >
            <MenuItem value="" disabled>
              בחר נציג
            </MenuItem>
            <MenuItem value="almog">אלמוג כהן</MenuItem>
            <MenuItem value="eden">עדן לוי</MenuItem>
            <MenuItem value="noa">נועה בר</MenuItem>
          </TextField>

          <Typography variant="subtitle1" sx={{ color: '#24335c', fontWeight: 700, mt: 1 }}>
            פרטי תשלום
          </Typography>
          <TextField
            label="מספר כרטיס"
            placeholder="הכנס מספר כרטיס"
            name="cardNumber"
            fullWidth
            variant="outlined"
            inputProps={{ dir: 'rtl' }}
          />
          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
            <TextField
              label="תוקף"
              placeholder="MM/YY"
              name="cardExpiry"
              fullWidth
              variant="outlined"
              inputProps={{ dir: 'rtl' }}
            />
            <TextField
              label="CVV"
              placeholder="הכנס CVV"
              name="cardCvv"
              fullWidth
              variant="outlined"
              type="password"
              inputProps={{ dir: 'rtl' }}
            />
          </Box>

          <TextField
            label="הקדשה"
            placeholder="כתוב הקדשה"
            name="dedication"
            fullWidth
            variant="outlined"
            multiline
            minRows={3}
            inputProps={{ dir: 'rtl' }}
          />

          <FormControlLabel
            sx={{ justifyContent: 'flex-end', width: '100%', '& .MuiTypography-root': { color: '#3d506f' } }}
            control={<Checkbox name="anonymous" color="primary" />}
            label="מוצג/ת"
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, justifyContent: 'space-between' }}>
        <Button onClick={onClose} sx={{ color: '#556280' }}>
          ביטול
        </Button>
        <Button variant="contained" onClick={onClose} sx={{ bgcolor: '#25325c', '&:hover': { bgcolor: '#1e2a52' } }}>
          שלח עכשיו
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Form
