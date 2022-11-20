import React, { Component, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import loadingImg from "../images/loading.png"
import LoadBtnCSS from "../styles/LoadingButton.module.css"

const LoadingButton = (props) => {
        const [loadingVisibility, setLoadingVisibility] = useState(false);

        const OnClickHandler = () => {
                props.onclick()
                setLoadingVisibility(true);
        }

        useEffect(()=>{
                if(props.stopLoadingAnimation){
                        setLoadingVisibility(false);  
                }

        },[props.stopLoadingAnimation]);

        const isLoading = (boolValue) => {
                if(boolValue){
                        return <img className={LoadBtnCSS.rotate} style={{height: "16px", width:"16px"}} src={loadingImg} alt="Loading ..." />
                }
        }

        return (<Button style={{backgroundColor:"#112E51" }} onClick={OnClickHandler}>{props.btnName} {isLoading(loadingVisibility)}</Button>);
}

export default LoadingButton;