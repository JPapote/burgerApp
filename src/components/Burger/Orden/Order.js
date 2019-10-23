import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    const ingredients = [];
    console.log(props.ingredient);
    for(let i in props.ingredient){
        ingredients.push({name: i,  mount:props.ingredient[i]})
    }

    const ingredientOutput = ingredients.map(ig => {
        return(
            <span 
            key={ig.name}
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            >{ig.name} ({ig.mount})</span>
        );
    });
    return(
        <div className={classes.Order}>
            <p>Ingredient: {ingredientOutput}</p>
            <p>Precie: <strong>{Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
}

export default order;