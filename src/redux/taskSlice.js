import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks : [],
};
const taskSlice = createSlice({
    name : 'tasks',
    initialState,
    reducers : {
        addTask :(state, action)=> {
            state.tasks.push(action.payload);
        },
        deleteTask : (state,action) => {
            state.tasks = state.tasks.filter((task)=> task.id !== action.payload);
        },
        updateTask : (state,action) => {
            const {id, updates} = action.payload;
            const task = state.tasks.find((task)=> task.id === id);
            if(task) {
                Object.assign(task,updates);
            }
        },
        
    },
    
});

export const  {addTask,deleteTask,updateTask} = taskSlice.actions;

export default taskSlice.reducer;