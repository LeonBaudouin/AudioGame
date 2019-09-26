import { Player } from "./Player";
import { Canvas } from "./Canvas/Canvas";
import { CanvasSetup } from "./Canvas/CanvasSetup";

export class Game {
    
    player: Player
    canvas: Canvas
    raf: number
    
    constructor() {
        this.player = new Player(100)
        this.canvas = CanvasSetup(this.player)
        this.player.onDie = this.endGame.bind(this)
        this.startGame()
    }

    public startGame() {
        this.gameLoop()
    }
    
    private gameLoop() {
        this.raf = requestAnimationFrame(this.gameLoop.bind(this))
        this.canvas.Loop()
    }

    private endGame() {
        console.log('end')
        cancelAnimationFrame(this.raf)
    }
}
