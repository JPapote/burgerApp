import React, { useState, useEffect, useCallback} from 'react';
import Auxiliar from '../../hoc/Auxiliar/Auxiliar';
import Burger from '../../components/Burger/Burger';
import BuilderControls from '../../components/Burger/BuilderControls/BuilderControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import {connect, useDispatch, useSelector} from 'react-redux';
import axios from '../../axios-ordens';

import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

 const BurgerBuilder = (props) =>{
    const [purchasing, setPurchasing] = useState(false); 
    
    const ing = useSelector( (state) =>{ return state.burgerBuilder.ingredients});
    const price = useSelector( (state) =>{ return  state.burgerBuilder.totalPrice});
    const error = useSelector ((state) => { return state.burgerBuilder.error});
    const isAuthenticated = useSelector((state) => {return state.auth.token !== null});

    const dispatch = useDispatch();

    const onIngredientADD = (ingName) => dispatch(actions.addIngredient(ingName));
    const onIngredientREMOVE = ingName => dispatch(actions.removeIngredient(ingName)); 
    const onInitIngredient = useCallback(() => dispatch(actions.initIngredient()), [dispatch])
    const onPurchaseInit = () => dispatch(actions.purchaseInit())
    const onSetAuthRedirectPath = path => dispatch(actions.setRedirectAuth(path))

 
    useEffect(()=>{
        onInitIngredient();
    }, [onInitIngredient]);

    const upDatePurchaseState = (ingredient) => {
        const referencia = (sum, el) => sum + el;
        const sum = Object.keys(ingredient)
            .map(igKey => ingredient[igKey])
            .reduce(referencia, 0);

        return  sum > 0;
    }

  
    const purchaHandler = () => {
        
        if(isAuthenticated){
            setPurchasing(true);
        }else{
            onSetAuthRedirectPath("/checkout");
            props.history.push("/auth");
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }
    const purchaseContinue = () => {
        onPurchaseInit();
        props.history.push("/checkout");
       
    }


        let diableInfo = {
            ...ing
        };

        for (let key in diableInfo) {
            diableInfo[key] = diableInfo[key] <= 0;
        }

        let ordenSummary = null;

        let burger = error ? <p>Ingredient can´t be loadend</p> : <Spinner />;
        if (ing) {
            burger =(<Auxiliar>
                    <Burger ingredients={ing} />
                    <BuilderControls 
                    ingredientAdd={onIngredientADD}
                        ingredientRemove={onIngredientREMOVE}
                        disabled={diableInfo}
                        purchasable={upDatePurchaseState(ing)}
                        price={price}
                        ordened={purchaHandler} 
                        isAuth={isAuthenticated}/>
                </Auxiliar>
                );
            ordenSummary = <OrderSummary ingredientes={ing}
                cancel={purchaseCancelHandler}
                continue={purchaseContinue}
                price={price} />
        }
        

        return (

            <Auxiliar>

                <Modal show={purchasing} modelClose={purchaseCancelHandler}>
                    {ordenSummary}
                </Modal>
                {burger}

            </Auxiliar>
        );
}
 const mapStateToProps = state => {
        return {
         ing : state.burgerBuilder.ingredients,
         price: state.burgerBuilder.totalPrice,
         error: state.burgerBuilder.error,
         isAuthenticated: state.auth.token !== null
        };
    };

 const mapDispatchToProps = dispatch => {
        return{
            onIngredientADD: (ingName) => dispatch(actions.addIngredient(ingName)),
            onIngredientREMOVE: (ingName) => dispatch(actions.removeIngredient(ingName)),
            onInitIngredient: () => dispatch (actions.initIngredient()),
            onPurchaseInit : () => dispatch(actions.purchaseInit()),
            onSetAuthRedirectPath : (path) => dispatch(actions.setRedirectAuth(path))
        };
    };



export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));