import { CanvasSetup } from './Canvas/CanvasSetup'
import { AudioAnalyser } from './Audio/AudioAnalyser'

const BaseAudioContext = window.AudioContext || window.webkitAudioContext
const audioCtx = new BaseAudioContext()

const mediaConfig = {
  "audio": {
    "mandatory": {
        "googEchoCancellation": "false",
        "googAutoGainControl": "false",
        "googNoiseSuppression": "false",
        "googHighpassFilter": "false"
    },
    "optional": []
  }
}

document.addEventListener('DOMContentLoaded', () => {
  navigator.mediaDevices
    .getUserMedia(mediaConfig)
    .then(stream => {
      new AudioAnalyser(audioCtx.createMediaStreamSource(stream), audioCtx)
      CanvasSetup()
    })
})
// tremolo
// ripple
// wobble
