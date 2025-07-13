let currentOutputColor = '#f97316'; // default (orange)
const targetText = "I build intelligent systems[BR]that turn data into impact.";

  const outputColors = [
    '#0f766e', // Deep teal — rich and professional
    '#10b981', // Emerald green — clean and fresh
    '#6366f1', // Indigo — deep, calm, techy
    '#e11d48', // Crimson — bold, stands out
    '#3b82f6'  // soft blue
  ];
    


document.addEventListener("DOMContentLoaded", function () {
    const fonts = [
      "'Bangers', cursive",
      "'Freckle Face', cursive",
      "'Luckiest Guy', cursive",
      "'Comic Neue', cursive",
      "'Caveat Brush', cursive"
    ];

    function applyRandomFont() {
      const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
      document.querySelector('#typed-hero').style.fontFamily = randomFont;
    }

    new Typed("#typed-hero", {
      strings: [
        "Hi, I'm <span class='highlight'>Yashraj</span><br><span class='subtitle'>Data Scientist&nbsp;|&nbsp;ML Engineer&nbsp;|&nbsp;Python &amp; Azure Enthusiast</span>"
      ],
      typeSpeed: 45,
      backSpeed: 0,
      backDelay: 2000,
      loop: true,
      showCursor: false,
      smartBackspace: false,
      preStringTyped: applyRandomFont
    });
  });

  function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('show');
  }
  const canvas = document.getElementById('nnCanvas');
  const ctx = canvas.getContext('2d');
  
  const layers = [3, 5, 5, 5, 1];
  const neuronRadius = 10;
  const neuronSpacingX = canvas.width / (layers.length + 1);
  const connections = [];
  const neurons = [];
  
  for (let i = 0; i < layers.length; i++) {
    const layer = [];
    const count = layers[i];
    const layerHeight = count * 40;
    const yOffset = (canvas.height - layerHeight) / 2;
    for (let j = 0; j < count; j++) {
      layer.push({
        x: (i + 1) * neuronSpacingX,
        y: yOffset + j * 40 + neuronRadius,
        active: false
      });
    }
    neurons.push(layer);
  }
  
  // Build connections
  neurons.forEach((layer, i) => {
    if (i < neurons.length - 1) {
      layer.forEach(from => {
        neurons[i + 1].forEach(to => {
          connections.push({ from, to, active: false });
        });
      });
    }
  });
  
  // Draw functions
  function drawNeurons() {
    neurons.forEach((layer, layerIndex) => {
      layer.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, neuronRadius, 0, Math.PI * 2);
  
        // Default
        let fill = '#4A4B4C';
  
        // Input layer
        if (layerIndex === 0) {
          const hasActiveOut = connections.some(conn => conn.from === n && conn.active);
          fill = hasActiveOut ? '#38bdf8' : '#4A4B4C';
        }
  
        // Output layer
        else if (layerIndex === neurons.length - 1) {
          const hasActiveIn = connections.some(conn => conn.to === n && conn.active);
          fill = hasActiveIn ? currentOutputColor : '#4A4B4C';
        }
  
        // Hidden layers
        else {
          fill = n.active ? '#C8C9CA' : '#4A4B4C';
        }
  
        ctx.fillStyle = fill;
        ctx.fill();
      });
    });
  }
  
  
  
  function drawConnections() {
    connections.forEach(conn => {
      ctx.beginPath();
      ctx.moveTo(conn.from.x, conn.from.y);
      ctx.lineTo(conn.to.x, conn.to.y);
      ctx.strokeStyle = conn.active ? '#C8C9CA' : '#64748b';
      ctx.lineWidth = conn.active ? 2 : 1;
      ctx.stroke();
    });
  }
  
  function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawConnections();
    drawNeurons();
  }
  
  function animateFlow(index = 0, prevActive = new Set(neurons[0])) {
    // Reset everything
    connections.forEach(c => c.active = false);
    neurons.forEach(layer => layer.forEach(n => n.active = false));
  
    // Stop if we're past the last layer
    if (index >= layers.length - 1) {
      drawFrame();
      return;
    }
  
    const current = neurons[index];
    const next = neurons[index + 1];
    const activeNext = new Set();
  
    // Special case: last layer (to output)
    if (index === layers.length - 2) {
        const outputNeuron = next[0];
        outputNeuron.active = true;
        activeNext.add(outputNeuron);
        
        // 🎨 Pick a random color for this cycle
        currentOutputColor = outputColors[Math.floor(Math.random() * outputColors.length)];
        
  
      // Select 50–80% of currently active neurons to connect to output
      const prevActiveArray = Array.from(prevActive);
      const numToUse = Math.max(1, Math.floor(prevActiveArray.length * 0.6));
  
      for (let i = 0; i < numToUse; i++) {
        const fromNeuron = prevActiveArray[Math.floor(Math.random() * prevActiveArray.length)];
        fromNeuron.active = true;
  
        connections.forEach(conn => {
          if (conn.from === fromNeuron && conn.to === outputNeuron) {
            conn.active = true;
          }
        });
      }
  
      drawFrame();
      return;
    }
  
    // For hidden layers: randomly select active neurons in next layer
    const numActiveNext = Math.floor(next.length * (0.5 + Math.random() * 0.3));
    while (activeNext.size < numActiveNext) {
      const randIndex = Math.floor(Math.random() * next.length);
      activeNext.add(next[randIndex]);
    }
  
    // Mark active neurons
    prevActive.forEach(n => n.active = true);
    activeNext.forEach(n => n.active = true);
  
    // Activate connections from prevActive -> activeNext
    connections.forEach(conn => {
      if (prevActive.has(conn.from) && activeNext.has(conn.to)) {
        conn.active = true;
      }
    });
  
    drawFrame();
  
    setTimeout(() => animateFlow(index + 1, activeNext), 700);
  }
  
  // Initial draw
  drawFrame();
  setInterval(() => animateFlow(0, new Set(neurons[0])), 3000);
  
  function runRippleEffect() {
    const autoTextDiv = document.querySelector(".auto-animated-text");
    autoTextDiv.innerHTML = "";
  
    const isMobile = window.innerWidth < 768;
  
    const lines = isMobile
      ? ["I build intelligent systems", "that turn data into impact."]
      : ["I build intelligent systems that turn data into impact."];
  
    let totalChars = 0;
  
    lines.forEach((line, index) => {
      const lineSpan = document.createElement("div");
      lineSpan.style.display = "block";
      lineSpan.style.textAlign = "center";
  
      [...line].forEach((char, i) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.animationDelay = `${totalChars * 0.08}s`;
        lineSpan.appendChild(span);
        totalChars++;
      });
  
      autoTextDiv.appendChild(lineSpan);
    });
  
    const totalDuration = totalChars * 0.08 + 0.6;
    setTimeout(runRippleEffect, totalDuration * 1000);
  }
  
  
  // Run once after DOM load
  document.addEventListener("DOMContentLoaded", () => {
    runRippleEffect();
  });
  
