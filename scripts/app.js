const chatlist = document.querySelector('.chat-list')
const msgForm = document.querySelector('.msg');
const newnameForm = document.querySelector('.update-name');
const rooms = document.querySelector('.sections');
const updatedMsg = document.querySelector('.update-name-msg');

const username = localStorage.username ? localStorage.username : 'Anonymous';

const chatr = new Chatroom('official', username);
const chatui = new ChatUI(chatlist);
chatr.getchats(data => {
    chatui.render(data);
});

rooms.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
        chatui.clear();
        const roomName = e.target.id
        chatr.updateroom(roomName);
        chatr.getchats(data => {
            chatui.render(data);
        });
    }
});

msgForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = msgForm.message.value.trim();
    chatr.addChat(message)
        .then(() => {msgForm.reset()})
        .catch(err => {console.log(err)});
});

newnameForm.addEventListener('submit', e => {
    e.preventDefault();
    const newname = newnameForm.name.value.trim();
    chatr.updateUser(newname);
    newnameForm.reset();
    updatedMsg.textContent = `Your name was updated to ${newname}`;
    setTimeout(() => updatedMsg.textContent='', 3000);
});