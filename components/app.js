import React, { Component } from 'react'
import Header from './parts/Header'
import io from 'socket.io-client'
import './styles/main.scss'
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
    this.emit = this.emit.bind(this)
  }

  componentWillMount() {
    socket.on('connect', () => {
      let member = (sessionStorage.member) ? JSON.parse(sessionStorage.member) : null

      if (member && member.type === 'audience') {
        this.emit('join', member)
      } else if (member && member.type === 'speaker') {
        this.emit('start', {name: member.name, title: sessionStorage.title})
      }
      this.setState({status: 'connected'})
    })


    socket.on('disconnect', () => {
      this.setState({
        status: 'disconnected',
        title: 'disconnected',
        speaker: ''
      })
    })

    socket.on('welcome', x => this.setState(x))

    socket.on('joined', (member) => {
      sessionStorage.member = JSON.stringify(member)
      this.setState({member})
    })

    socket.on('audience', (newAudience)=> {
      this.setState({ audience: newAudience})
    })

    socket.on('start', (presentation)=> {
        if (this.state.member.type === 'speaker') {
          sessionStorage.title = presentation.title
        }
        this.setState(presentation)
    })

    socket.on('end', x => this.setState(x))
    socket.on('ask', (question) => {
        sessionStorage.answer = ''
        this.setState({currentQuestion: question})
    })


    socket.on('result', (data) => {
      this.setState({results: data})
    })
  }

  emit(eventName, payload) {
    socket.emit(eventName, payload)
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
