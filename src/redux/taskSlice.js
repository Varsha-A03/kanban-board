import { createSlice } from "@reduxjs/toolkit";

const localTasksFromStorage = () => {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
};
const localSearchQueryFromStorage = ()=> {
    return localStorage.getItem("searchQuery") || "";
};
const initialState = {
    tasks : localTasksFromStorage(),
    searchQuery : localSearchQueryFromStorage(),
};

const taskSlice = createSlice({
    name : 'tasks',
    initialState,
    reducers : {
        addTask :(state, action)=> {
            state.tasks.push(action.payload);
            localStorage.setItem("tasks",JSON.stringify(state.tasks));// Save tasks
        },
        deleteTask : (state,action) => {
            state.tasks = state.tasks.filter((task)=> task.id !== action.payload);
            localStorage.setItem("tasks",JSON.stringify(state.tasks)); // Save tasks
        },
        updateTask : (state,action) => {
            const {id, updates} = action.payload;
            const task = state.tasks.find((task)=> task.id === id);
            if(task) {
                Object.assign(task,updates);
                localStorage.setItem("tasks",JSON.stringify(state.tasks)); // Save tasks
            }
        },
        updateSearchQuery: (state,action) => {
            state.searchQuery = action.payload;
            localStorage.setItem("searchQuery",action.payload); // Save search query
        },
    },
});

export const  {addTask,deleteTask,updateTask,updateSearchQuery} = taskSlice.actions;

export default taskSlice.reducer;