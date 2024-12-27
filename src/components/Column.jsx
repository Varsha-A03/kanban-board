import React from 'react'
import {Box, Typography} from '@mui/material';
import TaskCard from './TaskCard';
import { useDroppable, useDndContext } from '@dnd-kit/core';

export default function Column({title,id,tasks}) {

   // Ensure tasks is an array
   if (!Array.isArray(tasks)) {
    console.error("Tasks is not an array:", tasks);
    tasks = []; // Default to an empty array if it's not
  }
  const { setNodeRef, isOver } = useDroppable({
    id,
  });// Unique droppable ID

  //const filteredTasks = tasks.filter((task) => task.stage === title);

  const { active } = useDndContext();// Access the active draggable task
  // Determine whether the current droppable column is the same as the active task's column
  const activeTaskId = active?.id;

  const isSameColumn =
    active?.data.current && active.data.current.stage === title;

  const titleColor = getColumnTitleColor(title);
  return (
    <>
      
        <Box sx={{
          width:'300px',
          minHeight:'100%',
          flex:1,
          '@media (max-height:768px)': { // mobile screens
              width:'100%', //  full width for stacking
              minHeight:'auto',
          },
          }}>
        {/*colum title */}
        <Typography variant='h6' align='center' 
            sx={{
              backgroundColor:titleColor,
              boxShadow : ' 0 2px 5px rgba(19, 1, 1, 0.5)',
              padding: '8px',
              borderRadius: '4px',
              textAlign : 'center',
              marginBottom:'10px',
              width:'98%',
              fontSize:'25px',
              fontFamily:'serif',
              fontWeight:'bold',
              
              
            }} >{title}</Typography>
       
        {/*Droppable component area */}
       
            <Box ref={setNodeRef}
              sx={{
                boxSizing:'border-box',
                backgroundColor: isOver ? '#E0E0E0' : 'ghostwhite',flex:1, 
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
                    
              {/*Display drop here message*/}
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
              {/*Render the task components*/
              
              tasks.filter((task)=>(task.stage===title))
              .map((task,index)=>(
                <TaskCard task={task} index={index} key={task.id} 
                ></TaskCard>
                
              ))}
              
              {/* Display placeholder for empty state */}
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
