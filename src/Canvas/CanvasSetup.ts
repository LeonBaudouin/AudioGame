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
import { SimpleTextState } from "./SimpleText/SimpleTextState";
import { SimpleTextRenderer } from "./SimpleText/Renderer/SimpleTextRenderer";
import { ShakeHover } from "./FillRect/Controller/ShakeHover";
import { CallBackClick } from "./FillRect/Controller/CallbackClick";
import { EventProvider } from "./Events/EventProvider";
import { PlayerIconRenderer } from "./FillRect/Renderer/PlayerIconRenderer";
import { ButtonRenderer } from "./FillRect/Renderer/ButtonRenderer";
import { Score } from "./SimpleText/Controller/Score";


export function CanvasSetup(player: Player) {

    const htmlCanvas = document.querySelector('canvas');
    const context = htmlCanvas.getContext('2d');

    const rectCollisionLayer = new RectCollisionLayer()

    const drawnObject = [
        // Background
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
                fit: Fit.inWidth,
                scale: 1
            }),
            ['background'],
        ),
        // Obstacle Generator
        new BaseGenerator(
            new ObstacleGenerator({
                scrollSpeed: 5,
                rowQty: 10,
                collisionLayer: rectCollisionLayer
            }),
            ['obstacle_generator', 'game_element'],
            true
        ),
        // Player
        new BaseDrawable(
            new FillRectState({
                position: {x: window.innerWidth / 2 - 25, y: window.innerHeight - 125},
                size: {width: 50, height: 100},
                style: 'blue'
            }),
            new PlayerIconRenderer(),
            ['player', 'game_element'],
            [
                new AudioDirection({
                    direction: {x: window.innerWidth/50, y: 0},
                    minFrequency: 100,
                    maxFrequency: 500
                }),
                new AudioDirection({
                    direction: {x: -window.innerWidth/50, y: 0},
                    minFrequency: 700,
                    maxFrequency: 1200
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
            ],
            true
        ),
        // HealthBar
        new BaseDrawable(
            new FillRectState({
                position: {x: window.innerWidth / 2 - 150, y: 40},
                size: {width: 300, height: 20},
                style: '#16c542ad'
            }),
            new HealthBarRenderer({
                baseWidth: 300
            }),
            ['health_bar', 'game_element'],
            [
                new HealthBar({
                    player: player
                })
            ]
        ),
        // Start Menu
        new BaseDrawable(
            new FillRectState({
                size: {width: 800, height: 450},
                position: {x: (window.innerWidth - 800) / 2, y: (window.innerHeight - 450) / 2},
                style: '#5e5e5ec4'
            }),
            new FillRectRenderer(),
            ['start_menu', 'end_menu']
        ),
        // End Menu Title
        new BaseDrawable(
            new SimpleTextState({
                content: 'Bien joué',
                textSize: 50,
                textUnit: 'px',
                font: 'Monospace',
                textAlign: 'center',
                textColor: '#6ac6fbe0',
                position: {x: window.innerWidth / 2, y: (window.innerHeight - 225) / 2}
            }),
            new SimpleTextRenderer(),
            ['end_menu'],
            [],
            false, true, false
        ),
        // Score
        new BaseDrawable(
            new SimpleTextState({
                content: 'Score : ',
                textSize: 50,
                textUnit: 'px',
                font: 'Monospace',
                textAlign: 'center',
                textColor: '#6ac6fbe0',
                position: {x: window.innerWidth / 2, y: (window.innerHeight) / 2}
            }),
            new SimpleTextRenderer(),
            ['end_menu'],
            [new Score()],
            false, true, false
        ),
        // Start button
        new BaseDrawable(
            new FillRectState({
                position: {x: window.innerWidth / 2 - 100, y: window.innerHeight / 2 + 120},
                size: {width: 200, height: 50},
                style: '#6ac6fbe0'
            }),
            new ButtonRenderer({
                content: 'Try Again'
            }),
            ['try_again', 'end_menu'],
            [
                new CallBackClick({
                    callback: () => console.log('slt')
                })
            ],
            false, true, false
        ),
        // Menu Title
        new BaseDrawable(
            new SimpleTextState({
                content: 'Space 3000',
                textSize: 50,
                textUnit: 'px',
                font: 'Monospace',
                textAlign: 'center',
                textColor: '#6ac6fbe0',
                position: {x: window.innerWidth / 2, y: (window.innerHeight - 225) / 2}
            }),
            new SimpleTextRenderer(),
            ['start_menu']
        ),
        // Player Icon Button
        new BaseDrawable(
            new FillRectState({
                position: {x: window.innerWidth / 2 - 125, y: window.innerHeight / 2 - 50},
                size: {width: 100, height: 100},
                style: 'red'
            }),
            new ImageRenderer({
                image: makeImage('./assets/player-1.svg'),
                fit: Fit.inWidth,
                scale: 1
            }),
            ['player_icon_button', 'start_menu'],
            [
                new ShakeHover({
                    amplitude: 10,
                    frequency: 10
                }),
                new CallBackClick({
                    callback: () => EventProvider.dispatch('select_player_icon', 'player-1.svg')
                })
            ]
        ),
        // Player Icon Button
        new BaseDrawable(
            new FillRectState({
                position: {x: window.innerWidth / 2 - 275, y: window.innerHeight / 2 - 50},
                size: {width: 100, height: 100},
                style: 'red'
            }),
            new ImageRenderer({
                image: makeImage('./assets/player-2.svg'),
                fit: Fit.inWidth,
                scale: 1
            }),
            ['player_icon_button', 'start_menu'],
            [
                new ShakeHover({
                    amplitude: 10,
                    frequency: 10
                }),
                new CallBackClick({
                    callback: () => EventProvider.dispatch('select_player_icon', 'player-2.svg')
                })
            ]
        ),
        // Player Icon Button
        new BaseDrawable(
            new FillRectState({
                position: {x: window.innerWidth / 2 + 25, y: window.innerHeight / 2 - 50},
                size: {width: 100, height: 100},
                style: 'red'
            }),
            new ImageRenderer({
                image: makeImage('./assets/player-3.svg'),
                fit: Fit.inWidth,
                scale: 1
            }),
            ['player_icon_button', 'start_menu'],
            [
                new ShakeHover({
                    amplitude: 10,
                    frequency: 10
                }),
                new CallBackClick({
                    callback: () => EventProvider.dispatch('select_player_icon', 'player-3.svg')
                })
            ]
        ),
        // Player Icon Button
        new BaseDrawable(
            new FillRectState({
                position: {x: window.innerWidth / 2 + 175, y: window.innerHeight / 2 - 50},
                size: {width: 100, height: 100},
                style: 'red'
            }),
            new ImageRenderer({
                image: makeImage('./assets/player-4.svg'),
                fit: Fit.inWidth,
                scale: 1
            }),
            ['player_icon_button', 'start_menu'],
            [
                new ShakeHover({
                    amplitude: 10,
                    frequency: 10
                }),
                new CallBackClick({
                    callback: () => EventProvider.dispatch('select_player_icon', 'player-4.svg')
                })
            ]
        ),
        // Start button
        new BaseDrawable(
            new FillRectState({
                position: {x: window.innerWidth / 2 - 100, y: window.innerHeight / 2 + 120},
                size: {width: 200, height: 50},
                style: '#6ac6fbe0'
            }),
            new ButtonRenderer({
                content: 'Start'
            }),
            ['start_button', 'start_menu'],
            [
                new CallBackClick({
                    callback: () => EventProvider.dispatch('start_game')
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
