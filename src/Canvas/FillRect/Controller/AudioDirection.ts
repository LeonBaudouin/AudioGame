import { ControllerInterface } from "../../Abstract/ControllerInterface";
import { FillRectState } from "../FillRectState";
import { AudioAnalyser } from "../../../Audio/AudioAnalyser";
import { Point } from "../../../CustomTypes/Point";

export class AudioDirection implements ControllerInterface {

    minFrequency: number
    maxFrequency: number
    direction: Point
    audioAnalyser: AudioAnalyser

    constructor({minFrequency, maxFrequency, direction}: AudioDirectionConfig) {
        this.maxFrequency = maxFrequency
        this.minFrequency = minFrequency
        this.direction = direction
    }

    public Update(currentState: FillRectState, defaultState: FillRectState): FillRectState {
        const newState = currentState.Clone()
        if (this.doesValueMatch(this.getAudioAnalyser().getBuffer())) {
            newState.position = {
                x: newState.position.x + this.direction.x,
                y: newState.position.y + this.direction.y
            }
        }

        return newState
    }

    private doesValueMatch(buffer: number[]) : boolean
    {
        return buffer.filter(frequency => frequency > this.minFrequency && frequency < this.maxFrequency).length > 0.75 * buffer.length
    }

    private getAudioAnalyser() : AudioAnalyser
    {
        if (this.audioAnalyser == null) {
            this.audioAnalyser = AudioAnalyser.getInstance()
        }
        return this.audioAnalyser
    }

}

interface AudioDirectionConfig {
    minFrequency: number
    maxFrequency: number
    direction: Point
}
