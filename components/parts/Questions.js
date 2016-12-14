import React, {Component} from 'react'
import {Col, ListGroup, ListGroupItem, PageHeader } from 'react-bootstrap'




export default class Questions extends Component  {

      constructor() {
        super()

        this.ask = this.ask.bind(this)
        this.addQuestion = this.addQuestion.bind(this)
      }


      ask(question) {
        this.props.emit('ask', question)
      }

      addQuestion(question, i) {
        return (
          <ul>
            <li onClick={(e) => this.ask(question)}>{question.q}</li>
          </ul>
        )
      }
      render() {

        return (
          <div id="questions" className="row">
            <PageHeader>Questions</PageHeader>
            {this.props.questions.map(this.addQuestion)}
          </div>
        )
      }
}
