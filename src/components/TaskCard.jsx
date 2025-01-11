import React from 'react'
import {Box,Typography} from '@mui/material';
import { useDraggable } from '@dnd-kit/core';
;

// Global scrollbar styles
const globalStyles = {
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#888',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#555',
  },
};

// Styles specific to the task card
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
 // Initialize draggable behavior for the task card
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  // Styles for the draggable task card, dynamically adjusted during dragging
  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    opacity: isDragging ? 0.7 : 1,
    zIndex : isDragging ? 1000 : 'auto',
    position: isDragging ? 'absolute' : 'relative',
    pointerEvents: isDragging ? 'none' : 'auto',
  };

  return (
    <>
      <Box ref={setNodeRef} // Reference for DnD functionality
          style={style} // Dynamic inline styles
          {...listeners} // Drag event listeners
          {...attributes} // Accessibility attributes
                sx={{
                  backgroundColor:getColumnTitleColor(task.stage), // Color based on the column's stage
                  borderRadius : '10px',
                  margin : '8px',
                  cursor : 'grab', // Change the cursor to indicate draggable
                  display : 'flex',
                  flexDirection : 'column',
                  justifyContent : 'space-around',
                  width:'180px',
                  height : '150px',
                  padding : '2px',
                  position: isDragging?'absolute':'relative',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Subtle shadow for styling
                  zIndex: isDragging ? 1000 : 'auto',
                  pointerEvents: isDragging? 'none':'auto',
                  '@media (max-width: 768px)': { // Mobile screens
                    width: '90%', // Take up most of the screen width
                    height: 'auto',
                    fontSize: '14px',
                  },
                  ...globalStyles,
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

  