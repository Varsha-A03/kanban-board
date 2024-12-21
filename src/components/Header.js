import React from 'react'
import {AppBar, Toolbar, TextField, Button} from '@mui/material';
export default function Header() {
  return (
    <>
        <AppBar position='static' sx = {{padding:'0.5rem',border:'2px,solid,white'}}>
            <Toolbar sx = {{border:'2px,solid,white',display: 'flex', justifyContent: 'space-between'}}>
                <TextField placeholder='Search tasks...' 
                variant='outlined' size='small' sx={{width:'72%', marginRight:'10',border:'2px,solid,white'}}></TextField>
                <Button variant='contained' color='primary' sx={{border:'2px,solid,white',width:'25%'}}>
                        +Add Button
                    </Button>
            </Toolbar>
        </AppBar>
        
    </>
  )
}
