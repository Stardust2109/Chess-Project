
import { FaRegUser } from "react-icons/fa6";
import { IconContext } from "react-icons";
import { LuArrowLeftToLine, LuArrowRightToLine } from "react-icons/lu";
import { CiLogout, CiSettings } from "react-icons/ci";
import { FaChess } from "react-icons/fa";
import { GiOpenBook } from "react-icons/gi";
import { useState } from "preact/hooks";

export default function Sidebar({ }) {
    const [toggle, setToggle] = useState(true);
    function handleClick() {
        setToggle((prevState: boolean) => !prevState)
    }
    return (
        <>
            <aside className={`h-screen ${toggle ? 'sidebarStyleOpen' : 'sidebarStyleClose'}`}>
                <nav className={"h-full flex flex-col flex-start  bg-neutral-800 border-r shadow-sm"}>

                    <div className={'flex flex-col h-fit'}>


                        <div className="flex mt-2 pb-3">
                            {/* Left half of the page */}
                            <div className={`${toggle ? 'p-2 mr-1  flex-grow-1 flex justify-center items-center' : 'flex justify-center items-center pl-6'}`}>
                                <IconContext.Provider value={{ color: "white", size: '1.5em' }}>
                                    <FaRegUser />
                                </IconContext.Provider>
                            </div>

                            {toggle &&
                                /* Right half of the page with two vertically separated parts */
                                <div className="flex-grow-2 flex flex-col max-w-38">
                                    {/* Top section */}

                                    <h4 className={" flex flex-grow justify-center items-center text-gray-300 font-semibold"}>R.Vinit</h4>


                                    {/* Bottom section */}
                                    <div className="flex-grow flex justify-center items-center">
                                        <span className={"text-xs text-gray-600"}> rayanutala03@gmail.com</span>
                                    </div>
                                </div>
                            }

                        </div>
                        <hr />
                        <div className='flex justify-center pt-2 hover:bg-neutral-900 py-2' style="cursor: pointer">

                            <IconContext.Provider value={{ color: "white", size: '1.5em' }}>
                                <CiLogout />
                            </IconContext.Provider>
                            {toggle && <h4 className=' text-gray-500 font-bold px-3'> Logout</h4>}
                        </div>
                        <hr />
                    </div>

                    <div className=" mt-28">
                        <div className=' flex flex-row justify-center text-white bg-neutral-700 hover:bg-neutral-900 py-2 my-5'>
                            {/* <img src="src/assets/chess-piece.jpeg" alt="Chess Piece" className={'w-10'}/> */}
                            <IconContext.Provider value={{ color: "white", size: '1.5em' }}>
                                <FaChess />
                            </IconContext.Provider>
                            {toggle && <h4 className="font-medium text-xl px-5 ">Play</h4>}
                        </div>

                        <div className=' flex flex-row justify-center text-white bg-neutral-700 hover:bg-neutral-900 py-2 my-5'>
                            {/* <img src="src/assets/chess-piece.jpeg" alt="Chess Piece" className={'w-10'}/> */}
                            <IconContext.Provider value={{ color: "white", size: '1.5em' }}>
                                <GiOpenBook />
                            </IconContext.Provider>
                            {toggle && <h4 className="font-medium text-xl px-5"> Learn</h4>}
                        </div>

                        <div className=' flex flex-row justify-center text-white bg-neutral-700 hover:bg-neutral-900 py-2 my-5'>
                            {/* <img src="src/assets/chess-piece.jpeg" alt="Chess Piece" className={'w-10'}/> */}
                            <IconContext.Provider value={{ color: "white", size: '1.5em' }}>
                                <CiSettings />
                            </IconContext.Provider>
                            {toggle && <h4 className="font-medium text-xl px-5"> Settings </h4>}
                        </div>

                    </div>


                    <div className={'flex justify-between pb-5'} onClick={handleClick}>

                        <p></p>

                        {toggle ?
                            <IconContext.Provider value={{ color: "white", size: '1.5em' }}>
                                <button className='cursor-pointer rounded-full border-2  w-7 hover:bg-black'>
                                    <LuArrowLeftToLine />
                                </button>
                            </IconContext.Provider>
                            :
                            <IconContext.Provider value={{ color: "white", size: '1.5em' }}>
                                <button className='cursor-pointer rounded-full border-2  w-7 hover:bg-black'>
                                    <LuArrowRightToLine />
                                </button>
                            </IconContext.Provider>
                        }


                    </div>




                </nav>
            </aside>
        </>
    )
};