import React, {useEffect} from 'react';
import * as actions from '../../../store/actions/index';
import{Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const Logout = (props) =>{
    const {onLogout} = props;
    useEffect(() => {
        onLogout();
    },[onLogout])

    
        return <Redirect to='/'/>
    
}

const mapDispatchToProp = dispatch =>{
    return{
        onLogout: () => dispatch(actions.logout())
    };
};

export default connect(null, mapDispatchToProp)(Logout);