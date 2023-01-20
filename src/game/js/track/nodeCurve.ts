import { RailNode } from "./node.js";

/**
 * RailNode Object, Creates the railway network and responsible for signal control
 *
 * Represents a single curved stretch of track
 *
 * **Layout Diagram:**
 * 
 * A ─── B
 * 
 * Root Node: A
 * 
 * * Use RailNodeStraight for a straight stretch of track
 * * Use RailNodeSwitch for diverging rails
 * * use RailNodeCrossover for rails crossing over
 */
export class RailNodeCurve extends RailNode {
    radius: number
    clockwise: boolean
    startAngle: number
    endAngle: number
    constructor (x: number, y: number, radius: number, clockwise: boolean, startAngle: number, endAngle: number) {
        super(Math.abs(startAngle - endAngle) * radius, x, y);
        this.radius = radius;
        this.clockwise = clockwise;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
    }
}