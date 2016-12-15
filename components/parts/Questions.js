import React, {Component} from 'react'
import {Col, ListGroup, ListGroupItem, PageHeader, Button } from 'react-bootstrap'




export default class Questions extends Component  {

  constructor() {
    super()


    this.state = {
      opened: false,
      answers: {
          q: '1',
          a: '',
          b: '',
          c: '',
          d: ''
      }
    }

    this.ask = this.ask.bind(this)
    this.addQuestion = this.addQuestion.bind(this)
    this.writeQuestion = this.writeQuestion.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.submit = this.submit.bind(this)

  }



  writeQuestion() {
    this.refs.new_question.classList.toggle('show')
    this.setState({opened: !this.state.opened})
  }

  submit(e, text) {
    e.preventDefault()
    let answers = {q: '', a: '', b: '', c: '', d: ''}
    this.ask(this.state.answers)
    this.setState({answers})
  }


  ask(question) {
    this.props.emit('ask', question)
  }

  handleChange(event) {
    let letter = event.target.classList[0].toString()
    let answers = Object.assign(this.state.answers, {[letter]: event.target.value})
    console.log(answers)
    this.setState({answers})
  }

  addQuestion(question, i) {
    return (

        <li onClick={(e) => this.ask(question)}>{question.q}</li>

    )
  }
  render() {
    console.log(this.state)
    return (
      <div className="questions" className="row">
        <PageHeader>Default Questions</PageHeader>
        <ul className="questions__default">
          {this.props.questions.map(this.addQuestion)}
        </ul>
        <PageHeader ><span style={{padding: 5}}>Your Question</span>
          <Button bsStyle='info' onClick={this.writeQuestion}><span className={this.state.opened  ? "glyphicon glyphicon-minus" : "glyphicon glyphicon-plus"} aria-hidden="true"></span></Button>
        </PageHeader>

        <form ref="new_question" className="questions__create" onSubmit={this.submit}>
          <input
            type="text"
            value={this.state.q}
            onChange={this.handleChange}
            className="q questions-new form-control"
            placeholder="question"/>
          <div className='row answers'>
            <Col md={6} sm={12}><label>A</label><input value={this.state.a} onChange={this.handleChange} className="a questions-option form-control" placeholder="options" required/></Col>
            <Col md={6} sm={12}><label>B</label><input value={this.state.b} onChange={this.handleChange} className="b questions-option form-control" placeholder="options" required/></Col>
            <Col md={6} sm={12}><label>C</label><input value={this.state.c} onChange={this.handleChange} className="c questions-option form-control" placeholder="options" required/></Col>
            <Col md={6} sm={12}><label>D</label><input value={this.state.d} onChange={this.handleChange} className="d questions-option form-control" placeholder="options" required/></Col>
          </div>
          <button className="btn btn-info" role="submit">Send your question</button>
        </form>
      </div>
    )
  }
}
