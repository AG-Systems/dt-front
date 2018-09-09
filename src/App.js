import React, { Component } from 'react';



/* Components */
import AddEmployee from './components/AddEmployee.jsx';
import Employee from './components/Employee.jsx';
import Navbar from './components/Navbar.jsx';
import Dashboard from './components/Dashboard.jsx';


/* Redux, Thunk, & Routing */

/*
import { BrowserRouter } from 'react-router-dom';
import { Link, Switch, Route } from 'react-router-dom';
*/

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/';
import thunk from 'redux-thunk';



const store = createStore(rootReducer, [], applyMiddleware(thunk));


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container">
            <Dashboard />
            <h1> Employee </h1>
            <Employee />
            <AddEmployee />
        </div>
      </Provider>
    );
  }
}

export default App;
