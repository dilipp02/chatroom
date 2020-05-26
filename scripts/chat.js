
class Chatroom {
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
    }

    async addChat(message){
        const now = new Date();
        const chat = {
            message,
            room: this.room,
            username: this.username,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        const response = await this.chats.add(chat);
        return response;
    }

    getchats(callback){
        this.unsub = this.chats
            .where('room', '==', this.room)
            .orderBy('created_at')
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if(change.type === 'added'){
                        callback(change.doc.data());
                    }
                });
            });
    }

    updateUser(newname){
        this.username = newname;
        localStorage.setItem('username', newname);
    }
    updateroom(newroom){
        this.room = newroom;
        if(this.unsub)
            this.unsub();
    }
}



// setTimeout(() => {
//     chatr.updateroom('music');
//     chatr.updateUser('suyash');
//     chatr.addChat('Chup');
//     console.log('updated')
//     chatr.getchats(data => {
//         console.log(data);
//     });
// }, 3000)