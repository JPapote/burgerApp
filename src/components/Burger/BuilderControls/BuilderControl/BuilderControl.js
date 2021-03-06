import React from 'react';
import classes from './BuilderControl.module.css';

const builderControl = (props) =>(
    <div className={classes.BuildControl}>
        <div className={classes.Label}> {props.label}</div>
        <button className={classes.Less} onClick = {props.remove} disabled = {props.disabled}>Less</button>
        <button className={classes.More} onClick = {props.added}>More</button>
    </div>
);

export default builderControl;