
import { Game } from "./Game";
import WebSocket from "ws";
import { INIT_GAME, MOVE, GAME_OVER } from "./Messages";

export class GameManager{
    
    // Initializing a new game using a game object
    private activeGames: Game[];
    // User waiting to connect to a game
    private waitingUser: WebSocket | null;
    // Global array of active users
    private activeUsers: WebSocket[];
    

    constructor(){
        this.activeGames = [];
        this.waitingUser = null;
        this.activeUsers = [];
    }

    // Method for adding new user to an existing game
    addUser(socket: WebSocket){
        this.activeUsers.push(socket);
        this.addHandler(socket);
    }

    removeUser(socket: WebSocket){
        // Remove a user from the array as he/she left
        this.activeUsers = this.activeUsers.filter((user) => user !== socket );
    }


    private addHandler(socket: WebSocket){
        socket.on("message", (data)=>{
            const message = JSON.parse(data.toString());
            if(message.type === INIT_GAME){
                if(this.waitingUser){
                    const new_game = new Game(this.waitingUser, socket);
                    this.activeGames.push(new_game);
                    this.waitingUser = null;
                }
                else{
                    this.waitingUser = socket;
                }
            }

            if(message.type === MOVE){
                console.log("inside move");
                const curr_game = this.activeGames.find((game)=>game.player1 === socket || game.player2 === socket);
                if(curr_game){
                    
                    // console.log(data);
                    curr_game.makeMove(socket, message.payload.move);  
                }
                
            }
        })
    }
}