import React, {Component} from 'react'
import { Button, ControlLabel, FormControl } from 'react-bootstrap'


export default class JoinSpeaker extends Component {

  constructor() {
    super()

    this.start = this.start.bind(this)
  }

  start() {
    let speakerName = this.refs.name.value,
        title       = this.refs.title.value
    this.props.emit('start', {name: speakerName, title: title})
  }

  render() {
        return (
          <form className="join__form" action="javascript:void(0)" onSubmit={this.start}>
            <label>Full Name</label>
            <FormControl ref="name"
                   className="form-control"
                   placeholder="enter your full name"
                   required/>

           <ControlLabel>Presentation Title</ControlLabel>
           <FormControl ref="title"
                  className="form-control"
                  placeholder="Enter a title for this presentation"
                  required/>
            <Button bsStyle="primary" role="submit" bsSize="large">Join</Button>
            <p>Time to ask some questions, give freedom to your unlimited imagination!</p>
          </form>
        )
      }

}
