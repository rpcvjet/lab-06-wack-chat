'use strict';

//socket = one user, s (when in a loop) = all users

module.exports = exports = {};

exports.renameUserCommand = function (message, socket) {
  socket.username = message.split(' ').slice(1).join(' ').trim();
  socket.write(`You are now ${socket.username}`);
}; //end of renameUserCommand function

exports.directMessage = function (message, theOnlineUsersArray) {
  let toUserName = message.split(' ')[1]; //the person on the other line
  let messageContent= message.split(' ').slice(2).join(' ').trim(); //the typed message

  //go through evenyone in the array, if
  theOnlineUsersArray.forEach( s => {
    if (s.username === toUserName )
      s.write(messageContent);
  });//end of loop
}; //end of directMessage function

exports.requestUsernames = function (socket, theOnlineUsersArray){

    //go through the array to get all the usersOnline
  theOnlineUsersArray.forEach( s => {
    socket.write(s.username + '\n');
  });//end of loop
};//end of requestUsernames function

exports.troll = function ( message, theOnlineUsersArray) {
  let messageContent = message.split(' ').slice(1).join(' ').trim();
  theOnlineUsersArray.forEach( s => {
    for (var i = 0; i < 10; i++) {
      s.write(messageContent);
    } //end of for loop
  }); //end of forEach loops
}; //end of troll function

exports.banUser = function (message, theOnlineUsersArray){
  let toUserName = message.split(' ')[1].trim();
  theOnlineUsersArray.forEach( s =>  {
    if (s.username === toUserName )
      s.end (`${s.username} has been banned from Kens Chatroom`);
  });

}; //end of banUser function
