import { Scene } from "./scene.js";
import { RailNode } from "./track/node.js";
import { RailNodeCurve } from "./track/nodeCurve.js";
import { RailNodeStraight } from "./track/nodeStraight.js";
import { render } from "./track/renderTrack.js";

type G = {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    width: number
    height: number
    frame: FrameController
    loop: number
    layers: {
        all: OffscreenCanvas[]
        ui: OffscreenCanvasRenderingContext2D
        fore: OffscreenCanvasRenderingContext2D
        mid: OffscreenCanvasRenderingContext2D
        back: OffscreenCanvasRenderingContext2D
    }
    scenes: {
        [index: string]: Scene
    }
    rails: RailNode[]
}
type FrameController = {
    last: number
    fps: Function
    tick: Function
    frames: number[]
    pass: number
    time: number
}
const G: G = {
    canvas: document.querySelector("canvas#game"),
    ctx: null,
    width: window.innerWidth,
    height: window.innerHeight,
    frame: {
        last: 0,
        fps: function (): number {
            return 1000 / this.frames.reduce((a: number, b: number) => (a + b) / 2);
        },
        tick: function (): void {
            this.pass = performance.now() - this.last;
            this.time = this.pass / 1000;
            this.frames.push(this.pass);
            this.frames.shift();
            this.last = performance.now();
        },
        frames: new Array(20).fill(0),
        time: 0,
        pass: 0
    },
    loop: 0,
    layers: {
        all: [new OffscreenCanvas(window.innerWidth, window.innerHeight), 
            new OffscreenCanvas(window.innerWidth, window.innerHeight), 
            new OffscreenCanvas(window.innerWidth, window.innerHeight), 
            new OffscreenCanvas(window.innerWidth, window.innerHeight)],
        ui: null,
        fore: null,
        mid: null,
        back: null
    },
    scenes: {},
    rails: [new RailNodeStraight(400, 200, 100, 0), new RailNodeCurve(600, 100, 100, false, Math.PI * -0.5, Math.PI * 0.5)]
}

//CANVAS SETUP
G.ctx = G.canvas.getContext('2d');
//@ts-expect-error
G.layers.ui = G.layers.all[0].getContext('2d');
//@ts-expect-error
G.layers.fore = G.layers.all[1].getContext('2d');
//@ts-expect-error
G.layers.mid = G.layers.all[2].getContext('2d');
//@ts-expect-error
G.layers.back = G.layers.all[3].getContext('2d');

G.canvas.width = G.width;
G.canvas.height = G.height;

let x = 0;
let speed = 0;

//MAIN FUNCTION
function Main() {
    //TICK FRAME COUNTER
    G.frame.tick();

    //CLEAR CANVASES
    G.ctx.clearRect(0, 0, G.width, G.height);
    G.layers.back.clearRect(0, 0, G.width, G.height);
    G.layers.mid.clearRect(0, 0, G.width, G.height);
    G.layers.fore.clearRect(0, 0, G.width, G.height);
    G.layers.ui.clearRect(0, 0, G.width, G.height);

    //MOVE TEST RECTANGLE
    x += speed * G.frame.time;
    speed += 100 * G.frame.time;
    if (x - 110 > G.width) x = -110;
    G.layers.fore.fillStyle = 'white';
    G.layers.fore.fillRect(x, 100, 50, 20);

    //DRAW FPS
    G.layers.ui.fillStyle = 'white';
    G.layers.ui.textBaseline = 'top';
    G.layers.ui.font = '16px sans-serif';
    G.layers.ui.fillText("FPS: " + G.frame.fps().toFixed(0), 10, 10);

    //DRAW TRACK
    render(G.layers.mid, G.rails);

    //RENDER LAYERS
    G.ctx.drawImage(G.layers.all[3], 0, 0);
    G.ctx.drawImage(G.layers.all[2], 0, 0);
    G.ctx.drawImage(G.layers.all[1], 0, 0);
    G.ctx.drawImage(G.layers.all[0], 0, 0);
}

//GAME LOOP
G.loop = window.setInterval(Main, 1000/60);

//KEYBINDS
document.addEventListener('keydown', (e) => {
    if (e.code == "Escape") {
        window.close();
    }
});

//RESIZE
window.addEventListener('resize', () => {
    G.width = window.innerWidth;
    G.height = window.innerHeight;
    G.canvas.width = window.innerWidth;
    G.canvas.height = window.innerHeight;
    G.layers.all.forEach(canvas => {canvas.width = window.innerWidth; canvas.height = window.innerHeight});
});