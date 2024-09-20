function randomvrot(){
    randomVar_1 = Math.ceil(Math.random() * 700);
    randomVar_2 = Math.ceil(Math.random() * 700);
    randomVar_3 = Math.ceil(Math.random() * 700);
    randomVar_4 = Math.ceil(Math.random() * 700);
    // console.log(randomVar);

    var x = document.getElementsByClassName("class-first");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.fontVariationSettings = '"vrot" ' + randomVar_1;
    }

    var y = document.getElementsByClassName("class-second");
    var h;
    for (h = 0; h < y.length; h++) {
        y[h].style.fontVariationSettings = '"vrot" ' + randomVar_2;
    }

    var z = document.getElementsByClassName("class-third");
    var k;
    for (k = 0; k < z.length; k++) {
        z[k].style.fontVariationSettings = '"vrot" ' + randomVar_3;
    }

    var t = document.getElementsByClassName("class-forth");
    var j;
    for (j = 0; j < t.length; j++) {
        t[j].style.fontVariationSettings = '"vrot" ' + randomVar_4;
    }

    setTimeout(function(){ randomvrot(); }, 2500);
}
setTimeout(function(){ randomvrot(); }, 500);


// Controls:

document.addEventListener('DOMContentLoaded', function() {
    const fontSizeSlider = document.getElementById('fontSizeSlider');
    const fontSizeLabel = document.getElementById('fontSizeLabel');
    const rangePara = document.getElementById('rangePara');
    const colorToggle = document.getElementById('colorToggle');
    const controls = document.querySelector('.controls');


    let fontSize = fontSizeSlider.value + 'px';

    // move label with slider thumb
    function updateSliderLabel() {
        const sliderRect = fontSizeSlider.getBoundingClientRect();
        const thumbWidth = 20; // Approximate width of the slider thumb
        // future add here width for title and correct css
        const sliderWidth = sliderRect.width - thumbWidth;
        const sliderMin = fontSizeSlider.min;
        const sliderMax = fontSizeSlider.max;
        const sliderValue = fontSizeSlider.value;
        const sliderPercent = (sliderValue - sliderMin) / (sliderMax - sliderMin);
        const labelLeft = sliderPercent * sliderWidth + thumbWidth / 2;

        if (getComputedStyle(controls).flexDirection === 'row-reverse') {
            fontSizeLabel.style.right = `${labelLeft}px`;
            fontSizeLabel.style.left = 'auto';
        } else {
            fontSizeLabel.style.left = `${labelLeft}px`;
            fontSizeLabel.style.right = 'auto';
        }
        fontSizeLabel.textContent = `${sliderValue}`;
        rangePara.style.fontSize = `${sliderValue}px`;
    }

    fontSizeSlider.addEventListener('input', updateSliderLabel);

    fontSizeSlider.addEventListener('input', function() {
        fontSize = fontSizeSlider.value;
        fontSizeLabel.textContent = fontSize;
        rangePara.style.fontSize = fontSize + 'px';
    });

    colorToggle.addEventListener('click', function() {
        if (rangePara.style.color === 'black') {
            rangePara.style.color = 'white';
            colorToggle.style.backgroundColor = 'black';
        } else {
            rangePara.style.color = 'black';
            colorToggle.style.backgroundColor = 'white';
        }
    });

    // Initialize the color toggle button
    rangePara.style.color = 'black';
    colorToggle.style.backgroundColor = 'white';
    updateSliderLabel();
});

