'use strict'

// Fetch existing todos from localStorage
const getSavedTodos = () => {
    try {
        return localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []
    } catch (e) {
        return []
    }
}

// Toggle todo
const toggle = (id) => {
    const modifyTodo = toDo.find((todo) => todo.id === id)
    if (modifyTodo) {
        modifyTodo.completed = !modifyTodo.completed
    }
}

// Remove todo
const removeTodo = (id) => {
    const removeIndex = toDo.findIndex((todo) => id === todo.id)
    if (removeIndex > -1) {
        toDo.splice(removeIndex, 1)
    }
}

// Save todos to localStorage
const saveTodos = (todo) => {
    localStorage.setItem('todos', JSON.stringify(todo))
}

// Render application todos based on filter
const renderTodos = (todos, filters, hideCompleted) => {
    const filteredToDo = todos.filter((todo) => todo.text.toLowerCase().includes(filters.searchText.toLowerCase()))
    let taskLeft = filteredToDo.filter((todo) => !todo.completed)
    let toDoLeft
    if (hideCompleted.check) {
        toDoLeft = taskLeft
    } else {
        toDoLeft = filteredToDo
    }
    document.querySelector('#summary').innerHTML = ''
    document.querySelector('#summary').appendChild(generateSummaryDOM(taskLeft))
    
    document.querySelector('#todo').innerHTML = ''
    toDoLeft.forEach((todo) => {
        document.querySelector('#todo').appendChild(generateTodoDOM(todo))
    })
}

// Get DOM elements for an individual todo
const generateTodoDOM = (todo) => {
    let todoEl = document.createElement('div')
    // setup checkbox
    let checkboxEl = document.createElement('input')
    checkboxEl.setAttribute('type', 'checkbox')
    todoEl.appendChild(checkboxEl)
    if (todo.completed) {
        checkboxEl.checked = true
    }
    checkboxEl.addEventListener('change', (e) => {
        toggle(todo.id)
        saveTodos(toDo)
        renderTodos(toDo, filters, hideCompleted)
    })

    // setup todo text element
    let textEl = document.createElement('span')
    textEl.textContent = todo.text
    todoEl.appendChild(textEl)
    // setup remove todo button
    let buttonEl = document.createElement('button')
    buttonEl.textContent = 'x'
    todoEl.appendChild(buttonEl)
    buttonEl.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(toDo)
        renderTodos(toDo, filters, hideCompleted)
    })    

    return todoEl
}

// Get the DOM element for list summary
const generateSummaryDOM = (taskLeftArray) => {
    const summary = document.createElement('h1')
    summary.textContent = `You have ${taskLeftArray.length} todos left`
    return summary
} 





