const users = [];







const addUser = ({id, name, room})=>{
    

    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existing = users.find((user)=> user.room === room && user.name === name);

    if(!name || !room) return {error: 'nouser'};
    if(existing) return {error: 'taken'};
    
    const Add = {id, name, room};



    console.log(id + name + 'and '+ room + 'no before pushing into array');

    users.push(Add);

    console.log(Add+'AT LINE 28');
    
    console.log(users+'users array');
    return {Add};
}


const removeUser  = (id)=>{
    const index = users.findIndex((user)=> user.id = id);
    if(index !== -1) return users.splice(index, 1)[0];
}

const getUsersInRoom = (room)=> users.filter((user)=> user.room==room);

const getUser = (id)=> users.find((user)=>user.id = id);

module.exports = {addUser, getUsersInRoom, getUser, removeUser};
































