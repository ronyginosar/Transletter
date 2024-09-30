document.addEventListener('DOMContentLoaded', function() {
    const textLines = [
        'אבולוציה',
        'של',
        'אותיות'
    ]; // The original lines of text to maintain word and line breaks

    const minVrot = 100;
    const maxVrot = 700;
    const textContainer = document.getElementById('text-container');

    // Function to create a random vrot value
    function getRandomVrot() {
        return Math.floor(Math.random() * (maxVrot - minVrot + 1)) + minVrot;
    }

    // Loop through each line and split words into spans
    textLines.forEach((line, lineIndex) => {
        const lineDiv = document.createElement('div'); // Create a container for each line
        lineDiv.style.display = 'inline-block'; // Keep the word together

        line.split('').forEach((char, charIndex) => {
            const span = document.createElement('span');
            const randomVrot = getRandomVrot();
            span.style.fontVariationSettings = `'vrot' ${randomVrot}`;
            span.textContent = char;
            span.style.display = 'inline'; // Ensure letters stay inline

            const originalColor = span.style.color || 'black'; // Fallback to black if undefined


            // Assign unique hover effects
            span.addEventListener('mouseenter', function() {
                if (charIndex % 2 === 0) {
                    this.style.color = 'blue';  // Every even index letter turns blue
                } else {
                    this.style.color = 'green';  // Every odd index letter turns green
                }
            });

            span.addEventListener('mouseleave', function() {
                this.style.color = originalColor;  // Reset on mouse leave
            });

            lineDiv.appendChild(span);
        });

        // Append each line of text to the container
        textContainer.appendChild(lineDiv);

        // Add line breaks between the lines
        // if (lineIndex < textLines.length - 1) {
            // textContainer.appendChild(document.createElement('br'));
        // }
    });
});
