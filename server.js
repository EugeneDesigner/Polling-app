const express = require('express')
const app = express()




app.use(express.static('./public'))
app.use(express.static('./node_modules/bootstrap/dist'))

const server = app.listen(3000)
const io = require('socket.io').listen(server)

let connections = []


io.sockets.on('connection', (socket) => {

  socket.once('disconnect', () => {
    connections.splice(connections.indexOf(socket), 1)
    socket.disconnect()
    console.log('Disconnected: %s remaining', connections.length)
  })

  connections.push(socket)
  console.log("Connected: %s sockets connected", connections.length)
})

console.log("Polling server is running on 3000")
