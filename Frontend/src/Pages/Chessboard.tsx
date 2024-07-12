import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "preact/hooks";
import { json } from "react-router-dom";

export const Chessboard = ({chessBoard,board, socket, setBoard} :  {
    setBoard: any,
    chessBoard: any,
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][],
    socket: WebSocket
    }) => {
    

    const [From, setFrom] = useState<null | Square>(null);
    const [To, setTo] = useState<null | Square>(null);
    const MOVE = "move";
    const horizontal = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
    const vertical = ["1", "2", "3", "4", "5", "6", "7", "8"];
    let chess_board = [];
    let isWhite: boolean;

    // for (let i = 0; i < 8; i++) {
    //     for (let j = 0; j < 8; j++) {
    //             if((i+j)%2 == 0){
    //                 isWhite = true;
    //             }
    //             else{
    //                 isWhite = false;
    //             }

    //             chess_board.push(    
    //             <div className={` ${isWhite ? 'white-tile': 'black-tile'} text-black text-sm flex justify-center` }
    //                 onClick={() => {
    //                     console.log(board);
    //                     const squareRepresentation = `${horizontal[i]}${vertical[j]}` as Square;
    //                     if(!From)    setFrom(squareRepresentation);
    //                     else{
    //                         // setTo(`${horizontal[i]}${vertical[j]}`);
    //                         socket.send(JSON.stringify({
    //                             type: MOVE,
    //                             payload:{
    //                                 move:{
    //                                     from:From,
    //                                     to: squareRepresentation,
    //                                 }
    //                             }
    //                         }))
    //                     setFrom(null);
    //                     chessBoard.move({
    //                         from:From,
    //                         to: squareRepresentation,
    //                     });
    //                     setBoard(chessBoard.board());
    //                     }

    //                     console.log({
    //                         From,
    //                         to: squareRepresentation
    //                     })
    //                 }}
    //             >
    //                 {/* <p>{horizontal[j]}{vertical[7 - i]} </p> */}
                    
    //                 <div className={"flex flex-col justify-center items-center"}>
                        
    //                     <p> {board[i][j]?.type} </p>
    //                 </div>
                    
                    
    //             </div>
    //         )
    //     }
    // }
    

    return <div className = {"text-white-200 mt-16 h-screen w-full"}>
        {board.map((row,i) => {
            return <div key={i} className={"flex  "}>{
                row.map((square,j) => {
                    return <div key={j} 
                    onClick={() => {
                        console.log(board);
                        const squareRepresentation = String.fromCharCode(97 + (j%8)) + "" + (8-i) as Square;
                        if(!From)    setFrom(squareRepresentation);
                        else{
                            // setTo(`${horizontal[i]}${vertical[j]}`);
                            socket.send(JSON.stringify({
                                type: MOVE,
                                payload:{
                                    move:{
                                        from:From,
                                        to: squareRepresentation,
                                    }
                                }
                            }))
                        setFrom(null);
                        chessBoard.move({
                            from:From,
                            to: squareRepresentation,
                        });
                        setBoard(chessBoard.board());
                        }

                        console.log({
                            From,
                            to: squareRepresentation
                        })
                    }}
                    className={`w-16 h-16  ${(i+j)%2 === 0 ? 'white-tile' : 'black-tile'}`}>
                        {   
                            <div className={"w-full justify-center flex h-full"}>
                                <div className={"h-full justify-center flex flex-col"}>
                                {square ? <img className = "w-10 bg-auto" src={`../src/assets/${square?.color === "b" ? 
                                    square?.type: `${square?.type?.toUpperCase()}-copy`}.png`} /> : null}
                                </div>
                            
                            </div>
                        }
                    </div>
                })}
                </div>
            })}
    </div>

    // return (
    //     <div className="h-screen w-full">
    //         <div className={"   grid grid-cols-8 grid-rows-8 "}>
                
    //                 {chess_board}
                

    //         </div>
    //     </div>
    // )
};



