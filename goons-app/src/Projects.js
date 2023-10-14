import React, { useState } from 'react';
import SingleProject from './SingleProject';

function Projects(){

    const max = 50
    const[joined, setJoined] = useState(new Set())
    const [hwsCounts, setCounts] = useState(new Map())

    const updateJoinPress = (num, code) =>{
        if(joined.has(num)){
            const newJoined = new Set(joined)
            newJoined.delete(num)
            setJoined(newJoined)
        }
        else{
            //Talk with backend to see if (num,code) is valid
            const newJoined = new Set(joined)
            newJoined.add(num)
            setJoined(newJoined)
        }
    }

    const updateHWSets = (hws, num) => {
        const newCounts = new Map(hwsCounts);
        newCounts.set(hws, num);
        setCounts(newCounts)
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
                    <SingleProject prop1={1} onDataUpdate={updateJoinPress} prop3={joined} prop4={hwsCounts} prop5={max} onHWUpdate={updateHWSets}></SingleProject>
                    <SingleProject prop1={2} onDataUpdate={updateJoinPress} prop3={joined} prop4={hwsCounts} prop5={max} onHWUpdate={updateHWSets}></SingleProject>
                    <SingleProject prop1={3} onDataUpdate={updateJoinPress} prop3={joined} prop4={hwsCounts} prop5={max} onHWUpdate={updateHWSets}></SingleProject>
                </ul>
            </div>
        </body> 
    </div>
    );
}
  

export default Projects;