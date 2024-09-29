
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


// Handwritten glyphs section
// note: data in separate file: js/research-handwritten-data.js

// Initialize the page with the default character 'alef'
injectHandwrittenImages('alef');

// Add a separate event listener for the buttons that trigger handwritten glyphs
const glyphButtons = document.querySelectorAll('#glyph_selector button');
glyphButtons.forEach(button => {
    button.addEventListener('click', function() {
        // const selectedCharacter = this.textContent;
        const selectedCharacter = this.getAttribute('data-character'); // Get the character from data attribute
        injectHandwrittenImages(selectedCharacter);
    });
});


// Function to inject handwritten images
function injectHandwrittenImages(character) {
    const imageContainer = document.getElementById('handwritten_glyph_space');
    imageContainer.innerHTML = ''; // Clear existing images

    images[character].forEach((imageName, index) => {
        // Create a container for the image and the label
        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'handwritten-text-image-container '; // Class for styling the wrapper

        // Create an image element
        const img = document.createElement('img');
        img.src = `../assets/content_images/research_handwritten_glyphs/${imageName}`;
        img.alt = `Handwritten version of ${character}`;

        // Create text element, initially hidden
        const textElement = document.createElement('small');
        textElement.className = 'handwritten-text-label';
        textElement.textContent = labels[character][index]; // Set text immediately
        textElement.style.opacity = '0'; // Hidden initially

        // Hover effect for image to show/hide the label
        img.addEventListener('mouseenter', function() {
            textElement.style.opacity = '1'; // Show label on hover
        });

        img.addEventListener('mouseleave', function() {
            textElement.style.opacity = '0'; // Hide label when hover ends
        });

        // Append the image and the label to the wrapper
        imgWrapper.appendChild(img);
        imgWrapper.appendChild(textElement);

        // Append the wrapper to the main container
        imageContainer.appendChild(imgWrapper);
    });
}


