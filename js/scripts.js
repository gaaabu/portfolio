//NAVBAR ACTIVE LINK
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

window.addEventListener('scroll', ()=> {
    let current = 'home';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;

        if(window.scrollY >= (sectionTop - 250)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if(current && link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});


//RUN BUTTON AND OUTPUT ANIMATION
const runButton = document.getElementById('runButton');
const outputText = document.getElementById('output-text');

if(runButton && outputText) {
    let outputInterval;
let outputNumbers = [];
let currentNum = 1;

const runButton = document.getElementById('runButton');
const outputText = document.getElementById('output-text');

runButton.addEventListener('click', function() {
    if (outputInterval) {
        clearInterval(outputInterval);
    }
    
    outputNumbers = [];
    currentNum = 1;
    outputText.textContent = '';

    runButton.disabled = true;
    
    outputInterval = setInterval(() => {
        if (currentNum <= 6) {
            outputNumbers.push(currentNum);
            outputText.textContent = outputNumbers.join(' ');
            currentNum++;
        } else {
            clearInterval(outputInterval);
            setTimeout(() => {
                outputNumbers = [];
                currentNum = 1;
                outputText.textContent = '';
                runButton.disabled = false;
            }, 1000);
        }
    }, 1000);
});
}



//PROJECTS SLIDER
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");


if(next && prev) {
    next.addEventListener("click", function() {
        let items = document.querySelectorAll(".projects-item");
        document.querySelector(".projects-slide").appendChild(items[0]);
    })

    prev.addEventListener("click", function() {
        let items = document.querySelectorAll(".projects-item");
        document.querySelector(".projects-slide").prepend(items[items.length - 1]);
    })
    
}



//SHAKE AND SPAWN EFFECT
const shakeContainer = document.querySelector('.shake-container');

if (shakeContainer) {
    shakeContainer.addEventListener('mouseenter', () => {
        shakeContainer.classList.add('hover');
    });

    shakeContainer.addEventListener('mouseleave', () => {
        setTimeout(() => {
            shakeContainer.classList.remove('hover');
        }, 100);
    });
}

function toggleMenu() {
    const menu = document.getElementById('actionMenu');
    menu.classList.toggle('active');
}

//BADGE CONTAINER TERMINAL
document.addEventListener("DOMContentLoaded", () => {
    const terminalTl = gsap.timeline({ repeat: -1, repeatDelay: 3});

    gsap.set(".badge-tag", { opacity: 0, scale: 0.9});

    terminalTl.to(".badge-tag", {
        opacity: 1,
        scale: 1,
        duration: 0.1,
        stagger: { amount: 0.5, from: "random"},
        ease: "power1.inOut"
    })
    .to(".badge-tag", {
        backgroundColor: "#C778DD",
        color: "#282C33",
        duration: 0.1,
        clearProps: "backgroundColor,color",
        stagger: 0.1
    }, "<0.5");
});


//LIQUID BTN 
document.querySelectorAll('.liquid-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function(e) {
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        let span = this.querySelector('span');
        span.style.left = x + 'px';
        span.style.top = y + 'px';
    });

    btn.addEventListener('mouseout', function(e) {
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        let span = this.querySelector('span');
        span.style.left = x + 'px';
        span.style.top = y + 'px';
    });
});

//IMAGE HOVER + GLOW
const cards = document.querySelectorAll('.tilt-card');

cards.forEach(card => {
    const glare = card.querySelector('.glare');

if (glare) {
    card.addEventListener('mousemove', (e) => {
        card.style.transition = 'none';
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width /2;
        const centerY = rect.height /2;

        const rotateX = ((y - centerY)/ centerY) *-10;
        const rotateY = ((x - centerX)/ centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

        const glareX = ((x / rect.width) * 100);
        const glareY = ((y / rect.height) * 100);

        glare.style.transform = `translate(${glareX - 50}%, ${glareY - 50}%) rotate(45deg) scale(4)`;
        glare.style.opacity = '1';
});

}

card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform 0.5s ease';
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    card.style.transition = 'transform 0.5s ease';
    glare.style.opacity = '0';

    setTimeout(() => {
        card.style.transition = '';
    }, 500);
});
});

// AUDIO WAVEFORM ANIMATION
const canvas = document.getElementById('audio-canvas');
if(canvas) {
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    function resizeCanvas() {
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = (rect.width - 42) * dpr;
        canvas.height = 60 * dpr;
        ctx.scale(dpr, dpr);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let bars = [];
    const barCount = 45;
    for(let i=0; i<barCount; i++) {
        bars.push({ h: Math.random() * 20, speed: 0.1 + Math.random() * 0.4});
    }

    function animateWave() {
        const width = canvas.width / dpr;
        const height = canvas.height / dpr;
        const barWidth = (width / barCount) - 2;

        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#C778DD';

        bars.forEach((bar, i)=> {
            bar.h = 10 + Math.sin(Date.now() * 0.008 * bar.speed + i) * 15;
            if(bar.h < 3) bar.h = 3;
            const x = i * (barWidth + 2);
            const y = (height - bar.h) / 2;
            ctx.beginPath();
            ctx.roundRect(x, y, barWidth, bar.h, 4);
            ctx.fill();
        });
        requestAnimationFrame(animateWave);
    }
    animateWave();
}

const textContainer = document.getElementById('typewriter-text');
if(textContainer) {
    const scenario = {
        wrong: "Dumating na ang mga kama ganak namin.",
        right: "Dumating na ang mga kamag-anak namin.",
        errorIndexStart: 21,
        errorIndexEnd: 31
    };

    let step = 0;
    let charIndex = 0;
    let currentHTML = "";

    function typeLoop() {
        if (step === 0) {
            if (charIndex < scenario.wrong.length) {
                currentHTML += scenario.wrong.charAt(charIndex);
                textContainer.textContent = currentHTML;
                charIndex++;
                setTimeout(typeLoop, 50);
            } else {
                step = 1;
                setTimeout(typeLoop, 1500);
            }
        }
        else if (step === 1) {
            if (charIndex > scenario.errorIndexStart) {
                currentHTML = currentHTML.slice(0, -1);
                textContainer.textContent = currentHTML;
                charIndex--;
                setTimeout(typeLoop, 30);
            } else {
                step = 2;
                setTimeout(typeLoop, 400);
            }
        }
        else if (step === 2) { //correction func dito
            const targetLen = scenario.right.length;
            const charsTyped = currentHTML.length - scenario.errorIndexStart;

            if(currentHTML.length < targetLen) {
                const nextChar = scenario.right.charAt(scenario.errorIndexStart + charsTyped);
                currentHTML += nextChar;

                const prefix = scenario.right.substring(0, scenario.errorIndexStart);
                const suffix = currentHTML.substring(scenario.errorIndexStart);

                textContainer.innerHTML = prefix + '<span style="color:#98C379">' + suffix + '</span>';
                setTimeout(typeLoop, 80);
            } else {
                step = 3;
                setTimeout(() => {
                    step = 0;
                    charIndex = 0;
                    currentHTML = "";
                    textContainer.textContent = "";
                    typeLoop();
                }, 4000);
            }
        }
    }
    setTimeout(typeLoop, 1000);
}