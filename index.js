const express = require('express');

const app = express();

const http = require('http');

const path  = require('path');

const server = http.createServer(app);

const port = process.env.PORT||5000;


const io = require('socket.io').listen(server);



const mime = require('mime');

const bodyParser = require('body-parser');

const { addUser, removeUser, getUser, getUserInRoom} = require('./handle');


app.use(express.static(path.join(__dirname,"./")));

app.set('views', (__dirname, './'));
app.set('view engine', 'ejs');



app.use(bodyParser.urlencoded({
    extended: false,
 }));
 
 
 app.use(bodyParser.json());



// socket part lets do this




var username = '';
var pass = '';
var roomNO = '';

app.post('/main',(req, res)=>{


    username = req.body.username;
    pass = req.body.password;
    roomNO = req.body.roomNO;

       

        if((username===''||username==='undefined'|| username===null))
        {
         res.redirect('/');
    
        }
        else if((pass===''||pass==='undefined'|| pass===null))
        {
         
            res.redirect('/');
    
        }
        else if((roomNO===''||roomNO==='undefined'|| roomNO===null))
        {
         
              res.redirect('/');
        }
        else{
    
    
         
            res.render('index');
           
        //  scoket
      
        



        // end socket











        }    
 
});



io.on('connection', (socket)=>{
            
    socket.emit('cred', {username, roomNO});

      
    
     
    socket.on('join',(userinfo)=>{
        

        const { userInfo, error} = addUser({id: socket.id, user: userinfo.user, room: userinfo.room});

        if(!error)
        {
            // do nothing


            socket.join(userInfo.room);

            socket.emit('message',`${userInfo.user} , welcome to room ${userInfo.room}`);
            socket.broadcast.to(userInfo.room).emit('message', `${userInfo.user } has joined!`);
      
            io.to(userInfo.room).emit('roomData',{room:userInfo.room, users:getUsersInRoom(userInfo.room)});







    socket.on('sendMessage', (message)=>{
        const user = getUser(socket.id);
        console.log(message);
        console.log(user)
  

        io.to(user.room).emit('messenger',{user:user.user,message});
    
       
    
    });

    // socket.on('disconnect',()=>{
    //     const user = removeUser(socket.id);

    //     if(user){
    //         io.to(user.room).emit('message',{user:'admin', text: `${user.name} has left the Chat`});
    //         io.to(user.room).emit('roomData',{room: user.room, users: getUserInRoom(user.room)});
    //     }
    // })
       
       
        }
        else{

            app.get('/notfound',(req,res)=>{
                res.send("not found");
            })

        }


        
    
        

       

    })

   


});




    // socket.on('join', ( {userName,room}, callback)=>{

    //     console.log('inside join '+  userName);



    //     const { error , user } = addUser({id: socket.id, username, roomNO});
    //     if(error) return callback(error);

    //   socket.join(user.roomNO);
    //   socket.emit('message',{user: 'admin', text: `${user.name} , welcome to room ${user.room}` });
    //   socket.broadcast.to(user.room).emit('message',{user: 'admin', text: `${user.name } has joined!`});

    //   io.to(user.room).emit('roomData',{room:user.room, users:getUsersInRoom(user.room)});

    //    callback();
    // });


    // socket.on('sendMessage', (message, callback)=>{
    //     const user = getUser(socket.id);
    //     io.to(user.room).emit('message',{user: user.name, text: message});
    
    //     callback();
    
    // });

    // socket.on('disconnect',()=>{
    //     const user = removeUser(socket.id);

    //     if(user){
    //         io.to(user.room).emit('message',{user:'admin', text: `${user.name} has left the Chat`});
    //         io.to(user.room).emit('roomData',{room: user.room, users: getUserInRoom(user.room)});
    //     }
    // })







app.get('/',(req,res)=>{

    res.render('login');

});






server.listen(port, ()=>console.log(`Server is listening at ${port}`));
