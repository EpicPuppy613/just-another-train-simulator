/**
 * @property {"s" | "c" | "b"} type
 */
export class RailNode {
    length: number
    position: {
        x: number
        y: number
    }
    constructor (length: number, x: number, y: number) {
        this.length = length;
        this.position = {
            x: x,
            y: y
        }
    }
}