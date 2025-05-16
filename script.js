document.addEventListener('DOMContentLoaded', function() {
    // Create festive elements first
    createFestiveElements();
    
    // Create a hidden video element to preload your video
    const preloadVideo = document.createElement('video');
    preloadVideo.style.display = 'none';
    preloadVideo.src = 'inauguration.mp4';
    preloadVideo.preload = 'auto';
    preloadVideo.load();
    document.body.appendChild(preloadVideo);
    
    // Wait for gift box animation to complete before starting color changes
    setTimeout(() => {
        startColorChanging();
        startClickPrompts();
    }, 2000); // 2000ms = 2s (matches the animation duration)
});

const giftBox = document.querySelector('.gift-box');
const surpriseMessage = document.createElement('div');
surpriseMessage.classList.add('surprise-message');
surpriseMessage.innerHTML = '🎉 Surprise! 🎉<br>Welcome to the Digital Inauguration!';
document.body.appendChild(surpriseMessage);

const videoContainer = document.querySelector('.video-container');
const video = document.querySelector('.video-animation');
const exitButton = document.querySelector('.exit-button');
const finalWelcome = document.querySelector('.final-welcome');
const celebrationParticles = document.querySelector('.celebration-particles');
const body = document.querySelector('body');

const boxBody = document.querySelector('.box-body');
const boxLid = document.querySelector('.box-lid');
const ribbonVertical = document.querySelector('.ribbon-vertical');
const ribbonHorizontal = document.querySelector('.ribbon-horizontal');
const bowLeft = document.querySelector('.bow-left');
const bowRight = document.querySelector('.bow-right');
const bowKnot = document.querySelector('.bow-knot');

let clickPromptInterval;
let colorChangeInterval;
let isBoxClicked = false;

// Update early in your script.js file
let userInteracted = false; // Track if user has interacted with page

// Function to start changing colors
function startColorChanging() {
    // Initial color change
    changeColors();
    
    // Change colors every second
    colorChangeInterval = setInterval(changeColors, 1000);
}

// Update this function to use more appealing light colors
function getRandomColor() {
    // Use a curated palette of visually pleasing light colors
    const pleasingColors = [
        '#8ecae6', // Light blue
        '#ffb4a2', // Soft peach
        '#a8dadc', // Light teal
        '#e9c46a', // Soft yellow
        '#b5e48c', // Light green
        '#d8bbff', // Light purple
        '#f4a261', // Light orange
        '#ffd6ff', // Light pink
        '#cdb4db', // Soft lavender
        '#90dbf4', // Sky blue
        '#fde2e4', // Light rose
        '#caf0f8'  // Ice blue
    ];
    
    return pleasingColors[Math.floor(Math.random() * pleasingColors.length)];
}

// Update the generateUniqueColors function to ensure box colors are darker than background
function generateUniqueColors(count) {
    // Predefined pleasing color combinations with dark box colors and light backgrounds
    const colorSets = [
        // Background gradient, box, ribbon, bow, text
        ['#f0f7f4', '#e8f1f2', '#aa4465', '#861657', '#294c60'], // Light bg, dark red box
        ['#eef5fc', '#e0f0ea', '#5e6472', '#07004d', '#355070'], // Light bg, dark blue box
        ['#f9f7f3', '#f5f5f5', '#8e7f7f', '#6a0572', '#413c58'], // Light bg, dark purple box
        ['#eff7f6', '#f0ead6', '#7d5a50', '#482c3d', '#3c3744'], // Light bg, dark brown box
        ['#f1faee', '#f8f9fa', '#1d3557', '#457b9d', '#e63946'], // Light bg, dark navy box
        ['#eae4e9', '#fff1e6', '#6d597a', '#355070', '#b56576'], // Light bg, dark lavender box
        ['#fef9ef', '#f7ede2', '#264653', '#2a9d8f', '#e76f51'], // Light bg, dark teal box
        ['#f6f6f6', '#fafaff', '#3a506b', '#1c2541', '#0b132b']  // Light bg, dark slate box
    ];
    
    // Choose one color set randomly from our predefined pleasing combinations
    return colorSets[Math.floor(Math.random() * colorSets.length)];
}

// Update the changeColors function to ensure contrasting colors
function changeColors() {
    if (isBoxClicked) return;
    
    // Get a set of pleasing colors that work well together
    const colors = generateUniqueColors(5);
    
    // Apply to background with gradient - using soft, pleasing gradients
    body.style.background = `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`;
    
    // Apply to box elements with darker, contrasting colors
    boxBody.style.backgroundColor = colors[2];
    boxLid.style.backgroundColor = colors[2]; 
    ribbonVertical.style.backgroundColor = colors[3];
    ribbonHorizontal.style.backgroundColor = colors[3];
    bowLeft.style.backgroundColor = colors[4];
    bowRight.style.backgroundColor = colors[4];
    bowKnot.style.backgroundColor = colors[4];
    
    // Change text colors of prompts
    document.querySelectorAll('.click-prompt').forEach(prompt => {
        prompt.style.color = colors[2]; // Use the box color for text to maintain coordination
        // Enhance text visibility with shadow
        prompt.style.textShadow = `0 0 5px rgba(255, 255, 255, 0.9)`;
    });
}

