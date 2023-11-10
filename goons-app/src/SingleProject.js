import HWSet from './HWSet'

function SingleProject(props) {

    const id = props.id
    const hwsChecked = props.hwsChecked
    const code = props.code
    const description = props.description

    // const [code, setCode] = useState("")

    const LeavePressed = () => {
        props.onDataUpdate(id, code)
    }

    const CheckPressed = (proj, hws, num, flag) => {
        props.onHWUpdate(proj, hws, num, code, flag)
        // console.log(description)
    }

    // const handleInputChange = (event) => {
    //     setCode(event.target.value)
    // }

    return (
        <div className="bg-white backdrop-filter backdrop-blur-md bg-opacity-60">
            <div className='border border-gray-200 bg-gray-50 rounded-t-xl'>
                <div className='grid grid-cols-2 py-3 px-4 items-center'>
                    <div className='text-xl font-bold'>Project {props.id}</div>
                    <div className='flex justify-end'>
                        <button
                            type="button"
                            onClick={LeavePressed}
                            className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
                            Leave Project
                        </button>
                    </div>
                </div>
            </div>

            <div className='border-x border-gray-200 p-3'>
                <div className='px-1 text-xl font-bold'>
                    Description
                </div>
                <div className='mt-2 px-1'>
                    {description}
                </div>
            </div>

            <div className='border border-gray-200 rounded-b-xl mb-10'>
                <div className="grid grid-cols-2">
                    <div className="text-center pt-5 border-r">
                        <h6 className="text-5xl font-bold">{hwsChecked.has([code,1].toString()) ? hwsChecked.get([code,1].toString()) : 0}</h6>
                        <p className="text-s tracking-widest text-gray-800 uppercase mb-5">
                            Hardware Set 1 Items
                        </p>
                        <div className='mb-8'>
                            <HWSet hwname={1} projname={id} hwsChecked={props.hwsChecked} CheckPressed={CheckPressed}></HWSet>
                        </div>
                    </div>
                    <div className="text-center pt-5">
                        <h6 className="text-5xl font-bold">{hwsChecked.has([code,2].toString()) ? hwsChecked.get([code,2].toString()) : 0}</h6>
                        <p className="text-s tracking-widest text-gray-800 uppercase mb-5">
                            Hardware Set 2 Items
                        </p>
                        <div className='mb-8'>
                            <HWSet hwname={2} projname={id} hwsChecked={props.hwsChecked} CheckPressed={CheckPressed}></HWSet>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleProject