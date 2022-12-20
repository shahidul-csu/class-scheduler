import React, { memo } from 'react';
import MenuBtnCss from "../../styles/MenuButton.module.css"



const MenuButton =(props)=> {
        return (<div id={MenuBtnCss.buttonContainer} onClick={(e)=>{e.stopPropagation(); props.onclick();}}>
                        <div className={MenuBtnCss.ImgContainer}>
                                <img className={MenuBtnCss.BtnImg} src={props.btn_Pic_Src}></img>
                        </div>
                        <div className={MenuBtnCss.buttonName}><span >{props.btnName}</span></div>    
                </div>
        )
}

const MenuButtonMemo = memo(MenuButton, ()=>true);
//props are always equal thats why I passed in true(Olise)

export default MenuButtonMemo;