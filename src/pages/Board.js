import React from 'react'
import { Box, Typography } from '@mui/material'
export default function Board() {
  return (
    <>
        <Box sx={{backgroundColor:'grey',
            display:'flex', gap:'1rem', padding:'1rem',border:'2px,solid,white'}}>
            {['To Do', 'In Progress', 'Peer Review', 'Done'].map((column)=>(
                <Box key = {column} sx={{flex:1,backgroundColor:'#f4f4f4',
                    border:'2px solid #ddd',borderRadius:'4px',padding:'1rem'
                }}>
                <Typography variant='h6' align='center'>{column}</Typography>
         </Box>))}
         </Box>
    </>
  )
}
