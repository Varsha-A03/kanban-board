import React,{useState} from 'react'
import { Draggable } from 'react-beautiful-dnd';
import {Box,IconButton,Typography} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../redux/taskSlice';

export default function TaskCard({task, index ,deleteTask}) {
  const dispatch = useDispatch();
    const [showDelete, setShowDelete] = useState(false);

    const toggleDeleteButton = ()=>{
      setShowDelete((prev) => !prev);
    };

    const handleDeleteTask = ()=>{
      dispatch(deleteTask(task.id));
      setShowDelete(false);
    };

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
                    padding : '2px',
                    position: 'relative',
                }}
            >
            {console.log("draggable id",task.id,", droppable id: ",task.title)
              }
              {/* Task Title */}
            <Typography 
            sx={{
                fontSize:'120%',
                fontWeight:'bold',
                fontFamily:'cursive',
                textAlign:'center'
                }}>{task.title}</Typography>
                {/* Task Description */}
            <Typography 
            sx={{
                fontSize:'120%',
                textAlign:'center'
                }}
            >{task.description}</Typography>
            {/* More Icon Button */}
            < IconButton onClick={toggleDeleteButton}
              sx={{
                position:'absolute',
                top:'8px',
                right:'8px',
                color:'grey',
              }} >
                <MoreVertIcon/>
              </IconButton>
              {/* Delete Button (shown when More Icon is clicked) */}
              {
                showDelete && (
                  <IconButton onClick={handleDeleteTask}
                    sx={{
                      position:'absolute',
                      bottom:'8px',
                      right:'8px',
                      color:'red',
                    }}
                    >
                      <DeleteIcon />
                    </IconButton>
                )
              }
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