# To-Do List Application

A simple yet feature-rich To-Do List web application that allows users to manage tasks, categorize them, and track completion. This application utilizes local storage to save tasks, ensuring persistence even after the page is refreshed.

## Features

- **Add Tasks**: Add new tasks with a name and category.
- **Category Selection**: Select one or more categories for each task.
- **Mark Tasks as Completed**: Toggle task completion status.
- **Filter Tasks**: View all tasks or filter to see only completed tasks.
- **Edit Tasks**: Modify the task name or category.
- **Delete Tasks**: Remove individual tasks or clear all tasks.
- **Persistent Storage**: All tasks are saved to local storage and persist even after page reloads.
- **Responsive Design**: The app is fully responsive and works well on both desktop and mobile devices.

## Technologies Used

- **HTML**: For structuring the web pages.
- **CSS**: For styling and making the app responsive.
- **JavaScript**: For functionality such as adding, editing, completing, and deleting tasks.
- **LocalStorage**: To persist task data even after page reloads.

## Getting Started

To get started with this project, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/theawmirs/To-Do-List.git
cd to-do-list-app
```

### 2. Open the Project in Your Browser

You can directly open the `index.html` file in your browser:

```bash
open index.html
```

Or you can run a local server if you prefer.

### 3. Usage

- **Add Tasks**: Enter a task name in the input field and select at least one category, then click the "Add Task" button.
- **View Tasks**: Tasks are displayed in a list. You can filter between all tasks or completed tasks.
- **Complete Tasks**: Click on a task to mark it as completed or uncompleted.
- **Edit Tasks**: Click the edit icon on a task to modify its name or category.
- **Delete Tasks**: Click the delete icon on a task to remove it or use the "Clear Tasks" button to remove all tasks.
- **Task Categories**: Tasks can be grouped under categories for better organization.

### 4. Customization

- **Categories**: Modify the categories in the HTML or extend functionality to allow dynamic category creation.
- **UI**: Feel free to customize the styling and layout in the CSS files.

## Folder Structure

```
/to-do-list-app
│
├── css
│   ├── normalize.css      # Normalize CSS for consistent styling across browsers
│   └── styles.css         # Custom CSS styles for the app
│
├── script
│   └── app.js             # JavaScript file containing app functionality
│
└── index.html             # Main HTML page
```

## Contributing

1. Fork this repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements

- The project uses simple web technologies: HTML, CSS, and JavaScript.
