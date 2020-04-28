const express = require('express');

const app = express();

const http = require('http');

const path  = require('path');

const server = http.createServer(app);

const port = process.env.PORT||5000;


const io = require('socket.io').listen(server);



const mime = require('mime');

const bodyParser = require('body-parser');

const { addUser, removeUser, getUser, getUsersInRoom} = require('./handle');


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
  
    room = req.body.roomNO;

       

        if((username===''||username==='undefined'|| username===null))
        {
         res.redirect('/');
    
        }
        else if((room===''||room==='undefined'|| room===null))
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

       console.log('username before addUser is '+username + 'room no is '+room);

    const {Add , error }  =  addUser({id: socket.id, name: username, room: room});

    if(error=='taken')
    {
       socket.emit('taken','usernametaken');
    }
    else if(error=='nouser')
    {
       socket.emit('nouser','nouser');
    }
     
    console.log('username after addUser is '+username + 'room no is '+room);
    console.log(Add);


    socket.join(Add.room);
    

  socket.to(Add.room).emit('cred', { id: Add.id, name:Add.name, room:Add.room});





   socket.on('sendMessage', ({id, message})=>{
    //    room = getUser(id);
    //    console.log(room.room);

       console.log(getUser(id));

    //    socket.to()


   })
       

    socket.on('disconnect',()=>{
        const user = removeUser(socket.id);
        io.to(user.room).emit('roomData',{room: user.room, users: getUsersInRoom(user.room)});

    })

   
   

 
  



  









   


});







 





app.get('/',(req,res)=>{

    res.render('login');

});






server.listen(port, ()=>console.log(`Server is listening at ${port}`));
