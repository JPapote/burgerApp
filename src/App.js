import React, {useEffect} from 'react';
import Layout from './hoc/Layout/Layout';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/logout/Logout';
import * as methodIndex from './store/actions/index';


const App = (props) =>{

  const {onTryAutoSignup } = props;
  useEffect( () =>{
    onTryAutoSignup();
  },[onTryAutoSignup]);

    let routes = (
      <Switch>
      <Route path="/" exact component={BurgerBuilder} />
      <Route path="/auth" component={Auth}/> 
      <Redirect to="/"/>
      </Switch>
    ) ;

    if(props.isAuthenticated){
      routes = (
        <Switch>
         <Route path="/" exact component={BurgerBuilder} />
         <Route path="/checkout" component={Checkout} />
         <Route path="/orders" component={Orders} /> 
         <Route path="/logout" component={Logout}/> 
         <Redirect to="/"/>
         </Switch>
      );
    }
    return (
      <div>
        <Layout >
         {routes}
        </Layout>
      </div>
    );
  
}

const mapStateToProps = state => {
  return{
    isAuthenticated: state.auth.token !==  null
  }
}

const mapDispacthToProps = dispacth => {
  return{
    onTryAutoSignup: () => dispacth (methodIndex.authCheckState()) 
  }
}

export default withRouter(connect(mapStateToProps,mapDispacthToProps)(App));
