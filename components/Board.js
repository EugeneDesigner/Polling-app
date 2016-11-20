import React from 'react'
import Display from './parts/Display'
import {BarChart} from 'react-d3'


const barGraphData = (results) => {
  console.log(Object.keys(results))
  return Object.keys(results).map(function(choice) {
    return {
      label: choice,
      values: [{"x": choice, "y": results[choice]}]
    }
  })

}


const Board = (props) => {

  return (
    <div id="scoreboard">

      <Display if={props.state.status ==='connected' && props.state.currentQuestion}>
          <BarChart data={barGraphData(props.state.results)}
                    title={props.state.currentQuestion.q}
                    height={window.innerHeight * 0.6}
                    width={window.innerWidth * 0.9}/>
      </Display>

      <Display if={props.state.status==='connected' && !props.state.currentQuestion}>
        <h3>Awaiting a Question...</h3>
      </Display>

    </div>
  )
}

export default Board
