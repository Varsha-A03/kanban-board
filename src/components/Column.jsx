import React from 'react'
import {Box, Typography} from '@mui/material';
import TaskCard from './TaskCard';
import { useDroppable, useDndContext } from '@dnd-kit/core';

export default function Column({title,id,tasks}) {

   // Ensure tasks is an array to avoid runtime errors
   if (!Array.isArray(tasks)) {
    console.error("Tasks is not an array:", tasks);
    tasks = []; // Default to an empty array if it's not
  }
  // Initialize a droppable area with a unique droppable ID
  const { setNodeRef, isOver } = useDroppable({
    id,
  });
  // Access the active draggable task
  const { active } = useDndContext();
  
  const isSameColumn =
    active?.data.current && active.data.current.stage === title;
  
  // Determine whether the active draggable item belongs to this column
  const titleColor = getColumnTitleColor(title);
  
  return (
    <>
      {/* Wrapper box for the column */}
        <Box sx={{
          width:'300px',
          minHeight:'100%',
          flex:1,
          '@media (max-height:768px) and (max-width: 1024px)': { // mobile screens
              width:'100%', //  full width for stacking
              minHeight:'auto',
          },
          
          }}>
        {/*colum title */}
        <Typography variant='h6' align='center' 
            sx={{
              backgroundColor:titleColor,
              boxShadow : ' 0 3px 5px rgba(19, 1, 1, 0.7)',
              padding: '8px',
              borderRadius: '4px',
              textAlign : 'center',
              margin:'10px',
              width:'92%',
              fontSize:'25px',
              fontFamily:'serif',
              fontWeight:'bold',
              '@media (max-height:768px) and (max-width: 1024px)': { // mobile screens
              width:'97%', //  full width for stacking
              minHeight:'auto',
              },
              
            }} >{title}</Typography>
       
        {/*Droppable area for tasks*/}
       
            <Box ref={setNodeRef}
              sx={{
                boxSizing:'border-box',
                backgroundColor: isOver ? '#E0E0E0' : 'ghostwhite', 
                boxShadow : ' 3px 2px 10px rgba(53, 13, 53, 0.32)',
                borderRadius:'4px',
                width:'100%',
                margin:'5px',
                padding:'5px',
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                justifyContent:'flex-start',
                flex:1,
                minHeight:'90%',
                maxHeight: 'calc(100vh - 200px)', // Adjust the height if needed
                position : 'relative',
                overflowY:'auto',
                pointerEvents:'all',
                overflowX: 'hidden', // Hide horizontal scrolling
                scrollbarWidth: 'thin', // Styling for scrollbar (Firefox)
                '&::-webkit-scrollbar': {
                  width: '8px', // Width of the scrollbar
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#888', // Scrollbar thumb color
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  backgroundColor: '#555', // Thumb color on hover
                },
              }}
              
            >
                    
              {/* Show a "Drop Here" message when a draggable item hovers over but is not in the same column */}
            {isOver && !isSameColumn && (
                <Typography
                  sx={{
                    position:'absolute',
                    top:'50%',
                    left:'50%',
                    transform:'translate(-50%,10%)',
                    color:'#3498DB',
                    fontWeight:'bold',
                    fontSize:'16px',
                    pointerEvents:'none',
                    zIndex:1,
                    '@media (max-height:768px)': { // mobile screens
                          width:'100%', //  full width for stacking
                          minHeight:'auto',
                      },
                  }}
                >
                  Drop Here
                </Typography>
              )}
              {console.log("droppable id ",id)}
              {/* Render the task components filtered by the current column */
              
              tasks.filter((task)=>(task.stage===title))
              .map((task,index)=>(
                <TaskCard task={task} index={index} key={task.id} 
                ></TaskCard>
                
              ))}
              
              {/* Show a placeholder when no tasks exist in the column */}
            {!tasks.some((task) => task.stage === title) && (
              <Typography
                sx={{
                  textAlign: 'center',
                  color: 'gray',
                  fontStyle: 'italic',
                  padding:'15px',
                }}
              >
                No tasks yet
              </Typography>
            )}
              </Box>
       </Box>
       
    </>
  )
}

// Utility function to get a unique color for each column based on its title
function getColumnTitleColor(titlename) {
  switch(titlename) {
    case 'To Do':
      return '#EEC759';
    case 'In Progress':
      return '#FFC6D3';
    case 'Peer Review':
      return '#FFB480';
    case 'Done':
      return '#C6D84D'
    default:
      return 'violet';
  }
}
