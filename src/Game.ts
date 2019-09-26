import { Player } from "./Player";
import { Canvas } from "./Canvas/Canvas";
import { CanvasSetup } from "./Canvas/CanvasSetup";
import { AudioAnalyser } from "./Audio/AudioAnalyser";
import { TaggableObject } from "./Canvas/Abstract/TaggableObject";
import { AbstractDrawableObject } from "./Canvas/Abstract/AbstractDrawableObject";
import { EventProvider } from "./Canvas/Events/EventProvider";

export class Game {
    
    private player: Player
    private canvas: Canvas
    private static gameDuration: number = 0
    private inGame: boolean = false
    private raf: number
    
    constructor() {
        this.player = new Player(100)
        this.canvas = CanvasSetup(this.player)
        this.player.onDie = this.endGame.bind(this)

        const BaseAudioContext = window.AudioContext
        const audioCtx = new BaseAudioContext()

        document.addEventListener('DOMContentLoaded', () => {
        navigator.mediaDevices
            .getUserMedia({audio: true, video: false})
            .then(stream => {
                new AudioAnalyser(audioCtx.createMediaStreamSource(stream), audioCtx)
                this.gameLoop()
            })
        })

        EventProvider.listenTo('start_game', this.startGame.bind(this))
    }
    
    private gameLoop() {
        this.raf = requestAnimationFrame(this.gameLoop.bind(this))
        this.canvas.Loop()
        if(this.inGame) Game.gameDuration++
    }

    private startGame() {
        this.inGame = true
        TaggableObject.getByTag('start_menu').forEach(object => (<AbstractDrawableObject>object).desactivate())
        TaggableObject.getByTag('game_element').forEach(object => (<AbstractDrawableObject>object).resume())
    }

    private endGame() {
        this.inGame = false
        TaggableObject.getByTag('game_element').forEach(object => (<AbstractDrawableObject>object).pause())
        TaggableObject.getByTag('end_menu').forEach(object => (<AbstractDrawableObject>object).activate())
    }

    public static getGameDuration() {
        return this.gameDuration
    }
}