// Start spawning "Click box" texts
function startClickPrompts() {
    // Create the first prompt
    createClickPrompt();
    
    // Create new prompts every second
    clickPromptInterval = setInterval(createClickPrompt, 1000);
}

// Update createClickPrompt to use more appealing colors
function createClickPrompt() {
    const prompt = document.createElement('div');
    prompt.classList.add('click-prompt');
    prompt.textContent = 'Click on box';
    
    // Random position around the box
    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 200;
    
    // Get box position
    const boxRect = giftBox.getBoundingClientRect();
    const boxCenterX = boxRect.left + boxRect.width / 2;
    const boxCenterY = boxRect.top + boxRect.height / 2;
    
    // Calculate position
    const x = boxCenterX + Math.cos(angle) * distance;
    const y = boxCenterY + Math.sin(angle) * distance;
    
    // Apply styles with a pleasing color
    prompt.style.left = `${x}px`;
    prompt.style.top = `${y}px`;
    prompt.style.transform = 'translate(-50%, -50%)';
    prompt.style.fontSize = `${16 + Math.random() * 10}px`;
    prompt.style.color = getRandomColor(); // Use our new pleasing color function
    prompt.style.fontWeight = 'bold';
    
    document.body.appendChild(prompt);
    
    // Animate in
    setTimeout(() => {
        prompt.style.opacity = '1';
    }, 10);
    
    // Remove after some time
    setTimeout(() => {
        prompt.style.opacity = '0';
        setTimeout(() => prompt.remove(), 500);
    }, 3000 + Math.random() * 2000);
}

// Update gift box click handler
giftBox.addEventListener('click', () => {
    userInteracted = true; // Set flag that user has interacted
    
    // Set flag to stop color changing
    isBoxClicked = true;
    
    // Stop color changing
    clearInterval(colorChangeInterval);
    
    // Stop spawning click prompts
    clearInterval(clickPromptInterval);
    
    // Reset to original colors for the animation
    body.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
    boxBody.style.backgroundColor = '#d61a1f';
    boxLid.style.backgroundColor = '#d61a1f';
    ribbonVertical.style.backgroundColor = '#ffd700';
    ribbonHorizontal.style.backgroundColor = '#ffd700';
    bowLeft.style.backgroundColor = '#d61a1f';
    bowRight.style.backgroundColor = '#d61a1f';
    bowKnot.style.backgroundColor = '#d61a1f';
    
    // Remove all existing prompts
    document.querySelectorAll('.click-prompt').forEach(prompt => {
        prompt.style.opacity = '0';
        setTimeout(() => prompt.remove(), 500);
    });
    
    // Hide festive elements with a fade
    document.querySelectorAll('.festive-lights, .diya, .rangoli, .bell').forEach(element => {
        element.style.opacity = '0';
        setTimeout(() => {
            element.style.display = 'none';
        }, 1000);
    });
    
    // Open the box first
    giftBox.classList.add('open');
    
    // Rest of your existing click handler code...
    setTimeout(() => {
        // Create confetti effect
        createConfetti();
        
        // Hide gift box after animation completes
        setTimeout(() => {
            giftBox.style.display = 'none';
            surpriseMessage.style.opacity = '1';
            
            // Optimize video loading before showing
            prepareVideoForPlayback();
        }, 1000);
    }, 500);
});

// New function to prepare video for optimal playback
function prepareVideoForPlayback() {
    // Apply hardware acceleration
    video.style.transform = 'translateZ(0)';
    
    // Set video attributes for better performance
    video.setAttribute('playsinline', '');
    video.currentTime = 0;
    video.muted = true; // Start muted, can unmute after loaded
    
    // Show video container first
    videoContainer.classList.add('show');
    
    // Listen for the 'canplaythrough' event
    video.addEventListener('canplaythrough', startVideoPlayback, { once: true });
    
    // Timeout in case 'canplaythrough' doesn't fire
    const videoLoadTimeout = setTimeout(() => {
        video.removeEventListener('canplaythrough', startVideoPlayback);
        startVideoPlayback();
    }, 2000);
    
    function startVideoPlayback() {
        clearTimeout(videoLoadTimeout);
        
        // Enter fullscreen and play
        try {
            if (videoContainer.requestFullscreen) {
                videoContainer.requestFullscreen();
            } else if (videoContainer.webkitRequestFullscreen) {
                videoContainer.webkitRequestFullscreen();
            } else if (videoContainer.msRequestFullscreen) {
                videoContainer.msRequestFullscreen();
            }
        } catch (e) {
            console.log("Fullscreen request failed:", e);
        }
        
        // Use a play promise to detect if playback started successfully
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Playback started successfully
                // You can unmute here if needed
                video.muted = false;
                video.playbackRate = 1.0; // Changed to normal speed
            })
            .catch(error => {
                // Auto-play was prevented
                console.log("Video play was prevented:", error);
                // Add a play button or alternative
                const playButton = document.createElement('button');
                playButton.textContent = "Click to Play";
                playButton.className = "play-button";
                videoContainer.appendChild(playButton);
                
                playButton.addEventListener('click', () => {
                    video.muted = false;
                    video.play();
                    video.playbackRate = 1.0; // Changed to normal speed
                    playButton.remove();
                });
            });
        }
    }
}

