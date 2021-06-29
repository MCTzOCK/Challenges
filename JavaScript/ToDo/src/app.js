/**
 * @author Ben Siebert
 * @copyright 2018-2021 Ben Siebert. All rights reserved.
 */

const fs = require('fs')
const path = require('path')

let tasks = JSON.parse(fs.readFileSync(path.join(__dirname, 'tasks.json')).toString())

window.onload = function () {
    tasks.forEach(task => {
        addTask(task, false)
    })

    setInterval(() => {
        save()
    }, 100)
}

function save(){
    tasks.splice(0, tasks.length)
    document.querySelectorAll('.listItemTitle').forEach(e => {
        tasks.push(e.innerText)
    })
    fs.writeFileSync(path.join(__dirname, 'tasks.json'), JSON.stringify(tasks))
}

function addTask(title, addToJSON) {
    if (addToJSON) {
        tasks.push(title)
    }
    let r = document.createElement('div')
    let b = document.createElement('button')
    let t = document.createElement('h3')

    r.classList.add('listItem')
    b.classList.add('listItemChange')
    t.classList.add('listItemTitle')

    t.innerText = title
    t.contentEditable = "true"

    b.innerText = "☒"

    b.setAttribute('onclick', 'deleteTask(this)')
    b.setAttribute('task-name', title)

    r.appendChild(b)
    r.appendChild(t)

    document.getElementById('list').appendChild(r);
}

function deleteTask(button) {
    tasks.splice(tasks.indexOf(button.getAttribute("task-name")), 1)
    fs.writeFileSync(path.join(__dirname, 'tasks.json'), JSON.stringify(tasks))
}
