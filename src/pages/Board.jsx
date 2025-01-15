import React,{useState,useEffect} from 'react';
import { Box,Button,Fab, TextField,Typography} from '@mui/material';
import Column from '../components/Column';
import AddIcon from '@mui/icons-material/Add';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { useSelector, useDispatch } from 'react-redux';
import { addTask,updateTask } from '../redux/taskSlice';
import {  DndContext,DragOverlay,rectIntersection} from '@dnd-kit/core';
import Header  from '../components/Header'; 

// Global Scrolling Styles
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

// Styling for the board layout and other UI elements
const boardStyles = {
  container : {
    boxSixing:'border-box',
    backgroundColor : '#E8E4EF',
    display:'flex',
    flexWrap:'wrap',
    justifyContent:'space-around',
    alignItems : 'stretch',
    gap:'5px',
    padding: '20px',
    height:'100vh',
    width:'86%',
    borderRadius:'10px',
    margin:'0 auto',
    marginBottom : '50px',
    overflow : 'auto',
    '@media (max-width: 768px)' : { // responsive design for mobile and smaller screens
        flexDirection:'column', // Stack columns vertically
        height:'auto', 
        width:'95%',
        padding:'10px',
    },
    boxShadow : '0px 2px 7px rgba(39, 7, 61, 0.63)',
    
    ...globalStyles, // Include global scrollbar styles
    
  },
  fab : {
    position:'fixed',
    bottom:'5rem',
    right:'1rem',
  },
  taskForm : {position:'fixed',bottom:'10rem',right:'2rem',padding:'2px',
    backgroundColor:'white',borderRadius:'2px',boxShadow:'3'
  },
  clearBtn : {position:'fixed', right:'0.5rem',bottom:'1rem'},
  scrollLockStyle : {
    overflow:'hidden',
  }
}

export default function Board() {
  // State variables for managing task input, active task, and filtered tasks
  const [showTaskForm,setShowTaskForm]=useState(false);
  const [taskTitle,setTaskTitle]=useState('');
  const [taskdescription,setTaskDescription]=useState('');
  const [activeTask,setActiveTask]=useState(null);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const dispatch = useDispatch();
  const {tasks,searchQuery} = useSelector((state)=>state.tasks);
  
  // Handle drag end: updates the task's stage and re-enables scrolling
  const handleSearch = (query) => {
          if(!query.trim()) {
            setFilteredTasks(tasks);
          }
          else {
            const lowerCaseQuery = query.toLowerCase();
            const newFilteredTasks = tasks.filter(
              (task)=>
              task.title.toLowerCase()===(lowerCaseQuery)
            );
          
          setFilteredTasks(newFilteredTasks); // Showing matched tasks
          } 

      };
  
  const stages = ['To Do', 'In Progress', 'Peer Review', 'Done'];

  useEffect(() => {
    // Update the filtered tasks based on the search query
    if(!searchQuery.trim()) {
      setFilteredTasks(tasks);
    }
  }, [tasks, searchQuery]);

  const handleAddTask = () => {
    const newTask = {
      id: `${Date.now()}`,
      title:taskTitle,
      description:taskdescription,
      stage:'To Do',
    };
    dispatch(addTask(newTask));
    console.log(tasks);
    setTaskTitle('');
    setTaskDescription('');
    setShowTaskForm(false);
  };

  // Handle drag start: sets the active task and disables scrolling
  const handleDragStart = (event) => {
    const task = tasks.find((t)=>t.id === event.active.id);
    setActiveTask(task);
    // apply scroll-lock style to body
    document.body.style.overflow='hidden';
  }

  // Handle drag end: updates the task's stage and re-enables scrolling
  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveTask(null);

    // remove scroll-lock style from the body 
    document.body.style.overflow = 'auto';
    if (!over) return;

     if(over) {
      const taskToUpdate = tasks.find((task) => task.id === active.id);
      if (taskToUpdate && taskToUpdate.stage !== over.id) {
        dispatch(
          updateTask({
            id: active.id,
            updates: { stage: over.id },
          })
        );
      }
    }

  };

  
  return (
    <>
    {/* Header Component with Search Functionality */}
    <Header onSearch={handleSearch}/>
    {/*Drag and drop context */}
    {console.log(tasks)}
    <DndContext 
    collisionDetection={rectIntersection}
    onDragStart={handleDragStart}
    onDragEnd={handleDragEnd}>
      {/* Board Layout */}
      <Box sx={boardStyles.container}>
        { 
          stages.map((stage)=>(
            <Column key={stage} title={stage} tasks={filteredTasks} id={stage}/>
          ))
         
        }
       
        
      </Box>
    
    {/* Add Task Floating Action Button */}
    <Fab color='primary' 
      sx={boardStyles.fab}
      onClick={()=>setShowTaskForm(true)}
    >
      <AddIcon />
    </Fab>
     {/* Drag Overlay: Task preview while dragging */}
     <DragOverlay>
          {activeTask && (
            <Box
              sx={{
                backgroundColor: getColumnTitleColor(activeTask.stage),
                borderRadius: "10px",
                cursor: "grab",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                width: "180px",
                height: "150px",
                padding: "2px",
                position:'relative',
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Typography sx={{ fontSize: '120%', fontFamily:'cursive',
                fontWeight: "bold", textAlign: "center" }}>
                {activeTask.title}
              </Typography>
              <Typography variant="body2" sx={{ fontSize:'120%',textAlign: "center" }}>
                {activeTask.description}
              </Typography>
            </Box>
          )}
        </DragOverlay>
    {/* Task Form Modal */}
    {showTaskForm && (
      <Box 
        sx={boardStyles.taskForm}
      >
        <TextField 
          label="Task Title" value={taskTitle}
          onChange={(e)=>setTaskTitle(e.target.value)}
          fullWidth
          
        />
        <TextField 
          label="Task Description" value={taskdescription}
          onChange={(e)=>setTaskDescription(e.target.value)}
          fullWidth
          multiline
          rows={4}
        />
        <Box sx={{display:'flex',justifyContent:'space-between',marginTop:'2px'}}>
          <Button onClick={handleAddTask}>Add Task</Button>
          <Button onClick={()=>setShowTaskForm(false)}>Cancel</Button>
        </Box>
      </Box>
    )}
    </DndContext>

    {/* Clear All Button */}
    <Button
      onClick={() => {
        localStorage.removeItem("tasks");
        localStorage.removeItem("searchQuery");
        window.location.reload(); // Refresh to reset
      }}
      sx={boardStyles.clearBtn}
      color='secondary' variant='contained'
    >
      <ClearAllIcon />
    </Button>
    </>
  );
}

// Function to get the column color based on its title
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
