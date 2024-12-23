import React from 'react'
import { Draggable } from 'react-beautiful-dnd';
import {Box,Typography} from '@mui/material';

export default function TaskCard({task, index }) {
    
  return (
    
    <Draggable draggableId={task.id} key = {task.id} index ={index}>
    {
        (provided,snapshot)=>(
            <Box ref={provided.innerRef} 
            {...provided.draggableProps} 
            {...provided.dragHandleProps} 
            isDragging = {snapshot.isDragging}
                sx={{
                    backgroundColor:getColumnTitleColor(task.stage),
                    borderRadius : '10px',
                    margin : '8px',
                    cursor : 'pointer',
                    display : 'flex',
                    flexDirection : 'column',
                    justifyContent : 'space-around',
                    width:'180px',
                    height : '150px',
                    padding : '2px'
                }}
            >
            {console.log("draggable id",task.id)}
            <Typography 
            sx={{
                fontSize:'120%',
                fontWeight:'bold',
                fontFamily:'cursive',
                textAlign:'center'
                }}>{task.title}</Typography>
            <Typography 
            sx={{
                fontSize:'120%',
                textAlign:'center'
                }}
            >{task.description}</Typography>
            {provided.placeholder}
            </Box>
        )
    }
    </Draggable>
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