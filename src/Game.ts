import { Player } from "./Player";
import { Canvas } from "./Canvas/Canvas";
import { CanvasSetup } from "./Canvas/CanvasSetup";
import { AudioAnalyser } from "./Audio/AudioAnalyser";
import { TaggableObject } from "./Canvas/Abstract/TaggableObject";
import { AbstractDrawableObject } from "./Canvas/Abstract/AbstractDrawableObject";
import { EventProvider } from "./Canvas/Events/EventProvider";
import { saveCanvas, upload } from "./Canvas/SaveCanvas";
import { Recorder } from "./Audio/Recorder";

export class Game {
    
    private player: Player
    private canvas: Canvas
    private static gameDuration: number = 0
    private inGame: boolean = false
    private soundIsStarted: boolean = false
    private recorder: Recorder
    private audioAnalyser: AudioAnalyser
    private raf: number
    
    constructor() {
        this.player = new Player(100)
        this.canvas = CanvasSetup(this.player)
        this.player.onDie = this.endGame.bind(this)
        
        EventProvider.listenTo('start_game', this.startGame.bind(this))
        EventProvider.listenTo('save_score', this.saveScore.bind(this))
        EventProvider.listenTo('test_sound', this.startSound.bind(this))
        
        this.gameLoop()
    }
    
    private gameLoop() {
        this.raf = requestAnimationFrame(this.gameLoop.bind(this))
        this.canvas.Loop()
        if(this.inGame) Game.gameDuration++
    }

    private startGame() {
        if (!this.soundIsStarted) {
            this.startSound().then(() => {
                TaggableObject.getByTag('start_menu').forEach(object => (<AbstractDrawableObject>object).desactivate())
                TaggableObject.getByTag('game_element').forEach(object => (<AbstractDrawableObject>object).resume())
                this.recorder.start()
                this.inGame = true
            })
        } else {
            TaggableObject.getByTag('start_menu').forEach(object => (<AbstractDrawableObject>object).desactivate())
            TaggableObject.getByTag('game_element').forEach(object => (<AbstractDrawableObject>object).resume())
            this.recorder.start()
            this.inGame = true
        }
    }

    private endGame() {
        this.inGame = false
        this.recorder.stop()
        TaggableObject.getByTag('game_element').forEach(object => (<AbstractDrawableObject>object).pause())
        TaggableObject.getByTag('end_menu').forEach(object => (<AbstractDrawableObject>object).activate())
    }

    private startSound() {
        const audioCtx = new window.AudioContext()

        return navigator.mediaDevices
            .getUserMedia({audio: true, video: false})
            .then(stream => {
                const media = audioCtx.createMediaStreamSource(stream)
                this.audioAnalyser = new AudioAnalyser(media, audioCtx)
                this.recorder = new Recorder(media, audioCtx)
                TaggableObject.getByTag('sound_cursor').forEach(object => (<AbstractDrawableObject>object).resume())
                this.soundIsStarted = true
            })
    }

    public static getGameDuration() {
        return this.gameDuration
    }

    public saveScore() {
        upload(this.recorder.save(), Math.floor(Game.gameDuration / 10))
        window.location.replace('http://localhost:3000/experiment/')
    }
}
