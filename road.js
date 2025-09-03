class Road {
    constructor(x, width, lane = 3) {
        this.x = x;
        this.width = width;
        this.lane = lane;

        this.left = x - width / 2;
        this.right = x + width / 2;

        // use large finite value instead of infinity
        const limit = 5000; 
        this.top = -limit;
        this.bottom = limit;

        // road border
        const topLeft = { x: this.left, y: this.top };
        const topRight = { x: this.right, y: this.top };
        const bottomLeft = { x: this.left, y: this.bottom };
        const bottomRight = { x: this.right, y: this.bottom };

        this.borders = [
            [topLeft, bottomLeft],
            [topRight, bottomRight]
        ];
    }

    // function to always keep the car in center
    getLanecenter(laneIndex) {
        const laneWidth = this.width / this.lane;
        return this.left + laneWidth / 2 + Math.min(laneIndex, this.lane - 1) * laneWidth;
    }

    draw(ctx) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";

        for (let i = 1; i <= this.lane - 1; i++) {
            const x = lerp(this.left, this.right, i / this.lane);

            ctx.setLineDash([20, 20]);
            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }

        ctx.setLineDash([]);
        this.borders.forEach(border => {
            ctx.beginPath();
            ctx.moveTo(border[0].x, border[0].y);
            ctx.lineTo(border[1].x, border[1].y);
            ctx.stroke();
        });
    }
}
