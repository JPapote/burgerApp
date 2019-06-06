import React from 'react';
import classes from './NavegationItems.module.css';
import NavegationItem from '../NavegationItem/NavegationItem';

const navegationItems = () =>(
    <ul className={classes.NavegationItems}>
       <NavegationItem link="/" active>Burger Builder </NavegationItem>
       <NavegationItem link="/" >Checkout </NavegationItem>
    </ul>
);

export default navegationItems;

