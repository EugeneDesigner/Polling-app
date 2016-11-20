import React from 'react'


const addMemberRow = (member, i) => {
  return (
    <tr key={i}>
        <td>{member.name}</td>
        <td>{member.id}</td>
    </tr>
  )
}

const Attendance = (props) =>  {


      return (
        <div>

            <h2>Attendance - {props.audience.length} members </h2>
            <table className="table table-striped">
              <thead>
                  <tr>
                    <th>Audience members</th>
                    <th>Socket ID</th>
                  </tr>
              </thead>
              <tbody>
                {props.audience.map(addMemberRow)}
              </tbody>
            </table>
      </div>
  )
}

export default Attendance
