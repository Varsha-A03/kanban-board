# Kanban Board Application 

### Overview
The Kanban Board is a task management application built using ReactJS, Redux, and DnD Kit. It allows users to:
Add, update, delete, and move tasks between columns.

Search for tasks by title.

Persist tasks and search queries in local storage.

Work seamlessly on all device sizes (responsive design).

Drag-and-drop tasks with smooth interactions and feedback.

## Features 

`Drag-and-Drop Functionality`: Move tasks between columns using DnD Kit.

`Task Search`: Search for tasks by title, with results dynamically displayed.

`Local Storage`: Tasks and search queries are saved in the browser's local storage for persistence.

`Responsive Design`: Adapts to all screen sizes, including mobile and tablet views.

`Dynamic Columns`: Columns adjust size dynamically and display scrollbars for overflowing tasks.

## Prerequisites

Before setting up the application, ensure you have the following installed:
```
Node.js (v14 or later)  
npm 
```

## Installation and Setup
1. Clone the Repository
    ```
    git clone <repository-url>
    cd kanban-board
    ```
2. Install Dependecies: Run the following command to install the required dependencies  
    ```
    npm install
    ```
3. Run the Application: Start the development server:
    ```
    npm start
    ```
The application will run at http://localhost:3000/.  

4. Build for Production: To create a production build  
    ``` 
    npm run build
    ```

## Application Structure

```
src/
├── components/
│   ├── Board.jsx       # Main component managing the Kanban board
│   ├── Column.jsx      # Column component for task organization
│   ├── TaskCard.jsx   # Individual task card component
│   └── Header.jsx     # Header with search functionality
├── redux/
│   ├── store.js       # Redux store setup
│   └── taskSlice.js   # Redux slice for task management
├── App.css               # Global styles
├── App.js                # Root component
├── index.js             # Application entry point
└── utils/
      └── useDebounce.js  # Custom hook for debounced search
```

## Key Features Implementation
 
1. Drag-and-Drop  
```DnD Kit```: Used ```useDraggable``` for tasks and ```useDroppable``` for columns and the delete zone.  
```DragOverlay```: Displays a floating task during drag-and-drop to avoid layout shifts.  
2. Search Functionality  
Search Input: Updates the Redux ```searchQuery``` state.  
Debounced Search: A custom ```useDebounce``` hook delays search execution for better performance.  
3. Local Storage
    Tasks and search queries persist between browser sessions using ```localStorage```.  
    Local storage is updated whenever tasks or search queries change.  
4. Responsive Design  
    Used CSS media queries to stack columns vertically on smaller screens.  
    Adjusted task and column dimensions dynamically for all device sizes.

## Usage
1. Add a Task   
    Click the Add Task button (floating action button) to open the task creation form.
    Enter the task title and description, then click Add Task.
2. Search for Tasks  
    Use the search bar to type the task title.
    Tasks matching the query will be displayed dynamically.
3. Drag-and-Drop Tasks  
    Click and hold a task card to drag it.
    Drop the task in a desired column to update its status.
4. Clear All Data  
Click the Clear All button (floating action button) to remove all tasks and reset the board.

## Issues and Edge Cases Addressed
Tasks are persisted across sessions using local storage.

Columns always render, even when empty.

"No matches found" is displayed when search queries return no results.

Scroll locking during drag-and-drop to avoid unintended scrolling.

Tasks are dynamically re-rendered based on the search query or state changes.

## Future Enhancements
Add user authentication for multiple users.

Implement drag-and-drop animations.

Allow reordering tasks within a column.

Add due dates and priority levels to tasks.

## Contributions
Contributions are welcome! Feel free to fork the repository and submit pull requests with improvements or fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.