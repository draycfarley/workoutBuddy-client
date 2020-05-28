import React from 'react';
import './App.css'
import { Route, Switch } from 'react-router-dom';
import Home from "./Home";
import PostWorkout from './PostWorkout';
import ViewWorkout from "./ViewWorkout";
import ViewAllWorkouts from "./ViewAllWorkouts";

class Main extends React.Component{
 

  render(){
    return (
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/create' component={PostWorkout}/>
        <Route exact path='/view' component={ViewAllWorkouts}/>
        <Route exact path='/view:workoutName' component={ViewWorkout}/>
      </Switch>
      
      )
  }
}





export default Main