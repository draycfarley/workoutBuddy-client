import React from 'react';
import './App.css'
import { Link } from 'react-router-dom';

class Header extends React.Component {


    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link to='/' className='"navbar-brand"'>Workout Buddy!</Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <Link to='/create' className='"navbar-brand"'>Create</Link>
                            <Link to='/view' className='"navbar-brand"'>View All Workouts</Link>
                        </ul>
                        
                    </div>
          
                    </nav>
                </header>
                )
            }
          }
     


export default Header