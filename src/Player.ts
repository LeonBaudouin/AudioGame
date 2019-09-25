export class Player {

    private life: number
    private maxLife: number

    constructor(life: number) {
        this.life = life
        this.maxLife = life
    }

    public takeDamage(damage: number) {
        this.life = damage > this.life ? 0 : this.life -= damage 
    }

    public isDead() {
        return this.life <= 0
    }

    public getLife() {
        return this.life
    }

    public getMaxLife() {
        return this.maxLife
    }
}