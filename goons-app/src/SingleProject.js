import React, { useState } from 'react';
import HWSet from './HWSet'

function SingleProject(props){

    const prop1 = props.prop1
    const prop3 = props.prop3

    const [code, setCode] = useState("")

    const JoinPressed = () =>{
        props.onDataUpdate(prop1)
    }

    const handleInputChange = (event) =>{
        setCode(event.target.value)
    }

    return (
    <div>
        <p style={{marginBottom: '10px', fontWeight: 'bold'}}>Project {prop1}</p>
        <div style={{display: 'flex', marginBottom: 30}}>
            <HWSet prop1={1} prop2={prop1} prop3={prop3}></HWSet>
            <HWSet prop1={2} prop2={prop1} prop3={prop3}></HWSet>
            <div style={{display: 'flex', flexDirection: 'column', marginRight: '10px'}}>
                <button style={{height: '100%', backgroundColor: prop1 === prop3 ? 'lightGreen' : 'white'}} onClick={JoinPressed}>{prop1 === prop3 ? 'Leave' : 'Join'}</button>
            </div>
            <input type="text" placeholder="Enter Code" onChange={handleInputChange} style={{height: '10%', marginTop: '30px'}}/>
        </div>
    </div>
    );
}

export default SingleProject