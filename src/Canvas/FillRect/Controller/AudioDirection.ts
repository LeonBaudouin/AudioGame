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
        this.audioAnalyser = AudioAnalyser.getInstance()
    }

    public Update(currentState: FillRectState, defaultState: FillRectState): FillRectState {
        const newState = currentState.Clone()
        this.audioAnalyser.updateValue()
        if (this.doesValueMatch(this.audioAnalyser.getBuffer())) {
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

}

interface AudioDirectionConfig {
    minFrequency: number
    maxFrequency: number
    direction: Point
}