// Update the video playback rate in the play event listener
video.addEventListener('play', () => {
    video.playbackRate = 1.0; // Changed from 0.5 to 1.0 (normal speed)
});

// Replace or modify the video ended event listener
video.addEventListener('ended', () => {
    // Only proceed if user has clicked the gift box first
    if (!userInteracted) return;
    
    // Auto exit fullscreen when video ends
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    
    // Hide video container
    videoContainer.classList.remove('show');
    
    // Show welcome message
    finalWelcome.classList.add('visible');
    
    // Create celebration particles for welcome message
    createCelebrationParticles();
    
    // Set timeout to show 100years image after 5 seconds
    setTimeout(() => {
        // Hide welcome message
        finalWelcome.classList.remove('visible');
        
        // Show the image container
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('full-image-container');
        
        // Create image element
        const celebrationImage = document.createElement('img');
        celebrationImage.src = '100years.jpg';
        celebrationImage.alt = 'Celebration - 100 Years';
        celebrationImage.classList.add('celebration-image');
        
        // Add image to container
        imageContainer.appendChild(celebrationImage);
        
        // Add container to document
        document.body.appendChild(imageContainer);
        
        // Add fade-in animation
        setTimeout(() => {
            imageContainer.classList.add('visible');
            
            // Check if image is loaded, then handle aspect ratio
            celebrationImage.onload = function() {
                adjustImageDisplay(celebrationImage);
            };
            
            // In case image is already loaded
            if (celebrationImage.complete) {
                adjustImageDisplay(celebrationImage);
            }
        }, 100);
        
    }, 5000); // 5 seconds
});

// Add this new function to adjust the image display
function adjustImageDisplay(img) {
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    const aspectRatio = imgWidth / imgHeight;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const viewportRatio = viewportWidth / viewportHeight;
    
    // If image is taller than the viewport ratio (likely cropping top)
    if (aspectRatio < viewportRatio) {
        img.style.objectFit = 'contain'; // Change to contain instead of cover
        img.style.maxHeight = '95vh'; // Ensure some margin
        
        // If very wide image, we might need to handle differently
        if (aspectRatio < 0.6) {
            img.style.objectFit = 'contain';
            img.style.maxWidth = '90vw';
        }
    } else {
        // For wide images, keep cover but ensure vertical centering
        img.style.objectPosition = 'center center';
    }
}

function createConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Random position, color and size
        const size = Math.random() * 15 + 5;
        const x = Math.random() * window.innerWidth;
        const y = window.innerHeight;
        
        const colors = ['#ff3366', '#ff6b6b', '#ffdd59', '#5affff', '#6b5bff', '#5aff5a'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.left = `${x}px`;
        confetti.style.top = `${y}px`;
        confetti.style.backgroundColor = color;
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.opacity = '1';
        
        document.body.appendChild(confetti);
        
        // Animate the confetti
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 3 + 2;
        const xVelocity = Math.sin(angle) * velocity;
        const yVelocity = Math.cos(angle) * -velocity - 2;
        
        let posX = x;
        let posY = y;
        let rotation = 0;
        
        function animate() {
            posX += xVelocity;
            posY += yVelocity;
            rotation += Math.random() * 10;
            
            confetti.style.transform = `translate(${posX - x}px, ${posY - y}px) rotate(${rotation}deg)`;
            confetti.style.opacity = Math.max(0, 1 - (y - posY) / window.innerHeight);
            
            if (posY > -50) {
                requestAnimationFrame(animate);
            } else {
                confetti.remove();
            }
        }
        
        setTimeout(() => {
            animate();
        }, Math.random() * 1000);
    }
}

