const express = require('express')


const app = express()


const http = require('http').Server(app)

const io = require('socket.io')(http)

const port = process.env.Port || 3000

app.use(express.static(__dirname + '/public'))

let clients = 0


io.on('connection' , function(socket){
  socket.on("NewClient" , function(){
    clients++
    if(clients < 2){
      if(clients == 1){
        this.emit('CreatePeer')
      }
    }
    else
      this.emit('SessionActive')

    console.log(clients)
  })
  socket.on('Offer', SendOffer)
  socket.on('Answer', SendAnswer)
  socket.on('disconnect', Disconnect)
})


function Disconnect(){
  if(clients > 0){
    if(clients <= 2)
      this.broadcast.emit('Disconnect')
    console.log(clients)
      --clients
  }

}

function SendAnswer(data){
  this.broadcast.emit('BackAnswer', data)
}

function SendOffer(offer){
  this.broadcast.emit('BackOffer', offer)
}

http.listen(port, () => console.log(`Active on ${port}`))





