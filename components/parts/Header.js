import React, { Component, PropTypes, defaultProps } from 'react'
import {Link} from 'react-router'
import Icons from '../images/Icons'
import Display from './Display'
import { Button } from 'react-bootstrap'

export default class Header extends Component {

  render() {
    return (
      <header className="row">
        <section className="header">
          <div className="header__guy"><Icons height="100%" width="auto" viewBox="0 0 380.99 390.64" icon="guy" /></div>
            <div className="header__title"><h1>Ask<span className="logo">&#124;</span>ed</h1></div>
        </section>
          <nav>
              <Link to="/"><Button bsStyle="primary">AskHome</Button></Link>
              <Link to="/speaker"><Button bsStyle="info">AskGuy</Button></Link>
              <Link to="/board"><Button bsStyle="warning">AskChart</Button></Link>
          </nav>
          <div className="header__profile">
            <div><Icons height="80px" width="80px" viewBox="0.62 0.62 198.75 198.75" icon="profile"/></div>
            <h4>{this.props.member.name || 'Your name'}</h4>
          </div>

        <div className="col-xs-2">
          <span id="connection-status" className={this.props.status}></span>
        </div>
      </header>
    )
  }
}




    Header.propTypes = {
      title: PropTypes.string.isRequired
  }

    Header.defaultProps = {
      status: 'disconnected'
    }
