type G = {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    width: number
    height: number
    frame: FrameController
    loop: number
}
type FrameController = {
    last: number
    fps: Function
    tick: Function
    frames: number[]
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
            this.frames.push(performance.now() - this.last);
            this.frames.shift();
            this.last = performance.now();
        },
        frames: new Array(25).fill(0)
    },
    loop: 0
}

//CANVAS SETUP
G.ctx = G.canvas.getContext('2d');

G.canvas.width = G.width;
G.canvas.height = G.height;

let x = 0;
let direction = true;

//MAIN FUNCTION
function Main() {
    G.frame.tick();
    G.ctx.clearRect(0, 0, G.width, G.height);
    G.ctx.fillStyle = 'white';
    G.ctx.fillRect(x, 100, 50, 20);
    if (direction) x+= 10;
    else x-= 10;
    if (x + 50 >= G.width) direction = false;
    if (x <= 0) direction = true;
    G.ctx.textBaseline = 'top';
    G.ctx.font = 'sans-serif 16px';
    G.ctx.fillText("FPS: " + G.frame.fps().toFixed(0), 10, 10);
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
});