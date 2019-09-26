import { ImageRenderer, Fit } from "./ImageRenderer";
import { makeImage } from "../../CanvasSetup";
import { EventProvider } from "../../Events/EventProvider";

export class PlayerIconRenderer extends ImageRenderer {
    
    constructor() {
        super({
            image: makeImage(`./assets/player-${Math.floor(Math.random() * 4) + 1}.svg`),
            fit: Fit.inWidth,
            scale: 2
        })

        EventProvider.listenTo('select_player_icon', this.changeIcon.bind(this))
    }

    private changeIcon(name: string) {
        console.log(name)
        this.image = makeImage(`./assets/${name}`)
    }

}