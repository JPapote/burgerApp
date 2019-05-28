import React from 'react';
import Auxiliar from '../../../hoc/Auxiliar';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredients = Object.keys(props.ingredientes)
    .map(igKey => {
        return(
            <li key={igKey}>
                <span style={{textTransform:'capitalize'}}> {igKey} </span>
                {props.ingredientes[igKey]}
                </li>
        );
    });
    
    return (
        <Auxiliar>
            <h3>Your Order</h3>
            <p>A delicius burger with this followings ingredients: </p>
            <ul>
                {ingredients }
            </ul>
            <p>Continue to checkout?</p>
            <Button btnType='Danger' clicked= {props.cancel}>CANCEL</Button>
            <Button btnType = 'Success' clicked={props.continue}>CONTINUE</Button>
          
        </Auxiliar>
    )
};

export default orderSummary;