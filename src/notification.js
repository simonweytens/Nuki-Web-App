import Lock from './lock_icon.jpg'
import UnLock from './unlock_icon.jpg'

var perm = document.createElement('button')
perm.id = 'btnPerm'
perm.innerHTML = 'Want to receive notifications?'
perm.addEventListener('click', ()=> {
    let promise = Notification.requestPermission((result) => {
        if (result === 'granted') {
            navigator.serviceWorker.ready.then(function(registration) {
              registration.showNotification('Notifications Confirmed', {
                body: 'Nuki Web App',
                icon: Lock,
                vibrate: [100],
                tag: 'vibration-sample'
              });
            });
          }
    });
    //return promise
})
document.querySelector('.nav').appendChild(perm)

export function sendNotification(){
  let promise = Notification.requestPermission((result) => {
    if (result === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
          registration.showNotification('Notifications Confirmed', {
            body: 'Nuki Web App',
            icon: Lock,
            vibrate: [100],
            tag: 'vibration-sample'
          });
        });
      }
});
}