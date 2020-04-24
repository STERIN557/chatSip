const express = require('express');

const app = express();

const http = require('http');

const path  = require('path');

const server = http.createServer(app);

const port = process.env.PORT || 3000;


const io = require('socket.io').listen(server);



const mime = require('mime');

const bodyParser = require('body-parser');




app.use(express.static('./'))

app.set('views', (__dirname, './views/'));
app.set('view engine', 'ejs');



app.use(bodyParser.urlencoded({
    extended: true
 }));
 
 
 app.use(bodyParser.json());


app.get('/login',(req,res)=>{

    res.render('index');

});


// socket part lets do this

io.on('connection', (socket)=>{
    console.log('user is connected');
    socket.on('disconnect',()=>{
        console.log('user disconnected')

    });
    socket.on('chat message',(msg)=>{
        console.log(msg);
        io.emit('chat message', msg);
    });
  
})







app.get('/',(req, res)=>{
    res.sendFile(__dirname+'/index.htm');


   
})




app.post('/?username=:user&password=:pass',(req, res)=>{
    res.send(req.body);
})



server.listen(port, ()=>console.log(`Server is listening at ${port}`));