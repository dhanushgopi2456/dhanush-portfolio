/* ============================================
   Particle Animation - Canvas Background
   ============================================ */

class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particles-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null, radius: 150 };
        this.colors = ['#6c63ff', '#00d4ff', '#a855f7', '#818cf8'];

        this.resize();
        this.init();
        this.animate();

        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        window.addEventListener('mouseout', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.init();
    }

    init() {
        this.particles = [];
        const count = Math.min((this.canvas.width * this.canvas.height) / 12000, 120);
        for (let i = 0; i < count; i++) {
            this.particles.push(new Particle(this));
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update();
            this.particles[i].draw();

            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(108, 99, 255, ${0.15 * (1 - dist / 120)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}

class Particle {
    constructor(system) {
        this.system = system;
        this.x = Math.random() * system.canvas.width;
        this.y = Math.random() * system.canvas.height;
        this.size = Math.random() * 2.5 + 0.5;
        this.baseSize = this.size;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.color = system.colors[Math.floor(Math.random() * system.colors.length)];
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x > this.system.canvas.width) this.x = 0;
        if (this.x < 0) this.x = this.system.canvas.width;
        if (this.y > this.system.canvas.height) this.y = 0;
        if (this.y < 0) this.y = this.system.canvas.height;

        // Mouse interaction
        if (this.system.mouse.x !== null) {
            const dx = this.x - this.system.mouse.x;
            const dy = this.y - this.system.mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < this.system.mouse.radius) {
                const force = (this.system.mouse.radius - dist) / this.system.mouse.radius;
                this.x += (dx / dist) * force * 2;
                this.y += (dy / dist) * force * 2;
                this.size = this.baseSize + force * 3;
            } else {
                this.size = this.baseSize;
            }
        }
    }

    draw() {
        this.system.ctx.beginPath();
        this.system.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.system.ctx.fillStyle = this.color;
        this.system.ctx.globalAlpha = this.opacity;
        this.system.ctx.fill();
        this.system.ctx.globalAlpha = 1;
    }
}

// Initialize particles
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
});
