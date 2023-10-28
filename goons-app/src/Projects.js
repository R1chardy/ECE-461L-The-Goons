import React, { useState, useEffect, useRef } from 'react';
import SingleProject from './SingleProject';
import CreateProject from './CreateProject'

function Projects() {
    const capacity = 50
    const [joined, setJoined] = useState(new Set())
    const [hwsCounts, setCounts] = useState(new Map())  //Available
    const [hwsChecked, setChecked] = useState(new Map())  //Amount checked out by each group
    const [projects, setProjects] = useState([]);
    
    const firstTime = useRef(true);

    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get('user');

    useEffect(() => {
        if(firstTime.current){
            firstTime.current = false
            //Initialize the page
            fetch('http://127.0.0.1:5000/update_projectpage?username=${encodeURIComponent(' + user + ')}')
            .then(response => {return response.json()})
            .then(data => {
                pageSetup(data)
            })
            .catch(error => {
                console.log(error)
            });
        }
    });
    
    const pageSetup = (j) =>{
        for (const proj of j.projects) {
            const newProject = { id: proj.name, pass: 0 };  //FIX password is currently hardcoded to 0
            setProjects(projects => [...projects, newProject]);
        }
        //Add more page setups
    }

    const reloadPage = () =>{
        //get data from backend
        //update entire page
    }

    const updateJoinPress = (num, code) => {    //confirm code is correct

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

    const updateHWSets = (proj, hws, num, flag) => {
        const currChecked = hwsChecked.has([proj,hws].toString())? hwsChecked.get([proj,hws].toString()) : 0
        const currAvail = hwsCounts.has(hws)? hwsCounts.get(hws) : 50
        const jsonString = JSON.stringify({
            projectid: proj,
            quantity: num,
            hwset: hws
        });
        if(flag === 1){ //Checking in
            //Talk with backend to get amount checked in
            //if backend successful:
            
            fetch('http://127.0.0.1:5000/check_in_hw', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: jsonString,
            })
            .then(response => {return response.json()})
            .then(data => {
                const amt = data['quant']

                console.log(data['message'])
                console.log(amt)

                const newChecked = new Map(hwsChecked)
                newChecked.set([proj,hws].toString(), currChecked-amt)
                setChecked(newChecked)

                const newCounts = new Map(hwsCounts)
                newCounts.set(hws, currAvail+amt)
                setCounts(newCounts)
            })
            .catch(error => {
                console.log(error)
            });

            
        }
        else {  //Checking out
            //Talk with backend to get amount checked out
            //if backend successful:
            fetch('http://127.0.0.1:5000/check_out_hw', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: jsonString,
            })
            .then(response => {return response.json()})
            .then(data => {
                const amt = data['quant']

                console.log(data['message'])
                console.log(amt)

                const newChecked = new Map(hwsChecked)
                newChecked.set([proj,hws].toString(), currChecked+amt)
                setChecked(newChecked)
                
                const newCounts = new Map(hwsCounts)
                newCounts.set(hws, currAvail-amt)
                setCounts(newCounts)
            })
            .catch(error => {
                console.log(error)
            });
        }
        // reloadPage()
    }

    const onCreatePress = (name, code) => {
        //Check with backend
        const newProject = {id: name, pass: code}
        //talk with backend before adding to projects
        setProjects([...projects, newProject])
        // reloadPage()
    }

    return (
        <div class="bg-tailwind bg-no-repeat place-content-center flex">
            <div className='max-w-7xl flex'>
                <div className='grow w-[800px]'>
                    <p className='text-6xl font-bold'>Manage Your Projects</p>
                    <CreateProject onCreatePress={onCreatePress}></CreateProject>
                    <div>
                        {projects.map((project) => (
                            <SingleProject id={project.id} onDataUpdate={updateJoinPress} joined={joined} hwsChecked={hwsChecked} onHWUpdate={updateHWSets}></SingleProject>
                        ))}
                    </div>
                </div>
                <div className='w-80'>
                    <p className='text-6xl font-bold'>Hardware Sets</p>
                    <div>
                        <label>Remaining Hardware Set 1: {hwsCounts.has(1)? hwsCounts.get(1) : capacity}/{capacity}</label>
                    </div>
                    <div>
                        <label>Remaining Hardware Set 2: {hwsCounts.has(2)? hwsCounts.get(2) : capacity}/{capacity}</label>
                    </div>
                </div>
            </div>
        </div>
    );
}
  

export default Projects;