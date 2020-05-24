import React from 'react';
import './App.css'
import { Route, Switch } from 'react-router-dom';
import Home from "./Home";
import PostWorkout from './PostWorkout';

class Main extends React.Component{
 

  render(){
    return (
        <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/create' component={PostWorkout}/>
      </Switch>
      
      )
  }
}





export default Main