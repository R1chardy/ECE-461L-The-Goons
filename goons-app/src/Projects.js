import React, { useState, useEffect } from 'react';
import SingleProject from './SingleProject';
import CreateProject from './CreateProject'
import JoinProject from './JoinProject'

function Projects() {
    const [change, setChange] = useState(false)

    const [capacity, setCapacity] = useState(50)
    const [hwsCounts, setCounts] = useState(new Map())  //Available
    const [hwsChecked, setChecked] = useState(new Map())  //Amount checked out by each group
    const [projects, setProjects] = useState([]);
    const [codes, setCodes] = useState([]);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const user = urlParams.get('user');


    useEffect(() => {
        // console.log("hihi")
        //Initialize the page
        fetch('http://127.0.0.1:5000/update_projectpage?username=' + user)
        .then(response => {return response.json()})
        .then(data => {
            pageSetup(data)
        })
        .catch(error => {
            console.log(error)
        });
    }, [change,user]);
    
    const pageSetup = (jsonFile) =>{
        setCounts(new Map())
        setChecked(new Map())
        setProjects([])
        for (const proj of jsonFile.user_projects) {
            const newProject = { "id": proj.name, "code": proj.projectid, "description": proj.description};
            setProjects((projects) => {
                return [...projects, newProject]
            })
            // console.log(proj.hwsets.hwset1)

            setChecked((hwsChecked) => {
                let i = 1
                const newhwsChecked = new Map(hwsChecked)
                for (const key in proj.hwsets){
                    newhwsChecked.set([proj.projectid,i].toString(), proj.hwsets[key])
                    i++
                }
                return newhwsChecked
            })
        }
        // console.log(jsonFile.hardwareSets)

        setCapacity(() => {
            for (const hwSet of jsonFile.hardwareSets) {
                return hwSet['capacity']
            }
        })

        setCounts((hwsCounts) => {
            let i = 1
            const newhwsCounts = new Map(hwsCounts)
            for (const hwSet of jsonFile.hardwareSets) {
                newhwsCounts.set(i, hwSet['availability'])
                i++
            }
            return newhwsCounts
        })
    }

    const onJoinPress = (code) =>{
        //Talk to backend to and get project from code
        const jsonString = JSON.stringify({
            projectid: code,
            username: user,
        });
        fetch('http://127.0.0.1:5000/join_project', {
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
                throw new Error("oof code")
            }
        })
        .then(data => {
            console.log(data['message'])

            const newProject = {"id": data['proj'], "code": code, "description": data['description'] }
            setProjects([...projects, newProject])
            setCodes([...codes, code])
            // console.log(data)
            // console.log(data['description'])
            setChange(!change)
        })
        .catch(error => {
            console.log(error)
        });
        
    }

    const updateLeavePress = (name, code) => {
        
        const jsonString = JSON.stringify({
            projectid: code,
            username: user,
        });
        fetch('http://127.0.0.1:5000/leave_project', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: jsonString,
        })
        .then(response => {
            // console.log(response.status)
            if(response.status === 200){
                return response.json()
            }
            else{
                throw new Error(response.json())
                
            }
        })
        .then(data => {
            console.log(data['message'])

            // console.log(data)
            const newProjects = projects.filter(project => project.code !== code)
            setProjects(newProjects)

            const newCodes = codes.filter(ncode => ncode !== code)
            setCodes(newCodes)
            
            // console.log(data)
            setChange(!change)
        })
        .catch(error => {
            console.log(error)
        });
    }

    const updateHWSets = (proj, hws, num, code, flag) => {
        const currChecked = hwsChecked.has([code,hws].toString())? hwsChecked.get([code,hws].toString()) : 0
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
                // console.log(amt)

                const newChecked = new Map(hwsChecked)
                newChecked.set([code,hws].toString(), currChecked-amt)
                setChecked(newChecked)

                const newCounts = new Map(hwsCounts)
                newCounts.set(hws, currAvail+amt)
                setCounts(newCounts)

                setChange(!change)
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
                // console.log(amt)

                const newChecked = new Map(hwsChecked)
                newChecked.set([code,hws].toString(), currChecked+amt)
                setChecked(newChecked)
                
                const newCounts = new Map(hwsCounts)
                newCounts.set(hws, currAvail-amt)
                setCounts(newCounts)

                setChange(!change)
            })
            .catch(error => {
                console.log(error)
            });
        }
    }

    const onCreatePress = (name, code, desc) => {
        const jsonString = JSON.stringify({
            username: user,                  //probably needed
            projectid: code,
            description: desc,
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
            console.log(data['message'])

            // console.log(data)
            const newProject = {"id": name, "code": code, "description": desc}
            setProjects([...projects, newProject])
            setCodes([...codes, code])

            setChange(!change)
        })
        .catch(error => {
            console.log(error)
        });
    }

    const logoutPressed = () => {
        window.location.href = '/'
    }

    return (
        <div className="bg-tailwind h-screen bg-no-repeat flex justify-center">
            <div className='w-full max-w-7xl'>
                <button type="button" className="justify-self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mt-6 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={logoutPressed}>
                    Logout
                </button>
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
                            <SingleProject id={project["id"]} code={project["code"]} description={project["description"]} onDataUpdate={updateLeavePress} hwsChecked={hwsChecked} onHWUpdate={updateHWSets}></SingleProject>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
  

export default Projects;