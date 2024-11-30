const newTaskInput = document.querySelector(".new-task-input");
const addNewTaskBtn = document.querySelector(".add-task-btn");

window.addEventListener("load", () => {
  newTaskInput.focus();
});

//Functions
function message(type, textContent, parent, insertBefore) {
  const existingError = document.querySelector(".error");
  const existingSuccess = document.querySelector(".success");

  if (existingError) {
    existingError.remove();
  }

  if (existingSuccess) {
    existingSuccess.remove();
  }

  const message = document.createElement("h2");
  message.classList.add(type);
  message.textContent = textContent;
  if (insertBefore) {
    parent.insertBefore(message, insertBefore);
  } else {
    parent.appendChild(message);
  }

  setTimeout(() => {
    message.remove();
  }, 2000);
}

function createTask(taskContent) {
  const taskStorage = JSON.parse(localStorage.getItem("toDoList")) || [];
  const matchingTask = taskStorage.find((task) => task.name === taskContent);
  const isCompleted = matchingTask && matchingTask.isCompleted;

  // Append item to the list
  const taskItem = document.createElement("li");
  taskItem.classList.add("task");

  const parent = isCompleted
    ? document.querySelector(".completed-task-list")
    : document.querySelector(".task-list");

  parent.appendChild(taskItem);

  // Append span to taskItem
  const taskName = document.createElement("span");
  isCompleted
    ? taskName.classList.add("task-name", "complete")
    : taskName.classList.add("task-name");

  taskName.textContent = taskContent;
  taskItem.appendChild(taskName);

  //Append task created date to the taskItem
  const taskCreatedDate = matchingTask ? matchingTask.createdDate : "";
  const taskDate = document.createElement("span");
  taskDate.classList.add("task-created-date");
  taskDate.textContent = taskCreatedDate;
  taskItem.appendChild(taskDate);

  // Append Btn container
  const btnContainer = document.createElement("div");
  btnContainer.classList.add("task-btn-container");
  taskItem.appendChild(btnContainer);

  // Append edit button
  const editBtn = document.createElement("i");
  editBtn.classList.add("bx", "bxs-message-square-edit", "edit-task-btn");
  btnContainer.appendChild(editBtn);

  // Append delete button
  const deleteBtn = document.createElement("i");
  deleteBtn.classList.add("bx", "bxs-x-circle", "delete-task-btn");
  btnContainer.appendChild(deleteBtn);

  // Append task categories as tags to each task
  if (matchingTask) {
    const tagsContainer = document.createElement("div");
    tagsContainer.classList.add("task-tags-container");
    taskItem.appendChild(tagsContainer);

    matchingTask.category.forEach((category) => {
      const taskCategory = document.createElement("span");

      if (category === "Work") {
        taskCategory.classList.add("task-tag-work");
      } else if (category === "Personal") {
        taskCategory.classList.add("task-tag-personal");
      } else if (category === "School") {
        taskCategory.classList.add("task-tag-school");
      }

      taskCategory.textContent = category;
      tagsContainer.appendChild(taskCategory);
    });
  }

  return;
}

function deleteTask(listName, taskClassName) {
  listName.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-task-btn")) {
      const taskToRemove = e.target.closest(taskClassName);

      if (taskToRemove) {
        taskToRemove.remove();

        const parent = document.querySelector(".todolist");
        const insertBefore = document.querySelector(".task-list");
        message("error", "Task has been removed!", parent, insertBefore);

        //Remove task from local storage
        const taskName = taskToRemove.querySelector(".task-name").textContent;
        console.log(taskToRemove);
        const taskStorage = JSON.parse(localStorage.getItem("toDoList")) || [];
        const updatedTasks = taskStorage.filter(
          (task) => task.name !== taskName
        );

        localStorage.setItem("toDoList", JSON.stringify(updatedTasks));
        checkExistingTask();
      }
      return;
    }
  });
}

