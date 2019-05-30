import React from 'react';
import classes from './NavegationItems.module.css';
import NavegationItem from '../NavegationItem/NavegationItem';

const navegationItems = (props) =>(
    <ul className={classes.NavegationItems}>
       <NavegationItem link="/" >Burger Builder </NavegationItem>
       <NavegationItem link="/">Checkout </NavegationItem>
    </ul>
);

export default navegationItems;

