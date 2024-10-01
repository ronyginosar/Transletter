document.addEventListener('DOMContentLoaded', function() {
    const textLines = [
        'אבולוציה',
        'של',
        'אותיות'
    ]; // The original lines of text

    const minVrot = 100;
    const maxVrot = 700;
    const textContainer = document.getElementById('text-container');
    const spans = [];
    const movingSpansIndexes = [0, 1, 2, 6, 11, 13, 14, 15]; // Only these indexes will start moving up initially

    const upwardsMovement = 2;
    const downwardsMovement = -upwardsMovement;
    const downwardsFall = 10;


    // Initialize a virtual scroll position
    let scrollPosition = 0;
    const maxScrollPosition = 2000; // Arbitrary max scroll simulation range
    const minScrollPosition = 0;   // Arbitrary min scroll range
    const fallThreshold = maxScrollPosition*0.9;

    // Function to create a random vrot value
    function getRandomVrot() {
        return Math.floor(Math.random() * (maxVrot - minVrot + 1)) + minVrot;
    }

    // Function to generate random numbers for translation and rotation
    function getRandomTranslation() {
        // return Math.floor(Math.random() * 30) - 15; // Random number between -15 and 15
        pageHeight = window.innerHeight;
        return Math.floor(Math.random() * pageHeight) - pageHeight/2; // Random number between -15 and 15
    }

    function getRandomRotation() {
        // TODO MAGIC NUMBERS
        return Math.floor(Math.random() * 10) - 5; // Random rotation between -15deg and 15deg
    }

    // Function to update the span transformations based on the simulated scroll position
    // todo reverse on opposite scroll
    // todo - ignore initial wheel and look only at last one (for scroll pad)
    function updateTransformations() {
        // const middleScroll = (maxScrollPosition - minScrollPosition) / 2;

        spans.forEach((span, index) => {
            // const translateX = 0; // Ignore horizontal translation
            // const translateY = getRandomTranslation(); // Generate random vertical translation
            // const rotate = getRandomRotation(); // Generate random rotation
            // // Set transition to smooth out the transformations
            // span.style.transition = 'transform 0.5s ease'; // Adjust duration and easing as needed
            // // Apply smooth transform with random translation and rotation
            // // span.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`;
            // if (scrollPosition < middleScroll) {
            //     // Move up and rotate if scrollPosition is in the first half
            //     span.style.transform = `translate(${translateX}px, ${-translateY}px) rotate(${rotate}deg)`;
            // } else {
            //     // Move down and rotate in the second half
            //     span.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`;
            // }
            
            // Only apply transformations to spans that are moving
            if (movingSpansIndexes.includes(index)) {
                const translateX = 0; // No horizontal translation
                let translateY = parseFloat(span.dataset.translateY || 0) - upwardsMovement; // Move up by 2px
                span.dataset.translateY = translateY; // Store the current translation for future reference
            
                // const rotate = getRandomRotation(); // Keep rotation random for now
                const rotate = 0; // Keep rotation random for now
                // span.style.transition = 'transform 0.5s ease'; // Smooth movement and rotation
            
                // Apply upward movement and random rotation
                span.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`;
            }
        });
    }

    // Function to check for collisions between spans
    function checkCollision(span1, span2) {
        const rect1 = span1.getBoundingClientRect();
        const rect2 = span2.getBoundingClientRect();
        const span1_data = span1.innerHTML;
        const span2_data = span2.innerHTML;        
        // Check if rect1 and rect2 overlap horizontally
        const horizontalOverlap = rect1.left < rect2.right && rect1.right > rect2.left;
        // Check if rect1 and rect2 overlap vertically
        const verticalOverlap = rect1.top < rect2.bottom && rect1.bottom > rect2.top;
        let collisionFree = !horizontalOverlap || !verticalOverlap;
        // if(!(collisionFree))console.log("rect1" , span1_data, "rect2", span2_data);
        // if(!(collisionFree))console.log(rect1.right , rect2.left , rect1.left , rect2.right , rect1.bottom , rect2.top , rect1.top , rect2.bottom);
        return !(collisionFree);
    }

    // Function to handle collisions and adjust position
    function handleCollisions() {
        for (let i = 0; i < spans.length; i++) {
            let spanHasCollisionBelow = false; // Assume no collision below initially

            for (let j = i + 1; j < spans.length; j++) {
                // if (checkCollision(spans[i], spans[j])) {
                //     // Reverse directions if collision is detected
                //     let translateY1 = parseFloat(spans[i].dataset.translateY || 0);
                //     let translateY2 = parseFloat(spans[j].dataset.translateY || 0);
    
                //     // Make the span that wasn't moving start moving up on collision
                //     if (!movingSpansIndexes.includes(j)) {
                //         movingSpansIndexes.push(j); // Start moving span j
                //     }
    
                //     // Adjust movement and apply the rotation effect
                //     spans[i].dataset.translateY = translateY1 + 10; // Move down on collision
                //     spans[j].dataset.translateY = translateY2 - 10; // Move up on collision
    
                //     // const rotate1 = getRandomRotation();
                //     // const rotate2 = getRandomRotation();    
                //     const rotate1 = 0;
                //     const rotate2 = 0;
                //     spans[i].style.transform = `translate(0px, ${translateY1 + 10}px) rotate(${rotate1}deg)`;
                //     spans[j].style.transform = `translate(0px, ${translateY2 - 10}px) rotate(${rotate2}deg)`;
                // }

                // Check if the spans collide
                if (checkCollision(spans[i], spans[j])) 
                {
                    const rect1 = spans[i].getBoundingClientRect();
                    const rect2 = spans[j].getBoundingClientRect();

                    // for later 'drop'
                    if (rect1.bottom < rect2.top) {
                        spanHasCollisionBelow = true; // A collision exists below
                    }

                    // Determine which span is on top (rect2) and which is on the bottom (rect1)
                    if (rect1.top > rect2.top) {
                        // Span i is below Span j
                        let translateY1 = parseFloat(spans[i].dataset.translateY || 0);
                        let translateY2 = parseFloat(spans[j].dataset.translateY || 0);

                        // Push the top span (j) further up
                        spans[j].dataset.translateY = translateY2 - 1; // Move span j (top) further up , by 1 is smoother than upwardsMovement

                        // Apply upward movement and rotate in opposite directions
                        const rotate1 = getRandomRotation(); // Random rotation for span i
                        const rotate2 = -rotate1; // Opposite rotation for span j

                        spans[i].style.transform = `translate(0px, ${translateY1}px) rotate(${rotate1}deg)`;
                        spans[j].style.transform = `translate(0px, ${translateY2 - upwardsMovement}px) rotate(${rotate2}deg)`;

                        // Start moving non-moving spans on collision (if necessary)
                        if (!movingSpansIndexes.includes(j)) {
                            movingSpansIndexes.push(j); // Span j starts moving
                        }
                    } else { // if (rect1.top <= rect2.top) {
                        // Span i is above Span j (same logic but reversed)
                        let translateY1 = parseFloat(spans[i].dataset.translateY || 0);
                        let translateY2 = parseFloat(spans[j].dataset.translateY || 0);

                        // Push the top span (i) further up
                        spans[i].dataset.translateY = translateY1 - upwardsMovement; // Move span i (top) further up

                        // Apply upward movement and rotate in opposite directions
                        // const rotate1 = getRandomRotation();
                        const rotate1 = 0;
                        const rotate2 = -rotate1;

                        spans[i].style.transform = `translate(0px, ${translateY1 - upwardsMovement}px) rotate(${rotate1}deg)`;
                        spans[j].style.transform = `translate(0px, ${translateY2}px) rotate(${rotate2}deg)`;

                        // Start moving non-moving spans on collision (if necessary)
                        if (!movingSpansIndexes.includes(i)) {
                            movingSpansIndexes.push(i); // Span i starts moving
                        }
                    }
                }
            }

            // If no span below and scrollPosition > threshold, move span down
            // if (!spanHasCollisionBelow && scrollPosition > fallThreshold && movingSpansIndexes.includes(i)) {
            if (!spanHasCollisionBelow && scrollPosition > fallThreshold) {
                let translateY = parseFloat(spans[i].dataset.translateY || 0);
                spans[i].dataset.translateY = translateY + downwardsFall; // Move down by 2px
                spans[i].style.transform = `translate(0px, ${translateY + downwardsFall}px) rotate(0deg)`; // TODO Keep rotation 0 for now
            }
        }
    }


    function resetToInitialPositions() {
        scrollPosition = 0; // Reset the virtual scroll position
        spans.forEach((span, index) => {
            const initialPos = initialPositions[index]; // Retrieve initial position
    
            // Move span back to its original position
            span.style.transform = `translate(0px, 0px) rotate(0deg)`;
            span.style.left = `${initialPos.x}px`;
            span.style.top = `${initialPos.y}px`;
    
            // Reset translation and rotation stored in the dataset
            span.dataset.translateY = 0;
        });
    }

    // Loop through each line and split words into spans
    textLines.forEach((line, lineIndex) => {
        const lineDiv = document.createElement('div'); // Create a container for each line
        lineDiv.classList.add('lineDiv');
        lineDiv.style.display = 'inline-block'; // Keep the word together

        line.split('').forEach((char, charIndex) => {
            const span = document.createElement('span');
            const randomVrot = getRandomVrot();
            span.style.fontVariationSettings = `'vrot' ${randomVrot}`;
            span.textContent = char;
            span.style.display = 'inline-block'; // Ensure letters stay inline
            // span.style.display = 'inline'; // Ensure letters stay inline
            spans.push(span);

            lineDiv.appendChild(span);
        });

        textContainer.appendChild(lineDiv);

        // <br> if needed
        // if (lineIndex < textLines.length - 1) {
        //     textContainer.appendChild(document.createElement('br'));
        // }
    });

    // Store initial positions of spans after they are naturally laid out
    const initialPositions = [];

    ////////////////////////////////// ACTION SECTION//////////////////////////////////////

    // Wait for layout to be applied before capturing initial positions
    window.addEventListener('load', function() {
        console.log('loaded');
        spans.forEach(span => {
            const rect = span.getBoundingClientRect();
            // console.log(rect);
            initialPositions.push({
                x: rect.left,
                y: rect.top,
                width: rect.width,
                height: rect.height,
                data: span.textContent
            });
        });

        // Apply absolute positioning relative to original positions
        spans.forEach((span, index) => {
            const { x, y, width, height } = initialPositions[index];
            span.style.position = 'absolute';
            span.style.left = `${x}px`;
            span.style.top = `${y}px`;
            // span.style.width = `${width}px`;
            // span.style.height = `${height}px`;
            // console.log(initialPositions[index]);
        });

        // console.log(initialPositions);
    });

    // Use the 'wheel' event to detect scroll gestures without moving the page
    window.addEventListener('wheel', function(event) {
        event.preventDefault(); // Prevent default scrolling behavior

        const deltaY = event.deltaY; // Only vertical scrolling (ignore deltaX)
        // console.log(deltaY);
        // console.log(event.deltaX);

        // // Only apply transformations if there is vertical scrolling (deltaY)
        // if (deltaY !== 0) {
        //     // Update the virtual scroll position based on deltaY
        //     scrollPosition += deltaY;

        //     // Clamp the scrollPosition between min and max
        //     scrollPosition = Math.max(minScrollPosition, Math.min(maxScrollPosition, scrollPosition));
        //     // console.log(scrollPosition);
        //     // Update transformations based on the virtual scroll position
        //     updateTransformations();
        // }

        // // Handle collisions
        // handleCollisions();


        // note: negotiable what is up and down with macs...
        // scrollPosition global param
        if (deltaY > 0) {
            // Scrolling up
            // Continue the current behavior (move spans upwards and handle collisions)
            scrollPosition += deltaY;
            scrollPosition = Math.max(minScrollPosition, Math.min(maxScrollPosition, scrollPosition));
    
            // Update transformations based on the virtual scroll position
            updateTransformations();
    
            // Handle collisions
            handleCollisions();
        } else if (deltaY < 0) {
            // Scrolling down
            scrollPosition -= deltaY;
            scrollPosition = Math.max(minScrollPosition, Math.min(maxScrollPosition, scrollPosition));
            // Reset spans to their initial positions (move them back down and reset rotation)
            resetToInitialPositions();

            // TODO remove from scrollPosition?
        }

        console.log(scrollPosition);

    }, { passive: false }); // Set passive: false to allow preventDefault()
});

