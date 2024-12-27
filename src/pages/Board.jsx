import React,{useState,useEffect} from 'react';
import { Box,Button,Fab, TextField,Typography} from '@mui/material';
import Column from '../components/Column';
import AddIcon from '@mui/icons-material/Add';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { useSelector, useDispatch } from 'react-redux';
import { addTask,updateTask } from '../redux/taskSlice';
import {  DndContext,DragOverlay,rectIntersection} from '@dnd-kit/core';
import Header  from '../components/Header'; 
const boardStyles = {
  container : {
    boxSixing:'border-box',
    backgroundColor : '#E8E4EF',
    display:'flex',
    justifyContent:'space-around',
    alignItems : 'stretch',
    gap:'5px',
    padding: '20px',
    height:'100vh',
    width:'86%',
    borderRadius:'10px',
    margin:'0 auto',
    marginBottom : '50px',
    overflow : 'hidden',
  },
  fab : {
    position:'fixed',
    bottom:'5rem',
    right:'1rem',
  },
  taskForm : {position:'fixed',bottom:'10rem',right:'2rem',padding:'2px',
    backgroundColor:'white',borderRadius:'2px',boxShadow:'3'
  },
  clearBtn : {position:'fixed', right:'0.5rem',bottom:'1rem'}
}
export default function Board() {
  const [showTaskForm,setShowTaskForm]=useState(false);
  const [taskTitle,setTaskTitle]=useState('');
  const [taskdescription,setTaskDescription]=useState('');
  const [activeTask,setActiveTask]=useState(null);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const dispatch = useDispatch();
  const {tasks,searchQuery} = useSelector((state)=>state.tasks);

  
  
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

          // Automatically clear the search input after operation
          //dispatch(updateSearchQuery(''));
      };
  

  const stages = ['To Do', 'In Progress', 'Peer Review', 'Done'];

  useEffect(() => {
    // Update the filtered tasks based on the search query
    if(!searchQuery.trim()) {
      setFilteredTasks(tasks);
    }
  }, [tasks]);

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

  const handleDragStart = (event) => {
    const task = tasks.find((t)=>t.id === event.active.id);
    setActiveTask(task);
  }
  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveTask(null);
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
    <Header onSearch={handleSearch}/>
    {/*Drag and drop context */}
    {console.log(tasks)}
    <DndContext 
    onDragStart={handleDragStart}
    onDragEnd={handleDragEnd}>
      <Box sx={boardStyles.container}>
        { 
          stages.map((stage)=>(
            <Column key={stage} title={stage} tasks={filteredTasks} id={stage}/>
          ))
         
        }
       
        
      </Box>
    
    {/*FAB floating action button component */}
    <Fab color='primary' 
      sx={boardStyles.fab}
      onClick={()=>setShowTaskForm(true)}
    >
      <AddIcon />
    </Fab>
     {/* Drag Overlay */}
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
    {/*show task form */}
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
    // Get tasks for source and destination stages
    const sourceTasks = tasks.filter((task)=>task.stage === sourceStage);
    const destinationTasks = tasks.filter((task)=>task.stage === destinationStage);

    // Remove task from source column
    const [movedTask] = sourceTasks.splice(source.index,1);
    // Update tasks stage to destination column
    movedTask.stage = destinationStage; 
    // Insert task into destination column
    destinationTasks.splice(destination.index, 0, movedTask);

    const updatedTasks = [
      ...tasks.filter((task)=> task.stage !== sourceStage && task.stage !== destinationStage),
      ...sourceTasks,
      ...destinationTasks,
    ];

    console.log("Updated Result:", updatedTasks);
    setTasks(updatedTasks);
    
    const handleDragEnd1 = (result) => {
    const { source, destination } = result;
    console.log("Drag Result:", result);

    

    // if dropped outside  a valid column or if is at same position do nothing just return
    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return}; 

    const sourceStage = source.droppableId;
    const destinationStage = destination.droppableId;

    const taskToUpdate = tasks.find(
      (task, index) => task.stage === sourceStage && index === source.index
    );

    if(taskToUpdate) {
      dispatch (
        updateTask ({
          id: taskToUpdate.id,
          updates : {stage: destinationStage},
        })
      );
    }
  };

    import DeleteIcon from '@mui/icons-material/Delete';
     const {setNodeRef: setDeleteRef,isOver : isOverDelete } = useDroppable({
    id:'delete-zone',
  });
  const customCollisionDetection = (entries, draggable) => {
    // Prioritize the delete-zone droppable if present
    const deleteZoneEntry = entries.find((entry) => entry.id === 'delete-zone');
    return deleteZoneEntry ? [deleteZoneEntry] : closestCenter(entries, draggable);
  };*/
 {/*
  if(over && over.id === 'delete-zone') {
      dispatch(deleteTask(active.id));
      return;
    }
    

  {/* Delete Task Fab 
 <Box ref={setDeleteRef}
 sx={{
   position:'fixed',
   bottom:'1rem',
   right:'1rem',
   backgroundColor: isOverDelete ? '#FF4C4C' : '#FF6F61',
   borderRadius: '50%',
       width: '56px',
       height: '56px',
       display: 'flex',
       alignItems: 'center',
       justifyContent: 'center',
       boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
       zIndex: 1000, // Ensure it's above other elements
       pointerEvents:'all',
 }}><DeleteIcon sx={{ color: 'white' }}/></Box> */}
 