import React, {Component} from 'react';
import Auxiliar from '../../../hoc/Auxiliar/Auxiliar';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
// componentWillUpdate () {
//     console.log("OrdeenSumary");
// }

    render(){
        const ingredients = Object.keys(this.props.ingredientes)
    .map(igKey => {
        return(
            <li key={igKey}>
                <span style={{textTransform:'capitalize'}}> {igKey} </span>:
                {this.props.ingredientes[igKey]}
                </li>
        );
    });
     
        return(
        <Auxiliar>
            <h3>Your Order</h3>
            <p>A delicius burger with this followings ingredients: </p>
            <ul>
                {ingredients }
            </ul>
            <p><strong>Preci: ${this.props.price}</strong></p>

            <p>Continue to checkout?</p>
            <Button btnType='Danger' clicked= {this.props.cancel}>CANCEL</Button>
            <Button btnType = 'Success' clicked={this.props.continue}>CONTINUE</Button>
          
        </Auxiliar>
    );
        }  
    
}

export default OrderSummary;