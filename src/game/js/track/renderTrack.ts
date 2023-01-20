import { RailNode } from "./node.js";
import { RailNodeCurve } from "./nodeCurve.js";
import { RailNodeStraight } from "./nodeStraight.js";

export function render(layer: OffscreenCanvasRenderingContext2D, segments: RailNode[]) {
    for (const segment of segments) {
        if (segment.constructor.name == "RailNodeStraight") {
            //@ts-expect-error
            let track: RailNodeStraight = segment;
            layer.strokeStyle = 'gray';
            layer.lineWidth = 4;
            layer.beginPath();
            layer.moveTo(track.position.x, track.position.y);
            layer.lineTo(Math.round(Math.cos(track.direction) * track.length) + track.position.x, Math.round(-Math.sin(track.direction) * track.length + track.position.y))
            layer.stroke();
        }
        else if (segment.constructor.name == "RailNodeCurve") {
            //@ts-expect-error
            let track: RailNodeCurve = segment;
            let clockwise: boolean = track.clockwise;
            layer.strokeStyle = 'gray';
            layer.lineWidth = 4;
            layer.beginPath();
            layer.moveTo(track.position.x, track.position.y);
            let xpos: number = Math.round(Math.cos(track.startAngle + Math.PI) * track.radius);
            let ypos: number = Math.round(-Math.sin(track.startAngle + Math.PI) * track.radius);
            layer.arc(
                clockwise ? -xpos + track.position.x : xpos + track.position.x,
                clockwise ? -ypos + track.position.y : ypos + track.position.y,
                track.radius,
                track.startAngle,
                track.endAngle,
                track.clockwise
            )
            layer.stroke();
        }
    }
}