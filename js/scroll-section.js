window.vrotScroll = 100;

function changevrot(isScrollingDown) {
    const minVrotScroll = 100;
    const maxVrotScroll = 700;

    // Adjust vrotScroll based on scroll direction
    if (isScrollingDown) {
        window.vrotScroll += 3; // Increase vrot when scrolling down
    } else {
        window.vrotScroll -= 3; // Decrease vrot when scrolling up
    }

    // Ensure the vrot value stays within bounds
    window.vrotScroll = Math.max(minVrotScroll, Math.min(maxVrotScroll, window.vrotScroll));

    // Apply the new vrot value to the root
    document.querySelector(':root').style.setProperty('--vrot', window.vrotScroll);
}

// Prevent the default scroll and call changevrot
window.addEventListener('wheel', function(event) {
    event.preventDefault(); // Prevent the page from scrolling

    // Detect the scroll direction
    const isScrollingDown = event.deltaY > 0;

    // Call the changevrot function with the direction
    changevrot(isScrollingDown);
}, { passive: false }); // Use passive: false to allow event.preventDefault()




// smoother, only 1direction vrot
// window.vrotScroll = 50;
// window.count = 0;

// function changevrot() {
//     var pageWidth = window.innerWidth;
//     var pageHeight = window.innerHeight;

//     // Increment scroll count
//     window.count += 1;

//     // Set vrotScroll in a continuous loop between min and max
//     const minVrotScroll = 100;
//     const maxVrotScroll = 700;
//     const scrollRange = maxVrotScroll - minVrotScroll;

//     // Create a smooth looping effect for vrotScroll
//     window.vrotScroll = minVrotScroll + (window.count % scrollRange);

//     // Adjust vrotScroll based on aspect ratio (optional)
//     const ratio = pageWidth / pageHeight;
//     let adjustedVrotScroll = minVrotScroll + (window.vrotScroll - minVrotScroll) * ratio;

//     // Ensure the value stays within bounds
//     adjustedVrotScroll = Math.max(minVrotScroll, Math.min(maxVrotScroll, adjustedVrotScroll));

//     // Apply the new vrot value to the root
//     document.querySelector(':root').style.setProperty('--vrot', adjustedVrotScroll);
// }

// // Prevent the default scroll and call changevrot
// window.addEventListener('wheel', function(event) {
//     event.preventDefault(); // Prevent the page from scrolling

//     // Custom logic to detect scroll direction and trigger changevrot
//     if (event.deltaY !== 0) {
//         changevrot(); // Call your function
//     }
// }, { passive: false }); // Use passive: false to allow event.preventDefault()



// latest before fix round
// window.vrotScroll = 50;
// window.count = 0;

// function changevrot(){
//     var pageWidth = window.innerWidth;
//     var pageHeight = window.innerHeight;
    
//     window.count += 1;
//     if(window.count < 66){
//         window.vrotScroll += 10;
//     }else{
//         if(window.count > 131){
//             window.vrotScroll = 50;
//             window.count = 0;
//         }else{
//             window.vrotScroll -= 10;
//         }
//     }
    
//     minVrotScroll = 100;
//     maxVrotScroll = 700;

//     const ratio = pageWidth / pageHeight;
//     let adjustedVrotScroll = minVrotScroll + (window.vrotScroll - minVrotScroll) * ratio;

//     adjustedVrotScroll = Math.max(minVrotScroll, Math.min(maxVrotScroll, adjustedVrotScroll));

//     document.querySelector(':root').style.setProperty('--vrot', adjustedVrotScroll);
//     // console.log(pageWidth, pageHeight, adjustedVrotScroll, window.vrotScroll);
// }

// // Prevent the default scroll and call changevrot
// window.addEventListener('wheel', function(event) {
//     event.preventDefault(); // Prevent the page from scrolling

//     // Custom logic to detect scroll direction and trigger changevrot
//     if (event.deltaY !== 0) {
//         changevrot(); // Call your function
//     }
// }, { passive: false }); // Use passive: false to allow event.preventDefault()




// window.vrotScroll = 50;
// window.count = 0;

// function changevrot(){
//     var pageWidth = window.innerWidth;
//     var pageHeight = window.innerHeight;
//     // future is this better?
//     // var offsetWidth = document.getElementById("wrapper").style ;
//     // var offsetHeight = document.getElementById("wrapper").style.height ;
    
//     window.count += 1;
//     if(window.count < 66){
//         window.vrotScroll += 10;
//     }else{
//         if(window.count > 131){
//             window.vrotScroll = 50;
//             window.count = 0;
//         }else{
//             window.vrotScroll -= 10;
//         }
//     }
//     // Adjust vrotScroll based on page dimensions
//     // let adjustedVrotScroll = window.vrotScroll * (pageWidth / pageHeight);

//     // future 
//     // let minVrotScroll = document.querySelector(':root').style.getProperty('--vrot');
//     // let maxVrotScroll = document.querySelector(':root').style.('--vrot');
    
//     minVrotScroll = 100;
//     maxVrotScroll = 700;
//     // adjustedVrotScroll = Math.max(minVrotScroll, Math.min(maxVrotScroll, adjustedVrotScroll));

//     // future make this less stuck at min and max
//     // Calculate the ratio of pageWidth to pageHeight
//     const ratio = pageWidth / pageHeight;

//     // Scale window.vrotScroll within the range defined by minVrotScroll and maxVrotScroll
//     let adjustedVrotScroll = minVrotScroll + (window.vrotScroll - minVrotScroll) * ratio;

//     // Clamp adjustedVrotScroll to be within min and max values
//     adjustedVrotScroll = Math.max(minVrotScroll, Math.min(maxVrotScroll, adjustedVrotScroll));

//     document.querySelector(':root').style.setProperty('--vrot', adjustedVrotScroll);
//     // document.querySelector(':root').style.setProperty('--vrot', window.vrotScroll);
//     console.log(pageWidth, pageHeight, adjustedVrotScroll,vrotScroll);

// }


// // document.addEventListener('wheel', function(event) {
// //     event.preventDefault(); // Prevent the default scroll behavior
// //     // Custom scroll behavior can be added here
// // }, { passive: false });


// // window.vrotScroll = 50;
// // window.count = 0;