function editTask(taskList, taskClassName, isCompleted) {
  taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-task-btn")) {
      const taskToEdit = e.target.closest(taskClassName);
      if (taskToEdit) {
        const taskText = taskToEdit.querySelector(".task-name");
        taskText.remove();

        //Hide delete and task
        taskToEdit.querySelector(".edit-task-btn").style.display = "none";
        taskToEdit.querySelector(".delete-task-btn").style.display = "none";

        const btnContainer = taskToEdit.querySelector(".task-btn-container");
        const checkMark = document.createElement("i");
        checkMark.classList.add("bx", "bxs-check-circle", "checkMark");
        btnContainer.appendChild(checkMark);

        //Create input for new task entry
        const editTaskInput = document.createElement("input");
        editTaskInput.classList.add("edit-task-input");
        editTaskInput.placeholder = " Enter your new task name";
        editTaskInput.value = taskText.textContent;
        taskToEdit.insertBefore(editTaskInput, btnContainer);

        //Focusing in new created Input
        const newTaskInput = taskToEdit.querySelector(".edit-task-input");
        newTaskInput.focus();

        //Apply the edited task to the previous task
        editTaskInput.addEventListener("blur", () => {
          //Will throw and error if the input valie is empty
          const parent = document.querySelector(".todolist");
          const insertBefore = document.querySelector(".task-list");
          const editInput = document.querySelector(".edit-task-input");
          if (editInput.value.length === 0) {
            message("error", "Input cannot be empty!", parent, insertBefore);
            editInput.focus();
            return;
          }

          const newTask = document.createElement("span");
          if (isCompleted) {
            newTask.classList.add("task-text", "complete");
          } else {
            newTask.classList.add("task-text");
          }
          newTask.textContent = editTaskInput.value;
          taskToEdit.insertBefore(newTask, btnContainer);

          editTaskInput.remove();

          //Update task to the local storage
          const taskStorage =
            JSON.parse(localStorage.getItem("toDoList")) || [];

          const updatedTasks = taskStorage.map((task) => {
            if (task.name === taskText.textContent) {
              task.name = editTaskInput.value;
            }
            return task;
          });
          localStorage.setItem("toDoList", JSON.stringify(updatedTasks));

          // Reload tasks
          taskList.innerHTML = "";
          completedTaskList.innerHTML = "";
          loadTask();
        });
      }
    }
  });
}

function completeTask(e, isCompleting, taskListTarget) {
  const taskToEdit = e.target.closest(".task-name");
  if (taskToEdit) {
    if (isCompleting) {
      taskToEdit.classList.add("complete");

      const parent = document.querySelector(".todolist");
      const insertBefore = document.querySelector(".task-list");
      message("success", "Task has been Completed", parent, insertBefore);
    } else {
      taskToEdit.classList.remove("complete");

      const parent = document.querySelector(".todolist");
      const insertBefore = document.querySelector(".task-list");
      message("success", "Task has been restored!", parent, insertBefore);
    }

    const task = e.target.closest(".task");
    taskListTarget.appendChild(task);

    //Update the local storage
    const taskStorage = JSON.parse(localStorage.getItem("toDoList")) || [];
    const updatedTasks = taskStorage.map((task) => {
      if (task.name === taskToEdit.textContent) {
        task.isCompleted = isCompleting;
      }
      return task;
    });
    localStorage.setItem("toDoList", JSON.stringify(updatedTasks));
    checkExistingTask();
  }
}

//No task is here!Create one now! text
function noTaskFound() {
  const taskList = document.querySelector(".task-list");
  const noTaskFoundText = document.createElement("h2");
  noTaskFoundText.classList.add("no-task-found");
  noTaskFoundText.textContent = "No task is here!";
  taskList.appendChild(noTaskFoundText);

  const createOne = document.createElement("span");
  createOne.classList.add("no-task-found", "create-one");
  createOne.textContent = "Create one now!";
  noTaskFoundText.appendChild(createOne);

  createOne.addEventListener("click", () => {
    newTaskInput.focus();
  });
}

function checkExistingTask() {
  const taskList = document.querySelector(".task-list");

  const noTaskFoundText = document.querySelector(".no-task-found");
  const existingTask = taskList.querySelector(".task");
  const clearAllTaskBtn = document.querySelector(".clear-all-task-btn");

  if (existingTask) {
    noTaskFoundText.classList.add("hidden");
    clearAllTaskBtn.classList.remove("hidden");
    return;
  }
  noTaskFoundText.classList.remove("hidden");
  clearAllTaskBtn.classList.add("hidden");
}

//Show current day under toDoList main title
const showDate = document.createElement("h2");
const date = new Date();
const dateTime = `${date.getFullYear()}-${
  date.getMonth() + 1
}-${date.getDate()} `;
showDate.classList.add("current-day");
showDate.textContent = `Today is: ${dateTime}`;
document
  .querySelector(".todolist")
  .insertBefore(showDate, document.querySelector(".new-task"));

//Selecting each category
const taskCategoryContainer = document.querySelector(".task-categories");

taskCategoryContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("task-category")) {
    const label = e.target.closest("label");

    if (label) {
      label.classList.toggle("checked-label");
    }
  }
});

