"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const Messages_1 = require("./Messages");
class Game {
    constructor(player1, player2) {
        // Initializing a new game between two players with different websockets
        this.player1 = player1;
        this.player2 = player2;
        this.chess_board = new chess_js_1.Chess();
        this.gameStartTime = new Date();
        this.number_of_moves = 0;
        this.player1.send(JSON.stringify({
            type: Messages_1.INIT_GAME,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: Messages_1.INIT_GAME,
            payload: {
                color: "black"
            }
        }));
    }
    makeMove(player, userMove) {
        // .move validates the move and makes the move if its valid
        if (this.number_of_moves % 2 === 0 && player !== this.player1)
            return;
        else if (this.number_of_moves % 2 === 1 && player !== this.player2)
            return;
        try {
            this.chess_board.move(userMove);
            this.number_of_moves++;
        }
        catch (e) {
            console.log(e);
            return e;
        }
        if (this.chess_board.isGameOver()) {
            if (this.number_of_moves % 2 === 0) {
                this.player2.send(JSON.stringify({
                    type: Messages_1.GAME_OVER,
                    payload: {
                        winner: "black"
                    }
                }));
            }
            else {
                this.player1.send(JSON.stringify({
                    type: Messages_1.GAME_OVER,
                    payload: {
                        winner: "white"
                    }
                }));
            }
            return;
        }
        // Game is not over..make the valid move and tell the other player about it
        if (this.number_of_moves % 2 === 0) {
            this.player1.send(JSON.stringify({
                type: Messages_1.MOVE,
                payload: userMove
            }));
        }
        else {
            this.player2.send(JSON.stringify({
                type: Messages_1.MOVE,
                payload: userMove
            }));
        }
        console.log(this.number_of_moves);
    }
}
exports.Game = Game;
