import { createSlice } from "@reduxjs/toolkit";

// Fetch tasks from localStorage, or return an empty array if none are found
const localTasksFromStorage = () => {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
};
// Fetch the search query from localStorage, or default to an empty string
const localSearchQueryFromStorage = ()=> {
    return localStorage.getItem("searchQuery") || "";
};
// Define the initial state with tasks and searchQuery from localStorage
const initialState = {
    tasks : localTasksFromStorage(), // Load saved tasks
    searchQuery : localSearchQueryFromStorage(),// Load saved search query
};

// Create a Redux slice for task management
const taskSlice = createSlice({
    name : 'tasks',
    initialState,
    reducers : {
        // Add a new task
        addTask :(state, action)=> {
            state.tasks.push(action.payload);
            localStorage.setItem("tasks",JSON.stringify(state.tasks));// Save tasks
        },
        // Delete a task
        deleteTask : (state,action) => {
            state.tasks = state.tasks.filter((task)=> task.id !== action.payload);
            localStorage.setItem("tasks",JSON.stringify(state.tasks)); // Save tasks
        },
        // Update an existing task
        updateTask : (state,action) => {
            const {id, updates} = action.payload;
            const task = state.tasks.find((task)=> task.id === id);
            if(task) {
                Object.assign(task,updates);
                localStorage.setItem("tasks",JSON.stringify(state.tasks)); // Save tasks
            }
        },
        // Update the search query
        updateSearchQuery: (state,action) => {
            state.searchQuery = action.payload;
            localStorage.setItem("searchQuery",action.payload); // Save search query
        },
    },
});

// Export the reducer and actions for use in the app
export const  {addTask,deleteTask,updateTask,updateSearchQuery} = taskSlice.actions;

export default taskSlice.reducer;