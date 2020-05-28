import React from 'react';
import './App.css';
import axios from "axios";
import { Link } from 'react-router-dom';

class exercise {

    name:string;
    lengthM:string;
    restM:string;
    lengthS:string;
    restS:string;
    workoutName:string;

    constructor(name: string, lengthM:string, lengthS:string, restM:string, restS:string, workoutName:string){
        this.name=name;
        this.lengthS=lengthS;
        this.restS=restS;
        this.lengthM=lengthM;
        this.restM=restM;
        this.workoutName=workoutName;
    }
    

}

class ViewAllWorkouts extends React.Component<{},{isAuth:boolean, workouts:Array<String>}>{
 
    constructor(props: any){
        super(props);
        this.state={isAuth:false, workouts:[]};
        this.componentDidMount=this.componentDidMount.bind(this);
    }

    componentDidMount(){
        axios.post('https://workout-buddy-server2020.herokuapp.com/workouts/getByUserId', {
                workoutName:"",
                name:"",
                length:0,
                rest:0,
                userId:0,
                visible:1
            })
            .then((res) => {
                console.log(res);
              let wSet= new Set<string>();

              res.data.forEach( (e: exercise) =>{
                wSet.add(e.workoutName);
              });

              
              this.setState({isAuth:true, workouts:Array.from(wSet)});
            })
            .catch((error) => {
              console.log(error);
              this.setState({isAuth:false})
            });
    }

  render(){
    return (
        <div>
            <h1>
                Click on a workout to get started
            </h1>
            <ul className="list-group">
                {this.state.workouts.map((workoutName, idx)=>{
                    return(
                    <li className="list-group-item"><Link to={"/view/"+workoutName} >{idx}. {workoutName}</Link></li>
                    )
                })}
            </ul>
        </div>
      
      )
  }
}





export default ViewAllWorkouts