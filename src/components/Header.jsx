import React,{useState, useEffect} from 'react'
import {AppBar, Toolbar, TextField, Button,Box} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearchQuery } from '../redux/taskSlice';

export default function Header({onSearch}) {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state)=>state.tasks.searchQuery); // Fetch search query
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    setSearchInput(searchQuery);
  },[searchQuery]);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchInput(query); // Dispatch action to update search query
  };
  const handleSearchClick = () => {
    dispatch(updateSearchQuery(searchInput));// update the search query in redux store and local storage 
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
                value={searchInput}
                onChange={handleSearchChange}
                sx={{
                  width:'100%',
                  marginRight:'10px',
                  borderRadius:'4px',
                  backgroundColor: 'white',
                  }}></TextField>
              <Button variant="contained" color="primary" onClick={handleSearchClick}>Search</Button>
            </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}
