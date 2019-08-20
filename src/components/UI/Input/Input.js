import React from 'react';
import classes from './Input.module.css';
const input = (props) => {
    let inputElement= null;
    const inputClasses = [classes.InputElement];
    let validationError = null;
    if(props.valid && props.touche){
        inputClasses.push(classes.Valid);
        validationError=<p>Please enter a valid value!</p>
    }



    switch(props.elementType){
        case ('input'): 
        inputElement = <input className={inputClasses.join(' ')}{...props.elementConfig} 
        value={props.value} onChange={props.change}/>
        break;
        case('textarea'): 
        inputElement = <textarea className={classes.InputElement}
        {...props.elementConfig} 
        value={props.value}  onChange={props.change}/>
        break;
        case('select'):
         inputElement = (<select value={props.value} 
         className={classes.InputElement} onChange={props.change}>
        {props.elementConfig.options.map(op => (
            <option key={op.value}value={op.value}> 
            {op.displayValue}
            </option>
        ))}    
        </select>
        );
        break;

        default : inputElement=<input className={classes.InputElement}
        {...props.elementConfig} 
        value={props.value}/>;
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
}

export default input;