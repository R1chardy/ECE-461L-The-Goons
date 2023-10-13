import React, { useState } from 'react';

function HWSet(props) {

    const prop = props.prop1
    const prop2 = props.prop2
    const prop3 = props.prop3

    const max = 50;
    const [value, setValue] = useState(max);
    const [inputValue, setInputValue] = useState(0)

    const checkInValue = (num) => {
        if(!isNaN(num) && (prop2===prop3)){
            setValue(Math.min(value+num, max));
        }
    }

    const checkOutValue = (num) => {
        if(!isNaN(num) && (prop2===prop3)){
            setValue(Math.max(value-num, 0));
        }
    }

    const handleInputChange = (event) => {
        setInputValue(parseInt(event.target.value, 10))
    }

    return (
    <div>
        <div style={{ display: 'flex', flexDirection: 'column'}}>
            <p style={{margin: '0', marginRight: '10px'}}>HW Set {prop}: {value}/{max}</p>
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