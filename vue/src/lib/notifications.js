/////////////////////////////////////////////////////////////////////////

export default {
    requestNotification,
    displayNotification,
}

/////////////////////////////////////////////////////////////////////////

function requestNotification() {
    Notification.requestPermission(function(status) {
        console.log('Notification permission status:', status);
    });
}

function displayNotification(msg) {
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.getRegistration().then(function(reg) {
            reg.showNotification(msg);
        });
    }
}
