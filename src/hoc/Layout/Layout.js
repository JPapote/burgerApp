import React, {Component} from 'react';

import Auxiliar from '../Auxiliar/Auxiliar';
import classes from './Layout.module.css';
import Toolbar from '../../components/Toolbar/Toolbar';
import SideDrawer from '../../components/Navegation/SideDrawer/SideDrawer';
class Layout extends Component{
    state= {
        showSideDrawe: false
    }

    sideDrawerCloseHandler = () => this.setState({showSideDrawe: false});
    
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
        return{showSideDrawe: !prevState.showSideDrawe};
    });
}

    render(){
        return(
    <Auxiliar>
    <Toolbar toggleHandler={this.sideDrawerToggleHandler} />
    <SideDrawer open = {this.state.showSideDrawe} close={this.sideDrawerCloseHandler}/>
    <main className={classes.Content}>
        {this.props.children}
    </main>
    </Auxiliar>
    );
 }
}

export default Layout;