import React from 'react'
import {Box, Typography} from '@mui/material';
export default function Column({title}) {
  return (
    <>
       <Box sx={{flex:1, backgroundColor:'#f4f4f4', border:'2px,solid,black',borderRadius:'4px'}}>
        <Typography variant='h6' align='center'>{title}</Typography>
       </Box>
    </>
  )
}
