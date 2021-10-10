import './style.css'
import Lock from './lock_icon.jpg'
import UnLock from './unlock_icon.jpg'
import lockAction from './action.js'
import resComponent from './reservation.js'

//Register Service-Worker
if('serviceWorker' in navigator){
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
        .then(registration => {
            console.log('SW Registered: ', registration)
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError)
        })    
    })
}

//HTML ELements
const lockIcon = new Image()
var container 

var title = document.createElement('h1')
var body = document.querySelector('body')

var resDiv = document.createElement('div')
var resButton = document.createElement('button')


function component(){

    //Load HTML ELements
    container = document.createElement('div')
    container.classList.add('container')

    title.innerHTML = "Locked"
    lockIcon.src = Lock
    container.appendChild(title)
    container.appendChild(lockIcon)
    body.appendChild(container)
    console.log('component loaded')

    resButton.innerHTML = "Make A Reservation"
    resDiv.appendChild(resButton)
    container.appendChild(resDiv)
    return container
}

document.body.appendChild(component())

lockIcon.addEventListener('click', () => {
    lockAction(lockIcon, Lock, UnLock, title)
})

var timeSetform = document.createElement('form')
timeSetform.id = "timeSetForm"
timeSetform.style.display = 'none'
container.appendChild(timeSetform)
resComponent(timeSetform)
resButton.addEventListener('click', () => {
    if(timeSetform.style.display == 'block')
        timeSetform.style.display = 'none'
    else
        timeSetform.style.display = 'block'
})
