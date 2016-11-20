import React from 'react'
import Display from './parts/Display'
import Join from './parts/Join'
import Ask from './parts/Ask'
const Audience = (props) =>  {
      return (
        <div><Display if={props.state.status === 'connected'}>


                <Display if={props.state.member.name}>

                    <Display if={!props.currentQuestion}>
                        <h2>Welcome {props.state.member.name}</h2>
                        <p>{props.state.audience.length} audience members connected</p>
                        <p>Questions will appear here</p>
                    </Display>
                    <Display if={props.state.currentQuestion}>
                      <Ask question={props.state.currentQuestion} emit={props.emit}/>
                    </Display>
                </Display>

                <Display if={!props.state.member.name}>
                  <h1>Join the session</h1>
                  <Join emit={props.emit}/>
                </Display>



             </Display>
            </div>
      )

}

export default Audience
