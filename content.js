/*  
-----------------------------------------------------------------------------------------------------------------------
    YTSAP - YouTube Shorts Auto-Play
-----------------------------------------------------------------------------------------------------------------------
    This Chrome extension adds a floating navigation bar with an autoplay toggle, allowing users to automatically 
    play the next video short. It removes 'loop' attributes from videos and ensures overlays don't block interactions, 
    while monitoring video changes to maintain functionality.
-----------------------------------------------------------------------------------------------------------------------
    Author: https://github.com/Mopra
    This extension is completely free and open source. Feel free to contribute to the project!
-----------------------------------------------------------------------------------------------------------------------
    Ideas for future updates:
    - Auto Liked Videos
-----------------------------------------------------------------------------------------------------------------------
*/

// Function to navigate to the next video short 
function goToNextShort() {
    // Select the "Next video" button using its aria-label
    const nextButton = document.querySelector('div#navigation-button-down button[aria-label="Next video"]');
    if (nextButton) {
        // Click the button if it exists
        nextButton.click();
        console.log('YTSAP | Clicked next button');
    } else {
        // Log a message if the button is not found
        console.log('YTSAP | Next button not found');
    }
}

// Add a floating navigation bar with a toggle button
const navBar = document.createElement('div');
navBar.className = 'floating-nav-bar';
navBar.innerHTML = `
    <label for="autoplayToggle" class="autoplay-label">Autoplay</label>
    <label class="switch">
        <input type="checkbox" id="autoplayToggle" checked>
        <span class="slider round"></span>
    </label>
`;

// Append the navBar to the body or a suitable parent element
document.body.appendChild(navBar);

// Ensure overlay elements do not capture pointer events
const overlayElements = document.querySelectorAll('.overlay-class'); // Replace with actual class
overlayElements.forEach(element => {
    element.style.pointerEvents = 'none';
});

// Load autoplay state from local storage
let autoplayNext = localStorage.getItem('autoplayNext') === 'true';

// Function to toggle autoplay
function toggleAutoplay() {
    autoplayNext = !autoplayNext;
    // Save the current state to local storage
    localStorage.setItem('autoplayNext', autoplayNext);
    console.log(`YTSAP | Autoplay Next is now ${autoplayNext ? 'ON' : 'OFF'}`);
}

// Set the initial state of the toggle button based on local storage
document.getElementById('autoplayToggle').checked = autoplayNext;

// Add event listener to the toggle button
document.getElementById('autoplayToggle').addEventListener('change', toggleAutoplay);

// Modify the onVideoEnded function to respect the autoplay setting
function onVideoEnded() {
    console.log('YTSAP | Video ended');
    if (autoplayNext) {
        // Automatically go to the next short when the video ends
        goToNextShort();
    } else {
        console.log('YTSAP | Autoplay is off');
    }
}

// Function to set up a listener for the video player
function setupVideoListener() {
    // Select the video player element
    const videoPlayer = document.querySelector('video.video-stream.html5-main-video');
    if (videoPlayer) {
        console.log('YTSAP | New video player found');
        // Remove the 'loop' attribute if it exists
        if (videoPlayer.hasAttribute('loop')) {
            videoPlayer.removeAttribute('loop');
            console.log('YTSAP | Loop attribute removed');
        }

        // Create a MutationObserver to monitor changes to the 'loop' attribute
        const attrObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'loop') {
                    videoPlayer.removeAttribute('loop');
                    console.log('YTSAP | Loop attribute removed via observer');
                }
            });
        });
        // Observe attribute changes on the video player
        attrObserver.observe(videoPlayer, { attributes: true });

        // Remove any existing 'ended' event listener and add a new one
        videoPlayer.removeEventListener('ended', onVideoEnded);
        videoPlayer.addEventListener('ended', onVideoEnded);
        console.log('YTSAP | Video listener set up');
    } else {
        // Log a message if the video player is not found
        console.log('YTSAP | Video player not found');
    }
}

// Set up the video listener when the window loads
window.addEventListener('load', setupVideoListener);

// Variable to store the last video source URL
let lastVideoSrc = '';
// Create a MutationObserver to detect changes in the DOM
const observer = new MutationObserver(() => {
    // Select the video player element
    const videoPlayer = document.querySelector('video.video-stream.html5-main-video');
    // Check if the video source has changed
    if (videoPlayer && videoPlayer.currentSrc !== lastVideoSrc) {
        lastVideoSrc = videoPlayer.currentSrc;
        console.log('YTSAP | Detected new video source:');
        // Re-setup the video listener for the new video
        setupVideoListener();
    }
});
// Observe changes in the DOM subtree
observer.observe(document.body, { childList: true, subtree: true });
