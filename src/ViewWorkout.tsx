import React from 'react';
import './App.css';
import axios from "axios";
import {RouteComponentProps } from 'react-router-dom';
import { finished } from 'stream';


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

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

class ViewWorkout extends React.Component<MatchProps,{isAuth:boolean, exercises:Array<exercise>}>{
 
    constructor(props: any){
        super(props);
        this.state={isAuth:false, exercises:[]};
        this.componentDidMount=this.componentDidMount.bind(this);
        this.startWorkout=this.startWorkout.bind(this);
    }

    startWorkout(e: React.MouseEvent<HTMLButtonElement>){
        let time=0;
        window.speechSynthesis.speak(new SpeechSynthesisUtterance('Starting workout. The first exercise is'));
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(this.state.exercises[0].name));
        time+=1000;
        setTimeout(() =>window.speechSynthesis.speak(new SpeechSynthesisUtterance('three')), time);
        time+=1000;
        setTimeout(() =>window.speechSynthesis.speak(new SpeechSynthesisUtterance('two')), time);
        time+=1000;
        setTimeout(() =>window.speechSynthesis.speak(new SpeechSynthesisUtterance('one')), time);
        this.state.exercises.forEach(exer =>{
                setTimeout(
                    ()=>window.speechSynthesis.speak(new SpeechSynthesisUtterance('Starting '+exer.name+" for "+exer.lengthM+" minutes and "+exer.lengthS+" seconds")),
                    time);
                    time+=1000*parseInt(exer.lengthS) + 60*1000*parseInt(exer.lengthM);
                setTimeout(
                    ()=>window.speechSynthesis.speak(new SpeechSynthesisUtterance('Rest for '+exer.restM+" minutes and "+exer.restS+" seconds")),
                    time);
                time+=1000*parseInt(exer.restS) + 60*1000*parseInt(exer.restM);
        });

        setTimeout(()=>window.speechSynthesis.speak(new SpeechSynthesisUtterance('You finished great job')), time);
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
                res.data.sort((a:any,b:any)=>{
                    return a.id-b.id;
                });
                let exercises: Array<exercise>=[];
                res.data.forEach((e:any) =>{
                    exercises.push(
                        new exercise(e.name, Math.floor( e.length/60)+"", e.length%60+"", Math.floor(e.rest/60)+"", e.rest%60+"", "")
                        )
                });
              this.setState({isAuth:true, exercises:exercises});
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
                Press play to get started!
            </h1>
            <ul className="list-group">
                {this.state.exercises.map((exer, idx)=>{
                    return(
                        <div>
                            <li className="list-group-item">{exer.name}, Duration: {exer.lengthM}:{exer.lengthS}</li>
                            <li className="list-group-item">Rest {exer.restM}:{exer.restS}</li>
                        </div>
                    )
                })}
            </ul>
            <button className="btn btn-primary" onClick={this.startWorkout}>Start!</button>
        </div>
      
      )
  }
}





export default ViewWorkout