import React from 'react';
import './App.css';
import axios from 'axios';

class exercise {

    name:string;
    lengthM:string;
    restM:string;
    lengthS:string;
    restS:string;

    constructor(name: string, lengthM:string, lengthS:string, restM:string, restS:string){
        this.name=name;
        this.lengthS=lengthS;
        this.restS=restS;
        this.lengthM=lengthM;
        this.restM=restM;
    }
    

}

class PostWorkout extends React.Component<{}, {success:boolean, submitted: boolean, workoutName:string, exercises:Array<exercise>, blankEName:boolean, blankWName:boolean}>{

    constructor(props:any){
        super(props);
        this.state={success: false, submitted:false, exercises:[], workoutName:"", blankEName:false, blankWName:false};
        this.handleWNChange=this.handleWNChange.bind(this);
        this.addExercise=this.addExercise.bind(this);
        this.removeExercise=this.removeExercise.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleExLengthMChange=this.handleExLengthMChange.bind(this);
        this.handleExLengthSChange=this.handleExLengthSChange.bind(this);
        this.handleExNameChange=this.handleExNameChange.bind(this);
        this.handleExRestMChange=this.handleExRestMChange.bind(this);
        this.handleExRestSChange=this.handleExRestSChange.bind(this);
    }

    handleSubmit(e: React.MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        this.setState({submitted:true});
        if(this.state.workoutName===""){ 
            this.setState({blankWName:true});
            return;
        }
        for(let i=0; i<this.state.exercises.length; i++){
            let exer=this.state.exercises[i];

            axios.post('https://workout-buddy-server2020.herokuapp.com/workouts/add', {
                workoutName:this.state.workoutName,
                name:exer.name,
                length:parseInt(exer.lengthM)*60+parseInt(exer.lengthS),
                rest:parseInt(exer.restM)*60+parseInt(exer.restS),
                userId:0,
                visible:1
            })
            .then((res) => {
                console.log(res);
              if(res.data==="success"){
                this.setState({success:true});
              }
              else this.setState({success:false});
            })
            .catch((error) => {
              console.log(error);
              this.setState({success:false})
            });
        }
    }

    handleWNChange(e: React.ChangeEvent<HTMLInputElement>){
        const wn=e.target.value;
        this.setState({workoutName:wn});
    }

    handleExNameChange(e: React.ChangeEvent<HTMLInputElement>, idx: number){
        let allEx=this.state.exercises;
        let ex= allEx[idx];
        ex.name=e.target.value;
        allEx[idx]=ex;
        this.setState({exercises:allEx});
    }

    handleExLengthMChange(e: React.ChangeEvent<HTMLInputElement>, idx: number){
        let allEx=this.state.exercises;
        let ex= allEx[idx];
        ex.lengthM=e.target.value;
        allEx[idx]=ex;
        this.setState({exercises:allEx});
    }

    handleExLengthSChange(e: React.ChangeEvent<HTMLInputElement>, idx: number){
        let allEx=this.state.exercises;
        let ex= allEx[idx];
        ex.lengthS=e.target.value;
        allEx[idx]=ex;
        this.setState({exercises:allEx});
    }

    handleExRestMChange(e: React.ChangeEvent<HTMLInputElement>, idx: number){
        let allEx=this.state.exercises;
        let ex= allEx[idx];
        ex.restM=e.target.value;
        allEx[idx]=ex;
        this.setState({exercises:allEx});
    }

    handleExRestSChange(e: React.ChangeEvent<HTMLInputElement>, idx: number){
        let allEx=this.state.exercises;
        let ex= allEx[idx];
        ex.restS=e.target.value;
        allEx[idx]=ex;
        this.setState({exercises:allEx});
    }

    addExercise(e: React.MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        this.setState((prevState)=>({
            exercises:[...prevState.exercises, {name:"", lengthS:"", lengthM:"", restM:"", restS:""}]
        }));
    }

    removeExercise(e: React.MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        this.setState((prevState)=>({
            exercises: prevState.exercises.length > 1 ? prevState.exercises.splice(-1,1) :[]
        }));
    }

  render(){
    return (
        <div className="form-group post-form">
            {this.state.blankWName && 
            <div className="alert alert-danger">
                Blank workout name!</div>}
            {!this.state.success && 
            <form >
            
                <label>
                    Workout Name
                    <input placeholder="Enter workout name here" className="form-control" type='text' value={this.state.workoutName} onChange={this.handleWNChange} />
                </label>
                <br/>
                <div className="post-form-contents">
                    <button className="btn btn-success add-btn" onClick={this.addExercise} >Add exercise</button>
                    <br/>
                    {
                        this.state.exercises.map((val, idx)=>{
                            return(
                                <div key={idx}>
                                    <label>
                                        Exercise name
                                        <input className="form-control" type="text" value={val.name} onChange={ (e) =>this.handleExNameChange(e,idx)}/>
                                    </label>
                                    <br/>
                                    {(this.state.exercises[idx].lengthM.length>0 && this.state.exercises[idx].lengthS.length>0) && (this.state.exercises[idx].lengthM.match(/^[0-9]+$/) === null || this.state.exercises[idx].lengthS.match(/^[0-9]+$/) === null) && 
                                    <div className="alert alert-danger">
                                        Please enter a number for minutes and seconds!
                                    </div>}
                                    <label>
                                        Exercise length
                                    </label>
                                    <input className="time-input" placeholder="Minutes"  type="text" value={val.lengthM} onChange={ (e) =>this.handleExLengthMChange(e,idx)}/> :
                                    <input className="time-input" placeholder="Seconds" type="text" value={val.lengthS} onChange={ (e) =>this.handleExLengthSChange(e,idx)}/>
                                    
                                    <br/>
                                    {(this.state.exercises[idx].restM.length>0 && this.state.exercises[idx].restS.length>0) && (this.state.exercises[idx].restM.match(/^[0-9]+$/) === null || this.state.exercises[idx].restS.match(/^[0-9]+$/) === null) && 
                                    <div className="alert alert-danger">
                                        Please enter a number for minutes and seconds!
                                    </div>}
                                    <label>
                                        Exercise rest
                                        </label>
                                    <input className="time-input" placeholder="Minutes" type="text" value={val.restM} onChange={ (e) =>this.handleExRestMChange(e,idx)}/> :
                                    <input className="time-input" placeholder="Seconds"  type="text" value={val.restS} onChange={ (e) =>this.handleExRestSChange(e,idx)}/>
                                   
                                </div>
                            )
                        })
                    }  
                    <br/>
                    {this.state.exercises.length>0 && <button className="btn btn-danger" onClick={this.removeExercise} >Remove exercise</button>}
                    <br/>
                    <br/>
                    {this.state.exercises.length>0 && <button className="btn btn-primary" onClick={this.handleSubmit}> Submit workout!</button>}
                </div>
            </form>}
            {this.state.success && 
            <div className="alert alert-success">
                Submitted! Enjoy your workout!
                </div>}
        </div>
      )
  }
}





export default PostWorkout;