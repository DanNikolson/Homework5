let formValidation = (data, tasks) => {
  let msg = document.querySelector("#msg");
  let add = document.querySelector("#add");

  if (textInput.value === "") {
    msg.innerHTML = "Task cannot be blank";
  } else {
    msg.innerHTML = "";

    acceptData(data, tasks);
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let acceptData = (data, tasks) => {

  let textInput = document.querySelector("#textInput").value;
  let dateInput = document.querySelector("#dateInput").value;
  let textArea = document.querySelector("textarea").value;

  data.push({
    id: Date.now(),
    text: textInput,
    date: dateInput,
    description: textArea,
  });

  createTasks(data, tasks);
};

let createTasks = (data, tasks) => {
  tasks.innerHTML = "";

  data.forEach((item) => {
    tasks.innerHTML += `
    <main id=${item.id}>
          <span class="fw-bold">${item.text}</span>
          <span class="small text-secondary">${item.date}</span>
          <p>${item.description}</p>
  
          <span class="options">
            <i data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit editButton"></i>
            <i class="fas fa-trash-alt deleteButton"></i>
          </span>
        </main>
    `;
  });
};

let deleteTask = (event, data, tasks) => {
  let id = event.target.closest("main").id;
  let index = data.findIndex((item) => item.id === +id);

  data.splice(index, 1);
  createTasks(data, tasks);
};


let editTask = (event, data, tasks) => {
  deleteTask(event, data, tasks);
};

let init = () => {
  let data = [];
  let form = document.querySelector("#form");
  let tasks = document.querySelector("#tasks");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    formValidation(data, tasks);
  });


  tasks.addEventListener("click", (event) => {
    if (event.target.classList.contains("editButton")) {
      editTask(event, data, tasks);
    }

    if (event.target.classList.contains("deleteButton")) {
      deleteTask(event, data, tasks);
    }
  });
};

init();

