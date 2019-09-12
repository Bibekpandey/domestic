const randRange = (max, min = 0) => parseInt(min + Math.random() * max, 10);
const randRangeFloat = (max, min = 0) => min + Math.random() * max;


function ColorLuminance(hex, lum) {
    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i*2,2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00"+c).substr(c.length);
    }

    return rgb;
}

const HIGHLIGHT_COLOR = getComputedStyle(document.body).getPropertyValue('--highlight-color');
const TEXT_COLOR = getComputedStyle(document.body).getPropertyValue('--text-color');
const LIGHTER_HIGHLIGHT = ColorLuminance(HIGHLIGHT_COLOR, -0.4);


class Circle {
    constructor({
        center,
        color = LIGHTER_HIGHLIGHT,
        radius = 20,
        velocity = { x: 0, y: 0 },
        acceleration = { x: 0, y: 0 },
    }) {
        this.props = {
            center,
            color,
            radius,
            velocity,
            acceleration,
        };

        // default update: Do nothing, just return the same props
        this.update = this.update.bind(this);
        this.render = this.render.bind(this);
    }

    update() {
        const { center, velocity, acceleration } = this.props;
        const newCenter = { x: center.x + velocity.x, y: center.y + velocity.y };
        const newVelocity = { x: velocity.x + acceleration.x, y: velocity.y + acceleration.y };
        this.props.center = newCenter;
        this.props.velocity = newVelocity;
    }

    render(ctx) {
        const { center, radius, color } = this.props;
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
    }

    static randomCircle(ctx) {
        const radius = randRange(15);
        const center = { x: randRange(ctx.canvas.width), y: ctx.canvas.height };
        const speed = randRange(7, 2);
        const angle = randRangeFloat(7 * Math.PI/4, 5*Math.PI/4);
        const velocity = { x: speed * Math.cos(angle), y: -Math.abs(speed * Math.sin(angle)) };
        return new Circle({
            center,
            radius,
            velocity,
        });
    }
}
