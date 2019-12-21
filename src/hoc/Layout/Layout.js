import React, {useState} from 'react';
import {connect} from 'react-redux';
import Auxiliar from '../Auxiliar/Auxiliar';
import classes from './Layout.module.css';
import Toolbar from '../../components/Toolbar/Toolbar';
import SideDrawer from '../../components/Navegation/SideDrawer/SideDrawer';
 const Layout = (props) =>{
    
      const [showSideDrawe, setShowSideDrawe]=useState(false);
    

    const sideDrawerCloseHandler = () => setShowSideDrawe( false);
    
    const sideDrawerToggleHandler = () => setShowSideDrawe(!showSideDrawe);

        return(
    <Auxiliar>
        <Toolbar 
            toggleHandler={sideDrawerToggleHandler} 
            isAuth={props.isAuth}/>
        
        <SideDrawer 
            open = {showSideDrawe} 
            close={sideDrawerCloseHandler}
            isAuth={props.isAuth}/>
    
        <main className={classes.Content}>
            {props.children}
        </main>
 </Auxiliar>
    );
 
}

const mapStateToProps = state => {
    return{
        isAuth: state.auth.token !== null
    };
};


export default connect(mapStateToProps)(Layout);