// Editable Section randomize vrot axis of font
document.addEventListener('DOMContentLoaded', function() {
    const editableSection = document.querySelector('.editable-section');
    const minVrot = 100; // Set your minimum vrot value here
    const maxVrot = 700; // Set your maximum vrot value here
    /* for ('../assets/font/Transletter_v7VF.ttf') : min 100, max 700 */

    editableSection.addEventListener('keypress', function(event) {
        // Prevent default behavior to avoid raw text insertion
        event.preventDefault();

        const char = event.key; // Get the key that was pressed

        if (event.keyCode === 32) { // space key
            // Handle the space key: insert an actual space and move the caret
            // insertAtCaret(document.createTextNode(' ')); // to avoid browser interp to space
            insertAtCaret(document.createTextNode('\u00A0')); // Insert non-breaking space
            return; // Skip further processing for space
        }

        if (char.length === 1) { // Only process printable characters
            const randomVrot = Math.floor(Math.random() * (maxVrot - minVrot + 1)) + minVrot;

            // Create a new span for the typed character
            const newSpan = document.createElement('span');
            newSpan.style.fontVariationSettings = `'vrot' ${randomVrot}`;
            newSpan.textContent = char;

            // Insert the new span at the caret position
            insertAtCaret(newSpan);

            // Place caret at the end after insertion
            placeCaretAtEnd(editableSection);
        }
    });

    function insertAtCaret(node) {
        const sel = window.getSelection();
        if (sel.rangeCount > 0) {
            const range = sel.getRangeAt(0);
            range.deleteContents(); // Remove any selected content
            range.insertNode(node); // Insert the new span or space at the caret position
            range.setStartAfter(node); // Move caret to after the inserted node
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }

    function placeCaretAtEnd(el) {
        el.focus();
        if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
            const range = document.createRange();
            range.selectNodeContents(el);
            range.collapse(false);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
});






// document.addEventListener('DOMContentLoaded', function() {
//     const editableSection = document.querySelector('.editable-section');
//     const minVrot = 100; // Set your minimum vrot value here
//     const maxVrot = 700; // Set your maximum vrot value here
//     /* for ('../assets/font/Transletter_v7VF.ttf') : min 100, max 700 */

//     let previousLength = 0;

//     // editableSection.addEventListener('input', function(event) {
//     //     const text = editableSection.innerText;
//     //     const currentLength = text.length;

//     //     if (currentLength > previousLength) {
//     //         const newChar = text.slice(previousLength);
//     //         const randomVrot = Math.floor(Math.random() * (maxVrot - minVrot + 1)) + minVrot;
//     //         const newSpan = document.createElement('span');
//     //         newSpan.style.fontVariationSettings = `'vrot' ${randomVrot}`;
//     //         newSpan.textContent = newChar;

//     //         // Append the new span with the random vrot value
//     //         editableSection.appendChild(newSpan);

//     //                     // Remove the last added text node to avoid duplication
//     //                     const lastTextNode = editableSection.childNodes[editableSection.childNodes.length - 2];
//     //                     if (lastTextNode && lastTextNode.nodeType === Node.TEXT_NODE) {
//     //                         editableSection.removeChild(lastTextNode);
//     //                     }
            

//     //         // Update previousLength to currentLength
//     //         previousLength = currentLength;
//     //     } else if (currentLength < previousLength) {
//     //         previousLength = currentLength;
//     //     }

//     //     placeCaretAtEnd(editableSection);
//     // });

//     editableSection.addEventListener('input', function(event) {
//         const textNodes = Array.from(editableSection.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
//         const newChar = textNodes.length > 0 ? textNodes[0].nodeValue : ''; // Get any raw text nodes if present
//         const currentLength = editableSection.innerText.length;

//         // If new characters are added
//         if (event.inputType === 'insertText' && newChar.length > 0) {
//             const randomVrot = Math.floor(Math.random() * (maxVrot - minVrot + 1)) + minVrot;
//             const newSpan = document.createElement('span');
//             newSpan.style.fontVariationSettings = `'vrot' ${randomVrot}`;
//             newSpan.textContent = newChar;

//             // Append the new span and remove the raw text node
//             editableSection.appendChild(newSpan);
//             textNodes[0].remove();

//             // Update the previous length
//             previousLength = currentLength;
//         } else if (currentLength < previousLength) {
//             // If characters are deleted, update previousLength
//             previousLength = currentLength;
//         }

//         placeCaretAtEnd(editableSection);
//     });

//     function placeCaretAtEnd(el) {
//         el.focus();
//         if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
//             const range = document.createRange();
//             range.selectNodeContents(el);
//             range.collapse(false);
//             const sel = window.getSelection();
//             sel.removeAllRanges();
//             sel.addRange(range);
//         }
//     }
// });


// const fontSizeSlider = document.getElementById('fontSizeSlider');
// const fontSizeLabel = document.getElementById('fontSizeLabel');
// const rangePara = document.getElementById('rangePara');
// const colorToggle = document.getElementById('colorToggle');

// let fontSize = fontSizeSlider.value + 'px';


// fontSizeSlider.addEventListener('input', function() {
//     const fontSize = fontSizeSlider.value + 'px';
//     fontSizeLabel.textContent = fontSize;
//     rangePara.style.fontSize = fontSize;
// });

// colorToggle.addEventListener('click', function() {
//     if (rangePara.style.color === 'black') {
//         rangePara.style.color = 'white';
//         colorToggle.style.backgroundColor = 'black';
//     } else {
//         rangePara.style.color = 'black';
//         colorToggle.style.backgroundColor = 'white';
//     }
// });

// // Initialize the color toggle button
// rangePara.style.color = 'black';
// colorToggle.style.backgroundColor = 'white';