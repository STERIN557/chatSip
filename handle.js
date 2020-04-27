const users = [];



const addUser = ({id, user, room})=>{
    console.log(user);
    console.log(room);
    name = user.trim().toLowerCase();
     room = room.trim().toLowerCase();
// here  in user contains the name of the user 
    const existingUser = users.find((userd)=> userd.room === room && userd.user=== user);

    if(!name || !room) return {error : 'User and room are required'};
    if(existingUser) return {error:'Username is taken'};

    const userInfo = {id, user, room};
    console.log('room no before pushing is '+ room);
    users.push(userInfo);

    return {userInfo};
}

const removeUser = (id)=>{
    const index = users.findIndex((user)=> user.id = id);

    if(index !== -1) return users.splice(index, 1)[0];

}

const getUser = (id)=> users.find((user)=>user.id = id);

getUsersInRoom = (room)=> users.filter((user)=> user.room==room);


module.exports = {addUser, removeUser, getUser, getUsersInRoom};