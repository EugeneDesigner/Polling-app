const express = require('express')
const path    = require('path')
const _       = require('underscore')
const questions = require('./questions')
const app = express()


let connections     = [],
    title           = 'Untitled Presentation',
    audience        = [],
    speaker         = {},
    currentQuestion = false,
    results         = {
                        a: 0,
                        b: 0,
                        c: 0,
                        d: 0
                      }


app.use(express.static('./public'))
app.use(express.static('./node_modules/bootstrap/dist'))


app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})



const server = app.listen(3000)
const io = require('socket.io').listen(server)




io.sockets.on('connection', (socket) => {

  socket.once('disconnect', function() {
    let member = _.findWhere(audience, { id: this.id})

    if (member) {
      audience.splice(audience.indexOf(member), 1)
      io.sockets.emit('audience', audience)
      console.log('Left: %s (%s audience members)', member.name, audience.length)
    } else if (this.id === speaker.id) {
        console.log("%s has left. '%s' is over", speaker.name, title)
        speaker = {}
        title = 'Untitled presentation'
        io.sockets.emit('end', {title, speaker: ''})
    }


    connections.splice(connections.indexOf(socket), 1)
    socket.disconnect()
    console.log('Disconnected: %s remaining', connections.length)
  })

  socket.on('join', function(payload) {
    let newMember = {
      id: this.id,
      name: payload.name,
      type: 'audience'
    }
    this.emit('joined', newMember)
    audience.push(newMember)
    io.sockets.emit('audience', audience)

  })

  socket.on('start', function(payload) {
    speaker.name = payload.name
    speaker.id   = this.id
    speaker.type = 'speaker'
    this.emit('joined', speaker)
    io.sockets.emit('start', {title, speaker: speaker.name})
    console.log('Presentation started: "%s" by %s', title, speaker.name)
  })

  socket.on('ask', function(question) {
    currentQuestion = question
    results         = {a: 0, b: 0, c: 0, d: 0}
    io.sockets.emit('ask', currentQuestion)
    console.log("Question Asked: %s", question.q)
  })

  socket.on('answer', function(payload) {
    results[payload.choice]++
    io.sockets.emit('results', results)
    console.log("Answer: %s - %j", payload.choice, results)
  })

  socket.emit('welcome', {
    title,
    audience,
    speaker: speaker.name,
    questions,
    currentQuestion,
    results

  })
  connections.push(socket)
  console.log("Connected: %s sockets connected", connections.length)
})

console.log("Polling server is running on 3000")
