// for div etitable
document.addEventListener('DOMContentLoaded', function() {
    const text_byLetter = document.getElementById('text_byLetter');
    const fontVrotSlider_byLetter = document.getElementById('fontVrotSlider_byLetter');
    let selectedLetterIndex = 0; // To keep track of the currently selected letter

    // Function to wrap each letter in a <span>
    function wrapLettersInSpans(textArea) {
        const fullText = textArea.textContent; // Use textContent to get the plain text
        const wrappedHTML = Array.from(fullText).map((char, index) => {
            // Highlight the first letter as selected by default or retain selection if necessary
            const isSelected = index === selectedLetterIndex ? 'selected-letter' : '';
            return `<span class="letter ${isSelected}" data-index="${index}">${char}</span>`;
        }).join('');

        textArea.innerHTML = wrappedHTML; // Insert HTML into the contenteditable div

        // Move the caret to the end of the newly typed content (after the last letter)
        const lastLetter = textArea.querySelector('.letter:last-child');
        placeCaretAfterSelectedLetter(lastLetter);
    }

    // Initialize the text_byLetter div by wrapping letters in spans
    wrapLettersInSpans(text_byLetter);

    // Function to handle letter click
    function handleLetterClick(event) {
        const clickedElement = event.target;
        
        // Make sure the clicked element is a span with the "letter" class
        if (clickedElement.classList.contains('letter')) {
            // Update selected letter class
            document.querySelectorAll('.letter').forEach(letter => {
                letter.classList.remove('selected-letter');
            });

            clickedElement.classList.add('selected-letter');
            selectedLetterIndex = parseInt(clickedElement.dataset.index); // Update selected index
            
            // Move the caret after the selected letter
            placeCaretAfterSelectedLetter(clickedElement);
        }
    }

    // Add click event listener for letter selection
    text_byLetter.addEventListener('click', handleLetterClick);

    // Function to update vrot value for the selected letter
    function updateVrotForSelectedLetter() {
        const selectedLetter = document.querySelector('.selected-letter');
        const vrotValue = fontVrotSlider_byLetter.value;
        
        if (selectedLetter) {
            selectedLetter.style.fontVariationSettings = `'vrot' ${vrotValue}`;
        }
    }

    // Add input event listener to the vrot slider
    fontVrotSlider_byLetter.addEventListener('input', updateVrotForSelectedLetter);

    // Function to place the caret after the selected letter
    function placeCaretAfterSelectedLetter(selectedElement) {
        const range = document.createRange();
        const sel = window.getSelection();

        if (selectedElement) {
            range.setStartAfter(selectedElement); // Place the caret after the selected element
            range.collapse(true); // Collapse the range to move the caret
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }

    // Ensure the caret is visible by placing it at the start
    placeCaretAfterSelectedLetter(text_byLetter.querySelector('.letter'));

    // Listen for new text input to wrap newly typed content
    text_byLetter.addEventListener('input', function() {
        wrapLettersInSpans(text_byLetter); // Re-wrap the content on each input
    });
});


// document.addEventListener('DOMContentLoaded', function() {
//     const text_byLetter = document.getElementById('text_byLetter');
//     const fontVrotSlider_byLetter = document.getElementById('fontVrotSlider_byLetter');
//     let selectedLetterIndex = 0; // To keep track of the currently selected letter

//     // Function to wrap each letter in a <span>
//     function wrapLettersInSpans(textArea) {
//         const fullText = textArea.textContent; // Use textContent to get the plain text
//         const wrappedHTML = Array.from(fullText).map((char, index) => {
//             // Highlight the first letter as selected by default
//             const isSelected = index === selectedLetterIndex ? 'selected-letter' : '';
//             return `<span class="letter ${isSelected}" data-index="${index}">${char}</span>`;
//         }).join('');
//         textArea.innerHTML = wrappedHTML; // Insert HTML into the contenteditable div
//     }

//     // Initialize the text_byLetter div by wrapping letters in spans
//     wrapLettersInSpans(text_byLetter);

//     // Function to handle letter click
//     // function handleLetterClick(event) {
//     //     const clickedElement = event.target;
        
//     //     // Make sure the clicked element is a span with the "letter" class
//     //     if (clickedElement.classList.contains('letter')) {
//     //         // Update selected letter class
//     //         document.querySelectorAll('.letter').forEach(letter => {
//     //             letter.classList.remove('selected-letter');
//     //         });

//     //         clickedElement.classList.add('selected-letter');
//     //         selectedLetterIndex = parseInt(clickedElement.dataset.index); // Update selected index
//     //     }
//     // }
//     function handleLetterClick(event) {
//         const clickedElement = event.target;
        
//         // Make sure the clicked element is a span with the "letter" class
//         if (clickedElement.classList.contains('letter')) {
//             // Update selected letter class
//             document.querySelectorAll('.letter').forEach(letter => {
//                 letter.classList.remove('selected-letter');
//             });
    
//             clickedElement.classList.add('selected-letter');
//             selectedLetterIndex = parseInt(clickedElement.dataset.index); // Update selected index
            
//             // Move the caret after the selected letter
//             placeCaretAfterSelectedLetter(clickedElement);
//         }
//     }
    

//     // Add click event listener for letter selection
//     text_byLetter.addEventListener('click', handleLetterClick);

//     // Function to update vrot value for the selected letter
//     function updateVrotForSelectedLetter() {
//         const selectedLetter = document.querySelector('.selected-letter');
//         const vrotValue = fontVrotSlider_byLetter.value;
        
//         if (selectedLetter) {
//             selectedLetter.style.fontVariationSettings = `'vrot' ${vrotValue}`;
//         }
//     }

//     // Add input event listener to the vrot slider
//     fontVrotSlider_byLetter.addEventListener('input', updateVrotForSelectedLetter);

//     // Function to place the caret at the beginning of the div
//     // function placeCaretAtStart(el) {
//     //     el.focus();
//     //     const range = document.createRange();
//     //     const sel = window.getSelection();
//     //     range.setStart(el.childNodes[0], 0); // Start at the beginning of the content
//     //     range.collapse(true);
//     //     sel.removeAllRanges();
//     //     sel.addRange(range);
//     // }
//     function placeCaretAfterSelectedLetter(selectedElement) {
//         const range = document.createRange();
//         const sel = window.getSelection();
    
//         if (selectedElement) {
//             range.setStartAfter(selectedElement); // Place the caret after the selected element
//             range.collapse(true); // Collapse the range to move the caret
//             sel.removeAllRanges();
//             sel.addRange(range);
//         }
//     }

//     // Ensure the caret is visible by placing it at the start
//     // placeCaretAtStart(text_byLetter);
//     placeCaretAfterSelectedLetter(text_byLetter);

//     // Adjust the height initially and when text changes
//     function adjustHeight(textarea) {
//         textarea.style.height = 'auto';  // Reset the height
//         textarea.style.height = textarea.scrollHeight + 'px';  // Set the height based on scrollHeight
//     }
//     adjustHeight(text_byLetter);
//     text_byLetter.addEventListener('input', () => adjustHeight(text_byLetter));
// });

// document.addEventListener('DOMContentLoaded', function() {
//     const text_byLetter = document.getElementById('text_byLetter');
//     const fontVrotSlider_byLetter = document.getElementById('fontVrotSlider_byLetter');
//     let selectedLetterIndex = 0; // To keep track of the currently selected letter

//     // Function to wrap each letter in a <span>
//     function wrapLettersInSpans(textArea) {
//         const fullText = textArea.textContent; // Use textContent to get the plain text
//         const wrappedHTML = Array.from(fullText).map((char, index) => {
//             // Highlight the first letter as selected by default
//             const isSelected = index === selectedLetterIndex ? 'selected-letter' : '';
//             return `<span class="letter ${isSelected}" data-index="${index}">${char}</span>`;
//         }).join('');
//         textArea.innerHTML = wrappedHTML; // Insert HTML into the contenteditable div
//     }

//     // Initialize the text_byLetter textarea by wrapping letters in spans
//     wrapLettersInSpans(text_byLetter);

//     // Function to handle letter click
//     function handleLetterClick(event) {
//         const clickedElement = event.target;
        
//         // Make sure the clicked element is a span with the "letter" class
//         if (clickedElement.classList.contains('letter')) {
//             // Update selected letter class
//             document.querySelectorAll('.letter').forEach(letter => {
//                 letter.classList.remove('selected-letter');
//             });

//             clickedElement.classList.add('selected-letter');
//             selectedLetterIndex = parseInt(clickedElement.dataset.index); // Update selected index
//         }
//     }

//     // Add click event listener for letter selection
//     text_byLetter.addEventListener('click', handleLetterClick);

//     // Function to update vrot value for the selected letter
//     function updateVrotForSelectedLetter() {
//         const selectedLetter = document.querySelector('.selected-letter');
//         const vrotValue = fontVrotSlider_byLetter.value;
        
//         if (selectedLetter) {
//             selectedLetter.style.fontVariationSettings = `'vrot' ${vrotValue}`;
//         }
//     }

//     // Add input event listener to the vrot slider
//     fontVrotSlider_byLetter.addEventListener('input', updateVrotForSelectedLetter);
// });


// somewhat working
// document.addEventListener('DOMContentLoaded', function() {
//     // Function to adjust the height of a textarea
//     function adjustHeight(textarea) {
//         textarea.style.height = 'auto';
//         textarea.style.height = textarea.scrollHeight + 'px';
//     }

//     // General slider handling function for font size and vrot control
//     function handleSlider(event) {
//         const slider = event.target;
//         const sliderContainer = slider.closest('.slider-container');
//         const sliderLabel = sliderContainer.querySelector('.slider-label');
//         const controls = slider.closest('.controls');
//         const textarea = controls.nextElementSibling.querySelector('textarea');

//         // Update the label
//         sliderLabel.textContent = slider.value;

//         // Check which slider is being controlled (font size or vrot)
//         if (slider.id.includes('fontSizeSlider')) {
//             textarea.style.fontSize = `${slider.value}px`;
//             adjustHeight(textarea);
//         } else if (slider.id.includes('fontVrotSlider')) {
//             const vrotValue = slider.value;

//             // Check if it's the 'byLetter' textarea
//             if (textarea.id === 'text_byLetter') {
//                 handleLetterVrot(textarea, vrotValue);
//             } else if (textarea.id === 'text_byBlock') {
//                 textarea.style.fontVariationSettings = `'vrot' ${vrotValue}`;
//             }
//         }
//     }

//     // Handle vrot value for individual letter
//     function handleLetterVrot(textarea, vrotValue) {
//         const selectedText = window.getSelection().toString();
//         const fullText = textarea.value;
        
//         // Rebuild text with the vrot setting applied only to the selected letter
//         const updatedHTML = Array.from(fullText).map((char, index) => {
//             if (char === selectedText) {
//                 return `<span style="font-variation-settings: 'vrot' ${vrotValue}; color: var(--gradient-blue)">${char}</span>`;
//             }
//             return char;
//         }).join('');
        
//         // Update textarea's inner HTML with the modified characters
//         textarea.innerHTML = updatedHTML;
//     }

//     // Add the input event listener to the sliders dynamically
//     const sliders = document.querySelectorAll('input[type=range]');
//     sliders.forEach(slider => {
//         slider.addEventListener('input', handleSlider);
//     });

//     // Enable editability (blinking caret)
//     const textareas = document.querySelectorAll('textarea');
//     textareas.forEach(textarea => {
//         textarea.style.caretColor = 'black'; // Shows the caret
//         adjustHeight(textarea); // Adjust height on load
//         textarea.addEventListener('input', () => adjustHeight(textarea));
//     });

//     // Handle letter selection for byLetter textarea
//     const byLetterTextarea = document.getElementById('text_byLetter');
//     byLetterTextarea.addEventListener('click', function(event) {
//         const selection = window.getSelection();
//         const selectedText = selection.toString();

//         if (selectedText.length === 1) {
//             event.target.style.fontVariationSettings = `'vrot' var(--vrot-letter-tester)`;
//             selection.anchorNode.parentElement.style.color = 'var(--gradient-blue)'; // Highlight selected letter
//         }
//     });
// });

document.addEventListener('DOMContentLoaded', function() {
    // Function to adjust the height of a textarea or contenteditable div
    function adjustHeight(element) {
        if (element.tagName.toLowerCase() === 'textarea') {
            element.style.height = 'auto';
            element.style.height = element.scrollHeight + 'px';
        }
    }

    // General slider handling function for font size and vrot control
    function handleSlider(event) {
        const slider = event.target;
        const sliderContainer = slider.closest('.slider-container');
        const sliderLabel = sliderContainer.querySelector('.slider-label');
        const container = slider.closest('.container'); // Find the container that holds both the controls and the target element
        const targetElement = container.querySelector('textarea, div[contenteditable="true"]'); // Query the textarea or contenteditable div inside the container

        // console.log(slider);
        // console.log(sliderContainer);
        // console.log(sliderLabel);
        // console.log(container);
        // console.log(targetElement);

        // Update the label with the slider value
        sliderLabel.textContent = slider.value;

        // Check which slider is being controlled (font size or vrot)
        if (slider.id.includes('fontSizeSlider')) {
            
            if (targetElement.tagName.toLowerCase() === 'textarea') {
                // For textareas, apply font size directly
                targetElement.style.fontSize = `${slider.value}px`;
                adjustHeight(targetElement);
            } else if (targetElement.tagName.toLowerCase() === 'div') {
                // For contenteditable divs, apply inline font size to each child node
                applyFontSizeToContentEditable(targetElement, slider.value);
            }
        } else if (slider.id.includes('fontVrotSlider')) {
            const vrotValue = slider.value;

            // Handle for the byLetter contenteditable div
            if (targetElement.id === 'text_byLetter') {
                handleLetterVrot(targetElement, vrotValue);
            } else if (targetElement.id === 'text_byBlock') {
                // Apply vrot for the entire block (textarea or contenteditable)
                targetElement.style.fontVariationSettings = `'vrot' ${vrotValue}`;
            }
        }
    }

    // Function to apply font size to each child element in a contenteditable div
    function applyFontSizeToContentEditable(contentEditableDiv, fontSize) {
        contentEditableDiv.querySelectorAll('.letter').forEach(letter => {
            letter.style.fontSize = `${fontSize}px`;
        });
    }

    // Handle vrot value for individual letter in contenteditable div
    function handleLetterVrot(contentEditableDiv, vrotValue) {
        const selectedLetter = contentEditableDiv.querySelector('.selected-letter');

        if (selectedLetter) {
            selectedLetter.style.fontVariationSettings = `'vrot' ${vrotValue}`;
        }
    }

    // Add the input event listener to the sliders dynamically
    const sliders = document.querySelectorAll('input[type=range]');
    sliders.forEach(slider => {
        slider.addEventListener('input', handleSlider);
    });

    // Enable caret visibility and height adjustment for textareas
    const elements = document.querySelectorAll('textarea, div[contenteditable="true"]');
    elements.forEach(element => {
        if (element.tagName.toLowerCase() === 'textarea') {
            element.style.caretColor = 'black'; // Show the blinking caret in textarea
            adjustHeight(element); // Adjust height on load
            element.addEventListener('input', () => adjustHeight(element));
        } else if (element.tagName.toLowerCase() === 'div') {
            element.style.caretColor = 'black'; // For contenteditable divs, ensure caret visibility
        }
    });

    // Handle letter selection for byLetter contenteditable div
    const byLetterDiv = document.getElementById('text_byLetter');
    byLetterDiv.addEventListener('click', function(event) {
        const clickedElement = event.target;
        if (clickedElement.classList.contains('letter')) {
            // Remove 'selected-letter' class from all letters
            byLetterDiv.querySelectorAll('.letter').forEach(letter => letter.classList.remove('selected-letter'));

            // Add 'selected-letter' class to the clicked letter
            clickedElement.classList.add('selected-letter');

            // Move the caret after the clicked letter
            placeCaretAfterSelectedLetter(clickedElement);
        }
    });

    // Function to place the caret after the selected letter in contenteditable div
    function placeCaretAfterSelectedLetter(selectedElement) {
        const range = document.createRange();
        const sel = window.getSelection();

        if (selectedElement) {
            range.setStartAfter(selectedElement); // Place the caret after the selected element
            range.collapse(true); // Collapse the range to move the caret
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
});




// // const minVrot = 100;
// // const maxVrot = 700;

// // Controls:

// document.addEventListener('DOMContentLoaded', function() {
//     const fontSizeSlider = document.getElementById('fontSizeSlider_byBlock');
//     const fontSizeLabel = document.getElementById('fontSizeLabel_byBlock');
//     // const fontSizeSlider_byLetter = document.getElementById('fontSizeSlider_byLetter');
//     // const fontSizeLabel_byLetter  = document.getElementById('fontSizeLabel_byLetter');
//     // const wrapperDiv = document.getElementById('wrapper');
//     const controls = document.querySelector('.controls');
//     const text_block = document.getElementById('text_byBlock');

//     let fontSize = fontSizeSlider.value + 'px';

//     // move label with slider thumb
//     function updateSliderLabel() {
//         const sliderRect = fontSizeSlider.getBoundingClientRect();
//         const thumbWidth = 20; // Approximate width of the slider thumb
//         // future add here width for title and correct css
//         const sliderWidth = sliderRect.width - thumbWidth;
//         const sliderMin = fontSizeSlider.min;
//         const sliderMax = fontSizeSlider.max;
//         const sliderValue = fontSizeSlider.value;
//         const sliderPercent = (sliderValue - sliderMin) / (sliderMax - sliderMin);
//         const labelLeft = sliderPercent * sliderWidth + thumbWidth / 2;

//         if (getComputedStyle(controls).flexDirection != 'row-reverse') { // future refactor
//             fontSizeLabel.style.right = `${labelLeft}px`;
//             fontSizeLabel.style.left = 'auto';
//         } else { // not used
//             fontSizeLabel.style.left = `${labelLeft}px`;
//             fontSizeLabel.style.right = 'auto';
//         }
//         fontSizeLabel.textContent = `${sliderValue}`;
//         text_block.style.fontSize = `${sliderValue}px`;

//         adjustHeight();  // Recalculate the height to fit the new font size
//     }

//     fontSizeSlider.addEventListener('input', updateSliderLabel);

//     // TODO update value on load
//     fontSizeSlider.addEventListener('input', function() {
//         fontSize = fontSizeSlider.value;
//         fontSizeLabel.textContent = fontSize;
//         text_block.style.fontSize = fontSize + 'px';
//     });

//     updateSliderLabel();

//     // Function to adjust the height of the textarea
//     function adjustHeight() {
//         text_block.style.height = 'auto';  // Reset the height
//         text_block.style.height = text_block.scrollHeight + 'px';  // Set the height based on scrollHeight
//     }

//     // Adjust the height when the content changes
//     text_block.addEventListener('input', adjustHeight);

//     // Adjust the height initially in case there is pre-filled content
//     adjustHeight();
// });

