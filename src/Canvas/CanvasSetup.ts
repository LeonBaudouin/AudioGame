import { RadialGradientData, LinearGradientData } from "./StyleData";
import { BaseDrawable } from "./Abstract/BaseDrawable";
import { Canvas } from "./Canvas";
import { FillRectState } from "./FillRect/FillRectState";
import { FillRectRenderer } from "./FillRect/Renderer/FillRectRenderer";
import { AudioDirection } from "./FillRect/Controller/AudioDirection";
import { PositionConstraint } from "./FillRect/Controller/PositionConstraint";
import { BaseGenerator } from "./Abstract/BaseGenerator";
import { ObstacleGenerator } from "./Generator/ObstacleGenerator";
import { RectCollisionLayer } from "./FillRect/RectCollisionLayer";
import { RectCollision } from "./FillRect/Controller/RectCollision";
import { Player } from "../Player";
import { HealthBar } from "./FillRect/Controller/HealthBar";
import { ImageRenderer, Fit } from "./FillRect/Renderer/ImageRenderer";
import { HealthBarRenderer } from "./FillRect/Renderer/HealthBarRenderer";


export function CanvasSetup(player: Player) {

    const htmlCanvas = document.querySelector('canvas');
    const context = htmlCanvas.getContext('2d');

    const rectCollisionLayer = new RectCollisionLayer()

    const drawnObject = [
        new BaseDrawable(
            new FillRectState({
                size: {width: window.innerWidth, height: window.innerHeight},
                position: {x: 0, y: 0},
                style: generateLinearGradient({
                    startPoint: {x: 0, y: 0},
                    endPoint: {x: 0, y: window.innerHeight},
                    gradientStop: [
                        {start: 0, color: '#363C4F'},
                        {start: 1, color: '#292938'}
                    ]
                }, context)
            }),
            new ImageRenderer({
                image: makeImage("./assets/bg.png"),
                fit: Fit.stretch,
                scale: 1
            }),
        ),
        new BaseGenerator(
            new ObstacleGenerator({
                scrollSpeed: 5,
                rowQty: 10,
                collisionLayer: rectCollisionLayer
            })
        ),
        new BaseDrawable(
            new FillRectState({
                position: {x: window.innerWidth / 2 - 25, y: window.innerHeight - 120},
                size: {width: 50, height: 100},
                style: 'blue'
            }),
            new ImageRenderer({
                image: makeImage(`./assets/player-${Math.floor(Math.random() * 4) + 1}.svg`),
                fit: Fit.inWidth,
                scale: 2
            }),
            [
                new AudioDirection({
                    direction: {x: window.innerWidth/50, y: 0},
                    minFrequency: 100,
                    maxFrequency: 700
                }),
                new AudioDirection({
                    direction: {x: -window.innerWidth/50, y: 0},
                    minFrequency: 2500,
                    maxFrequency: 3500
                }),
                new PositionConstraint({
                    upperLeft: {x: 20, y: 20},
                    lowerRight: {x: window.innerWidth - 20, y: window.innerHeight - 20}
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
                position: {x: window.innerWidth / 2 - 150 / 2, y: 40},
                size: {width: 300, height: 20},
                style: '#16c542ad'
            }),
            new HealthBarRenderer({
                baseWidth: 300
            }),
            [
                new HealthBar({
                    player: player
                })
            ]
        )
    ]

    return new Canvas(drawnObject, htmlCanvas, context, [rectCollisionLayer]);
}

export function generateRadialGradient(gradientData: RadialGradientData, context: CanvasRenderingContext2D) {
    
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

export function generateLinearGradient(gradientData: LinearGradientData, context: CanvasRenderingContext2D) {
    
    const gradient = context.createLinearGradient(
        gradientData.startPoint.x,
        gradientData.startPoint.y,
        gradientData.endPoint.x,
        gradientData.endPoint.y
    );

    gradientData.gradientStop.forEach(colorStop => {
        gradient.addColorStop(colorStop.start, colorStop.color);
    });

    return gradient;
}


export function makeImage(url: string) {
    const image = new Image()
    image.src = url
    return image
}
