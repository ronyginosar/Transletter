document.addEventListener('DOMContentLoaded', function() {

    const mediaQuery = window.matchMedia('(max-width: 768px)');


    // Function to adjust the height of a textarea
    // note: left here as a reference for future, disabled for now
    function adjustHeight(element) {
        // if (element.tagName.toLowerCase() === 'textarea') {
            // element.style.height = 'auto';
            // element.style.height = element.scrollHeight + 'px'; 
            // console.log(element.scrollHeight, element.scrollHeight > element.clientHeight);
        // }
    }

    // Function to update the slider label's position based on the thumb's location
    function updateSliderLabelPosition(slider, label) {
        const sliderRect = slider.getBoundingClientRect();
        const thumbWidth = 20; // Approximate width of the slider thumb
        const sliderWidth = sliderRect.width - thumbWidth;
        const sliderMin = slider.min;
        const sliderMax = slider.max;
        const sliderValue = slider.value;
        const sliderPercent = (sliderValue - sliderMin) / (sliderMax - sliderMin); // Calculate percentage of slider

        const labelLeft = (1 - sliderPercent) * sliderWidth + thumbWidth / 2;
        label.style.left = `${labelLeft}px`; // Update the label's position
        label.textContent = sliderValue; // Update the label's content
    }

    // General slider handling function for font size and vrot control
    function handleSlider(event) {
        const slider = event.target;
        const sliderContainer = slider.closest('.slider-container');
        const sliderLabel = sliderContainer.querySelector('.slider-label');
        const container = slider.closest('.container');
        const targetElement = container.querySelector('textarea, div[contenteditable="true"]'); 

        // Update the slider label's position
        updateSliderLabelPosition(slider, sliderLabel);

        // Check which slider is being controlled (font size or vrot)
        if (slider.id.includes('fontSizeSlider')) {
            if (targetElement.tagName.toLowerCase() === 'textarea') {
                targetElement.style.fontSize = `${slider.value}px`;
                adjustHeight(targetElement);
            } else if (targetElement.tagName.toLowerCase() === 'div') {
                applyFontSizeToContentEditable(targetElement, slider.value);
            }
        } else if (slider.id.includes('fontVrotSlider')) {
            const vrotValue = slider.value;

            if (targetElement.id === 'text_byLetter') {
                handleLetterVrot(targetElement, vrotValue);
            } else if (targetElement.id === 'text_byBlock') {
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

    // Add the input event listener to the sliders
    const sliders = document.querySelectorAll('input[type=range]');
    sliders.forEach(slider => {
        const sliderContainer = slider.closest('.slider-container');
        const sliderLabel = sliderContainer.querySelector('.slider-label');
        updateSliderLabelPosition(slider, sliderLabel); // Initialize the label position on page load
        slider.addEventListener('input', handleSlider); // Update the label on input
    });

    // Enable caret visibility and height adjustment for textareas and contenteditable divs
    const elements = document.querySelectorAll('textarea, div[contenteditable="true"]');
    // const caretColor = getComputedStyle(document.documentElement).getPropertyValue('--background-color').trim();

    // elements.forEach(element => {
    //     if (element.tagName.toLowerCase() === 'textarea') {
    //         // element.style.caretColor = 'black'; // Show the blinking caret
    //         element.style.caretColor = caretColor; // Show the blinking caret
    //         adjustHeight(element); // Adjust height on load
    //         element.addEventListener('input', () => adjustHeight(element));
    //     } else if (element.tagName.toLowerCase() === 'div') {
    //         // element.style.caretColor = 'black'; // Show the blinking caret for contenteditable
    //         element.style.caretColor = caretColor; // Show the blinking caret for contenteditable
    //     }
    // });

    // Function to refocus the element to keep the caret blinking
    function maintainCaretFocus(element) {
        // element.addEventListener('blur', function() {
            // Refocus the element after losing focus unless it's clicked inside
            // setTimeout(() => {
                // if (!document.activeElement || document.activeElement.tagName !== 'IFRAME') {
                    element.focus(); // Refocus to keep caret blinking
                // }
            // }, 0);
        // });

        // element.addEventListener('click', function() {
            // If the element is clicked, allow it to handle focus naturally
            // element.focus();
        // });
    }
    
    elements.forEach(element => {
        if (element.tagName.toLowerCase() === 'textarea') {
            // Adjust height and set caret color
            element.style.caretColor = 'var(--background-color)';
            adjustHeight(element);
            element.addEventListener('input', () => adjustHeight(element));
    
            // Sync the slider with the actual computed font size
            const fontSizeSlider = element.closest('.container').querySelector('input[id^="fontSizeSlider"]');
            if (fontSizeSlider) {
                syncSliderWithFontSize(fontSizeSlider, element); // Sync slider value with computed font size
            }

            // Add focus management for the blinking caret
            // maintainCaretFocus(element);
    
        } else if (element.tagName.toLowerCase() === 'div') {
            // Set caret color for contenteditable divs
            element.style.caretColor = 'var(--background-color)';
    
            // Sync the slider with the actual computed font size
            const fontSizeSlider = element.closest('.container').querySelector('input[id^="fontSizeSlider"]');
            if (fontSizeSlider) {
                syncSliderWithFontSize(fontSizeSlider, element); // Sync slider value with computed font size
            }

            // Add focus management for the blinking caret
            // maintainCaretFocus(element);

        }
    });

    // Handle letter selection for byLetter contenteditable div
    const byLetterDiv = document.getElementById('text_byLetter');
    let selectedLetterIndex = 0;

    // Function to wrap each letter in a <span>
    function wrapLettersInSpans(textArea) {
        const fullText = textArea.textContent;
        const wrappedHTML = Array.from(fullText).map((char, index) => {
            const isSelected = index === selectedLetterIndex ? 'selected-letter' : '';
            // Replace space with <br> if small screen
            if (char === ' ' && mediaQuery.matches) {
                return '<br>';
            }
            return `<span class="letter ${isSelected}" data-index="${index}">${char}</span>`;
        }).join('');

        textArea.innerHTML = wrappedHTML; // Insert HTML into the contenteditable div
        const lastLetter = textArea.querySelector('.letter:last-child');
        placeCaretAfterSelectedLetter(lastLetter); // Place caret at the end of content
    }

    // Initialize the text_byLetter div
    wrapLettersInSpans(byLetterDiv);

    // Function to handle letter click
    function handleLetterClick(event) {
        const clickedElement = event.target;

        if (clickedElement.classList.contains('letter')) {
            byLetterDiv.querySelectorAll('.letter').forEach(letter => letter.classList.remove('selected-letter'));
            clickedElement.classList.add('selected-letter');
            selectedLetterIndex = parseInt(clickedElement.dataset.index); // Update selected index
            placeCaretAfterSelectedLetter(clickedElement); // Move the caret after the selected letter
        }
    }

    byLetterDiv.addEventListener('click', handleLetterClick);

    // Update vrot value for the selected letter
    const fontVrotSlider_byLetter = document.getElementById('fontVrotSlider_byLetter');
    fontVrotSlider_byLetter.addEventListener('input', updateVrotForSelectedLetter);

    function updateVrotForSelectedLetter() {
        const selectedLetter = byLetterDiv.querySelector('.selected-letter');
        const vrotValue = fontVrotSlider_byLetter.value;
        if (selectedLetter) {
            selectedLetter.style.fontVariationSettings = `'vrot' ${vrotValue}`;
        }
    }

    // Function to place the caret after the selected letter
    function placeCaretAfterSelectedLetter(selectedElement) {
        const range = document.createRange();
        const sel = window.getSelection();

        if (selectedElement) {
            range.setStartAfter(selectedElement); // Place the caret after the selected element
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }

    // Function to sync slider value with actual computed font size on load
    function syncSliderWithFontSize(slider, element) {
        const computedFontSize = parseFloat(getComputedStyle(element).fontSize); // Get the computed font size
        slider.value = computedFontSize; // Set the slider value to match the computed font size
        const sliderLabel = slider.closest('.slider-container').querySelector('.slider-label');
        updateSliderLabelPosition(slider, sliderLabel); // Update the label based on the new value
    }

    // Place caret initially at the start of the first letter
    placeCaretAfterSelectedLetter(byLetterDiv.querySelector('.letter'));

    // Listen for new text input to wrap newly typed content
    byLetterDiv.addEventListener('input', function() {
        wrapLettersInSpans(byLetterDiv);
    });
});




// document.addEventListener('DOMContentLoaded', function() {
//     // Function to adjust the height of a textarea or contenteditable div
//     function adjustHeight(element) {
//         if (element.tagName.toLowerCase() === 'textarea') {
//             element.style.height = 'auto';
//             element.style.height = element.scrollHeight + 'px';
//         }
//     }

//     // Function to update the slider label's position based on the thumb's location
//     function updateSliderLabelPosition(slider, label) {
//         const sliderRect = slider.getBoundingClientRect();
//         const thumbWidth = 20; // Approximate width of the slider thumb
//         const sliderWidth = sliderRect.width - thumbWidth;
//         const sliderMin = slider.min;
//         const sliderMax = slider.max;
//         const sliderValue = slider.value;
//         const sliderPercent = (sliderValue - sliderMin) / (sliderMax - sliderMin); // Calculate percentage of slider

//         // Calculate label position
//         // const labelLeft = sliderPercent * sliderWidth + thumbWidth / 2;
//         // label.style.left = `${labelLeft}px`; // Update the label's position
//         // label.textContent = sliderValue; // Update the label's content

//         // Fix: Invert the direction of label movement
//         const labelLeft = (1 - sliderPercent) * sliderWidth + thumbWidth / 2;
//         label.style.left = `${labelLeft}px`; // Update the label's position
//         label.textContent = sliderValue; // Update the label's content
//     }

//     // General slider handling function for font size and vrot control
//     function handleSlider(event) {
//         const slider = event.target;
//         const sliderContainer = slider.closest('.slider-container');
//         const sliderLabel = sliderContainer.querySelector('.slider-label');
//         const container = slider.closest('.container'); // Find the container that holds both the controls and the target element
//         const targetElement = container.querySelector('textarea, div[contenteditable="true"]'); // Query the textarea or contenteditable div inside the container

//         // Update the slider label's position
//         updateSliderLabelPosition(slider, sliderLabel);

//         // Check which slider is being controlled (font size or vrot)
//         if (slider.id.includes('fontSizeSlider')) {
//             if (targetElement.tagName.toLowerCase() === 'textarea') {
//                 // For textareas, apply font size directly
//                 targetElement.style.fontSize = `${slider.value}px`;
//                 adjustHeight(targetElement);
//             } else if (targetElement.tagName.toLowerCase() === 'div') {
//                 // For contenteditable divs, apply inline font size to each child node
//                 applyFontSizeToContentEditable(targetElement, slider.value);
//             }
//         } else if (slider.id.includes('fontVrotSlider')) {
//             const vrotValue = slider.value;

//             // Handle for the byLetter contenteditable div
//             if (targetElement.id === 'text_byLetter') {
//                 handleLetterVrot(targetElement, vrotValue);
//             } else if (targetElement.id === 'text_byBlock') {
//                 // Apply vrot for the entire block (textarea or contenteditable)
//                 targetElement.style.fontVariationSettings = `'vrot' ${vrotValue}`;
//             }
//         }
//     }

//     // Function to apply font size to each child element in a contenteditable div
//     function applyFontSizeToContentEditable(contentEditableDiv, fontSize) {
//         contentEditableDiv.querySelectorAll('.letter').forEach(letter => {
//             letter.style.fontSize = `${fontSize}px`;
//         });
//     }

//     // Handle vrot value for individual letter in contenteditable div
//     function handleLetterVrot(contentEditableDiv, vrotValue) {
//         const selectedLetter = contentEditableDiv.querySelector('.selected-letter');

//         if (selectedLetter) {
//             selectedLetter.style.fontVariationSettings = `'vrot' ${vrotValue}`;
//         }
//     }

//     // Add the input event listener to the sliders dynamically
//     const sliders = document.querySelectorAll('input[type=range]');
//     sliders.forEach(slider => {
//         const sliderContainer = slider.closest('.slider-container');
//         const sliderLabel = sliderContainer.querySelector('.slider-label');

//         // Initialize the label position on page load
//         updateSliderLabelPosition(slider, sliderLabel);

//         // Update the label position when the slider is used
//         slider.addEventListener('input', handleSlider);
//     });

//     // Enable caret visibility and height adjustment for textareas
//     const elements = document.querySelectorAll('textarea, div[contenteditable="true"]');
//     elements.forEach(element => {
//         if (element.tagName.toLowerCase() === 'textarea') {
//             element.style.caretColor = 'white'; // Show the blinking caret in textarea
//             adjustHeight(element); // Adjust height on load
//             element.addEventListener('input', () => adjustHeight(element));
//         } else if (element.tagName.toLowerCase() === 'div') {
//             element.style.caretColor = 'white'; // For contenteditable divs, ensure caret visibility
//         }
//     });

//     // Handle letter selection for byLetter contenteditable div
//     const byLetterDiv = document.getElementById('text_byLetter');
//     byLetterDiv.addEventListener('click', function(event) {
//         const clickedElement = event.target;
//         if (clickedElement.classList.contains('letter')) {
//             // Remove 'selected-letter' class from all letters
//             byLetterDiv.querySelectorAll('.letter').forEach(letter => letter.classList.remove('selected-letter'));

//             // Add 'selected-letter' class to the clicked letter
//             clickedElement.classList.add('selected-letter');

//             // Move the caret after the clicked letter
//             placeCaretAfterSelectedLetter(clickedElement);
//         }
//     });

//     // // Function to place the caret after the selected letter in contenteditable div
//     // function placeCaretAfterSelectedLetter(selectedElement) {
//     //     const range = document.createRange();
//     //     const sel = window.getSelection();

//     //     if (selectedElement) {
//     //         range.setStartAfter(selectedElement); // Place the caret after the selected element
//     //         range.collapse(true); // Collapse the range to move the caret
//     //         sel.removeAllRanges();
//     //         sel.addRange(range);
//     //     }
//     // }


//     const text_byLetter = document.getElementById('text_byLetter');
//     const fontVrotSlider_byLetter = document.getElementById('fontVrotSlider_byLetter');
//     let selectedLetterIndex = 0; // To keep track of the currently selected letter

//     // Function to wrap each letter in a <span>
//     function wrapLettersInSpans(textArea) {
//         const fullText = textArea.textContent; // Use textContent to get the plain text
//         const wrappedHTML = Array.from(fullText).map((char, index) => {
//             // Highlight the first letter as selected by default or retain selection if necessary
//             const isSelected = index === selectedLetterIndex ? 'selected-letter' : '';
//             return `<span class="letter ${isSelected}" data-index="${index}">${char}</span>`;
//         }).join('');

//         textArea.innerHTML = wrappedHTML; // Insert HTML into the contenteditable div

//         // Move the caret to the end of the newly typed content (after the last letter)
//         const lastLetter = textArea.querySelector('.letter:last-child');
//         placeCaretAfterSelectedLetter(lastLetter);
//     }

//     // Initialize the text_byLetter div by wrapping letters in spans
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

//     // Function to place the caret after the selected letter
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
//     placeCaretAfterSelectedLetter(text_byLetter.querySelector('.letter'));

//     // Listen for new text input to wrap newly typed content
//     text_byLetter.addEventListener('input', function() {
//         wrapLettersInSpans(text_byLetter); // Re-wrap the content on each input
//     });
// });









// document.addEventListener('DOMContentLoaded', function() {
//     // Function to adjust the height of a textarea or contenteditable div
//     function adjustHeight(element) {
//         if (element.tagName.toLowerCase() === 'textarea') {
//             element.style.height = 'auto';
//             element.style.height = element.scrollHeight + 'px';
//         }
//     }

//     // Function to update the slider label's position based on the thumb's location
//     function updateSliderLabelPosition(slider, label) {
//         const sliderRect = slider.getBoundingClientRect();
//         const thumbWidth = 20; // Approximate width of the slider thumb
//         const sliderWidth = sliderRect.width - thumbWidth;
//         const sliderMin = slider.min;
//         const sliderMax = slider.max;
//         const sliderValue = slider.value;
//         const sliderPercent = (sliderValue - sliderMin) / (sliderMax - sliderMin); // Calculate percentage of slider

//         // Calculate label position
//         // const labelLeft = sliderPercent * sliderWidth + thumbWidth / 2;
//         // label.style.left = `${labelLeft}px`; // Update the label's position
//         // label.textContent = sliderValue; // Update the label's content

//         // Fix: Invert the direction of label movement
//         const labelLeft = (1 - sliderPercent) * sliderWidth + thumbWidth / 2;
//         label.style.left = `${labelLeft}px`; // Update the label's position
//         label.textContent = sliderValue; // Update the label's content
//     }

//     // General slider handling function for font size and vrot control
//     function handleSlider(event) {
//         const slider = event.target;
//         const sliderContainer = slider.closest('.slider-container');
//         const sliderLabel = sliderContainer.querySelector('.slider-label');
//         const container = slider.closest('.container'); // Find the container that holds both the controls and the target element
//         const targetElement = container.querySelector('textarea, div[contenteditable="true"]'); // Query the textarea or contenteditable div inside the container

//         // Update the slider label's position
//         updateSliderLabelPosition(slider, sliderLabel);

//         // Check which slider is being controlled (font size or vrot)
//         if (slider.id.includes('fontSizeSlider')) {
//             if (targetElement.tagName.toLowerCase() === 'textarea') {
//                 // For textareas, apply font size directly
//                 targetElement.style.fontSize = `${slider.value}px`;
//                 adjustHeight(targetElement);
//             } else if (targetElement.tagName.toLowerCase() === 'div') {
//                 // For contenteditable divs, apply inline font size to each child node
//                 applyFontSizeToContentEditable(targetElement, slider.value);
//             }
//         } else if (slider.id.includes('fontVrotSlider')) {
//             const vrotValue = slider.value;

//             // Handle for the byLetter contenteditable div
//             if (targetElement.id === 'text_byLetter') {
//                 handleLetterVrot(targetElement, vrotValue);
//             } else if (targetElement.id === 'text_byBlock') {
//                 // Apply vrot for the entire block (textarea or contenteditable)
//                 targetElement.style.fontVariationSettings = `'vrot' ${vrotValue}`;
//             }
//         }
//     }

//     // Function to apply font size to each child element in a contenteditable div
//     function applyFontSizeToContentEditable(contentEditableDiv, fontSize) {
//         contentEditableDiv.querySelectorAll('.letter').forEach(letter => {
//             letter.style.fontSize = `${fontSize}px`;
//         });
//     }

//     // Handle vrot value for individual letter in contenteditable div
//     function handleLetterVrot(contentEditableDiv, vrotValue) {
//         const selectedLetter = contentEditableDiv.querySelector('.selected-letter');

//         if (selectedLetter) {
//             selectedLetter.style.fontVariationSettings = `'vrot' ${vrotValue}`;
//         }
//     }

//     // Add the input event listener to the sliders dynamically
//     const sliders = document.querySelectorAll('input[type=range]');
//     sliders.forEach(slider => {
//         const sliderContainer = slider.closest('.slider-container');
//         const sliderLabel = sliderContainer.querySelector('.slider-label');

//         // Initialize the label position on page load
//         updateSliderLabelPosition(slider, sliderLabel);

//         // Update the label position when the slider is used
//         slider.addEventListener('input', handleSlider);
//     });

//     // Enable caret visibility and height adjustment for textareas
//     const elements = document.querySelectorAll('textarea, div[contenteditable="true"]');
//     elements.forEach(element => {
//         if (element.tagName.toLowerCase() === 'textarea') {
//             element.style.caretColor = 'black'; // Show the blinking caret in textarea
//             adjustHeight(element); // Adjust height on load
//             element.addEventListener('input', () => adjustHeight(element));
//         } else if (element.tagName.toLowerCase() === 'div') {
//             element.style.caretColor = 'black'; // For contenteditable divs, ensure caret visibility
//         }
//     });

//     // Handle letter selection for byLetter contenteditable div
//     const byLetterDiv = document.getElementById('text_byLetter');
//     byLetterDiv.addEventListener('click', function(event) {
//         const clickedElement = event.target;
//         if (clickedElement.classList.contains('letter')) {
//             // Remove 'selected-letter' class from all letters
//             byLetterDiv.querySelectorAll('.letter').forEach(letter => letter.classList.remove('selected-letter'));

//             // Add 'selected-letter' class to the clicked letter
//             clickedElement.classList.add('selected-letter');

//             // Move the caret after the clicked letter
//             placeCaretAfterSelectedLetter(clickedElement);
//         }
//     });

//     // Function to place the caret after the selected letter in contenteditable div
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
// });


// // for div etitable
// document.addEventListener('DOMContentLoaded', function() {
//     const text_byLetter = document.getElementById('text_byLetter');
//     const fontVrotSlider_byLetter = document.getElementById('fontVrotSlider_byLetter');
//     let selectedLetterIndex = 0; // To keep track of the currently selected letter

//     // Function to wrap each letter in a <span>
//     function wrapLettersInSpans(textArea) {
//         const fullText = textArea.textContent; // Use textContent to get the plain text
//         const wrappedHTML = Array.from(fullText).map((char, index) => {
//             // Highlight the first letter as selected by default or retain selection if necessary
//             const isSelected = index === selectedLetterIndex ? 'selected-letter' : '';
//             return `<span class="letter ${isSelected}" data-index="${index}">${char}</span>`;
//         }).join('');

//         textArea.innerHTML = wrappedHTML; // Insert HTML into the contenteditable div

//         // Move the caret to the end of the newly typed content (after the last letter)
//         const lastLetter = textArea.querySelector('.letter:last-child');
//         placeCaretAfterSelectedLetter(lastLetter);
//     }

//     // Initialize the text_byLetter div by wrapping letters in spans
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

//     // Function to place the caret after the selected letter
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
//     placeCaretAfterSelectedLetter(text_byLetter.querySelector('.letter'));

//     // Listen for new text input to wrap newly typed content
//     text_byLetter.addEventListener('input', function() {
//         wrapLettersInSpans(text_byLetter); // Re-wrap the content on each input
//     });
// });

