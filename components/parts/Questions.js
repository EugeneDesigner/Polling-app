import React, {Component} from 'react'
import {Col, ListGroup, ListGroupItem } from 'react-bootstrap'




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
          <Col key={i} xs={12} md={3} sm={6}>
            <span onClick={(e) => this.ask(question)}>{question.q}</span>
          </Col>
        )
      }
      render() {

        return (
          <div id="questions" className="row">
            <h2>Questions</h2>
            {this.props.questions.map(this.addQuestion)}
          </div>
        )
      }
}
