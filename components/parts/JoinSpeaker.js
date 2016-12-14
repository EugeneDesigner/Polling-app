import React, {Component} from 'react'

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
             <input ref="name"
                    className="form-control"
                    placeholder="enter your full name"
                    required/>

            <label>Presentation Title</label>
            <input ref="title"
                   className="form-control"
                   placeholder="Enter a title for this presentation"
                   required/>
             <button className="btn btn-primary btn-lg">Join</button>
           </form>
         )
       }

 }
