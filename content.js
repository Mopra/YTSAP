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

// Callback function to handle the end of a video
function onVideoEnded() {
    console.log('YTSAP | Video ended');
    // Automatically go to the next short when the video ends
    goToNextShort();
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
