// Play Music
function playMusic() {
    const music = document.getElementById("bg-music");
    if (music.paused) {
        music.play();
        createBurstParticles();
    }
}

// Snow Effect
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

const snowflakes = [];
const maxSnowflakes = 150;

class Snowflake {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -100;
        this.radius = Math.random() * 3 + 1;
        this.speed = Math.random() * 2 + 0.5;
        this.wind = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.5;
        this.swing = Math.random() * 2;
        this.swingSpeed = Math.random() * 0.02;
        this.swingOffset = Math.random() * Math.PI * 2;
    }

    update() {
        this.y += this.speed;
        this.x += this.wind + Math.sin(this.y * this.swingSpeed + this.swingOffset) * this.swing;

        if (this.y > canvas.height + 10) {
            this.reset();
            this.y = -10;
        }

        if (this.x > canvas.width + 10) {
            this.x = -10;
        } else if (this.x < -10) {
            this.x = canvas.width + 10;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(0, 0%, 100%, ${this.opacity})`;
        ctx.fill();

        // Add glow effect
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(200, 100%, 90%, ${this.opacity * 0.2})`;
        ctx.fill();
    }
}

// Initialize snowflakes
for (let i = 0; i < maxSnowflakes; i++) {
    const flake = new Snowflake();
    flake.y = Math.random() * canvas.height;
    snowflakes.push(flake);
}

function animateSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    snowflakes.forEach(flake => {
        flake.update();
        flake.draw();
    });

    requestAnimationFrame(animateSnow);
}

animateSnow();

// 3D Card Tilt Effect
const card = document.getElementById("card");

card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0)";
});

// Touch support for mobile
card.addEventListener("touchmove", (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = card.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

card.addEventListener("touchend", () => {
    card.style.transform = "rotateX(0) rotateY(0)";
});

// Floating Particles
const particlesContainer = document.getElementById("particles");

function createParticles() {
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.animationDelay = Math.random() * 10 + "s";
        particle.style.animationDuration = (Math.random() * 10 + 10) + "s";
        
        // Random colors
        const colors = [
            "hsl(45, 100%, 70%)",
            "hsl(0, 70%, 60%)",
            "hsl(120, 60%, 50%)",
            "hsl(200, 80%, 60%)"
        ];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.boxShadow = `0 0 10px ${particle.style.background}`;
        
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// Burst particles on button click
function createBurstParticles() {
    const colors = ["🌟", "✨", "⭐", "❄️", "🎄", "🎁"];
    
    for (let i = 0; i < 20; i++) {
        const burst = document.createElement("div");
        burst.textContent = colors[Math.floor(Math.random() * colors.length)];
        burst.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            font-size: ${Math.random() * 20 + 15}px;
            pointer-events: none;
            z-index: 100;
            animation: burst 1.5s ease-out forwards;
        `;
        
        const angle = (Math.PI * 2 * i) / 20;
        const distance = Math.random() * 200 + 100;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        burst.style.setProperty("--tx", tx + "px");
        burst.style.setProperty("--ty", ty + "px");
        
        document.body.appendChild(burst);
        
        setTimeout(() => burst.remove(), 1500);
    }
}

// Add burst animation
const burstStyle = document.createElement("style");
burstStyle.textContent = `
    @keyframes burst {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(burstStyle);

// Resize handler
window.addEventListener("resize", resizeCanvas);
