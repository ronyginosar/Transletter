

document.addEventListener('DOMContentLoaded', function() {
    const text = 'אבולוציה של אותיות';
    const minVrot = 100;
    const maxVrot = 700;
    const textContainer = document.getElementById('text-container');

    // Function to create a random vrot value
    function getRandomVrot() {
        return Math.floor(Math.random() * (maxVrot - minVrot + 1)) + minVrot;
    }

    // Loop through each character in the string and wrap it in a span
    text.split('').forEach((char, index) => {
        if (char === ' ') {
            textContainer.appendChild(document.createElement('br')); // Handle spaces
        } else {
            const span = document.createElement('span');
            const randomVrot = getRandomVrot();
            span.style.fontVariationSettings = `'vrot' ${randomVrot}`;
            span.textContent = char;
            span.style.display = 'inline-block'; // Ensure letters are inline
            textContainer.appendChild(span);

            // Assign a unique hover event for each letter based on index
            span.addEventListener('mouseenter', function() {
                switch (index) {
                    case 0:
                        this.style.transform = 'rotate(10deg)';
                        break;
                    case 1:
                        // this.style.fontSize = '24px';
                        break;
                    case 2:
                        this.style.color = 'red';
                        break;
                    // Add more cases for unique hover behaviors
                    default:
                        this.style.opacity = 0.5;
                }
            });

            // Reset color on mouse leave
            span.addEventListener('mouseleave', function() {
                this.style.color = 'black'; // Reset to original color
            });
        }
    });
});




// document.addEventListener('DOMContentLoaded', function() {
//     const text = 'אבולוציה של אותיות';
//     const minVrot = 100;
//     const maxVrot = 700;
//     const textContainer = document.getElementById('text-container');

//     // Loop through each character in the string and wrap it in a span
//     text.split('').forEach(char => {
//         if (char === ' ') {
//             textContainer.appendChild(document.createElement('br')); // Handle spaces
//         } else {
//             const span = document.createElement('span');
//             const randomVrot = Math.floor(Math.random() * (maxVrot - minVrot + 1)) + minVrot;
//             span.style.fontVariationSettings = `'vrot' ${randomVrot}`;
//             span.textContent = char;
//             span.style.display = 'inline-block'; // Ensure letters are inline
//             textContainer.appendChild(span);
//         }
//     });
// });


