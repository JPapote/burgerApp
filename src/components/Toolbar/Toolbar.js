import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../Logo/Logo';
import NavegationItems from '../Navegation/NavegationItems/NavegationItems';
import DrawerToggleHandler from '../Navegation/SideDrawer/DrawerToggleHandler/DrawerToggleHandler';


const toolbar = (props) => (
    
    <header className={classes.Toolbar}>
        <DrawerToggleHandler clicked={props.toggleHandler}/>
        <div className={classes.Logo}>
        <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
        <NavegationItems/>
        </nav>
    </header>
    
);

export default toolbar;