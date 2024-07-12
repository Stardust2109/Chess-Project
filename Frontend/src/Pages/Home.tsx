import { useNavigate } from "react-router-dom"

export const Home = () => {
    const navigate = useNavigate()
    return <div className={"ml-24"}>
        
        <div className={'flex max-h-2/5 justify-around'}>
            <img src="../src/assets/chessboard-final.png" alt="Chess board image" className='w-2/5 mt-16' />
                <div className='main-content flex flex-col justify-around '>
                    <p className=' text-stone-400 mt-20 text-4xl'> Play chess online for free !</p>
                    <button className='ml-24 w-3/5 mt-20 main-buttons h-1/5 text-3xl rounded-lg hover:bg-green-700' onClick={()=>navigate("/game")} >
                        Play Online
                    </button>
                    <button className='ml-24 w-3/5 mt-10 main-buttons h-1/5 text-3xl rounded-lg hover:bg-green-700' onClick={()=>navigate("/game")}>
                        Play as guest
                    </button>
                </div>


        </div>

    </div>
}