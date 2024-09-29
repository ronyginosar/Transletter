
// Define the default character and vrot range
const vrotValues = [100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700];
const glyphSpace = document.getElementById('glyph_space');

// Function to inject a row of 13 characters with different vrot values
function injectGlyphRow(character) {
    // Clear the current content of glyph_space
    glyphSpace.innerHTML = '';

    // Loop to create 13 instances of the selected character with varying vrot values
    for (let i = 0; i < 13; i++) {
        const span = document.createElement('span');
        span.textContent = character;
        span.style.fontVariationSettings = `"vrot" ${vrotValues[i]}`;
        span.style.margin = '0 5px';  // Add some spacing between the characters

        // Apply color based on index (even or odd)
        if (i % 2 === 0) {
            span.style.color = 'var(--element-color)';  // Even index
        } else {
            span.style.color = 'var(--slider-gray)';    // Odd index
        }

        glyphSpace.appendChild(span);
    }
}

// Set the default selected button to be visually indicated (highlight the button for צ)
// const defaultButton = document.querySelector('#glyph_selector button:nth-child(6)');
const defaultButton = document.getElementById('default_glyph');
defaultButton.classList.add('selected'); // Add a class to visually highlight the button
// Initialize the page with the default character 
injectGlyphRow(defaultButton.textContent);

// Add an event listener to all buttons inside glyph_selector
const buttons = document.querySelectorAll('#glyph_selector button');
buttons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove the 'selected' class from all buttons
        buttons.forEach(btn => btn.classList.remove('selected'));

        // Add the 'selected' class to the clicked button
        this.classList.add('selected');

        // Inject the selected character into glyph_space
        const selectedCharacter = this.textContent;
        injectGlyphRow(selectedCharacter);
    });
});

// Define the image paths and corresponding labels
const images = {
    alef: ['alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png'],
    // alef: ['alef_1.png', 'alef_2.png', 'alef_3.png', 'alef_4.png', 'alef_5.png', 'alef_6.png', 'alef_7.png', 'alef_8.png', 'alef_9.png', 'alef_10.png'],
    // bet: ['bet_1.png', 'bet_2.png', 'bet_3.png', 'bet_4.png', 'bet_5.png', 'bet_6.png', 'bet_7.png', 'bet_8.png', 'bet_9.png', 'bet_10.png'],
    // Add more characters as needed
};

// Corresponding labels for each image
const labels = {
    alef: ['Label for Alef 1', 'Label for Alef 2', 'Label for Alef 3', 'Label for Alef 4', 'Label for Alef 5', 'Label for Alef 6', 'Label for Alef 7', 'Label for Alef 8', 'Label for Alef 9', 'Label for Alef 10'],
    // bet: ['Label for Bet 1', 'Label for Bet 2', 'Label for Bet 3', 'Label for Bet 4', 'Label for Bet 5', 'Label for Bet 6', 'Label for Bet 7', 'Label for Bet 8', 'Label for Bet 9', 'Label for Bet 10'],
    // Add more labels as needed
};

// Function to inject handwritten images
function injectHandwrittenImages(character) {
    const imageContainer = document.getElementById('handwritten_glyph_space');
    imageContainer.innerHTML = ''; // Clear existing images

    images[character].forEach((imageName, index) => {
        // Create an image element
        const img = document.createElement('img');
        img.src = `../assets/content_images/research_handwritten_glyphs/${imageName}`;
        img.alt = `Handwritten version of ${character}`;
        img.style.width = '50px'; // Set image size (adjust as needed)
        img.style.margin = '0 10px'; // Spacing between images
        // img.style.transition = 'filter 0.3s'; // Smooth color transition

        // Hover effect for image
        img.addEventListener('mouseenter', function() {
            // img.style.filter = 'brightness(0) invert(1)'; // Change color
            textElement.textContent = labels[character][index]; // Show corresponding label
        });

        img.addEventListener('mouseleave', function() {
            // img.style.filter = 'none'; // Reset color
            textElement.textContent = ''; // Hide label on mouse out
        });

        // Append the image to the container
        imageContainer.appendChild(img);

        // Create text element to show below the image on hover
        const textElement = document.createElement('small');
        textElement.className = 'handwritten-text';
        textElement.style.display = 'block'; // Display it as a block to appear below the image
        textElement.style.textAlign = 'right';
        textElement.style.width = '50%'; // Max width to spread till halfway to the previous image
        imageContainer.appendChild(textElement);
    });
}

// Initialize the page with the default character 'alef'
injectHandwrittenImages('alef');

// Add a separate event listener for the buttons that trigger handwritten glyphs
const glyphButtons = document.querySelectorAll('#glyph_selector button');
glyphButtons.forEach(button => {
    button.addEventListener('click', function() {
        const selectedCharacter = this.textContent;
        injectHandwrittenImages(selectedCharacter);
    });
});
