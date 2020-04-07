import { GlobalControlerInterface } from "../Abstract/GlobalControlerInterface";
import { AudioAnalyser } from "../../Audio/AudioAnalyser";

export class UpdateAudio implements GlobalControlerInterface {

    private audioAnalyser: AudioAnalyser

    Update() {
        if (this.getAudioAnalyser()) this.getAudioAnalyser().updateValue()
    }

    private getAudioAnalyser(): AudioAnalyser|null {
        if (this.audioAnalyser == null) {
            this.audioAnalyser = AudioAnalyser.getInstance()
        }
        return this.audioAnalyser
    }
}
