const socket = io();
let name;
let textArea = document.getElementById('textarea');
let messageArea = document.querySelector('.message_area');

do {
    name = prompt('Please enter your name!');
} while(!name);


textArea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
    }
})

function sendMessage(message) {
    let msg = {
        user : name,
        message : message.trim()
    }

    // Append
    appendMessage(msg, 'outgoing');
    scrolltobottom()
    // send to server
    socket.emit('message', msg);
}


function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add('message', className);
    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `   
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
    textArea.value = '';
}

socket.on('message', (data) => {
    appendMessage(data, 'incoming');
    scrolltobottom();
});

function scrolltobottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}