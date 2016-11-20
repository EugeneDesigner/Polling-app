import React from 'react'
import {Link} from 'react-router'

const NotFound = (props) =>  {
      return (
        <div id="not-found">
          <h1>Whoops...</h1>
          <p>We cannot find the page you were looking for. Maybe try one of these:</p>

          <Link to='/'>Join as Audience</Link>
          <Link to='/speaker'>Start the presentation</Link>
          <Link to="/board">View the board</Link>

        </div>
      )

}

export default NotFound
