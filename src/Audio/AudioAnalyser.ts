import AutoCorrelate from './correlate'

export class AudioAnalyser
{

    public static FFT_SIZE = 2048
    public static BUFFER_LENGTH = 1024
    public static VALUE_BUFFER_LENGHT = 20
    private static instance: AudioAnalyser

    private source: MediaStreamAudioSourceNode
    private ctx: AudioContext
    private analyser: AnalyserNode
    
    private dataArray: Float32Array

    private value: number
    private buffer: number[] = []

    constructor(source: MediaStreamAudioSourceNode, audioContext: AudioContext)
    {
        this.source = source
        this.ctx = audioContext
        this.analyser = this.ctx.createAnalyser()
        this.source.connect(this.analyser)
        this.dataArray = new Float32Array(AudioAnalyser.BUFFER_LENGTH)
        AudioAnalyser.instance = this
    }

    public updateValue()
    {
        this.analyser.getFloatTimeDomainData(this.dataArray)
        this.value = AutoCorrelate(this.dataArray, this.ctx.sampleRate)
        console.log(this.value)
        this.buffer.push(this.value)
        if (this.buffer.length > AudioAnalyser.VALUE_BUFFER_LENGHT) this.buffer.shift()
    }

    public getValue() : number
    {
        return this.value
    }

    public getBuffer() : number[]
    {
        return this.buffer
    }

    public static getInstance() : AudioAnalyser
    {
        if (!AudioAnalyser.instance) throw "Init an audio analyser first"
        return AudioAnalyser.instance
    }
}
