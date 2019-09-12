const MAX_ELEMENTS = 250;
const TICK_FACTOR = 3;

class Animation {
    constructor(canvas, elements, fps) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        var style = getComputedStyle(document.body);
        this.clearColor = style.getPropertyValue('--primary-bg-color');
        this.fps = fps;
        this.width = canvas.width;
        this.height = canvas.height;
        this.elements = elements;
        this.tick = 0;
        this.timeout = null;

        this.update = this.update.bind(this);
        this.render = this.render.bind(this);
        this.run = this.run.bind(this);
    }

    update() {
        this.elements = this.elements.filter((elem) => {
            const { x, y } = elem.props.center;
            return y + elem.props.radius > 0
                && x + elem.props.radius > 0
                && x - elem.props.radius < this.width;
        });
        const diff = MAX_ELEMENTS - this.elements.length;

        for (let i = 0; i < diff; i += 1) {
            this.elements.push(Circle.randomCircle(this.ctx));
        }
        this.elements.forEach(elem => elem.update());
    }

    render() {
        this.elements.map(elem => elem.render(this.ctx));
    }

    run() {
        if (this.tick % TICK_FACTOR === 0) {
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.update();
            this.render();
        }
        this.tick += 1;
        this.timeout = setTimeout(this.run, 1000 / this.fps);
    }
}
