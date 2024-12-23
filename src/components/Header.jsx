import React from 'react'
import {AppBar, Toolbar, TextField, Button,Box} from '@mui/material';
export default function Header() {
  return (
    <>
        <Box sx={{display:'flex',justifyContent:'center'}}>
        <AppBar position='static'
          sx = {{
            backgroundColor:'#B491C8',
            padding : '2rem',
            borderRadius : '10px',
            boxShadow : ' 2px 3px 5px rgba(0, 0, 0, 0.2)',
            display:'flex',
            justifyContent: 'center',
            border:'2px solid white',
            width:'89%',
            marginBottom : '10px'
            }}>
            <Toolbar sx = {{
                display: 'flex', 
                justifyContent: 'space-between'
              }}>
                <TextField placeholder='Search Tasks...' 
                variant='outlined' size='small' 
                sx={{
                  width:'100%',
                  marginRight:'10px',
                  borderRadius:'4px',
                  backgroundColor: 'white',
                  }}></TextField>
  
            </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}
