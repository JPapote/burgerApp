import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './NavegationItem.module.css';
const navegationItem = (props) =>(

    <li className={classes.NavegationItem}> 
        <NavLink
            to={props.link}
            exact={props.exact}
            activeClassName={classes.active}> {props.children}</NavLink>    
    </li>
);

export default navegationItem;