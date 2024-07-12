"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const Game_1 = require("./Game");
const Messages_1 = require("./Messages");
class GameManager {
    constructor() {
        this.activeGames = [];
        this.waitingUser = null;
        this.activeUsers = [];
    }
    // Method for adding new user to an existing game
    addUser(socket) {
        this.activeUsers.push(socket);
        this.addHandler(socket);
    }
    removeUser(socket) {
        // Remove a user from the array as he/she left
        this.activeUsers = this.activeUsers.filter((user) => user !== socket);
    }
    addHandler(socket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === Messages_1.INIT_GAME) {
                if (this.waitingUser) {
                    const new_game = new Game_1.Game(this.waitingUser, socket);
                    this.activeGames.push(new_game);
                    this.waitingUser = null;
                }
                else {
                    this.waitingUser = socket;
                }
            }
            if (message.type === Messages_1.MOVE) {
                console.log("inside move");
                const curr_game = this.activeGames.find((game) => game.player1 === socket || game.player2 === socket);
                if (curr_game) {
                    // console.log(data);
                    curr_game.makeMove(socket, message.payload.move);
                }
            }
        });
    }
}
exports.GameManager = GameManager;
