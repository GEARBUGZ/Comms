// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Add a little console message for "old web" vibe
console.log("%c [BEEP BOOP] PRIZMBOT SYSTEM INITIALIZED ", "background: #ff007f; color: #000; font-weight: bold;");

// Simple fade-in effect for sections on scroll
const sections = document.querySelectorAll('section');
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// Y2K Sparkle Effect

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    
    // Add some randomness to position
    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20;
    
    sparkle.style.left = `${x + offsetX}px`;
    sparkle.style.top = `${y + offsetY}px`;
    
    // Random size
    const size = Math.random() * 5 + 2;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    
    document.body.appendChild(sparkle);
    
    // Remove from DOM after animation
    setTimeout(() => {
        sparkle.remove();
    }, 800);
}

// Random background sparkles
setInterval(() => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    createSparkle(x, y);
}, 300);

// Modal Logic
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const modalType = document.getElementById("modalType");
const modalDescription = document.getElementById("modalDescription");
const modalPrice = document.getElementById("modalPrice");
const closeBtn = document.querySelector(".close-modal");

const pricingInfo = {
    "Headshot/Bustshot": {
        description: `
            <p>Can be made in an icon style.</p>
            <p>You can pick the size of the canvas.</p>
        `,
        base: "€25",
        shading: "+€5",
        additional: "+25%"
    },
    "Halfbody": {
        description: `<p>A drawing of your character from the head to the waist/hips. Shows about 60% of your character.</p>`,
        base: "€35",
        shading: "+€5",
        additional: "+50%"
    },
    "Fullbody": {
        description: `<p>A drawing of your character, usually more than 70% of the body showing.</p>`,
        base: "€45",
        shading: "+€5",
        additional: "+50%"
    },
    "Ref Sheet / Custom": {
        description: `
            <ul style="padding-left: 20px; list-style-type: square; margin-bottom: 5px; line-height: 1.3;">
                <li style="margin-bottom: 3px;">Price changes depending on the complexity.</li>
                <li style="margin-bottom: 3px;">Designs are made based on concepts, clear ideas or aesthetics requested by the client.</li>
                <li style="margin-bottom: 3px;">No shading included, I do not shade references.</li>
                <li style="margin-bottom: 3px;">Color palette, flags, simple text, clothing on a singular piece etc. can be added without any additional cost.</li>
                <li style="margin-bottom: 3px;">Back/side views and clothing refs cost extra, the cost is also dependent on the complexity. Overall price is decreased by 25% if the client wants their ref sheet made with symmetry tool.</li>
                <li>Contact me for more details or if you have any questions.</li>
            </ul>
        `,
        base: "€60+",
        shading: "N/A",
        additional: "Varies"
    }
};

document.querySelectorAll('.art-card').forEach(card => {
    card.addEventListener('click', () => {
        const type = card.getAttribute('data-type');
        const imgSrc = card.querySelector('img').src;
        const info = pricingInfo[type] || { description: "<p>Price upon request.</p>", base: "TBD", shading: "TBD", additional: "TBD" };

        modalImg.src = imgSrc;
        modalType.innerText = type;
        modalDescription.innerHTML = info.description;
        
        // Update Price Boxes
        document.querySelector('#modalPrice .price-value').innerText = info.base;
        document.querySelector('#modalShading .price-value').innerText = info.shading;
        document.querySelector('#modalAdditional .price-value').innerText = info.additional;

        modal.style.display = "flex";
        document.body.style.overflow = "hidden"; // Prevent scroll
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
});

// Easter Egg Logic
let keyBuffer = '';
const maxLen = 10; // Max length of our secret words

document.addEventListener('keydown', (e) => {
    // Only track single characters to avoid modifier keys messing it up
    if (e.key.length === 1) {
        keyBuffer += e.key.toLowerCase();
        
        if (keyBuffer.length > maxLen) {
            keyBuffer = keyBuffer.slice(-maxLen);
        }
        
        if (keyBuffer.endsWith('ultra')) {
            triggerEasterEgg('couch.png');
            keyBuffer = ''; // Reset buffer
        } else if (keyBuffer.endsWith('chud')) {
            triggerEasterEgg('fat.png');
            keyBuffer = '';
        } else if (keyBuffer.endsWith('kyominion')) {
            triggerEasterEgg('tch.PNG');
            keyBuffer = '';
        }
    }
});

function triggerEasterEgg(imgSrc) {
    const img = document.createElement('img');
    img.src = imgSrc;
    img.style.position = 'fixed';
    img.style.top = '0';
    img.style.left = '0';
    img.style.width = '100vw';
    img.style.height = '100vh';
    img.style.objectFit = 'fill';
    img.style.zIndex = '999999';
    img.style.pointerEvents = 'none';
    
    const audio = new Audio('vine-boom.mp3');
    
    document.body.appendChild(img);
    audio.play();
    
    setTimeout(() => {
        if (img.parentNode) {
            img.remove();
        }
    }, 2000); // 2.0 seconds
}

