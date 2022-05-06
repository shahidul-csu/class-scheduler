import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import '../../styles/PreferenceDropdown.css'

// css for the main element clicked to see dropdown
const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    background: #061d3d;
    cursor: pointer;
    color: #d4d4d4;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

// css for the drop down elements
const DropdownLink = styled(Link)`
  background: #414757;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  font-size: 18px;
  &:hover {
    background: #224599;
    cursor: pointer;
    color: #d4d4d4;
  }
`;

const Score = styled.span`
  margin-right: 20px;
  margin-left: auto; 
`;

const PreferenceTimes = ({ item }) => {
    const [subnav, setSubnav] = useState(false);

    const showSubnav = () => setSubnav(!subnav);

    const change = () => {

    }

    return (
      <>
        <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
          <div>
            <button className='btn-weekday'></button>
            <SidebarLabel>{item.title}</SidebarLabel>
          </div>
          <div>
            {item.subNav && subnav
              ? item.iconOpened
              : item.subNav
              ? item.iconClosed
              : null}
          </div>
        </SidebarLink>
        {subnav &&
          item.subNav.map((item, index) => {
            return (
              <DropdownLink to={item.path} key={index}>
                <button className='btn-weekday'></button>
                <SidebarLabel>{item.title}</SidebarLabel>
                <Score>
                    LO
                    <button className='btn-score'></button>
                    <button className='btn-score'></button>
                    <button className='btn-score'></button>
                    <button className='btn-score'></button>
                    <button className='btn-score'></button>
                    HI
                </Score>
              </DropdownLink>
            );
          })}
      </>
    );
  };

  export default PreferenceTimes;