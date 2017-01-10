'use strict';
const net = require('net');
const server = net.createServer();   //define server
const parsemessage = require('./lib/parse-message.js');

let usersOnline = [];

//When the server is on, and a user connects, the socket will welcome the user to the Chatroom
server.on('connection', function(socket){
  console.log('a cliet connected');
  socket.write('Welcome to the Ken Chatroom');

  usersOnline.push(socket);

  socket.on('data', function(buffer){
    let typedtext = buffer.toString();// turn the 0 and 1's into a string which is the written words
    console.log(typedtext);
    //if the user types in /rename, call the renameUserCommand which takes the converted binary to string data, to the user
    if(typedtext.startsWith('/rename'))
      return parsemessage.renameUserCommand(typedtext, socket); //end of rename function

    if(typedtext.startsWith('/dm'))
      return parsemessage.directMessage(typedtext, usersOnline);

    if (typedtext.startsWith('/users'))
      return parsemessage.requestUsernames(socket, usersOnline);

    if (typedtext.startsWith('/troll'))
      return parsemessage.troll(typedtext, usersOnline);

    if (typedtext.startsWith('/ban'))
      return parsemessage.banUser(typedtext, usersOnline);

    usersOnline.forEach(s => {
      s.write(`${socket.username}: ${typedtext}`);

    });
  });//end of socket 'on connection' function
  socket.on('close', function(){
    console.log('a client left the chat');
    usersOnline.forEach((s, index) => {
      if(s == socket)
        socket.splice(index, 1);
    }); //end of for loop
  });  //end of 'on close' function
}); //end of server.on function


//Turn server on, and display console log
server.listen (3000, function (){
  console.log('Server is turned on');
}); //
