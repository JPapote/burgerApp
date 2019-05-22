import React from 'react';
import stylos from './BuilderControls.module.css';
import BuilderControl from './BuilderControl/BuilderControl';
import classes from './ButtonCode.module.css';


const control = [
    {label: 'Salad', type:'salad'},
    {label: 'Bacon', type:'bacon'},
    {label: 'Meat', type:'meat'},
    {label: 'Cheese', type:'cheese'}
];
const builderControls = (props) =>(
    <div className= {stylos.BuilderControls}>
        <p>Prices: $<strong>{props.price.toFixed(2)}</strong></p>
    {control.map(ctrl => (
        <BuilderControl 
        key={ctrl.label} 
        label={ctrl.label}
//        type={ctrl.type}
        added = {() => props.ingredientsAdd(ctrl.type)}
        remove = { () => props.ingredientRemove(ctrl.type)}
        disabled = {props.disabled[ctrl.type]}
        
        />
    ))}

     <button className = {classes.OrderButton} disabled = {!props.purchasable}>ORDEN NOW</button>
     </div>
);

export default builderControls;