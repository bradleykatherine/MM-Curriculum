// particleSimulation.js: Adds methane and carbon dioxide particles over the Earth visualization

let methaneParticles = [];
let co2Particles = [];

function setupParticles(methaneConcentration, co2Concentration) {
    const totalConcentration = methaneConcentration + co2Concentration;
    const particleDensityRatio = methaneConcentration / totalConcentration;
    const totalParticles = 1000; // Total number of particles to simulate
    const methaneCount = Math.round(totalParticles * particleDensityRatio);
    const co2Count = totalParticles - methaneCount;

    // Create methane particles
    methaneParticles = [];
    for (let i = 0; i < methaneCount; i++) {
        methaneParticles.push(createParticle('methane'));
    }

    // Create CO2 particles
    co2Particles = [];
    for (let i = 0; i < co2Count; i++) {
        co2Particles.push(createParticle('co2'));
    }
}

function createParticle(type) {
    return {
        x: random(0, width),
        y: random(0, height),
        size: type === 'methane' ? 5 : 8, // Methane particles are smaller
        color: type === 'methane' ? 'rgba(0, 255, 0, 0.7)' : 'rgba(255, 0, 0, 0.7)',
        velocity: {
            x: random(-1, 1),
            y: random(-1, 1),
        },
        type: type,
    };
}

function drawParticles() {
    // Draw and animate methane particles
    methaneParticles.forEach(particle => {
        fill(particle.color);
        noStroke();
        ellipse(particle.x, particle.y, particle.size);

        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;

        wrapAround(particle);
    });

    // Draw and animate CO2 particles
    co2Particles.forEach(particle => {
        fill(particle.color);
        noStroke();
        ellipse(particle.x, particle.y, particle.size);

        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;

        wrapAround(particle);
    });
}

function wrapAround(particle) {
    if (particle.x < 0) particle.x = width;
    if (particle.x > width) particle.x = 0;
    if (particle.y < 0) particle.y = height;
    if (particle.y > height) particle.y = 0;
}

// Export the setup and draw functions to be called in simulation.js
export { setupParticles, drawParticles };
