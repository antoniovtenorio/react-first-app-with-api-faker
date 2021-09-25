import './App.css';
import React, {Component} from 'react';
import { Route, Switch } from 'react-router';
import { HashRouter } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Clientes from './pages/clientes/Clientes';
import Navbar from './components/layout/Navbar/Navbar';
import ClientesAddFc from './pages/clientes/ClientesAddFc';
export default class App extends Component {
  
  render () {
    return (
      <HashRouter>
        <Navbar/>
        <div className="container">
          <Switch>
              <Route path="/dashboard" exact component={Dashboard} />
              <Route path="/clientes" exact component={Clientes} />
              <Route path="/clientes-add" exact component={ClientesAddFc} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}


