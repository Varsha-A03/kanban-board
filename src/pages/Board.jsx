import React,{useState} from 'react';
import { Box,Button,Fab, TextField} from '@mui/material';
import Column from '../components/Column';
import { DragDropContext} from 'react-beautiful-dnd';
import AddIcon from '@mui/icons-material/Add';

const boardStyles = {
  container : {
    backgroundColor : '#E8E4EF',
    padding : '2rem',
    borderRadius : '10px',
    boxShadow : ' 0 2px 5px rgba(0, 0, 0, 0.1)',
    display : 'flex',
    justifyContent : 'space-between',
    width : '85%',
    margin : '0 auto',
  },
}
export default function Board() {
  const [showTaskForm,setShowTaskForm]=useState(false);
  const [taskTitle,setTaskTitle]=useState('');
  const [taskdescription,setTaskDescription]=useState('');

  const addTask = () => {
    const newTask = {
      id: Date.now(),
      title:taskTitle,
      description:taskdescription,
      stage:'To Do',
    };
    setTasks([...tasks, newTask]);
    setTaskTitle('');
    setTaskDescription('');
    setShowTaskForm(false);
  }

  const [tasks, setTasks] = useState([
    { id: '1', title: 'Task 1', description: 'Description 1', stage: 'To Do' },
    { id: '2', title: 'Task 2', description: 'Description 2', stage: 'In Progress' },
    { id: '3', title: 'Task 3', description: 'Description 3', stage: 'Peer Review' },
    { id: '4', title: 'Task 4', description: 'Description 4', stage: 'Done' },
  ]);
  const stages = ['To Do', 'In Progress', 'Peer Review', 'Done'];
  const handleDragEnd = (result) => {
    console.log("Drag Result:", result);

    const { source, destination } = result;

    // if dropped outside  a valid column or if is at same position do nothing just return
    if (!result.destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return}; 

    const sourceStage = source.droppableId;
    const destinationStage = destination.droppableId;

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
  };

  return (
    <>
    {/*Drag and drop context */}
    <DragDropContext onDragEnd={handleDragEnd}>
      <Box sx={boardStyles.container}>
        {
          stages.map((stage,index)=>(
            <Column title={stage} index={index} tasks={tasks} id={stage} />
          ))
        }
      </Box>
    </DragDropContext>
    {/*FAB floating action button component */}
    <Fab color='primary' 
      sx={{
        position:'fixed',
        bottom:'2rem',
        right:'2rem',
      }}
      onClick={()=>setShowTaskForm(true)}
    >
      <AddIcon />
    </Fab>
    {/*show task form */}
    {showTaskForm && (
      <Box 
        sx={{position:'fixed',bottom:'10rem',right:'2rem',padding:'2px',
          backgroundColor:'white',borderRadius:'2px',boxShadow:'3'
        }}
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
          <Button onClick={addTask}>Add Task</Button>
          <Button onClick={()=>setShowTaskForm(false)}>Cancel</Button>
        </Box>
      </Box>
    )}
    </>
  );
}
