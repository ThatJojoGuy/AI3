import './App.css';
import { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

//Pages
import RegisterUser from './components/RegisterUser';
import navbar from './components/navbar';
import RegisterProduct from './components/RegisterProduct';
import RegisterOrder from './components/RegisterOrder';
import UpdateOrder from './components/UpdateOrder';

 class App extends Component {
  render(){
    return(
      //rotas
    <Router>
      <Switch>
      <Route exact path="/" component={navbar}/>
      <Route exact path="/user" component={RegisterUser}/>
      <Route exact path="/product" component={RegisterProduct}/>
      <Route exact path="/orderRegister" component={RegisterOrder}/>
      <Route exact path="/orderUpdate" component={UpdateOrder}/>
      </Switch>
    </Router>
    )
  }
}

export default App;
