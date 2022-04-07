import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';

const SidebarNav = styled.nav`
  background: #112E51;
  width: 250px;
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



const Sidebar = () => {
  return (
    <>
        <IconContext.Provider value={{ color: '#fff' }}>
            <SidebarNav>
                <SidebarWrap>
                    {SidebarData.map((item, index) => {
                      return <SubMenu item={item} key={index} />;
                    })}
                </SidebarWrap>
            </SidebarNav>
        </IconContext.Provider>
    </>
  );
};

export default Sidebar;