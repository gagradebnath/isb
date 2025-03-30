const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.getElementById('network-bg').appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const nodes = [];
const maxNodes = 100;

class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = Math.random() * 2 - 1;
        this.vy = Math.random() * 2 - 1;
        this.radius = 2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius*1.2, 0, Math.PI * 2);
        ctx.fillStyle = '#00ffcc';
        ctx.fill();
    }
}

function connectNodes() {
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.strokeStyle = 'rgba(182, 175, 159, 0.26)';
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    nodes.forEach(node => {
        node.update();
        node.draw();
    });

    connectNodes();
    requestAnimationFrame(animate);
}

function init() {
    for (let i = 0; i < maxNodes; i++) {
        nodes.push(new Node(Math.random() * canvas.width, Math.random() * canvas.height));
    }
    animate();
}

// window.addEventListener('resize', () => {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
// });

// ...existing code...

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    nodes.length = 0; // Clear existing nodes
    for (let i = 0; i < maxNodes; i++) {
        nodes.push(new Node(Math.random() * canvas.width, Math.random() * canvas.height));
    }
});

// ...existing code...

init();