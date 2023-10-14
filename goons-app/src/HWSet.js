import React, { useState } from 'react';

function HWSet(props) {

    const prop = props.prop1
    const id = props.id
    const joined = props.joined
    const prop4 = props.prop4
    const max = props.prop5

    const [inputValue, setInputValue] = useState(0)

    const checkInValue = (num) => {
        if(!isNaN(num) && (joined.has(id))) {
            const value = prop4.has(prop)? prop4.get(prop) : max
            const val = Math.min(value+num, max)
            //send update to backend
            props.CheckPressed(prop, val)
        }
    }

    const checkOutValue = (num) => {
        if(!isNaN(num) && (joined.has(id))){
            const value = prop4.has(prop)? prop4.get(prop) : max
            const val = Math.max(value-num, 0)
            //send update to backend
            props.CheckPressed(prop, val)
        }
    }

    const handleInputChange = (event) => {
        setInputValue(parseInt(event.target.value, 10))
    }

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column'}}>
                <p style={{margin: '0', marginRight: '10px'}}>HW Set {prop}: {prop4.has(prop)? prop4.get(prop) : max}/{max}</p>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', marginRight: '10px'}}>
                <input type="text" placeholder="Enter Amount" onChange={handleInputChange}/>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', marginRight: '10px'}}>
                <button onClick={() => checkInValue(inputValue)}>Check In</button>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', marginRight: '10px'}}>
                <button onClick={() => checkOutValue(inputValue)}>Check Out</button>
            </div>
        </div>
    );
}

export default HWSet