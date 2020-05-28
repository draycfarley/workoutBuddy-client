import React from 'react';
import './App.css';
import axios from "axios";
import { Link, RouteComponentProps } from 'react-router-dom';

interface MatchParams {
    workoutName: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {
}

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


class ViewWorkout extends React.Component<MatchProps,{isAuth:boolean, exercises:Array<exercise>}>{
 
    constructor(props: any){
        super(props);
        this.state={isAuth:false, exercises:[]};
        this.componentDidMount=this.componentDidMount.bind(this);
    }

    componentDidMount(){
        axios.post('https://workout-buddy-server2020.herokuapp.com/workouts/getByWorkoutName', {
                workoutName:this.props.match.params.workoutName,
                name:"",
                length:0,
                rest:0,
                userId:0,
                visible:1
            })
            .then((res) => {
                console.log(res);
                let exercises=[];
                res.data.forEach((e:any) =>{
                    exercises.push(
                        new exercise(e.name,( e.length/60).toString(), (e.length%60).toString(), ( e.rest/60).toString(), (e.rest%60).toString(), "")
                        )
                });
              this.setState({isAuth:true, exercises:res.data});
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
                {this.state.exercises.map((exer, idx)=>{
                    return(
                        <div>
                            <li className="list-group-item">{exer.name} {exer.lengthM}:{exer.lengthM}</li>
                            <li className="list-group-item">Rest {exer.restM}:{exer.restM}</li>
                        </div>
                    )
                })}
            </ul>
        </div>
      
      )
  }
}





export default ViewWorkout