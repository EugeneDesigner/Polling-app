import React from 'react'
import Display from './parts/Display'
import {BarChart} from 'react-d3'


const barGraphData = (results) => {
  return [{
      label: 'Question',
      values: Object.keys(results).map((choice) => { return {x: choice, y: results[choice]} })
    }]


}


const Board = (props) => {

  return (
    <div id="scoreboard">

      <Display if={props.state.status ==='connected' && props.state.currentQuestion}>
          <BarChart className="lol" data={barGraphData(props.state.results)}
                    title={props.state.currentQuestion.q}
                    height={window.innerHeight * 0.6}
                    width={window.innerWidth * 0.9}
                    margin={{top: 20, bottom: 40, left: 20, right: 0}}
                     />
      </Display>

      <Display if={props.state.status==='connected' && !props.state.currentQuestion}>
        <h3>Awaiting for a Question...</h3>
      </Display>

    </div>
  )
}

export default Board
