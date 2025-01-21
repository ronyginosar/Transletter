window.vrotScroll = 100; // Initial value
let vrotScroll_Speed = 5; // ** Scroll speed --> can be adjusted **
let isIncreasing = true; // Track whether we're increasing or decreasing
const epsilonScroll = 1; // Ignore small scroll events
const minVrotScroll = 100;
const maxVrotScroll = 700;

function changevrot(isScrollingDown) {

    // Adjust vrotScroll based on the current direction
    if (isScrollingDown) {
        if (isIncreasing) {
            window.vrotScroll += vrotScroll_Speed;
            if (window.vrotScroll >= maxVrotScroll) {
                window.vrotScroll = maxVrotScroll;
                isIncreasing = false; // Switch direction to decreasing
            }
        } else {
            window.vrotScroll -= vrotScroll_Speed;
            if (window.vrotScroll <= minVrotScroll) {
                window.vrotScroll = minVrotScroll;
                isIncreasing = true; // Switch direction to increasing
            }
        }
    } else {
        // Handle reverse scrolling (flip direction similarly)
        if (!isIncreasing) {
            window.vrotScroll -= vrotScroll_Speed;
            if (window.vrotScroll <= minVrotScroll) {
                window.vrotScroll = minVrotScroll;
                isIncreasing = true; // Switch direction to increasing
            }
        } else {
            window.vrotScroll += vrotScroll_Speed;
            if (window.vrotScroll >= maxVrotScroll) {
                window.vrotScroll = maxVrotScroll;
                isIncreasing = false; // Switch direction to decreasing
            }
        }
    }

    // Apply the new vrot value to the root
    document.querySelector(':root').style.setProperty('--vrot', window.vrotScroll);
}

// Attach the scroll event
window.addEventListener('wheel', function(event) {
    if (Math.abs(event.deltaY) > epsilonScroll) { // Ignore small scroll events
        // console.log('wheel event', event.deltaY);
        // Detect the scroll direction
        const isScrollingDown = event.deltaY > 0;

        // Call the changevrot function with the direction
        changevrot(isScrollingDown);
    }
});


