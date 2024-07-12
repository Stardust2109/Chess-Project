
import { Chessboard } from "./Chessboard.tsx";
import { useWebSocket } from "../hooks/useWebSocket.ts";
import { useEffect, useState } from "preact/hooks";
import { Chess } from "chess.js";
import { Timer } from "./Timer.tsx";

const INIT_GAME = "init_game";
const MOVE = "move";
const GAME_OVER = "game_over";

export const Game = () => {
    const socket = useWebSocket();
    const [ChessBoard, setChessBoard] = useState(new Chess());
    const [board, setBoard] = useState(ChessBoard.board());

    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    
    const [showStart, setShowStart] = useState(true);
    const [timerState, setTimerState] = useState(0);

    const handleTimer = (state: number) => {
        setTimerState(state);
    }

    const handleStart = (start: boolean) => {
        
        if(start){
            socket?.send(JSON.stringify({
                type: INIT_GAME
            })
            )
            setShowStart(false);
        }
    }

    if (!socket) return <div> Connecting...</div>

    useEffect(() => {
        if (!socket) return;
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log(message);

            switch (message.type) {
                case INIT_GAME:
                    // setChessBoard(new Chess());
                    // setShowStart(false);
                    setBoard(ChessBoard.board());
                    console.log("Game initialized");
                    break;
                case MOVE:
                    const curr_move = message.payload;
                    ChessBoard.move(curr_move);
                    setBoard(ChessBoard.board());
                    console.log("Move made");
                    break;
                case GAME_OVER:
                    console.log("Game over");
                    setTimerState(0);
                    setShowStart(true);
                    break;
            }
        }
    })

    return (
        <div className={"grid grid-cols-8 w-full"}>
            <div className={"col-span-1"}>

            </div>
            <div className={" col-span-4"}>
                <Chessboard chessBoard={ChessBoard} setBoard={setBoard} board={board} socket={socket} />
            </div>
            <div className={"col-span-3 h-screen"}>
                <div className={" h-5/6 mt-16 bg-neutral-700 ml-32 "}>

                    <Timer onStart = {handleStart} onTimerChange = {handleTimer} />
                    
                        {(!showStart ) }

                    




            </div>
        </div>

        </div >
    )
}