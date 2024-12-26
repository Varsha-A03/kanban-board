import React,{useState} from 'react'
import { Draggable } from 'react-beautiful-dnd';
import {Box,Typography,IconButton} from '@mui/material';
import { useDraggable } from '@dnd-kit/core';
import zIndex from '@mui/material/styles/zIndex';


const TaskCardStyles = {
  titleStyle : {
    fontSize:'120%',
                fontWeight:'bold',
                fontFamily:'cursive',
                textAlign:'center'
  },
  descStyle : {
    fontSize:'120%',
    textAlign:'center'
    },
    
};

export default function TaskCard({task, index}) {
 const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    opacity: isDragging ? 0.7 : 1,
    zIndex : isDragging ? 1000 : 'auto',
    position: isDragging ? 'absolute' : 'relative',
    pointerEvents: isDragging ? 'none' : 'auto',
  };


  return (
    <>
    
            <Box ref={setNodeRef} style={style} {...listeners} {...attributes}
                sx={{
                  backgroundColor:getColumnTitleColor(task.stage),
                                  borderRadius : '10px',
                                  margin : '8px',
                                  cursor : 'grab',
                                  display : 'flex',
                                  flexDirection : 'column',
                                  justifyContent : 'space-around',
                                  width:'180px',
                                  height : '150px',
                                  padding : '2px',
                                  marginLeft:'50px',
                                  position: 'relative',
                                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                  zIndex: isDragging ? 1000 : 'auto',
                }}
            >
            {console.log("draggable id",task.id)
              }
              
              {/* Task Title */}
            <Typography sx={TaskCardStyles.titleStyle}>{task.title}</Typography>
                {/* Task Description */}
            <Typography variant ='body2' sx={TaskCardStyles.descStyle}>{task.description}</Typography>
        
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

  /*
  import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../redux/taskSlice';
toggleButtonStyle : {
      position:'absolute',
      top:'8px',
      right:'8px',
      color:'grey',
      zIndex: 10001,
    },  
  deleteButtonStyle : {
    position:'absolute',
      bottom:'8px',
      right:'8px',
      color:'red',
  },
   const dispatch = useDispatch();
  
  const [showDelete, setShowDelete] = useState(false);
  
    const toggleDeleteButton = ()=>{
      setShowDelete((prev) => !prev);
    };
  
    const handleDeleteTask = ()=>{
      dispatch(deleteTask(task.id));
      setShowDelete(false);
    };
  <IconButton onClick={ (e)=> {
                e.preventDefault();
                e.stopPropagation();
                toggleDeleteButton()}}
                sx={TaskCardStyles.toggleButtonStyle}><MoreVertIcon/></IconButton>
        {showDelete && (
              < IconButton 
                  onClick= {(e)=>
                  {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDeleteTask();
                  }} 
                  sx={{
                    position:'absolute',
                    top:'8px',
                    right:'8px',
                    color:'red',
                    zIndex:1001,
                    pointerEvents:'auto',
                  }} >
                    
                  <DeleteIcon />
                </IconButton>)}
  */