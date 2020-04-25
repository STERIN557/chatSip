const express = require('express');

const app = express();

const http = require('http');

const path  = require('path');

const server = http.createServer(app);

const port = process.env.PORT || 3000;


const io = require('socket.io').listen(server);



const mime = require('mime');

const bodyParser = require('body-parser');




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

   
  
    res.render('index');
 
   
});


// io.on('connection', (socket)=>{
//     console.log('user is connected');
//     socket.on('disconnect',()=>{
//         console.log('user disconnected')

//     });
   
//     socket.on('chat message',(msg)=>{
//                 console.log(msg);
//         io.emit('chat message', msg);
        
//     });
    
//     //above code will broadcastly send data to everyone
//     // below cocde is for individual for some join stuff

//     socket.emit('user',username);

// })

io.on('connection', (socket)=>{

  

  socket.join(roomNO);

  socket.on('chat message',(msg)=>{
      io.to(roomNO).emit('chat message', {msg, id:socket.id, username});
  })

//   io.to(roomNO).emit('chat ', socket.id);


});







app.get('/',(req,res)=>{

    res.render('login');

});






server.listen(port, ()=>console.log(`Server is listening at ${port}`));
