
import { useState } from "preact/hooks"
import { IconContext } from "react-icons"
import { FiChevronDown, FiChevronUp } from "react-icons/fi"
import { MdOutlineTimer } from "react-icons/md"

export const Timer = (props: any) => {
    const [show, setShow] = useState(false);
    const [play, setPlay] = useState(false);
    const [select, setSelect] = useState(3);


    function toggleList() {
        setShow((prev: any) => !prev);
    }


    function selectTimer(option: number){
        const prevState = show;
        setShow(prev => !prev);
        if(prevState === true){
            setSelect(option);
            props.onTimerChange(option);
        }
        else{
            setSelect(3);
            props.onTimerChange(3);
        }
        
    }

    function togglePlay() {
        setPlay((prev: any) => !prev)
    }
    return (
        <div className={"pt-24 w-full flex flex-col justify-center items-center"}>

            {!play &&
            <><div className={`top-div w-4/5 ${show ? 'expanded' : ''}`}>

                    <button className={` w-full bg-emerald-700 h-14 rounded-xl text-xl ${!show ? 'hover:brightness-150' : ''}`}>
                        <div className={`w-full flex justify-between items-center`} onClick={() => selectTimer(3)}>
                            <span className={"ml-5 pt-1"}>
                                <IconContext.Provider value={{ color: "black", size: '1.20em' }}>
                                    <MdOutlineTimer />
                                </IconContext.Provider>
                            </span>
                            {select} minutes
                            <button onClick={toggleList} className={" mr-3"}>
                                {show ?
                                    <span>
                                        <FiChevronUp color="black" />
                                    </span> :
                                    <span>
                                        <FiChevronDown color="black" />
                                    </span>}
                            </button>

                        </div>

                        <div className={`dropdown ${show ? 'expanded' : ''}`}>
                            <ul>
                                <li>
                                    <div className={"flex justify-around"} onClick={() => selectTimer(5)}>
                                        <span className={" pt-1 mr-6"}>
                                            <IconContext.Provider value={{ color: "black", size: '1.20em' }}>
                                                <MdOutlineTimer />
                                            </IconContext.Provider>
                                        </span>
                                        <p className={'mr-14'}>
                                            5 minutes
                                        </p>


                                    </div>


                                </li>

                                <li>

                                    <div className={"flex justify-around"} onClick={() => selectTimer(10)}>
                                        <span className={"mr-1  pt-1"}>
                                            <IconContext.Provider value={{ color: "black", size: '1.27em' }}>
                                                <MdOutlineTimer />
                                            </IconContext.Provider>
                                        </span>
                                        <p className={'mr-14'}>
                                            10 minutes
                                        </p>


                                    </div>

                                </li>

                            </ul>
                        </div>
                    </button>
                </div><div className={`bottom-div w-full bg-neutral-700 ${show ? 'slide-down' : ''}`}>
                        <div>
                            {<button className={" bg-emerald-600 h-14 w-4/5 rounded-xl text-white text-xl font-semibold hover:brightness-150 "}
                                onClick={() => {
                                    setPlay(true)
                                    props.onStart(true)
                                } }
                            >
                                Play Now
                            </button>}
                        </div>

                    </div></>
        }

        </div >


    )
}