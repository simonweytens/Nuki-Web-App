import './style.css'
import Lock from './lock_icon.jpg'
import UnLock from './unlock_icon.jpg'
import lockAction from './action.js'
import resComponent from './reservation.js'


//HTML ELements
const lockIcon = new Image()
var container 

var title = document.createElement('h1')
var body = document.querySelector('body')

var resDiv = document.createElement('div')
resDiv.className = 'nav'
var resButton = document.createElement('button')


function component(){
    //Load HTML ELements
    var btnpush = document.createElement('button')
    var psub = document.createElement('p')
    psub.classList = 'js-subscription-json'
    var pdet = document.createElement('p')
    pdet.classList = 'js-subscription-details'
    btnpush.innerHTML = ('PUSH')
    btnpush.id = ('btnPush')
    container = document.createElement('div')
    container.classList.add('container')
    var imgdiv = document.createElement('div')
    imgdiv.classList = 'imgDiv'
    title.innerHTML = "Locked"
    lockIcon.src = Lock
    container.appendChild(title)
    imgdiv.appendChild(lockIcon)
    body.appendChild(container)
    console.log('component loaded')

    resButton.innerHTML = "Make A Reservation"
    resDiv.appendChild(resButton)
    container.appendChild(imgdiv)
    container.appendChild(resDiv)
    container.appendChild(btnpush)
    container.appendChild(psub)
    container.appendChild(pdet)    
    return container
}

document.body.appendChild(component())

// Change IMAGE
document.querySelector('.imgDiv').addEventListener('click', () => {
    lockAction(lockIcon, Lock, UnLock, title)
})

// TIME FORM
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

//PUSH SERVER START

'use strict';

const applicationServerPublicKey = 'BJmm80KvoxCdiwT-TomKGHu-pNIaSVbB57v6qjE_ZcBzzgrQ3KBHUo6B-bM_wYhK5njnmNEn26PgEJUVe7htX3Y';

const pushButton = document.querySelector('#btnPush');

let isSubscribed = false;
let swRegistration = null;

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function updateBtn() {
  if (Notification.permission === 'denied') {
    pushButton.textContent = 'Push Messaging Blocked.';
    pushButton.disabled = true;
    return;
  }

  if (isSubscribed) {
    pushButton.textContent = 'Disable Push Messaging';
  } else {
    pushButton.textContent = 'Enable Push Messaging';
  }

  pushButton.disabled = false;
}

function updateSubscriptionOnServer(subscription) {
  // TODO: Send subscription to application server

  const subscriptionJson = document.querySelector('.js-subscription-json');
  const subscriptionDetails =
    document.querySelector('.js-subscription-details');

  if (subscription) {
    subscriptionJson.textContent = JSON.stringify(subscription);
    subscriptionDetails.classList.remove('is-invisible');
  } else {
    subscriptionDetails.classList.add('is-invisible');
  }
}

function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(function(subscription) {
    console.log('User is subscribed');

    updateSubscriptionOnServer(subscription);

    isSubscribed = true;

    updateBtn();
  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
    updateBtn();
  });
}

function initializeUI() {
  pushButton.addEventListener('click', function() {
    pushButton.disabled = true;
    if (isSubscribed) {
      // TODO: Unsubscribe user
    } else {
      subscribeUser();
    }
  });

  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);

    updateSubscriptionOnServer(subscription);

    if (isSubscribed) {
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }

    updateBtn();
  });
}

//PUSH SERVER STOP


//Register Service-Worker + PUSH code
if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('Service Worker and Push is supported');
  
    navigator.serviceWorker.register('/sw.js')
    .then(function(swReg) {
      console.log('Service Worker is registered', swReg);
  
      swRegistration = swReg;
      initializeUI();
    })
    .catch(function(error) {
      console.error('Service Worker Error', error);
    });
  } else {
    console.warn('Push messaging is not supported');
  }