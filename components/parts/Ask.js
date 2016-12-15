import React, {Component} from 'react'
import Display from './Display'
import {ListGroup, ListGroupItem, PageHeader} from 'react-bootstrap'



export default class Ask extends Component  {

      constructor() {
        super()

        this.state = {
          choices: [],
          answer: undefined
        }
        this.setUpChoices = this.setUpChoices.bind(this)
        this.addChoiceButton = this.addChoiceButton.bind(this)
        this.select          = this.select.bind(this)
      }

      componentWillMount() {
        this.setUpChoices()
      }

      componentWillReceiveProps() {
        this.setUpChoices()
      }

      setUpChoices() {
        let choices = Object.keys(this.props.question)
        choices.shift()
        this.setState({
          choices,
          answer: sessionStorage.answer
        })
      }

      select(choice) {
        console.log(choice)
        this.setState({
          answer: choice
        })
        sessionStorage.answer = choice
        this.props.emit('answer', {
          question: this.props.question,
          choice
        })
      }

      addChoiceButton(choice, i) {
        let buttonTypes = ['primary', 'success', 'warning', 'danger']
        return(
          <ListGroup>

            <ListGroupItem key={i} bsStyle={buttonTypes[i]}
                    onClick={(e) => this.select(choice)}>
                {choice}: {this.props.question[choice]}
            </ListGroupItem>
          </ListGroup>
        )
      }


      render() {

        return (
          <div id="currentQuestion">
            <p className="current__asker"><span>{this.props.state.speaker}</span> is asking</p>
            <Display if={this.state.answer}>
              <PageHeader className="currentQuestion__choice">You answered: <span className="underline">{this.state.answer}</span></PageHeader>
              <p className="currentQuestion__answer"><b>Answer</b>: {this.props.question[this.state.answer]}</p>
            </Display>
            <Display if={!this.state.answer}>
                <h2>{this.props.question.q}</h2>
                <div className="row">
                  {this.state.choices.map(this.addChoiceButton)}
                </div>
            </Display>
          </div>
        )
      }
}
