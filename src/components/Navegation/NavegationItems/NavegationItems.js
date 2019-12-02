import React from 'react';
import classes from './NavegationItems.module.css';
import NavegationItem from '../NavegationItem/NavegationItem';

const navegationItems = (props) =>(
    <ul className={classes.NavegationItems}>
       <NavegationItem link="/" exact>Burger Builder </NavegationItem>
       {props.isAuthenticated ? <NavegationItem link="/orders" >Orders </NavegationItem> : null}
       {!props.isAuthenticated 
       ? <NavegationItem link="/auth">Authenticated</NavegationItem>
       :<NavegationItem link="/logout">Logout</NavegationItem>
       }
    </ul>
);

export default navegationItems;

