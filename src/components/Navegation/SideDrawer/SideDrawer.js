import React from 'react';
import NavegationItems from '../NavegationItems/NavegationItems';
import Logo from '../../Logo/Logo';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliar from '../../../hoc/Auxiliar/Auxiliar';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return(
        <Auxiliar>
            <Backdrop show={props.open} clicked={props.close}/>
    <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
        <Logo />
        </div>
        <nav>
            <NavegationItems />
        </nav>
    </div>
    </Auxiliar>
    );
};

export default sideDrawer;