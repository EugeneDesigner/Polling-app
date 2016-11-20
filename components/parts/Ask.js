import React, {Component} from 'react'
import Display from './Display'




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
          <button key={i}
                  className={"col-xs-12 col-sm-6 btn-" + buttonTypes[i]}
                  onClick={(e) => this.select(choice)}>
              {choice}: {this.props.question[choice]}
          </button>
        )
      }


      render() {

        return (
          <div id="currentQuestion">
            <Display if={this.state.answer}>
              <h3>You answered: {this.state.answer}</h3>
              <p>{this.props.question[this.state.answer]}</p>
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
