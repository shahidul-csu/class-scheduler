import React, {useState} from 'react';
import './App.css';
import axios from 'axios'
import Header from './components/Header';
import Footer from './components/Footer.js'
import LandingPage from './components/LandingPage';
import Display from './components/faculty-submitAvailability/Display';

function App() {

    const [ schedule, setSchedule ] = useState("")

    return (
        <div>
            {/*<Header />*/}
            {/*<LandingPage/>*/}
            {/*/!**!/*/}
            {/*<Display/>*/}
            {/*<Footer/>*/}
            <button color="green" onClick={() => {
                axios({
                    url: "http://127.0.0.1:8000/gen_sch/",
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(
                    res => {
                        for (let s of res["data"]) {
                            console.log(s)
                        }
                        setSchedule(res["data"][0])
                    }
                ).catch(
                    err => {
                        console.log(err)
                        alert("Failed")
                    }
                )
            }}>Make schedule</button>
            {/*<a href="http://127.0.0.1:8000/gen_sch/">Make schedule</a>*/}

            {schedule && Object.keys(schedule).map((key) => <div key={key}> {key}: {schedule[key]} </div>)}

        </div>
    );
}

export default App;
