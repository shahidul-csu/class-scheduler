import React, { useState } from 'react';
import styled from 'styled-components';
import { Data } from './Data';
import { IconContext } from 'react-icons/lib';
import PreferenceTimes from './PreferenceTimes';

const SidebarNav = styled.nav`
  background: #112E51;
  width: 700px;
  display: flex;
  justify-content: center;
  
  transition: 350ms;
  z-index: 10;
  
  margin-left: min(15px, 15px);
  margin-right: min(15px, 15px);
`;

const SidebarWrap = styled.div`
  width: 100%;
  height: 100%;
`;

const PreferenceDropdown = () => {
  return (
    <>
        <IconContext.Provider value={{ color: '#fff' }}>
            <SidebarNav>
                <SidebarWrap>
                    {Data.map((item, index) => {
                      return <PreferenceTimes item={item} key={index} />;
                    })}
                </SidebarWrap>
            </SidebarNav>
        </IconContext.Provider>
    </>
  )
}

export default PreferenceDropdown