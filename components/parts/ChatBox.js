import React, { Component } from 'react'
import { Button } from 'react-bootstrap'


export default class ChatBox extends Component {
  constructor() {
    super()
    this.state = {
      heightLimit: 100,
      close: false
    }
    this.resize       = this.resize.bind(this)
    this.sendMessage  = this.sendMessage.bind(this)
    this.addMessage   = this.addMessage.bind(this)
    this.addZero      = this.addZero.bind(this)
    this.close        = this.close.bind(this)
    this.markRead     = this.markRead.bind(this)
  }

  addZero(i) {
      if (i < 10) {
          i = "0" + i
      }
      return i
  }

  close(e) {
    e.preventDefault()
    this.refs.close.classList.toggle('closed')
    this.setState({close: !this.state.close})


  }

  sendMessage() {
    if (this.refs.text.value) {
      let d = new Date(),
        day  = this.addZero(d.getHours()) + ':' + this.addZero(d.getMinutes());
      let chatter = [this.refs.text.value, this.props.state.member.name, day]
      this.props.emit('chat', chatter)
      this.refs.text.value = ''
    }

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
      <li className={chatter.name === this.props.state.member.name || document.activeElement === this.refs.text ? 'message' : 'message unread'}>
        <span className="user">{chatter.name}</span>
        <p>{chatter.message}</p>
        <span className="time">{chatter.time}</span>
      </li>
    )
  }

  markRead() {
    let elements = document.querySelectorAll('.unread')
    console.log(elements)
    for (let i = elements.length - 1; i>=0; --i) {
      console.log( elements[i])
      elements[i].className = 'message';

    }

  }


  render() {
    return (
      <form className="chatbox" ref="close"  action="javascript:void(0)" onSubmit={this.sendMessage}>
          <div className="chatbox__header">
            <a href="#" className="chatbox-close" onClick={this.close}><span className={this.state.close ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-remove"} aria-hidden="true"></span></a>
            <span className={"user-status " + this.props.state.status}></span>
            <span className="display-name">{this.props.state.member.name}</span>
            <small>{this.props.state.status === 'connected' ? 'Online' : 'Offline'}</small>

          </div>

          {this.props.state.message ? <ul className="chatbox__body">{this.props.state.message.map(this.addMessage)}</ul> : null}

            <div className="chatbox__textarea">
            <textarea ref='text' autoFocus={false} onFocus={this.markRead} onKeyDown={this.resize} className="form-control autogrow" placeholder="Type your message"></textarea>
            <Button className="send" bsStyle="primary" type="submit"><span className="glyphicon glyphicon-envelope" aria-hidden="true"></span></Button>
          </div>
      </form>

    )
  }
}
