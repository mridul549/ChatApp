const socket = io('http://localhost:8000',{transports:['websocket']})

const form = document.getElementById('send-container');
const messageInput = document.getElementById('msgInp');
const messageContainer = document.querySelector('.container');
var audio = new Audio('sounds/iphone.mp3');

function getTime() {
    const today = new Date();
    var hours = today.getHours();
    var mins = today.getMinutes();
    return `${hours}:${mins}`
}

const append = (message,position)=>{
    console.log(message);
    const messageElement = document.createElement('div');

    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);

    if(position!=='centre'){
        const timeEle = document.createElement('p');
        timeEle.innerText=getTime();
        timeEle.classList.add('time');
        messageElement.classList.add('text');
        messageElement.append(timeEle);
    } 
    
    messageContainer.append(messageElement);
    if(position==='left'){
        audio.play();
    }
}

document.addEventListener('submit', e=> {
    e.preventDefault();
    const message=messageInput.value;
    append(`You: ${message}`,`right`);
    socket.emit('send', message);
    messageInput.value='';
})

const name = prompt("Enter your name to join the chat");
socket.emit('new-user-joined',name);

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'centre')
})

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`,`left`);
})

socket.on('left', data => {
    append(`${data.name} left the chat`,'centre');
})
