import React from 'react';
import pageheaderIcon from "../../../images/BooksIcon.png"
import AddUserPageCss from "../../../styles/AddUserPg.module.css"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
const addCoursePg = () => {
        return (
            <React.Fragment>
                <div id={AddUserPageCss.pageBody}>

                    <div id={AddUserPageCss.headerWrapper}>

                        <div id={AddUserPageCss.heading}>
                            <span id={AddUserPageCss.headerText} >Add New Course </span>

                            <img id={AddUserPageCss.PGIcon} src={pageheaderIcon} alt="Book Icon" 
                            style={{height: "25px", width:"25px"}}/>

                        </div>
                    </div>

                    <p id={AddUserPageCss.pgInstructions} ><b>Please add a course below with the
                         course name, units, weekly frequency, sync time, capacity, and 
                         group number.</b></p>

                    <Form id={AddUserPageCss.MyForm} >
                {/* use `${pageCss.formGroup} ${pageCss.formGroup} 
                testcss`  for using multiple css */}
                <Form.Group className={`${AddUserPageCss.formGroup}`} >
                    <Form.Label className={`${AddUserPageCss.customLabel}`}>Course Name</Form.Label>
                    <Form.Control className={AddUserPageCss.customInput} type="text"  />
                </Form.Group>

                <Form.Group className={AddUserPageCss.formGroup}>
                    <Form.Label className={AddUserPageCss.customLabel}>Capacity</Form.Label>
                    <Form.Control className={AddUserPageCss.customInput}type="number"  />
                </Form.Group>

                <Form.Group className={AddUserPageCss.formGroup} >
                    <Form.Label className={AddUserPageCss.customLabel}>Group Number</Form.Label>
                    <Form.Control className={AddUserPageCss.customInput}type="number"  />
                </Form.Group>

                <Form.Group className={AddUserPageCss.formGroup} >
                    <Form.Label className={AddUserPageCss.customLabel}>Units</Form.Label>
                    <Form.Control className={AddUserPageCss.customInput}type="number"  />
                </Form.Group>

                <Form.Group className={AddUserPageCss.formGroup} >
                    <Form.Label className={AddUserPageCss.customLabel}>Weekly Frequency</Form.Label>
                    <Form.Control className={AddUserPageCss.customInput}type="number"  />
                </Form.Group>

                <Form.Group className={AddUserPageCss.formGroup} >
                    <input className={`${AddUserPageCss.radio} form-check-input`} type="radio" name="Radio" id="yes2" defaultChecked/>
                    
                    <label className="form-check-label" htmlFor="yes2">
                    <span className={AddUserPageCss.radioText}><b>Yes</b></span> 
                    </label>

                    <input  className={`${AddUserPageCss.radio} form-check-input`} type="radio" name="Radio" id="no2"/>
                    
                    <label  className="form-check-label" htmlFor="no2">
                           <span className={AddUserPageCss.radioText}>
                            <b>No</b></span> 
                    </label>

                </Form.Group>
                
            </Form>
            <div id={AddUserPageCss.divSubmit}><Button id={AddUserPageCss.submitBTN}>Add Course</Button></div>
            
                        
                </div>
                

            </React.Fragment>
        );
}
 
export default addCoursePg;
