import { EventProvider } from "./Canvas/Events/EventProvider"

export class Player {

    private life: number
    private maxLife: number
    public onDie: Function

    constructor(life: number) {
        this.life = life
        this.maxLife = life
    }

    public takeDamage(damage: number) {
        this.setLife(this.getLife() - damage)
        EventProvider.dispatch('player damaged')
    }

    public isDead(): boolean {
        return this.life <= 0
    }

    public getLife(): number {
        return this.life
    }

    public getMaxLife(): number {
        return this.maxLife
    }

    public setLife(newLife: number) {
        if (newLife < 0) this.life = 0
        else if (newLife > this.getMaxLife()) this.life = this.getMaxLife()
        else this.life = newLife
        if (this.isDead() && this.onDie) this.onDie()
    }
}
