import React, { useState } from 'react';

function HWSet(props) {

    const hwname = props.hwname
    const projname = props.projname
    // const hwsChecked = props.hwsChecked

    const [checkInInput, setCheckIn] = useState(0)
    const [checkOutInput, setCheckOut] = useState(0)

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

    const handleCheckInChange = (event) => {
        setCheckIn(parseInt(event.target.value, 10))
    }

    const handleCheckOutChange = (event) => {
        setCheckOut(parseInt(event.target.value, 10))
    }

    return (
        <div className='flex justify-center'>
            <div className='grid grid-cols-5 w-52 mr-12'>
                <input type="text" onChange={handleCheckInChange} className="col-span-3 pl-2 py-1.5 bg-gray-50 rounded-l-lg text-gray-900 border border-gray-200 focus:ring-2 focus:ring-inset focus:ring-blue-500"/>
                <button
                    onClick={() => checkInValue(checkInInput)}
                    className="col-span-2 py-1.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-r-lg border-y border-r border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
                >
                    Check in
                </button>
            </div>
            <div className='grid grid-cols-5 w-52'>
                <input type="text" onChange={handleCheckOutChange} className="col-span-3 pl-2 py-1.5 bg-gray-50 rounded-l-lg text-gray-900 border border-gray-200 focus:ring-2 focus:ring-inset focus:ring-blue-500"/>
                <button
                    onClick={() => checkOutValue(checkOutInput)}
                    className="col-span-2 py-1.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-r-lg border-y border-r border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
                >
                    Check out
                </button>
            </div>
        </div>
    );
}

export default HWSet