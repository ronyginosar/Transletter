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

    // Initialize a virtual scroll position
    let scrollPosition = 0;
    const maxScrollPosition = 500; // Arbitrary max scroll simulation range
    const minScrollPosition = 0;   // Arbitrary min scroll range

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
        return Math.floor(Math.random() * 30) - 15; // Random rotation between -15deg and 15deg
    }

    // Function to update the span transformations based on the simulated scroll position
    function updateTransformations() {
        const middleScroll = (maxScrollPosition - minScrollPosition) / 2;

        spans.forEach((span, index) => {
            const translateX = 0; // Ignore horizontal translation
            const translateY = getRandomTranslation(); // Generate random vertical translation
            const rotate = getRandomRotation(); // Generate random rotation

            // Set transition to smooth out the transformations
            span.style.transition = 'transform 0.5s ease'; // Adjust duration and easing as needed

            // Apply smooth transform with random translation and rotation
            // span.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`;


            if (scrollPosition < middleScroll) {
                // Move up and rotate if scrollPosition is in the first half
                span.style.transform = `translate(${translateX}px, ${-translateY}px) rotate(${rotate}deg)`;
            } else {
                // Move down and rotate in the second half
                span.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`;
            }
        });
    }

    // Function to check for collisions between spans
    function checkCollision(span1, span2) {
        const rect1 = span1.getBoundingClientRect();
        const rect2 = span2.getBoundingClientRect();
        return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
    }

    // Function to handle collisions and adjust position
    function handleCollisions() {
        for (let i = 0; i < spans.length; i++) {
            for (let j = i + 1; j < spans.length; j++) {
                if (checkCollision(spans[i], spans[j])) {
                    // Reverse directions if collision is detected
                    spans[i].style.transform = `translate(${getRandomTranslation()}px, ${getRandomTranslation()}px) rotate(${getRandomRotation()}deg)`;
                    spans[j].style.transform = `translate(${getRandomTranslation()}px, ${getRandomTranslation()}px) rotate(${getRandomRotation()}deg)`;
                }
            }
        }
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

        // TODO
        // Apply absolute positioning relative to original positions
        // spans.forEach((span, index) => {
        //     const { x, y, width, height } = initialPositions[index];
        //     span.style.position = 'absolute';
        //     span.style.left = `${x}px`;
        //     span.style.top = `${y}px`;
        //     // span.style.width = `${width}px`;
        //     // span.style.height = `${height}px`;
        //     // console.log(initialPositions[index]);
        // });

        console.log(initialPositions)
    });

    // Use the 'wheel' event to detect scroll gestures without moving the page
    window.addEventListener('wheel', function(event) {
        event.preventDefault(); // Prevent default scrolling behavior

        const deltaY = event.deltaY; // Only vertical scrolling (ignore deltaX)
        // console.log(deltaY);
        // console.log(event.deltaX);

        // Only apply transformations if there is vertical scrolling (deltaY)
        if (deltaY !== 0) {
            // Update the virtual scroll position based on deltaY
            scrollPosition += deltaY;

            // Clamp the scrollPosition between min and max
            scrollPosition = Math.max(minScrollPosition, Math.min(maxScrollPosition, scrollPosition));
            console.log(scrollPosition);
            // Update transformations based on the virtual scroll position
            updateTransformations();
        }

        // Handle collisions
        // handleCollisions();

    }, { passive: false }); // Set passive: false to allow preventDefault()
});