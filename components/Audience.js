import React from 'react'
import Display from './parts/Display'
import Join from './parts/Join'
import Ask from './parts/Ask'
import {PageHeader} from 'react-bootstrap'
const Audience = (props) =>  {
      return (
        <div><Display if={props.state.status === 'connected'}>


                <Display if={props.state.member.name}>

                    <Display if={!props.state.currentQuestion}>
                        <PageHeader>Welcome, {props.state.member.name}</PageHeader>
                        <p className="audience__askMembers"><span className="underline">{props.state.audience.length}</span> {props.state.audience.length == 1 ? 'askMember' : 'askMembers'} connected</p>
                        <p className="audience__questions">Questions will appear here, just wait for it</p>
                    </Display>
                    <Display if={props.state.currentQuestion}>
                      <Ask state={props.state} question={props.state.currentQuestion} emit={props.emit}/>
                    </Display>
                </Display>

                <Display if={!props.state.member.name}>
                  <PageHeader>Join the Ask<span className="logo">|</span>ed session</PageHeader>
                  <Join emit={props.emit}/>
                </Display>



             </Display>
            </div>
      )

}

export default Audience
