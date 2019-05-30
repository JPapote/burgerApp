import React from 'react';
import NavegationItems from '../NavegationItems/NavegationItems';
import Logo from '../../Logo/Logo';
import classes from './SideDrawer.module.css';

const sideDrawer = () => {
    return(
    <div className={classes.SideDrawer}>
        <Logo />

        <nav>
            <NavegationItems />
        </nav>
    </div>
    )
};

export default sideDrawer;