//Add new task
addNewTaskBtn.addEventListener("click", () => {
  const taskInput = newTaskInput.value;
  const parent = document.querySelector(".todolist");
  const insertBefore = document.querySelector(".task-list");
  const taskStorage = JSON.parse(localStorage.getItem("toDoList")) || [];

  if (taskInput.length === 0) {
    message("error", "Task input cannot be empty!", parent, insertBefore);
    return;
  }

  //Will throw and error if the entered task is already exist in the local storage
  const existingTask = taskStorage.find((task) => taskInput === task.name);

  if (existingTask) {
    message(
      "error",
      "This task is already exist! enter a new one.",
      parent,
      insertBefore
    );
    return;
  }

  //Find the selected category
  const selectedCategories = Array.from(
    document.querySelectorAll(".task-category")
  )
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.parentElement.textContent.trim());

  if (selectedCategories.length === 0) {
    message(
      "error",
      "You have to select atleast one category",
      parent,
      insertBefore
    );
    return;
  }

  message("success", "Task has been added :)", parent, insertBefore);

  const taskDate = new Date();
  const taskCreatedDate = taskDate.toLocaleDateString();
  //Save data to Local Storage
  const taskData = {
    name: taskInput,
    isCompleted: false,
    category: selectedCategories,
    createdDate: taskCreatedDate,
  };

  taskStorage.push(taskData);
  localStorage.setItem("toDoList", JSON.stringify(taskStorage));

  createTask(taskInput);

  newTaskInput.value = "";

  newTaskInput.focus();
  //Reset all checkbox
  document
    .querySelectorAll(".task-category")
    .forEach((checkbox) => (checkbox.checked = false));
  checkExistingTask();

  document
    .querySelectorAll(".checkbox-label")
    .forEach((label) => label.classList.remove("checked-label"));
});

//Task's category
const allTasks = document.querySelector(".all-tasks");
const completedTasks = document.querySelector(".completed-tasks");

//Check fo all tasks
allTasks.addEventListener("click", () => {
  allTasks.classList.remove("non-active-tab");
  completedTasks.classList.add("non-active-tab");

  const allTaskList = document.querySelector(".task-list");
  allTaskList.classList.remove("hidden");

  const completedTaskList = document.querySelector(".completed-task-list");
  completedTaskList.classList.add("hidden");
});

//Check for completed tasks
completedTasks.addEventListener("click", () => {
  allTasks.classList.add("non-active-tab");
  completedTasks.classList.remove("non-active-tab");

  const allTaskList = document.querySelector(".task-list");
  allTaskList.classList.add("hidden");

  const completedTaskList = document.querySelector(".completed-task-list");
  completedTaskList.classList.remove("hidden");
});

//Check for completed tasks
const toDoList = document.querySelector(".todolist");

//Create completed task list
const completedTaskList = document.createElement("ul");
completedTaskList.classList.add("completed-task-list", "hidden");
toDoList.appendChild(completedTaskList);

if (allTasks.classList.contains("hidden")) {
  completedTaskList.classList.remove("hidden");
} else {
  completedTaskList.classList.add("hidden");
}

const taskList = document.querySelector(".task-list");

noTaskFound();

//Complete task
taskList.addEventListener("click", (e) => {
  completeTask(e, true, completedTaskList);
});

// unComplete task
completedTaskList.addEventListener("click", (e) => {
  completeTask(e, false, taskList);
});

//Edit task
editTask(taskList, ".task", false);

//Delete task
deleteTask(taskList, ".task");

// Edit completed tasks
editTask(completedTaskList, ".task", true);

// Delete completed tasks
deleteTask(completedTaskList, ".task");

//Clear all tasks
const clearAllTaskBtnContainer = document.createElement("div");
clearAllTaskBtnContainer.classList.add("clear-all-task-btn-container");
toDoList.appendChild(clearAllTaskBtnContainer);

const clearAllTaskBtn = document.createElement("button");
clearAllTaskBtn.classList.add("clear-all-task-btn", "hidden");
clearAllTaskBtn.textContent = "Clear tasks";
clearAllTaskBtnContainer.appendChild(clearAllTaskBtn);

//Clear all task btn function
clearAllTaskBtn.addEventListener("click", () => {
  const allTasks = document.querySelectorAll(".task");
  allTasks.forEach((task) => task.remove());

  const parent = document.querySelector(".todolist");
  const insertBefore = document.querySelector(".task-list");
  message("success", "All tasks has been removed :)", parent, insertBefore);

  //Remove all tasks from local storage
  localStorage.removeItem("toDoList");
  checkExistingTask();
});

//Load every saved tasks from Local Storage
function loadTask() {
  const taskStorage = JSON.parse(localStorage.getItem("toDoList")) || [];

  taskStorage.forEach((task) => createTask(task.name));
  checkExistingTask();
}

loadTask();
