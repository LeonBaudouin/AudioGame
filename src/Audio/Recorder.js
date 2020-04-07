export class Recorder {
  constructor(source, context) {
    this.isRecording = false
    this.chunks = []
    const dest = context.createMediaStreamDestination()
    this.mediaRecorder = new MediaRecorder(dest.stream)
    source.connect(dest)
    this.mediaRecorder.addEventListener('dataavailable', ev => {
      this.chunks.push(ev.data)
    })
  }
  start() {
    this.mediaRecorder.start()
    this.isRecording = true
  }
  stop() {
    this.mediaRecorder.stop()
    this.isRecording = false
  }
  save() {
    if (this.isRecording) {
      throw new Error('cannot save an unfinished recording, stop it first !')
    }
    return new Blob(this.chunks, { type: 'audio/ogg; codecs=opus' })
  }
}
