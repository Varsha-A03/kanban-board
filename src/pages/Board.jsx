import React,{useState} from 'react';
import { Box,Button,Fab, TextField} from '@mui/material';
import Column from '../components/Column';
import { DragDropContext} from 'react-beautiful-dnd';
import AddIcon from '@mui/icons-material/Add';
import { useSelector, useDispatch } from 'react-redux';
import { addTask,updateTask } from '../redux/taskSlice';

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
  
  const dispatch = useDispatch();
  const tasks = useSelector((state)=>state.tasks.tasks);

  const stages = ['To_Do', 'In_Progress', 'Peer_Review', 'Done'];

  const handleAddTask = () => {
    const newTask = {
      id: `${Date.now()}`,
      title:taskTitle,
      description:taskdescription,
      stage:'To_Do',
    };
    dispatch(addTask(newTask));
    console.log(tasks);
    setTaskTitle('');
    setTaskDescription('');
    setShowTaskForm(false);
  };

  const deleteTask = (taskId) => {
    setTaskDescription()
  }
  
  const handleDragEnd = (result) => {
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

  return (
    <>
    {/*Drag and drop context */}
    {console.log(tasks)}
    <DragDropContext onDragEnd={handleDragEnd}>
      <Box sx={boardStyles.container}>
        {
          stages.map((stage)=>(
            <Column key={stage} title={stage} tasks={tasks} id={stage}/>
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
          <Button onClick={handleAddTask}>Add Task</Button>
          <Button onClick={()=>setShowTaskForm(false)}>Cancel</Button>
        </Box>
      </Box>
    )}
    </>
  );
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
    setTasks(updatedTasks);*/