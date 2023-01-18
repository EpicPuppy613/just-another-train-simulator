export class Scene {
    id: string
    draw: Function
    constructor(id: string, draw: Function) {
        this.id = id;
        this.draw = draw;
    }
}