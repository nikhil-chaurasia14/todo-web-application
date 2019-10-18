'use strict'

const toDo = getSavedTodos()

const filters = {
    searchText: ''
}
const hideCompleted = {
    check: false
}

renderTodos(toDo, filters, hideCompleted)

document.querySelector('#enter-input').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderTodos(toDo, filters, hideCompleted)
    console.log(hideCompleted.check)
})

document.querySelector('#todo-form').addEventListener('submit', (e) => {
    e.preventDefault()
    toDo.push({
        id: uuidv4(),
        text: e.target.elements.newTodo.value,
        completed: false
    })
    saveTodos(toDo)
    console.log(e.target.elements.newTodo.value)
    e.target.elements.newTodo.value = ''
    console.log(toDo)
    renderTodos(toDo, filters, hideCompleted)
})

document.querySelector('#hideCompleted').addEventListener('change', (e) => {
    console.log(e.target.checked)
    hideCompleted.check = e.target.checked
    renderTodos(toDo, filters, hideCompleted)
})













