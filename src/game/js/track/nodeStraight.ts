import { RailNode } from "./node.js";

/**
 * RailNode Object, Creates the railway network and responsible for signal control
 *
 * Represents a single straight stretch of track
 *
 * **Layout Diagram:**
 * 
 * A ─── B
 * 
 * Root Node: A
 * 
 * * Use RailNodeCurved for a curved stretch of track
 * * Use RailNodeSwitch for diverging rails
 * * use RailNodeCrossover for rails crossing over
 */
export class RailNodeStraight extends RailNode {
    direction: number
    constructor (length: number, x: number, y: number, direction: number) {
        super(length, x, y);
        this.direction = direction;
    }
}