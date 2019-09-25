import { GradientData } from "./StyleData";
import { BaseDrawable } from "./Abstract/BaseDrawable";
import { Canvas } from "./Canvas";
import { FillRectState } from "./FillRect/FillRectState";
import { FillRectRenderer } from "./FillRect/FillRectRenderer";
import { AudioDirection } from "./FillRect/Controller/AudioDirection";
import { PositionConstraint } from "./FillRect/Controller/PositionConstraint";
import { BaseGenerator } from "./Abstract/BaseGenerator";
import { ObstacleGenerator } from "./Generator/ObstacleGenerator";
import { RectCollisionLayer } from "./FillRect/RectCollisionLayer";
import { RectCollision } from "./FillRect/Controller/RectCollision";
import { Player } from "../Player";
import { HealthBar } from "./FillRect/Controller/HealthBar";


export function CanvasSetup() {

    const htmlCanvas = document.querySelector('canvas');
    const context = htmlCanvas.getContext('2d');

    const player = new Player(100)

    const rectCollisionLayer = new RectCollisionLayer()

    const drawnObject = [
        new BaseGenerator(
            new ObstacleGenerator({
                scrollSpeed: 5,
                rowQty: 5,
                collisionLayer: rectCollisionLayer
            })
        ),
        new BaseDrawable(
            new FillRectState({
                position: {x: window.innerWidth / 2 - 25, y: 10},
                size: {width: 50, height: 50},
                style: 'blue'
            }),
            new FillRectRenderer(),
            [
                new AudioDirection({
                    direction: {x: window.innerWidth/50, y: 0},
                    minFrequency: 200,
                    maxFrequency: 500
                }),
                new AudioDirection({
                    direction: {x: -window.innerWidth/50, y: 0},
                    minFrequency: 600,
                    maxFrequency: 1000
                }),
                new PositionConstraint({
                    upperLeft: {x: 0, y: 0},
                    lowerRight: {x: window.innerWidth, y: window.innerHeight}
                }),
                new RectCollision({
                    isPassive: false,
                    collisionLayer: rectCollisionLayer,
                    callback: () => {player.takeDamage(1)}
                })
            ]
        ),
        new BaseDrawable(
            new FillRectState({
                position: {x: window.innerWidth / 2 - 500, y: window.innerHeight - 40},
                size: {width: 1000, height: 20},
                style: 'green'
            }),
            new FillRectRenderer(),
            [
                new HealthBar({
                    player
                })
            ]
        )
    ]

    return new Canvas(drawnObject, htmlCanvas, context, [rectCollisionLayer]);
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
