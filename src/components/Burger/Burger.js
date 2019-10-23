import React from 'react';
import {withRouter} from 'react-router-dom';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
//import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder';
const burger = (props) => {
    console.log(props);
    //Para cambiar el objeto array
        let  transforIngredient = Object.keys(props.ingredients).map(igKey => {
            console.log("del burger")
          //  console.log(props.ingredients);
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            });
        })
            .reduce((err, el) => {
                return err.concat(el);
            }, []);
    
    if (transforIngredient.length === 0) {
        transforIngredient = <p>Please start adding ingredients</p>
    }
    
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transforIngredient}

            <BurgerIngredient type="bread-bottom" />

        </div>
    );
};



export default withRouter (burger);