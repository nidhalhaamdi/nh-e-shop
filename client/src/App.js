import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import Header from './components/header/header.component';

import { selectCurrentUser } from './redux/user/user.selectors';

import { checkUserSession } from './redux/user/user.actions';

const App = () => {
  
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch()
    /* All it does is whenever you call dispatch, you pass it an object, which is the action object, which
  takes the shape of a type and an optional payload. And it will pass that to your REDUX store.
  That will then go through your reducers, your saga's, your thunks, whatever it is that responds to
  actions, will then receive them. So it's the exact same flow.
  The only difference is that now you pretty much just have access to it whenever you call the use dispatch
  hook. And this dispatch method is now available to you inside of your component. */

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);
  
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route 
          path="/signin" 
          render={() => currentUser ? 
            (<Redirect to='/' />) 
            : 
            (<SignInAndSignUpPage />)} 
          />
      </Switch>
    </div>
  );
}

export default App;

// const mapStateToProps = createStructuredSelector({
//   currentUser: selectCurrentUser
// });

// const mapDispatchToProps = dispatch => ({
//   checkUserSession: () => dispatch(checkUserSession())
// });

// export default connect(mapStateToProps, mapDispatchToProps)(App);

/*  What will end up returning inside of mapDispatchToProps will be setCurrentUser, 
    but it goes to a function that gets the user object and then calls dispatch.
    And what dispatch is: it is a way for Redux to know that whatever object you're passing me, 
    is going to be an action object that I'm going to pass to every reducer!
    So our user action is a function that gets the user but returns an action object.
    So we are going to call our action, but we're going to pass that user in so that what 
    we're doing is we're invoking current user with the user that will then be used as the payload.
    But this returns the object, so we're just dispatching the object. */
