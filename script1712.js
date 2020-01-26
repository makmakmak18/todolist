const tasks = [
    {
      id: 1,
      title: "Выучить JS",
      text: "Ходить на курс, делать домашки",
      completed: false
    },
    {
      id: 2,
      title: "Выучить React",
      text: "Ходить на курс, делать домашки читать документацию",
      completed: false
    }
  ];
  (function(arrTasks) {
    const objectOfTasks = arrTasks.reduce((acc, task) => {
      acc[task.id] = task;
      return acc;
    }, {});
    function renderAllTasks(taskList) {
      const fragment = document.createDocumentFragment();
      Object.values(taskList).forEach(task => {
        const li = listItem(task);
        fragment.appendChild(li);
        const list = document.querySelector(".list");
        list.appendChild(fragment);
      });
    }
    function listItem({ id, text, title }) {
      const li = document.createElement("li");
      li.classList.add("item");
      li.setAttribute('data-task-id', id)
      const h3 = document.createElement("h3");
      h3.classList.add("title");
      h3.textContent = title;
  
      const p = document.createElement("p");
      p.classList.add("article");
      p.textContent = text;
  
      const button = document.createElement("button");
      const i = document.createElement("i");
      i.classList.add("fas")
      i.classList.add("fa-trash-alt");
      button.classList.add("btn");
      button.appendChild(i)
      li.appendChild(h3);
      li.appendChild(p);
      li.appendChild(button);
      return li;
    }
    const form = document.querySelector(".form");
    const inputTitle = document.querySelector(".inputTitle");
    const inputBody = document.querySelector(".inputBody");
    const list = document.querySelector('.list')
    function onFormSubmit(event) {
      event.preventDefault();
      const titleValue = inputTitle.value;
      console.log(titleValue);
      const bodyValue = inputBody.value;
      console.log(bodyValue);
      if (!bodyValue || !titleValue) {
        alert("Enter values");
        return null;
      }
      const task = createNewTask(bodyValue, titleValue);
      const listItems = listItem(task);
      const list = document.querySelector(".list");
      list.insertAdjacentElement("afterbegin", listItems);
    }
    function createNewTask(text, title) {
      const newTask = {
        title: title,
        text: text,
        completed: false,
        id: "task" + Math.random()
      };
      objectOfTasks[newTask.id] = newTask;
      return { ...newTask };
    }
    form.addEventListener("submit", onFormSubmit);
    renderAllTasks(objectOfTasks);


function deleteTask(id){
    const isConfirm = confirm('Вы точно хотите удалить? ' + objectOfTasks[id].title)
    if(!isConfirm) return isConfirm;
    delete objectOfTasks[id];
    return isConfirm;
}

  
    function onDeleteHandler(event) {
        console.log(event.target);
        if(event.target.classList.contains('btn')){
            console.log('delete button');
            const parent = event.target.closest('[data-task-id]')
            console.log('parent:', parent)
            const id = parent.dataset.taskId;
            console.log('id', id)
            const confirmed = deleteTask(id)
            if(!confirmed) return;
            parent.remove()
        }
    }

    list.addEventListener('click', onDeleteHandler)
  })(tasks);

  const themes = {
default: {
  '--background': 'white',
  '--text-color': 'black'
},
dark: {
  '--background': 'black',
  '--text-color': 'blue'
}
  }

  const themeSelect = document.getElementById('themeSelect')
  themeSelect.addEventListener('change', onThemeSelectHandler)
  function onThemeSelectHandler () {
    const selectedTheme = themeSelect.value
    const isConfirm = confirm('Are you sure??????')
    if(!isConfirm) return;
    setTheme(selectedTheme)
  }

  function setTheme(name) {
console.log(name)
const selectedThemeOj = themes[name];

  Object.entries(selectedThemeOj).forEach(([key, value]) => {
    console.log(key, value)
    document.documentElement.style.setProperty(key, value)
    document.body.style.setProperty(key, value)
  })    
}