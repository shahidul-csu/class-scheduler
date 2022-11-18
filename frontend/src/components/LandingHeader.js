import React from 'react'
import '../styles/Header.css'

const LandingHeader = (props) => {

  const links = [<li className='lists'><a className='as' href='#'>Update Options</a></li>,
                <li className='lists'><a className='as' href='#'>Schedule</a></li>,
                <li className='lists'><a className='as' href='#'>Preferences</a></li>,
                <li className='lists'><a className='as' href='/settings'>Settings</a></li>]
  const displayLinks = () => {
    // let returnVal = links.map((link,index) => )
    let returnVal = links.filter((link, index) =>{
      if(props.index.includes(index)) {
        return true;
      }
      else{
        return false;
      }
    }
     )
     return returnVal;
  }
  return (
    <div>
      <div className='heading'>
          <div className='navbar'>
              <a className='as' href="/"><h1>Class Scheduler</h1></a>
                <ul className='nav_links' id='link_display_option'>
                  {
                    displayLinks()
                  }
                </ul>
          </div>
      </div>
    </div>
  )
}

export default LandingHeader