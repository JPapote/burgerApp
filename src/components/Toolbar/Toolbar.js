import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../Logo/Logo';
import NavegationItems from '../Navegation/NavegationItems/NavegationItems';
const toolbar = () => (
    <header className={classes.Toolbar}>
        <div>Menu</div>
        <Logo />
        <nav>
        <NavegationItems />
        </nav>
    </header>
);

export default toolbar;