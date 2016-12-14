import React, {Component} from 'react'
import { Link } from 'react-router'
import { Button, ControlLabel, FormControl } from 'react-bootstrap'

export default class Join extends Component {

  constructor() {
    super()

    this.join = this.join.bind(this)
  }


  join() {
    let memberName = this.refs.name.value
    this.props.emit('join', {name: memberName})
  }

  render() {
        return (
          <form className="join__form" action="javascript:void(0)" onSubmit={this.join}>
            <ControlLabel>Full Name</ControlLabel>
            <input
                   ref="name"
                   className="form-control"
                   placeholder="enter your full name"
                   required/>
            <button className="btn btn-primary">Join</button>

           <p>Join discussion with other members, answer some strange questions, as well as post even more weird ones! Go Ask|ed full-mode</p>
          </form>
        )
      }

}
