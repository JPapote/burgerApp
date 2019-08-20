import React from 'react';
import classes from './Button.module.css';

const boton = (props) => (
    <button 
    disabled={props.disabled}
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick = {props.clicked}>{props.children} </button>
);

export default boton; 