import React, { useState } from 'react';
import SingleProject from './SingleProject';

function Projects(){

    const[joined, setJoined] = useState(new Set())

    const updateJoinPress = (num) =>{
        if(num === joined){
            setJoined(-1)   //Remove from set
        }
        else{
            setJoined()  //Add to set
        }
    }

    return (
    <div>
        <head>
            <title>Projects</title>
        </head>
        <body>
            <div>
                <h1>Projects</h1>
                <ul style={{listStyle: 'none'}}>
                    <SingleProject prop1={1} onDataUpdate={updateJoinPress} prop3={joined}></SingleProject>
                    <SingleProject prop1={2} onDataUpdate={updateJoinPress} prop3={joined}></SingleProject>
                    <SingleProject prop1={3} onDataUpdate={updateJoinPress} prop3={joined}></SingleProject>
                </ul>
            </div>
        </body> 
    </div>
    );
}
  

export default Projects;