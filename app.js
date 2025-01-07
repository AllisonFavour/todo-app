let form = document.querySelector('form');
let input = document.querySelector('input');
let todos = document.querySelector('.todos');


document.addEventListener('DOMContentLoaded', () => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    storedTodos.forEach(todoText => {
        todos.appendChild(getTodo(todoText));
    })
})



function getTodo(value) {
    let todo = document.createElement('div');
    let textEl = document.createElement('span');

    textEl.innerHTML = value;
    todo.appendChild(textEl);


    let closeEl = document.createElement('span');
    closeEl.innerHTML = '&times;';
    closeEl.classList.add('delete');


    closeEl.addEventListener('click', () => {
        todos.removeChild(todo);
        saveTodos();
    });


    todo.appendChild(closeEl);
    todo.classList.add('todo');

    return todo;
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let value = input.value;

    if(!value) return;

    todos.appendChild(getTodo(value));
    saveTodos();

    input.value = '';
});


function saveTodos() {
    const todoTextList =  Array.from(todos.querySelectorAll('.todo span:first-child'))
            .map(span => span.innerHTML);
    localStorage.setItem('todos', JSON.stringify(todoTextList));
}