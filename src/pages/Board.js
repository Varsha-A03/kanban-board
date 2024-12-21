import React from 'react'
import { Box, Typography } from '@mui/material';
import Column from '../components/Column';
export default function Board() {
  return (
    <>
        <Box sx={{backgroundColor:'grey',
            display:'flex', gap:'1rem', padding:'1rem',border:'2px,solid,white'}}>
            {['To Do', 'In Progress', 'Peer Review', 'Done'].map((column)=>(
                
                <Column key = {column} title = {column}/>
            ))}
         </Box>
    </>
  )
}
