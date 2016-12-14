import React, { Component } from 'react'
import { Button } from 'react-bootstrap'


export default class ChatBox extends Component {
  constructor() {
    super()
    this.state = {
      heightLimit: 100
    }
    this.resize = this.resize.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.addMessage = this.addMessage.bind(this)
    this.addZero = this.addZero.bind(this)
  }

  addZero(i) {
      if (i < 10) {
          i = "0" + i
      }
      return i
  }

  sendMessage() {
    let d = new Date(),
      day  = this.addZero(d.getHours()) + ':' + this.addZero(d.getMinutes());
    let chatter = [this.refs.text.value, this.props.state.member.name, day]
    this.props.emit('chat', chatter)
    this.refs.text.value = ''
  }

  resize(e) {
      let textarea = this.refs.text
    if (e.keyCode == 13) {
      e.preventDefault()
      this.sendMessage()
      textarea.value = ''
    } else {
      textarea.style.height = ""
      textarea.style.height = Math.min(textarea.scrollHeight, this.state.heightLimit) + "px"
    }


  }

  addMessage(chatter, i) {
    return (
      <li className="message">
        <span className="user">{chatter.name}</span>
        <p>{chatter.message}</p>
        <span className="time">{chatter.time}</span>
      </li>
    )
  }


  render() {
    console.log(this.props.state.message)
    return (
      <form className="chatbox" action="javascript:void(0)" onSubmit={this.sendMessage}>
          <div className="chatbox__header">
            <a href="#" className="chatbox-close"><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
            <span className={"user-status " + this.props.state.status}></span>
            <span className="display-name">{this.props.state.member.name}</span>
            <small>{this.props.state.status === 'connected' ? 'Online' : 'Offline'}</small>

          </div>

          {this.props.state.message ? <ul className="chatbox__body">{this.props.state.message.map(this.addMessage)}</ul> : null}

            <div className="chatbox__textarea">
            <textarea ref='text' onKeyDown={this.resize} className="form-control autogrow" placeholder="Type your message"></textarea>
            <Button className="send" bsStyle="primary" type="submit"><span className="glyphicon glyphicon-envelope" aria-hidden="true"></span></Button>
          </div>
      </form>

    )
  }
}
