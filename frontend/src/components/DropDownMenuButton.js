import React, { Component, memo } from 'react';
import { useNavigate } from "react-router-dom";

import MenuBtnCss from "../styles/MenuButton.module.css"



const DropDownMenuButton =(props)=> {
    let navigate = useNavigate();

    const optionClickHandler = (e, route) => {
        e.stopPropagation();
        props.BtnClickHandler();

        if(route){
            navigate(route);
        }
    }

  


    const displayDropDown = () =>{

        if(props.showDropDown){
            return <div className={MenuBtnCss.DropDownContainer}>

            <div className={MenuBtnCss.OptionGroup}>

            { props.children.map((optionElement,index) => { 
                //option element is a list that contains the option name and the navigation route
                return <div key={`${optionElement[0]}${index}`}className={MenuBtnCss.Option} 
            onClick={(e)=> optionClickHandler(e,optionElement[1] )}>
                <span className={MenuBtnCss.OptionText}>{optionElement[0]}</span>
            </div>
            })}

        </div>
            
            </div> 
        }
    }

        return (
            <React.Fragment>
                <div  >
            <div id={MenuBtnCss.buttonContainer} onClick={(e)=>{e.stopPropagation(); props.BtnClickHandler()}} >

                <div className={MenuBtnCss.ImgContainer}>
                <img className={MenuBtnCss.BtnImg} src={props.btn_Pic_Src}></img>
                </div>
            <div className={MenuBtnCss.buttonName}><span >{props.btnName}</span></div> 

            </div>
            {displayDropDown()}
            </div>
                    

            </React.Fragment>
        )
}

// we use a memo here to prevent other instances of this
// component from rerendering when their show dropdown
//prop did't change. We do this by using memo
const MenuButtonMemo = memo(DropDownMenuButton,
    (prevProps,nextProps) =>{
        //if previous showDropDown prop is equal to the new
        // (next) showDropDown prop, dont rerender. else
        // re-render the component
        if(prevProps.showDropDown === nextProps.showDropDown){
            return true;
        }
        return false;
})
 
export default MenuButtonMemo;