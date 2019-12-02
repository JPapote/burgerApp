import React, {Component} from 'react';
import {connect} from 'react-redux';
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
        <Toolbar 
            toggleHandler={this.sideDrawerToggleHandler} 
            isAuth={this.props.isAuth}/>
        
        <SideDrawer 
            open = {this.state.showSideDrawe} 
            close={this.sideDrawerCloseHandler}
            isAuth={this.props.isAuth}/>
    
        <main className={classes.Content}>
            {this.props.children}
        </main>
 </Auxiliar>
    );
 }
}

const mapStateToProps = state => {
    return{
        isAuth: state.auth.token !== null
    };
};


export default connect(mapStateToProps)(Layout);