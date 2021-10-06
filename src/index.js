import './style.css'
import Lock from './lock_icon.jpg'
import UnLock from './unlock_icon.jpg'
import lockAction from './action.js'

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
var tile 
var title = document.createElement('h1')
var body = document.querySelector('body')

function component(){

    //Load HTML ELements
    tile = document.createElement('div')
    tile.classList.add('tile')

    title.innerHTML = "Locked"
    lockIcon.src = Lock
    tile.appendChild(title)
    tile.appendChild(lockIcon)
    body.appendChild(tile)
    console.log('component loaded')
    return tile
}


document.body.appendChild(component())

lockIcon.addEventListener('click', () => {
    lockAction(lockIcon, Lock, UnLock, title)
})






