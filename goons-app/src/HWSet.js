import React, { useState } from 'react';

function HWSet(props) {

    const hwname = props.hwname
    const projname = props.projname
    const joined = props.joined
    const hwsCounts = props.hwsCounts

    const [inputValue, setInputValue] = useState(0)

    const checkInValue = (num) => {
        if(!isNaN(num) && (joined.has(projname))) {
            // const val = Math.min(value+num, max)
            //send update to backend
            props.CheckPressed(hwname, 0)
        }
    }

    const checkOutValue = (num) => {
        if(!isNaN(num) && (joined.has(projname))){
            // const val = Math.max(value-num, 0)
            //send update to backend
            props.CheckPressed(hwname, 0)
        }
    }

    const handleInputChange = (event) => {
        setInputValue(parseInt(event.target.value, 10))
    }

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column'}}>
                <p style={{margin: '0', marginRight: '10px'}}>HW Set {hwname}: {0}/{50}</p>
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