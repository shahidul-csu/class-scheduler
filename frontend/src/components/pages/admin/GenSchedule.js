import React, {useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import TableStyle from "../../../styles/TableStyle.module.css";

const GenSchedule = () => {

    /* Set page tab name */
    useEffect(() => {
        document.title = "Class Scheduler"
      }, [])

      return (<React.Fragment >
        
        {/* function productDelete(ctl) {
    $(ctl).parents("tr").remove();
} */}
        <div id={TableStyle.TableContainer}>

                <table id={TableStyle.tables}>
                    <thead>
                        <tr id={TableStyle.sandwichtop2}>
                        <th className={TableStyle.TableNoBorder}>Time Slot</th>
                        <th className={TableStyle.TableNoBorder}>8AM-10PM</th>
                        <th className={TableStyle.TableNoBorder}>10AM-12PM</th>
                        <th className={TableStyle.TableNoBorder}>12PM-2PM</th>
                        <th className={TableStyle.TableNoBorder}>2PM-4PM</th>
                        <th className={TableStyle.TableNoBorder}>4PM-6PM</th>
                        <th className={TableStyle.TableNoBorder}>6PM-8PM</th>
                        </tr>

                        </thead>
                    <tbody id={TableStyle.cells}>
                    
                        <tr> 
                            <td className={TableStyle.TableDay}>Monday</td>
                            <td>_ </td>
                            <td>_ </td>
                            <td>_ </td>
                            <td>_ </td>
                            <td>_ </td>
                            <td>_ </td>
                        </tr>
                        <tr> 
                            <td className={TableStyle.TableDay}>Tuesday</td>
                            <td>_ </td>
                            <td>_ </td>
                            <td>_ </td>
                            <td>_ </td>
                            <td>_ </td>
                            <td>_ </td>
                        </tr>
                        <tr> 
                            <td className={TableStyle.TableDay}>Wednesday</td>
                            <td>_ </td>
                            <td>_ </td>
                            <td>_ </td>
                            <td>_ </td>
                            <td>_ </td>
                            <td>_ </td>
                        </tr>
                        <tr> 
                            <td className={TableStyle.TableDay}>Thursday</td>
                            <td>_ </td>
                            <td>_ </td>
                            <td>_ </td>
                            <td>_ </td>
                            <td>_ </td>
                            <td>_ </td>
                        </tr>
                        <tr> 
                            <td className={TableStyle.TableDay}>Friday</td>
                            <td>_ </td>
                            <td>_ </td>
                            <td>_ </td>
                            <td>_ </td>
                            <td>_ </td>
                            <td>_ </td>
                        </tr>
                         
                    </tbody>

                    
                </table>
        
        </div>
        </React.Fragment>);
}
export default GenSchedule