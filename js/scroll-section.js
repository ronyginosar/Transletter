window.vrotScroll = 50;
window.count = 0;

function changevrot(){
    var pageWidth = window.innerWidth;
    var pageHeight = window.innerHeight;
    
    window.count += 1;
    if(window.count < 66){
        window.vrotScroll += 10;
    }else{
        if(window.count > 131){
            window.vrotScroll = 50;
            window.count = 0;
        }else{
            window.vrotScroll -= 10;
        }
    }
    
    minVrotScroll = 100;
    maxVrotScroll = 700;

    const ratio = pageWidth / pageHeight;
    let adjustedVrotScroll = minVrotScroll + (window.vrotScroll - minVrotScroll) * ratio;

    adjustedVrotScroll = Math.max(minVrotScroll, Math.min(maxVrotScroll, adjustedVrotScroll));

    document.querySelector(':root').style.setProperty('--vrot', adjustedVrotScroll);
    // console.log(pageWidth, pageHeight, adjustedVrotScroll, window.vrotScroll);
}

// Prevent the default scroll and call changevrot
window.addEventListener('wheel', function(event) {
    event.preventDefault(); // Prevent the page from scrolling

    // Custom logic to detect scroll direction and trigger changevrot
    if (event.deltaY !== 0) {
        changevrot(); // Call your function
    }
}, { passive: false }); // Use passive: false to allow event.preventDefault()




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