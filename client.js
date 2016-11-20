import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import ReactDOM from 'react-dom'
import App from './components/app'
import Audience from './components/Audience'
import Speaker from './components/Speaker'
import Board from './components/Board'
import NotFound from './components/NotFound'


const routes = (
  <Route component={App} path="/">
    <IndexRoute component={Audience}/>
    <Route path="speaker" component={Speaker}/>
    <Route path="board" component={Board}/>
    <Route path="*" component={NotFound}/>
  </Route>

)

ReactDOM.render(<Router history={browserHistory}>{routes}</Router>, document.getElementById('app'))
