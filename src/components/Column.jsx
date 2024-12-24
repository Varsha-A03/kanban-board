import React from 'react'
import {Box, Typography} from '@mui/material';
import { Droppable} from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

export default function Column({title,id,tasks}) {
  const titleColor = getColumnTitleColor(title);
  return (
    <>
      
        <Box sx={{width:'300px'}}>
        {/*colum title */}
        <Typography variant='h6' align='center' 
            sx={{
              backgroundColor:titleColor,
              boxShadow : ' 0 2px 5px rgba(19, 1, 1, 0.5)',
              padding: '8px',
              borderRadius: '4px',
              textAlign : 'center',
              marginBottom:'10px',
              
            }} >{title}</Typography>
       
        {/*Droppable component area */}
        <Droppable droppableId={id}>
          {(provided,snapshot)=>(
            /*inner box */
            <Box ref={provided.innerRef}
              {...provided.droppableProps}
              
              sx={{
                backgroundColor: snapshot.isDraggingOver? '#E0E0E0': 'ghostwhite',flex:1, 
                boxShadow : ' 3px 2px 10px rgba(79, 44, 112, 0.32)',
                borderRadius:'4px',
                width:'300px',
                minHeight:'100vh',
                position : 'relative',
                overflowY:'auto'
              }}
              
            >
              {/*Display drop here message*/}
              {snapshot.isDraggingOver && (
                <Typography
                  sx={{
                    position:'relative',
                    top:'50%',
                    left:'50%',
                    transform:'translate(-50%,10%)',
                    color:'#3498DB',
                    fontWeight:'bold',
                    fontSize:'16px',
                    pointerEvents:'none'
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
                
              ))
              }
              {/* Display placeholder for empty state */}
            {!tasks.some((task) => task.stage === title) && (
              <Typography
                sx={{
                  textAlign: 'center',
                  color: 'gray',
                  fontStyle: 'italic',
                }}
              >
                No tasks yet
              </Typography>
            )}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
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