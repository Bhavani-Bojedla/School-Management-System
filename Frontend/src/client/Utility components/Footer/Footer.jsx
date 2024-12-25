import { Box, Typography } from '@mui/material'
import React from 'react'

export default function Footer() {
  return (
    <div>
      <Box sx={{display:'flex',justifyContent:"center",alignItems:'center',flexDirection:'column'}} component={'div'}>
         <Typography variant='h5'>School Management System</Typography>
         <Typography variant='p'>Copyright@2024</Typography>
      </Box>
    </div>
  )
}
