import React from 'react';
import classes from './NavegationItems.module.css';
import NavegationItem from '../NavegationItem/NavegationItem';

const navegationItems = () =>(
    <ul className={classes.NavegationItems}>
       <NavegationItem link="/" exact>Burger Builder </NavegationItem>
       <NavegationItem link="/orders" >Orders </NavegationItem>
    </ul>
);

export default navegationItems;

