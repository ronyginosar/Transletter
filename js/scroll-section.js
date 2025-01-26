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


// let touchStartY = 0; // To store the initial touch position

// function changevrot(isScrollingDown) {
//     // Adjust vrotScroll based on the current direction
//     if (isScrollingDown) {
//         if (isIncreasing) {
//             window.vrotScroll += vrotScroll_Speed;
//             if (window.vrotScroll >= maxVrotScroll) {
//                 window.vrotScroll = maxVrotScroll;
//                 isIncreasing = false; // Switch direction to decreasing
//             }
//         } else {
//             window.vrotScroll -= vrotScroll_Speed;
//             if (window.vrotScroll <= minVrotScroll) {
//                 window.vrotScroll = minVrotScroll;
//                 isIncreasing = true; // Switch direction to increasing
//             }
//         }
//     } else {
//         // Handle reverse scrolling (flip direction similarly)
//         if (!isIncreasing) {
//             window.vrotScroll -= vrotScroll_Speed;
//             if (window.vrotScroll <= minVrotScroll) {
//                 window.vrotScroll = minVrotScroll;
//                 isIncreasing = true; // Switch direction to increasing
//             }
//         } else {
//             window.vrotScroll += vrotScroll_Speed;
//             if (window.vrotScroll >= maxVrotScroll) {
//                 window.vrotScroll = maxVrotScroll;
//                 isIncreasing = false; // Switch direction to decreasing
//             }
//         }
//     }

//     // Apply the new vrot value to the root
//     document.querySelector(':root').style.setProperty('--vrot', window.vrotScroll);
// }

// // Attach the wheel (mouse scroll) event
// window.addEventListener('wheel', function (event) {
//     if (Math.abs(event.deltaY) > epsilonScroll) {
//         const isScrollingDown = event.deltaY > 0;
//         changevrot(isScrollingDown);
//     }
// });

// // Attach touch events for mobile
// window.addEventListener('touchstart', function (event) {
//     touchStartY = event.touches[0].clientY; // Store the initial touch position
// });

// window.addEventListener('touchmove', function (event) {
//     const touchEndY = event.touches[0].clientY; // Get the current touch position
//     const deltaY = touchStartY - touchEndY;

//     if (Math.abs(deltaY) > epsilonScroll) {
//         const isScrollingDown = deltaY > 0;
//         changevrot(isScrollingDown);
//         touchStartY = touchEndY; // Update the starting position for smooth scrolling
//     }
// });


function applyResponsiveText() {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const textElement = document.getElementById('scrollPara'); // Replace with your element's ID

    if (mediaQuery.matches) {
        // console.log('Screen is 768px or narrower');
        // Add <br> tags for narrow screens
        textElement.innerHTML = `
            \'תנואות\' הוא פרויקט טיפוגרפי ניסיוני, \
            החוקר את תולדותיו \
            <br> \
            וסגנונותיו של כתב \
            היד העברי, בתוך סביבה טכנולוגית \
            עכשווית. המדיום הוא גופן וריאבלי, \
            המוצג דרך ממשק דיגיטלי אינטרקטיבי. \
        `;
    } else {
        // Change to default text for wider screens
        textElement.innerHTML = " \
            'תנואות' הוא פרויקט טיפוגרפי ניסיוני, \
            החוקר את תולדותיו וסגנונותיו של כתב \
            היד העברי, בתוך סביבה טכנולוגית \
            עכשווית. המדיום הוא גופן וריאבלי, \
            המוצג דרך ממשק דיגיטלי אינטרקטיבי. \
        ";
    }
}

// Run the function on page load
document.addEventListener('DOMContentLoaded', function() {
    applyResponsiveText();
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
