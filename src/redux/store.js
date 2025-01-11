import {configureStore} from '@reduxjs/toolkit';
import taskReducer from './taskSlice.js';
// Configure the Redux store with the `taskReducer` for state management
export const store = configureStore({
    reducer: {
        tasks:taskReducer, // Register the task reducer
    },
});

export default store;