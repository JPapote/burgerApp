import React from 'react';
import classes from './NavegationItem.module.css';

const navegationItem = (props) =>(

    <li className={classes.NavegationItem}> 
        <a href={props.link} className={props.active ? classes.active : null}>{props.children}</a>    
    </li>
);

export default navegationItem;