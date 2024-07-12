
import WebSocket from "ws";
import { Chess } from "chess.js";
import { INIT_GAME, MOVE, GAME_OVER } from "./Messages";

export class Game{
    public player1: WebSocket;
    public player2: WebSocket;
    public number_of_moves: number;
    private chess_board : Chess;
    private gameStartTime: Date;

    constructor(player1: WebSocket, player2: WebSocket ){
        // Initializing a new game between two players with different websockets
        this.player1 = player1;
        this.player2 = player2;
        this.chess_board = new Chess();
        this.gameStartTime = new Date();
        this.number_of_moves = 0;

        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "white"
            }
        }))

        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload:{
                color: "black"
            }
        }))
    }

    makeMove(player: WebSocket, userMove: {from: string, to: string}){
        // .move validates the move and makes the move if its valid
        if(this.number_of_moves % 2 === 0 && player !== this.player1 )   return;
        else if(this.number_of_moves % 2 === 1 && player !== this.player2)  return;

        try{
            this.chess_board.move(userMove);
            this.number_of_moves++;
        }
        catch(e){
            console.log(e)
            return e;
        }
        
        if(this.chess_board.isGameOver()){
            if(this.number_of_moves % 2 === 0){
                this.player2.send(JSON.stringify({
                    type: GAME_OVER,
                    payload:{
                        winner: "black"
                    }
                }))
            }
            else{
                this.player1.send(JSON.stringify({
                    type: GAME_OVER,
                    payload:{
                        winner: "white"
                    }
                }))
            }
            
            return;
        }

        // Game is not over..make the valid move and tell the other player about it
        
        if(this.number_of_moves % 2 === 0){
            this.player1.send(JSON.stringify({
                type: MOVE,
                payload: userMove
            }))
        }
        else{
            this.player2.send(JSON.stringify({
                type: MOVE,
                payload: userMove
            }))
        }
        
        
        console.log(this.number_of_moves);
    }
}