function createCelebrationParticles() {
    for (let i = 0; i < 60; i++) {
        const particle = document.createElement('div');
        
        // Random properties
        const size = Math.random() * 15 + 5;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        const colors = ['#FFD700', '#FF6B6B', '#8A2BE2', '#4DE8E8', '#50C878', '#FF69B4'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Apply styles
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.opacity = '0.8';
        particle.style.boxShadow = `0 0 10px ${color}`;
        
        // Add animation
        particle.style.animation = `
            float ${3 + Math.random() * 7}s ease-in-out infinite,
            twinkle ${1 + Math.random() * 2}s ease-in-out infinite alternate
        `;
        
        // Custom keyframes for this element
        const keyframes = `
        @keyframes float_${i} {
            0% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * -100}px) rotate(180deg); }
            100% { transform: translate(0, 0) rotate(360deg); }
        }
        @keyframes twinkle {
            0% { opacity: 0.4; }
            100% { opacity: 1; }
        }`;
        
        // Add keyframes to document
        const style = document.createElement('style');
        style.innerHTML = keyframes;
        document.head.appendChild(style);
        
        particle.style.animation = `float_${i} ${3 + Math.random() * 7}s ease-in-out infinite, twinkle ${1 + Math.random() * 2}s ease-in-out infinite alternate`;
        
        celebrationParticles.appendChild(particle);
    }
}

// Add this after your DOMContentLoaded event
function createFestiveElements() {
    // Add festive background elements
    createFestiveLights();
    createFloatingDiyas();
    createRangoli();
    createBells();
}

// Create string lights along the top of the screen
function createFestiveLights() {
    const lightsContainer = document.createElement('div');
    lightsContainer.className = 'festive-lights';
    document.body.appendChild(lightsContainer);
    
    // Create multiple light bulbs
    for (let i = 0; i < 20; i++) {
        const light = document.createElement('div');
        light.className = 'light-bulb';
        
        // Alternate colors for the lights
        const colors = ['#ff9900', '#ff0000', '#00ff00', '#ffff00', '#ff00ff', '#00ffff'];
        light.style.backgroundColor = colors[i % colors.length];
        
        // Position lights evenly across the top
        light.style.left = `${i * 5}%`;
        
        // Randomize the animation delay for twinkling effect
        light.style.animationDelay = `${Math.random() * 2}s`;
        
        lightsContainer.appendChild(light);
    }
}

// Create floating diyas (oil lamps)
function createFloatingDiyas() {
    for (let i = 0; i < 8; i++) {
        const diya = document.createElement('div');
        diya.className = 'diya';
        
        // Position randomly around the edges
        const side = Math.floor(Math.random() * 4); // 0:top, 1:right, 2:bottom, 3:left
        
        switch(side) {
            case 0: // top
                diya.style.top = '5%';
                diya.style.left = `${10 + Math.random() * 80}%`;
                break;
            case 1: // right
                diya.style.right = '5%';
                diya.style.top = `${10 + Math.random() * 80}%`;
                break;
            case 2: // bottom
                diya.style.bottom = '5%';
                diya.style.left = `${10 + Math.random() * 80}%`;
                break;
            case 3: // left
                diya.style.left = '5%';
                diya.style.top = `${10 + Math.random() * 80}%`;
                break;
        }
        
        // Create the flame
        const flame = document.createElement('div');
        flame.className = 'flame';
        
        diya.appendChild(flame);
        document.body.appendChild(diya);
    }
}

// Create decorative rangoli patterns
function createRangoli() {
    const rangoli = document.createElement('div');
    rangoli.className = 'rangoli';
    
    // Create rangoli patterns
    for (let i = 0; i < 8; i++) {
        const pattern = document.createElement('div');
        pattern.className = 'rangoli-pattern';
        pattern.style.transform = `rotate(${i * 45}deg)`;
        rangoli.appendChild(pattern);
    }
    
    document.body.appendChild(rangoli);
}

// Create decorative bells that sway and ring
function createBells() {
    for (let i = 0; i < 6; i++) {
        const bell = document.createElement('div');
        bell.className = 'bell';
        
        // Position bells at the top corners
        if (i < 3) {
            bell.style.top = '5%';
            bell.style.left = `${15 + i * 10}%`;
        } else {
            bell.style.top = '5%';
            bell.style.right = `${15 + (i-3) * 10}%`;
        }
        
        // Create the bell parts
        const bellTop = document.createElement('div');
        bellTop.className = 'bell-top';
        
        const bellBody = document.createElement('div');
        bellBody.className = 'bell-body';
        
        const bellClapper = document.createElement('div');
        bellClapper.className = 'bell-clapper';
        
        // Assemble the bell
        bellBody.appendChild(bellClapper);
        bell.appendChild(bellTop);
        bell.appendChild(bellBody);
        
        // Add slight random delays to the swinging animation
        bell.style.animationDelay = `${Math.random() * 2}s`;
        
        document.body.appendChild(bell);
    }
}