import React, { Component } from 'react';
import Auxiliar from '../../hoc/Auxiliar/Auxiliar';
import Burger from '../../components/Burger/Burger';
import BuilderControls from '../../components/Burger/BuilderControls/BuilderControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-ordens';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }
    componentDidMount() {
        axios.get('https://burger-my-app-7a9ed.firebaseio.com/ingredient.json')
            .then(response => {
                this.setState({ ingredients: response.data })
            })
            .catch(error => {
                this.setState({error: true})
               // console.log(this.state.error);
            });
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

    purchaHandler = () => this.setState({ purchasing: true });

    purchaseCancelHandler = () => this.setState({ purchasing: false });

    purchaseContinue = () => {
        this.setState({ loading: true });
        const orden = {
            ingredient: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Javier Baez',
                address: {
                    street: 'Alemanes del Volga 80',
                    zipCode: '41351',
                    country: 'Argentina'
                },
                email: 'javier.bb@live.com'
            },
            deliveryMethod: 'fasttest'
        };

        axios.post('/ordens.json', orden)
            .then(response => this.setState({ loading: false, purchasing: false }))
            .catch(error => this.setState({ loading: false, purchasing: false }));

        //alert("You continue!!");
    }


    render() {

        let diableInfo = {
            ...this.state.ingredients
        };

        for (let key in diableInfo) {
            diableInfo[key] = diableInfo[key] <= 0
        }

        let ordenSummary = null;

        let burger = this.state.error ? <p>Ingredient can´t be loadend</p> : <Spinner />
        if (this.state.ingredients) {
            burger = 
                (<Auxiliar>
                    <Burger ingredients={this.state.ingredients} />
                    <BuilderControls ingredientsAdd={this.addIngredientHandler}
                        ingredientRemove={this.removeIngredientHandler}
                        disabled={diableInfo}
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        ordened={this.purchaHandler} />
                </Auxiliar>
                );
            ordenSummary = <OrderSummary ingredientes={this.state.ingredients}
                cancel={this.purchaseCancelHandler}
                continue={this.purchaseContinue}
                price={this.state.totalPrice} />
        }
        if (this.state.loading) {
            ordenSummary = <Spinner />
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

export default withErrorHandler(BurgerBuilder, axios);