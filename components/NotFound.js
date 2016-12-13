import React from 'react'
import {Link} from 'react-router'
import { Button, ButtonToolbar, PageHeader } from 'react-bootstrap'
const NotFound = (props) =>  {
      return (
        <div className="not-found">
          <PageHeader>Whooops.........</PageHeader>
          <p>We cannot find the page you were looking for. Maybe try one of these:</p>
          <ButtonToolbar>
            <Link to='/'><Button bsStyle="primary">Join as Audience</Button></Link>
            <Link to='/speaker'><Button bsStyle="info">Start the presentation</Button></Link>
            <Link to="/board"><Button bsStyle="warning">View the board</Button></Link>
          </ButtonToolbar>

        </div>
      )

}

export default NotFound
