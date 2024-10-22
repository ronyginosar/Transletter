window.vrotScroll = 100; // Initial value
let vrotScroll_Speed = 5; // Scroll speed
let isIncreasing = true; // Track whether we're increasing or decreasing

function changevrot(isScrollingDown) {
    const minVrotScroll = 100;
    const maxVrotScroll = 700;

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
    // Detect the scroll direction
    const isScrollingDown = event.deltaY > 0;

    // Call the changevrot function with the direction
    changevrot(isScrollingDown);
});


// note: not looping option & discussion on preverntDefault scroll
// window.vrotScroll = 100;
// vrotScroll_Speed = 5;

// function changevrot(isScrollingDown) {
//     const minVrotScroll = 100;
//     const maxVrotScroll = 700;

//     // Adjust vrotScroll based on scroll direction
//     if (isScrollingDown) {
//         window.vrotScroll += vrotScroll_Speed; // Increase vrot when scrolling down
//     } else {
//         window.vrotScroll -= vrotScroll_Speed; // Decrease vrot when scrolling up
//     }

//     // Ensure the vrot value stays within bounds
//     window.vrotScroll = Math.max(minVrotScroll, Math.min(maxVrotScroll, window.vrotScroll));

//     // Apply the new vrot value to the root
//     document.querySelector(':root').style.setProperty('--vrot', window.vrotScroll);
// }

// // Prevent the default scroll and call changevrot
// window.addEventListener('wheel', function(event) {
//     // event.preventDefault(); // Prevent the page from scrolling

//     // Detect the scroll direction
//     const isScrollingDown = event.deltaY > 0;

//     // Call the changevrot function with the direction
//     changevrot(isScrollingDown);
// }, 
// // { passive: false } // Use passive: false to allow event.preventDefault(), this prevents main page from scrolling, not the intention...
// ); 
