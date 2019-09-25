import { GradientData } from "./StyleData";
import { BaseDrawable } from "./Abstract/BaseDrawable";
import { Canvas } from "./Canvas";
import { FillRectState } from "./FillRect/FillRectState";
import { FillRectRenderer } from "./FillRect/FillRectRenderer";
import { AudioDirection } from "./FillRect/Controller/AudioDirection";
import { PositionConstraint } from "./FillRect/Controller/PositionConstraint";
import { BaseGenerator } from "./Abstract/BaseGenerator";
import { ObstacleGenerator } from "./Generator/ObstacleGenerator";


export function CanvasSetup() {

    const htmlCanvas = document.querySelector('canvas');
    const context = htmlCanvas.getContext('2d');

    const drawnObject = [
        new BaseDrawable(
            new FillRectState({
                position: {x: 0, y: 0},
                size: {width: 50, height: 50},
                style: 'blue'
            }),
            new FillRectRenderer(),
            [
                new AudioDirection({
                    direction: {x: 5, y: 0},
                    minFrequency: 60,
                    maxFrequency: 800
                }),
                new AudioDirection({
                    direction: {x: -5, y: 0},
                    minFrequency: 2000,
                    maxFrequency: 5000
                }),
                new PositionConstraint({
                    upperLeft: {x: 0, y: 0},
                    lowerRight: {x: window.innerWidth, y: window.innerHeight}
                })
            ]
        ),
        new BaseGenerator(
            new ObstacleGenerator({
                frequency: 0.005
            })
        )
    ]

    return new Canvas(drawnObject, htmlCanvas, context);
}

function generateGradient(gradientData: GradientData, context: CanvasRenderingContext2D) {
    
    const gradient = context.createRadialGradient(
        gradientData.startCenter.x,
        gradientData.startCenter.y,
        gradientData.startRadius,
        gradientData.endCenter.x,
        gradientData.endCenter.y,
        gradientData.endRadius
    );

    gradientData.gradientStop.forEach(colorStop => {
        gradient.addColorStop(colorStop.start, colorStop.color);
    });

    return gradient;
}
