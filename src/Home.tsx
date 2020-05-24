import React from 'react';
import './App.css';
import axios from "axios";


class Home extends React.Component{
 
    constructor(props: any){
      super(props);
    }

    componentDidMount(){
      axios.get('https://workout-buddy-server2020.herokuapp.com/workouts/all')
            .then(function (res) {
              console.log(res);
            })
            .catch(function (error) {
              console.log(error);
            });
    }

    render(){
      return (
          <div>
              Hello!
          </div>
        
        )
    }
  }
  
  
  
  
  
  export default Home