import React, { Component } from 'react';
import Auxiliar from '../../hoc/Auxiliar';
import Burger from '../../components/Burger/Burger';
import BuilderControls from '../../components/Burger/BuilderControls/BuilderControls';
import Modal from '../../components/UI/Modal/Modal';

const INGREDIENT_PRICES = {
    salad: 10.5,
    bacon: 6.23,
    cheese: 3.73,
    meat: 5.89
};

class BurgerBuilder extends Component {



    //   constructor(props){
    //       super(props);
    //       this.state= { ... }
    //   }
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false
    }
    upDatePurchaseState = (ingredient) => {
        const referencia = (sum, el) => sum + el
        const sum = Object.keys(ingredient)
            .map(igKey => ingredient[igKey])
            .reduce(referencia, 0);

        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updateCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredient });
        this.upDatePurchaseState(updatedIngredient);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updateCount = oldCount - 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updateCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredient });
        this.upDatePurchaseState(updatedIngredient);
    }


    render() {

        let diableInfo = {
            ...this.state.ingredients
        };

        for (let key in diableInfo) {
            diableInfo[key] = diableInfo[key] <= 0
        }

        return (

            <Auxiliar>

                <Modal />
                <Burger ingredients={this.state.ingredients} />

                <BuilderControls ingredientsAdd={this.addIngredientHandler}
                    ingredientRemove={this.removeIngredientHandler}
                    disabled={diableInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice} />

            </Auxiliar>
        );

    }

}

export default BurgerBuilder;