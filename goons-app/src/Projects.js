import React, { useState, useEffect, useRef } from 'react';
import SingleProject from './SingleProject';
import CreateProject from './CreateProject'
import JoinProject from './JoinProject'

function Projects() {
    const capacity = 100
    const [hwsCounts, setCounts] = useState(new Map())  //Available
    const [hwsChecked, setChecked] = useState(new Map())  //Amount checked out by each group
    const [projects, setProjects] = useState([]);
    const [codes, setCodes] = useState([]);
    
    const firstTime = useRef(true);

    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get('user');

    useEffect(() => {   //BACKEND
        if(firstTime.current){
            firstTime.current = false
            //Initialize the page
            fetch('http://127.0.0.1:5000/update_projectpage?username=' + user)
            .then(response => {return response.json()})
            .then(data => {
                pageSetup(data)
            })
            .catch(error => {
                console.log(error)
            });
        }
    });
    
    const pageSetup = (jsonFile) =>{    //FIX
        console.log(jsonFile.user_projects)
        for (const proj of jsonFile.user_projects) {
            const newProject = { id: proj.name, code: proj.projectid};
            setProjects(projects => [...projects, newProject]);
        }
        //Set up capacity, hwsCounts, and hwsChecked
    }

    const onJoinPress = (code) =>{
        //Talk to backend to and get project from code
        const jsonString = JSON.stringify({
            projectid: code,
            username: user
        });
        fetch('http://127.0.0.1:5000/join_project', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: jsonString,
        })
        .then(response => {return response.json()})
        .then(data => {
            const newProject = {id: data['proj'], code: code}
            setProjects([...projects, newProject])
            setCodes([...codes, code])

        })
        .catch(error => {
            console.log(error)
        });
    }

    const updateLeavePress = (name, code) => { //BACKEND
        
        const jsonString = JSON.stringify({
            projectid: code,
            username: user
        });
        fetch('http://127.0.0.1:5000/leave_project', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: jsonString,
        })
        .then(response => {
            if(response.status === 200){
                return response.json()
            }
            else{
                throw new Error("oof")
            }
        })
        .then(data => {
            console.log(data)
            const newProjects = projects.filter(project => project.code !== code)
            setProjects(newProjects)

            const newCodes = codes.filter(ncode => ncode !== code)
            setCodes(newCodes)
        })
        .catch(error => {
            console.log(error)
        });
        
        // const newCodes = codes.filter(code => code !== )
    }

    const updateHWSets = (proj, hws, num, code, flag) => {
        const currChecked = hwsChecked.has([proj,hws].toString())? hwsChecked.get([proj,hws].toString()) : 0
        const currAvail = hwsCounts.has(hws)? hwsCounts.get(hws) : capacity
        const jsonString = JSON.stringify({
            projectid: code,
            quantity: num,
            hwset: hws
        });
        if(flag === 1){ //Checking in
            //Talk with backend to get amount checked in
            
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
    }

    const onCreatePress = (name, code) => {
        const jsonString = JSON.stringify({
            username: user,                  //probably needed
            description: "PLACEHOLDER DESCRIPTION",
            projectid: code,
            name: name
        });
        fetch('http://127.0.0.1:5000/create_project', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: jsonString,
        })
        .then(response => {
            if(response.status === 200){
                return response.json()
            }
            else{
                throw new Error("oof")
            }
        })
        .then(data => {
            console.log(data)
            const newProject = {id: name, code: code}
            setProjects([...projects, newProject])
            setCodes([...codes, code])
        })
        .catch(error => {
            console.log(error)
        });
    }

    return (
        <div className="bg-tailwind h-screen bg-no-repeat flex justify-center">
            <div className='w-full max-w-7xl'>

                <div className='mt-14 flex'>
                    <div className='pr-10 grow w-[850px]'>
                        <p className='mb-10 text-5xl font-bold'>Manage Your Projects</p>
                        <CreateProject onCreatePress={onCreatePress}></CreateProject>
                        <JoinProject onJoinPress={onJoinPress}></JoinProject>
                        {/* <p className='mt-10 mb-10 text-5xl font-bold'>Your Current Projects</p>
                        <div>
                            {projects.map((project) => (
                                <SingleProject id={project.id} code={project.code} onDataUpdate={updateLeavePress} hwsChecked={hwsChecked} onHWUpdate={updateHWSets}></SingleProject>
                            ))}
                        </div> */}
                    </div>
                    <div className='pl-10 w-90'>
                        <p className='mb-10 text-5xl font-bold'>Hardware Sets</p>
                        <div>
                            <label>Remaining Hardware Set 1: {hwsCounts.has(1)? hwsCounts.get(1) : capacity}/{capacity}</label>
                        </div>
                        <div>
                            <label>Remaining Hardware Set 2: {hwsCounts.has(2)? hwsCounts.get(2) : capacity}/{capacity}</label>
                        </div>
                    </div>
                </div>

                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

                <div>
                    <p className='text-center mt-10 mb-10 text-5xl font-bold'>Your Current Projects</p>
                    <div>
                        {projects.map((project) => (
                            <SingleProject id={project.id} code={project.code} onDataUpdate={updateLeavePress} hwsChecked={hwsChecked} onHWUpdate={updateHWSets}></SingleProject>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
  

export default Projects;