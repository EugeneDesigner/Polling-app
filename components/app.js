import React, { Component } from 'react'
import Header from './parts/Header'
import io from 'socket.io-client'

let socket = io('http://localhost:3000')

export default class App extends Component {

  constructor() {
    super()

    this.state = {
      status: 'disconnected',
      title: '',
      member: {},
      audience: [],
      speaker: '',
      questions: [],
      currentQuestion: false,
      results: {}
    }
    this.connect        = this.connect.bind(this)
    this.disconnect     = this.disconnect.bind(this)
    this.updateState    = this.updateState.bind(this)
    this.joined         = this.joined.bind(this)
    this.updateAudience = this.updateAudience.bind(this)
    this.start          = this.start.bind(this)
    this.ask            = this.ask.bind(this)
    this.updateResults  = this.updateResults.bind(this)
  }

  componentWillMount() {
    socket.on('connect', this.connect)
    socket.on('disconnect', this.disconnect)
    socket.on('welcome', this.updateState)
    socket.on('joined', this.joined)
    socket.on('audience', this.updateAudience)
    socket.on('start', this.start)
    socket.on('end', this.updateState)
    socket.on('ask', this.ask)
    socket.on('result', this.updateResults)
  }

  emit(eventName, payload) {
    socket.emit(eventName, payload)
  }
  connect() {
      let member = (sessionStorage.member) ? JSON.parse(sessionStorage.member) : null

      if (member && member.type === 'audience') {
        this.emit('join', member)
      } else if (member && member.type === 'speaker') {
        this.emit('start', {name: member.name, title: sessionStorage.title})
      }
      this.setState({status: 'connected'})
  }

  disconnect() {
    this.setState({
      status: 'disconnected',
      title: 'disconnected',
      speaker: ''
    })
  }

  updateState(serverState) {
      this.setState(serverState)
  }

  joined(member) {
    sessionStorage.member = JSON.stringify(member)
    this.setState({member})
  }

  updateAudience(newAudience) {
    this.setState({ audience: newAudience})
  }

  start(presentation) {
      if (this.state.member.type === 'speaker') {
        sessionStorage.title = presentation.title
      }
      this.setState(presentation)
  }

  ask(question) {
    sessionStorage.answer = ''
    this.setState({currentQuestion: question})
  }

  updateResults(data) {
    this.setState({results: data})

  }


  render() {
    return (
      <div>
        <Header {...this.state}/>
        {React.cloneElement(this.props.children, {state: this.state, emit: this.emit} )}
      </div>
    )
  }
}
