function Schedule({ schedule, setSchedule }) {
    return (
        <div className="App">
            <table>
                <tr>
                    <th>day\time</th>
                    <th>8 - 10</th>
                    <th>10 - 12</th>
                    <th>12 - 14</th>
                    <th>14 - 16</th>
                    <th>16 - 18</th>
                    <th>18 - 20</th>
                </tr>
                {Object.keys(schedule).map((day) => {
                    console.log(day, schedule[day], schedule)
                    return(
                        <tr key={day}>
                            <td> {day} </td>
                            {Object.keys(schedule[day]).map((time) => <td key={time}> {schedule[day][time]} </td>)}
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}

export default Schedule;