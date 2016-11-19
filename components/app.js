import React, { Component } from 'react'
import Header from './parts/Header'
import io from 'socket.io-client'

let socket = io('http://localhost:3000')

export default class App extends Component {

  constructor() {
    super()

    this.state = {
      status: 'disconnected'
    }
    this.connect = this.connect.bind(this)
    this.disconnect = this.disconnect.bind(this)
  }

  componentWillMount() {
    socket.on('connect', this.connect)
    socket.on('disconnect', this.disconnect)
  }


  connect() {
      this.setState({status: 'connected'})
  }

  disconnect() {
    this.setStatus({
      status: 'disconnected'
    })
  }


  render() {
    return (
        <Header title="New Header" status={this.state.status}/>
    )
  }
}
