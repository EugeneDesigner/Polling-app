import React from 'react'
import Display from './parts/Display'
import JoinSpeaker from './parts/JoinSpeaker'
import Question from './parts/Questions'

import Attendance from './parts/Attendance'
const Speaker = (props) => {
  return (
    <div>

        <Display if={props.state.status === 'connected'}>
          <Display if={props.state.member.name && props.state.member.type === 'speaker'}>
            <Question questions={props.state.questions} emit={props.emit}/>
            <Attendance audience={props.state.audience}/>

          </Display>

          <Display if={!props.state.member.name}>
            <h2>Start the presentaion</h2>
            <JoinSpeaker emit={props.emit}/>
          </Display>
        </Display>
    </div>
  )
}

export default Speaker
