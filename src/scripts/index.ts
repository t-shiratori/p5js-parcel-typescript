import * as dat from 'dat.gui';
import p5 from 'p5';
import { _p5 } from './p5';
import Stuff from './stuff';

let canvasW: number = window.innerWidth;
let canvasH: number = window.innerHeight;
const bgColor = '#38c0c0';

/* dat gui 
-------------------------------------------- */
class GuiControls {
	bgColor: string;
	constructor() {
		this.bgColor = bgColor;
	}
}
const guiControls: GuiControls = new GuiControls();

/* world 
-------------------------------------------- */
const world = () => {
	let stuffRadius = 20;
	let stuff: Stuff;
	let backgroundColor: p5.Color = _p5.color(bgColor);

	/* set up 
  	-------------------------------------------- */
	_p5.setup = () => {
		// setting canvas
		_p5.createCanvas(canvasW, canvasH);
		_p5.background(backgroundColor);

		// setting stuff
		const pos = _p5.createVector(
			_p5.random(stuffRadius, canvasW - stuffRadius),
			_p5.random(stuffRadius, canvasH - stuffRadius)
		);
		stuff = new Stuff(pos, stuffRadius);

		// setting GUI
		const gui: dat.GUI = new dat.GUI();
		gui.addColor(guiControls, 'bgColor').onChange((color: string) => {
			backgroundColor = _p5.color(`${color}`);
		});
	};

	/* draw
  	-------------------------------------------- */
	_p5.draw = () => {
		_p5.clear();
		_p5.background(backgroundColor);
		stuff.randomWalk();
		stuff.border(canvasW, canvasH);
		stuff.update();
		stuff.show();
	};

	window.addEventListener('resize', () => {
		canvasW = window.innerWidth;
		canvasH = window.innerHeight;
		_p5.resizeCanvas(canvasW, canvasH);
	});
};

world();
