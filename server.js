const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const UsersService = require('./UsersService');

// create new Service database
const userService = new UsersService()

//localhost port
const port = 5000;
// create express app
const app = express();

// create server instance
const server = http.Server(app);

// create socket on server instance
const io = socketIO(server);


// Middleware for production
// It serves basic React HTML template ('#root').
app.use('/', express.static(`${__dirname}/build`));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build/static', 'index.html'));
});


app.get('/api/object', (req, res) => {
  res.send({text: "I'm /api/object text"})
})
app.get('/api/hello', (req,res) => {
  res.send({express: 'Express says hello'})
})

io.on('connection', (socket) => {
  console.log(socket.id + ' connected')
  socket.emit('test', {hello: 'world'})
  //User connect to the chat
  socket.on('join', (name) => {
    console.log('working')
    userService.addUser({
      id: socket.id,
      name
    });
    io.emit('update', {
      users: userService.getAllUsers()
    });
  });
  // User disconnect from the chat
  socket.on('disconnect', () => {
    console.log(socket.id + ' disconected')
    userService.removeUser(socket.id);
    socket.broadcast.emit('update', {
      users: userService.getAllUsers()
    });
  });
  // User send message
  socket.on('message', (message) => {
    const {name} = userService.getUserById(socket.id);
    socket.broadcast.emit('message', {
      text: message.text,
      from: name
    })
  })
})

server.listen(port, () => {
  console.log(`listening on ${port}`)
})
