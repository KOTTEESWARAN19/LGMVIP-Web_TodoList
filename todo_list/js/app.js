
const inp = document.querySelector('.taskinp');
const addtask = document.querySelector('.add-task');
const searchtask = document.querySelector('.searchinp');
const clrbtn = document.querySelector('.clear');
const tasklist = document.querySelector('.cuttout');
loading();

function loading()
{
  document.addEventListener('DOMContentLoaded',loadingtask);
  addtask.addEventListener('click',addTask);
  tasklist.addEventListener('click',removeTask);
  clrbtn.addEventListener('click',delTasks);
  searchtask.addEventListener('keyup',filterTask);
}
function loadingtask()
{
  let tasks;
  if(localStorage.getItem('tasks') === null)
  {
    tasks = [];
  }
  else
  {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task)
  {
    addingtasks(task);
  });
}
function filterTask(e)
{
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.rowitem').forEach(function(task)
  {
    const x = task.firstChild.firstChild.value;
    if(text.length>0 && x.toLowerCase().indexOf(text) != -1)
    {
      task.style.border = "3px solid yellow";
      task.firstChild.firstChild.style.border = '2px solid yellow';
    }
    else
    {
      task.style.border = "none";
      task.firstChild.firstChild.style.border = 'none';
    }
  });
  e.preventDefault();
}
var x;
function removeTask(e)
{
  if(e.target.parentElement.classList.contains('del'))
  {
    e.target.parentElement.parentElement.parentElement.remove();
    removeFromLocalStorage(e.target.parentElement.parentElement.parentElement);
  }
  else if(e.target.parentElement.classList.contains('edit'))
  {
    const temp = e.target.parentElement.parentElement.parentElement.firstChild.firstChild;
    if (e.target.className === 'bi bi-pencil-square')
    {
      temp.disabled = false;
      temp.focus();
      temp.style.border = '2px solid orange';
      temp.style.color = 'rgb(105,37,11)';
      e.target.setAttribute("class","bi bi-clipboard-check-fill");
      x = temp.value;
    }
    
    else if(e.target.className === 'bi bi-clipboard-check-fill')
    {
      let tasks;
      if(localStorage.getItem('tasks') === null)
      {
        tasks = [];
      }
      else
      {
        tasks = JSON.parse(localStorage.getItem('tasks'));
      }
      tasks.forEach(function(task,i)
      {
        if(task === x)
        {
          tasks[i] = e.target.parentElement.parentElement.parentElement.firstChild.firstChild.value;
        }
      });
      temp.disabled = true;
      temp.blur();
      temp.style.border = 'none';
      temp.style.color = 'black';
      e.target.setAttribute("class","bi bi-pencil-square");   
      localStorage.setItem('tasks',JSON.stringify(tasks));
    }
  }
  e.preventDefault();
}

function removeFromLocalStorage(taskItem)
{
  let tasks;
  if(localStorage.getItem('tasks') === null)
  {
    tasks = [];
  }
  else
  {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task,i)
  {
    if(taskItem.firstChild.firstChild.value === task)
    {
      tasks.splice(i,1);
    }
  });
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

function delTasks(e)
{
  while(tasklist.firstChild)
  {
    tasklist.removeChild(tasklist.firstChild);
  }
  localStorage.clear();
  e.preventDefault();
}

function addTask(e)
{
  if(inp.value === '')
  {
    alert('Check the input');
  }
  else
  {
    addingtasks(inp.value);
    loadingIntoLocalStorage(inp.value);
    inp.value = '';
  }
  e.preventDefault();
}

function loadingIntoLocalStorage(task)
{
  let tasks;
  if(localStorage.getItem('tasks') === null)
  {
    tasks = [];
  }
  else
  {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks',JSON.stringify(tasks))
}


function addingtasks(val)
{
  const rowitem = document.createElement('div');
    rowitem.className = 'row gx-0 m-2 rowitem';
    const col1 = document.createElement('div');
    col1.className = 'col-10';
    const disp = document.createElement('input');
    disp.className = 'taskentered form-control';
    disp.style.width = '100%';
    disp.style.border = 'none';
    disp.style.fontWeight = 'bold';
    disp.style.background = 'rgb(119, 182,201)';
    disp.value = val;
    disp.setAttribute("type","text");
    disp.disabled = true;
    //********************
    col1.appendChild(disp);

    const col2 = document.createElement('div');
    col2.className = 'col-1';
    col2.style.textAlign = 'center';
    const col3 = document.createElement('div');
    col3.className = 'col-1';
    col3.style.textAlign = 'center';
    const link1 = document.createElement('a');
    link1.className = 'links edit';
    link1.innerHTML = '<i class="bi bi-pencil-square"></i>';
    const link2 = document.createElement('a');
    link2.className = 'links del';
    link2.innerHTML = '<i class="bi bi-trash-fill"></i>';
    //********************
    col2.appendChild(link1);
    col3.appendChild(link2);
    rowitem.appendChild(col1);
    rowitem.appendChild(col2);
    rowitem.appendChild(col3);
    
    //********************* 
    document.querySelector('.cuttout').appendChild(rowitem);
}
