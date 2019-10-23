import React, { Component } from 'react';
import Auxiliar from '../../hoc/Auxiliar/Auxiliar';
import Burger from '../../components/Burger/Burger';
import BuilderControls from '../../components/Burger/BuilderControls/BuilderControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import axios from '../../axios-ordens';

import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {



    //   constructor(props){
    //       super(props);
    //       this.state= { ... }
    //   }
    state = {
       
        purchasing: false,
        
    }
    componentDidMount() {
        console.log(this.props.ing)
        this.props.onInitIngredient();
     }
    upDatePurchaseState = (ingredient) => {
        const referencia = (sum, el) => sum + el;
        console.log("el de pruchase state");
        console.log(ingredient);
        const sum = Object.keys(ingredient)
            .map(igKey => ingredient[igKey])
            .reduce(referencia, 0);

        return  sum > 0;
    }

  
    purchaHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }
    purchaseContinue = () => {
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
       
    }


    render() {

        let diableInfo = {
            ...this.props.ing
        };

        for (let key in diableInfo) {
            diableInfo[key] = diableInfo[key] <= 0;
        }

        let ordenSummary = null;

        let burger = this.props.error ? <p>Ingredient can´t be loadend</p> : <Spinner />;
        if (this.props.ing) {
            console.log( "el del if")
            console.log(this.props)
            console.log(this.props.ing);
            burger =(<Auxiliar>
                    <Burger ingredients={this.props.ing} />
                    <BuilderControls 
                    ingredientAdd={this.props.onIngredientADD}
                        ingredientRemove={this.props.onIngredientREMOVE}
                        disabled={diableInfo}
                        purchasable={this.upDatePurchaseState(this.props.ing)}
                        price={this.props.price}
                        ordened={this.purchaHandler} />
                </Auxiliar>
                );
            ordenSummary = <OrderSummary ingredientes={this.props.ing}
                cancel={this.purchaseCancelHandler}
                continue={this.purchaseContinue}
                price={this.props.price} />
        }
        

        return (

            <Auxiliar>

                <Modal show={this.state.purchasing} modelClose={this.purchaseCancelHandler}>
                    {ordenSummary}
                </Modal>
                {burger}

            </Auxiliar>
        );

    }
}
 const mapStateToProps = state => {
        return {
         ing : state.burgerBuilder.ingredients,
         price: state.burgerBuilder.totalPrice,
         error: state.burgerBuilder.error
        };
    };

 const mapDispatchToProps = dispatch => {
        return{
            onIngredientADD: (ingName) => dispatch(actions.addIngredient(ingName)),
            onIngredientREMOVE: (ingName) => dispatch(actions.removeIngredient(ingName)),
            onInitIngredient: () => dispatch (actions.initIngredient()),
            onPurchaseInit : () => dispatch(actions.purchaseInit())
        };
    };



export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));