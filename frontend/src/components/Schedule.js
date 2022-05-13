// import "../styles/Schedule.css"
import Table from 'react-bootstrap/Table'

function Schedule({ schedule, setSchedule }) {
    return (
        <div className="App">
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>day\time</th>
                        <th>8 - 10</th>
                        <th>10 - 12</th>
                        <th>12 - 14</th>
                        <th>14 - 16</th>
                        <th>16 - 18</th>
                        <th>18 - 20</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(schedule).map((day) =>
                            <tr key={day}>
                                <td> {day} </td>
                                {Object.keys(schedule[day]).map((time) => <td key={time}>
                                    {schedule[day][time].map((sc) => <p>{sc}</p>)}
                                </td>)}
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Schedule;