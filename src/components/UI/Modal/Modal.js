import React from 'react';
import stylos from './Modal.module.css';
//import Auxiliar from '../../../hoc/Auxiliar';
//import OrderSummary from '../../../components/Burger/OrderSummary/OrderSummary';
import Backdrop from '../Backdrop/Backdrop';
const model = (props) =>(
        <React.Fragment>
        
        <Backdrop show={props.show} clicked={props.modelClose}/>
        <div className={stylos.Modal}
        style={{transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        
        opacity: props.show ? '1' : '0'}}>

                {props.children}

        </div>
        </React.Fragment>
    
);

export default model;