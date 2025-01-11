import React,{useState} from 'react'
import {AppBar, Toolbar, TextField, Button,Box} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearchQuery } from '../redux/taskSlice';

export default function Header({onSearch}) {
  const dispatch = useDispatch();
 // const searchQuery = useSelector((state)=>state.tasks.searchQuery); // Fetch search query
  const [searchInput, setSearchInput] = useState('');

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchInput(query); // Dispatch action to update search query
  };
  const handleSearchClick = () => {
    dispatch(updateSearchQuery(searchInput));// update the search query in redux store and local storage 
    localStorage.setItem('searchQuery', searchInput); // Save the query in local storage
    onSearch(searchInput);
  };
  return (
    <>
        <Box sx={{display:'flex',justifyContent:'center'}}>
        <AppBar position='static'
          sx = {{
            backgroundColor:'#B491C8',
            padding : '2rem',
            borderRadius : '10px',
            boxShadow : ' 2px 4px 5px rgba(39, 7, 61, 0.63)',
            display:'flex',
            justifyContent: 'center',
            width:'89%',
            marginBottom : '15px',
            '@media (max-width: 768px)': {
                width: '95%',
                padding: '0.5rem',
              },
            }}>
            <Toolbar sx = {{
                display: 'flex', 
                justifyContent: 'space-between',
                '@media (max-width: 768px)': {
                  flexDirection: 'column', // Stack search bar and button vertically
                  alignItems: 'center',
                },
              }}>
                <TextField placeholder='Search Tasks...' 
                variant='outlined' size='small' 
                value={searchInput}
                onChange={handleSearchChange}
                sx={{
                  width:'100%',
                  marginRight:'10px',
                  borderRadius:'4px',
                  backgroundColor: 'white',
                  '@media (max-width: 768px)': {
                    marginRight: '0',
                    marginBottom: '10px', // Add space between search bar and button
                  },
                  }}></TextField>
              <Button variant="contained" color="primary" onClick={handleSearchClick}
                sx={{
                  '@media (max-width: 768px)': {
                    width: '100%', // Full width button
                  },
                }}
              >Search</Button>
            </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}
