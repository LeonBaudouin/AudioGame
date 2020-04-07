import { ControllerInterface } from "../../Abstract/ControllerInterface";
import { FillRectState } from "../FillRectState";
import { AudioAnalyser } from "../../../Audio/AudioAnalyser";
import { Interval, transformRange } from "../../../CustomTypes/Interval";

export class AudioPosition implements ControllerInterface {

    xInterval: Interval
    frequencyInterval: Interval
    audioAnalyser: AudioAnalyser

    constructor({xInterval, frequencyInterval}: {xInterval: Interval, frequencyInterval: Interval}) {
        this.xInterval = xInterval
        this.frequencyInterval = frequencyInterval
    }

    public Update(currentState: FillRectState, defaultState: FillRectState): FillRectState {
        const newState = currentState.Clone()
        const avg = this.getAudioAnalyser().getBuffer().reduce((a, c) => c != -1 ? a + c : a, 0) / AudioAnalyser.VALUE_BUFFER_LENGHT
        newState.position.x = transformRange(avg, this.frequencyInterval, this.xInterval)
        return newState
    }

    private getAudioAnalyser() : AudioAnalyser
    {
        if (this.audioAnalyser == null) {
            this.audioAnalyser = AudioAnalyser.getInstance()
        }
        return this.audioAnalyser
    }

}
