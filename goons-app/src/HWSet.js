import React, { useState } from 'react';

function HWSet(props) {

    const hwname = props.hwname
    const projname = props.projname
    // const hwsChecked = props.hwsChecked

    const [inputValue, setInputValue] = useState(0)

    const checkInValue = (num) => {
        // if(!isNaN(num) && (joined.has(projname))) {
        if(!isNaN(num)){
            props.CheckPressed(projname, hwname, num, 1)    //1 for check in
        }
    }

    const checkOutValue = (num) => {
        // if(!isNaN(num) && (joined.has(projname))){
        if(!isNaN(num)){
            props.CheckPressed(projname, hwname, num, -1)   //-1 for check out
        }
    }

    const handleInputChange = (event) => {
        setInputValue(parseInt(event.target.value, 10))
    }

    return (
        <div>
            {/* <div style={{ display: 'flex', flexDirection: 'column'}}>
                <p style={{margin: '0', marginRight: '10px'}}>HW Set {hwname} checked out: {hwsChecked.has([projname,hwname].toString()) ? hwsChecked.get([projname,hwname].toString()) : 0}</p>
            </div> */}
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