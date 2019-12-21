import React from 'react';
import classes from './Modal.module.css';
import Auxiliar from '../../../hoc/Auxiliar/Auxiliar';
//import OrderSummary from '../../../components/Burger/OrderSummary/OrderSummary';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {
        
        
        // shouldComponentUpdate(nextProps, nextState) {
        //         return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
        // }

                return(
        <Auxiliar>
        <Backdrop show={props.show} clicked={props.modelClose}/>
        <div className={classes.Modal}
        style={{transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'}}>
                {props.children}

        </div>
        </Auxiliar>
                );
        
}

export default React.memo(Modal, (prevProps, nextProps) => 
nextProps.show === prevProps.show && 
nextProps.children === prevProps.children);