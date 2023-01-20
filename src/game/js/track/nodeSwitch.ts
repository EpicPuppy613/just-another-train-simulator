import { RailNode } from "./node.js";

/**
 * RailNode Object, Creates the railway network and responsible for signal control
 *
 * Represents a single track switch with a main and diverging path
 *
 * **Layout Diagram:**
 * 
 * A ─┬─ B  
 *  &nbsp; &nbsp; &nbsp; └─ C
 * 
 * Root Node: A
 * 
 * * Use RailNodeStraight for a straight stretch of track
 * * Use RailNodeCurve for a curved stretch of track
 * * use RailNodeCrossover for rails crossing over
 */
export class RailNodeSwitch extends RailNode {
    radius: number
    clockwise: boolean
    startAngle: number
    endAngle: number
    mainLength: number
    direction: number
    constructor (x: number, y: number, radius: number, clockwise: boolean, startAngle: number, endAngle: number) {
        super(Math.abs(startAngle - endAngle) * radius, x, y);
        this.clockwise = clockwise;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
    }
}