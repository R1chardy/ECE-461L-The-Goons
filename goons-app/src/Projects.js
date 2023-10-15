import React, { useState } from 'react';
import SingleProject from './SingleProject';
import CreateProject from './CreateProject'

function Projects() {
    const capacity = 50
    const[joined, setJoined] = useState(new Set())
    const [hwsCounts, setCounts] = useState(new Map())  //Available
    const [hwsChecked, setChecked] = useState(new Map())  //Amount checked out by each group
    const [projects, setProjects] = useState([]);

    const updateJoinPress = (num, code) => {
        if (joined.has(num)) {
            const newJoined = new Set(joined)
            newJoined.delete(num)
            setJoined(newJoined)
        } else {
            //Talk with backend to see if (num,code) is valid
            const newJoined = new Set(joined)
            newJoined.add(num)
            setJoined(newJoined)
        }
    }

    const updateHWSets = (proj, hws, num) => {
        // const newCounts = new Map(hwsCounts);
        // newCounts.set(hws, num);
        // setCounts(newCounts)
        const newChecked = new Map(hwsChecked)
        newChecked.set([proj,hws].toString(), num)
        setChecked(newChecked)
    }

    const onCreatePress = (name, code) =>{
        //Check with backend
        const newProject = {id: name, pass: code}
        setProjects([...projects, newProject])
    }

    return (
        <div class="bg-tailwind place-content-center flex">
            <div className='max-w-7xl flex'>
                <div className='grow w-[800px]'>
                    <p className='text-4xl'>Manage Your Projects</p>
                    <CreateProject onCreatePress={onCreatePress}></CreateProject>
                    <div>
                    {projects.map((project) => (<SingleProject id={project.id} onDataUpdate={updateJoinPress} joined={joined} hwsChecked={hwsChecked} onHWUpdate={updateHWSets}></SingleProject>))}
                    </div>
                </div>
                <div className='w-80'>
                    <p className='text-4xl'>Hardware Sets</p>
                </div>
            </div>
            {/* <div>
                <p className='text-4xl'>Manage Your Projects</p>
                <SingleProject id={1} onDataUpdate={updateJoinPress} joined={joined} prop4={hwsCounts} prop5={max} onHWUpdate={updateHWSets}></SingleProject>
                <SingleProject id={2} onDataUpdate={updateJoinPress} joined={joined} prop4={hwsCounts} prop5={max} onHWUpdate={updateHWSets}></SingleProject>
                <SingleProject id={3} onDataUpdate={updateJoinPress} joined={joined} prop4={hwsCounts} prop5={max} onHWUpdate={updateHWSets}></SingleProject>
            </div> */}
        </div>
    );
}
  

export default Projects;