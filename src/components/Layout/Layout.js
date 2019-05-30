import React from 'react';

import Auxiliar from '../../hoc/Auxiliar';
import classes from './Layout.module.css';
import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../Navegation/SideDrawer/SideDrawer';
const layout = (props) =>(
    <Auxiliar>
    <Toolbar />
    <SideDrawer />
    <main className={classes.Content}>
        {props.children}
    </main>
    </Auxiliar>
);


export default layout;