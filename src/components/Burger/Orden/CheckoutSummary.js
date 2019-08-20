import React from 'react';
import Burger from '../Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    return(
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes!</h1>
            <div style={{width:"100%", height: "300px", margin:"auto"}}>
                <Burger ingredients = {props.ingredients} />
            </div>
            <div>
                <Button 
                btnType="Danger"
                clicked={props.handlerCancel}>Cancel</Button>
                <Button 
                btnType="Success"
                clicked= {props.handlerContinue}>Continue</Button>
            </div>
        </div>
    );
}

export default checkoutSummary;