const mediaQuery = window.matchMedia('(max-width: 768px)');

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
// narrow screens: 
const fontSizeDownscale = 1;

// todo in narrow screen, the size slider gives not ints. 


document.addEventListener('DOMContentLoaded', function() {
    const fontSizeSlider = document.getElementById('fontSizeSlider');
    const fontSizeLabel = document.getElementById('fontSizeLabel');
    const wrapperDiv = document.getElementById('wrapper');
    const rangeParaDiv = document.getElementById('rangePara');
    const colorToggle = document.getElementById('colorToggle');
    const controls = document.querySelector('.controls');
    const editableSection = document.querySelector('.editable-section'); // for caret color toggle

    let fontSize = fontSizeSlider.value + 'px';
    // const mediaQuery = window.matchMedia('(max-width: 768px)');
    if (mediaQuery.matches) {
        // Logic for narrow screens
        fontSize /= fontSizeDownscale;
    }

    // move label with slider thumb
    function updateSliderLabel() {
        const sliderRect = fontSizeSlider.getBoundingClientRect();
        const thumbWidth = 20; // Approximate width of the slider thumb
        // future add here width for title and correct css
        // TODO
        const sliderWidth = sliderRect.width - thumbWidth;
        const sliderMin = fontSizeSlider.min;
        const sliderMax = fontSizeSlider.max;
        let sliderValue = fontSizeSlider.value;
        if (mediaQuery.matches) {
            // Logic for narrow screens
            sliderValue /= fontSizeDownscale;
        }
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
        // wrapperDiv.style.fontSize = `${sliderValue}px`;
        if(rangeParaDiv !== null) rangeParaDiv.style.fontSize = `${sliderValue}px`;
    }

    updateSliderLabel();

    fontSizeSlider.addEventListener('input', updateSliderLabel);

    fontSizeSlider.addEventListener('input', function() {
        fontSize = fontSizeSlider.value;
        if (mediaQuery.matches) {
            // Logic for narrow screens
            fontSize /= fontSizeDownscale;

            // let placeholder = document.querySelector('[contenteditable=true]:empty:before');
            // placeholder.style.fontSize = fontSize/2 + 'px';
            
        }
        fontSizeLabel.textContent = fontSize;
        // rangePara.style.fontSize = fontSize + 'px';
        editableSection.style.fontSize = fontSize + 'px';
    });

    if(colorToggle !== null){
        colorToggle.addEventListener('click', function() {
            if (wrapperDiv.style.color === 'black') {
                wrapperDiv.style.color = 'white';
                colorToggle.style.backgroundColor = 'black';
                // Change the content of the ::after pseudo-element via a CSS variable
                editableSection.style.setProperty('--caret-color', 'white');
            } else {
                wrapperDiv.style.color = 'black';
                colorToggle.style.backgroundColor = 'white';
                editableSection.style.setProperty('--caret-color', 'black');
            }
            
        });
    }


    if(colorToggle !== null){
        // Initialize the color toggle button
        wrapperDiv.style.color = 'black';
        colorToggle.style.backgroundColor = 'white';
    }

    updateSliderLabel();
});

// Editable Section randomize vrot axis of font
document.addEventListener('DOMContentLoaded', function() {
    const editableSection = document.querySelector('.editable-section');
    const minVrot = 100;
    const maxVrot = 700;
    /* for ('../assets/font/Transletter_v7VF.ttf') : min 100, max 700 */

    // if(mediaQuery.matches){
        // editableSection.setAttribute('contenteditable', 'true');
        // editableSection.setAttribute('tabindex', '0'); // Make it focusable
        // editableSection.focus();
    // }

    editableSection.addEventListener('keydown', function(event) {
        // Prevent default behavior to avoid raw text insertion
        // event.preventDefault();

        if(mediaQuery.matches){
        editableSection.setAttribute('contenteditable', 'true');
        editableSection.setAttribute('tabindex', '0'); // Make it focusable
        editableSection.focus();
        }

        const char = event.key; // Get the key that was pressed

        if (event.keyCode === 13) { // enter key
            // Handle the Enter key to insert a <br> for a new line
            event.preventDefault(); // Prevent default Enter behavior
            const brNode = document.createElement('br'); // Create a <br> element
            insertAtCaret(brNode); // Insert the <br> at the caret position   
            // Move the caret to the next line after the <br>
            insertAtCaret(document.createTextNode('\u200B')); // Zero-width space to move caret down
            return; // Skip further processing for Enter
        }

        if (event.keyCode === 32) { // space key
            // Handle the space key: insert a span containing a non-breaking space (&nbsp;) and move the caret
            const spaceSpan = document.createElement('span');
            spaceSpan.innerHTML = '&nbsp;'; // Use non-breaking space inside the span
            
            insertAtCaret(spaceSpan); // Insert the span at the caret position
            return; // Skip further processing for space
        }

        if (char.length === 1) { // Only process printable characters

            // Prevent default character insertion, allowing to use 'preventDefault'
            event.preventDefault();

            // Randomize 'vrot' for the typed character future: set deviation for this?
            const randomVrot = Math.floor(Math.random() * (maxVrot - minVrot + 1)) + minVrot;

            // Create a new span for the typed character
            const newSpan = document.createElement('span');
            newSpan.style.fontVariationSettings = `'vrot' ${randomVrot}`;
            newSpan.textContent = char;
            // Insert the new span at the caret position
            insertAtCaret(newSpan);
            // Remove any unwanted <br> tags
            removeTrailingBR(editableSection);
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

   function moveCaretAfterNode(node) {
        const range = document.createRange();
        const sel = window.getSelection();

        if (node.nextSibling) {
            range.setStartAfter(node); // If there's a next sibling, place caret after <br>
        } else {
            // If <br> is the last node, create an empty text node to position the caret correctly
            const textNode = document.createTextNode('');
            node.parentNode.appendChild(textNode);
            range.setStart(textNode, 0); // Place caret at the start of the empty text node
        }

        range.collapse(true); // Collapse the range so that it’s a caret position
        sel.removeAllRanges(); // Clear current selection
        sel.addRange(range); // Set the new range (caret) after the node
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

    // Function to remove any unwanted <br> tags inside the editable section
    function removeTrailingBR(el) {
        const brElements = el.querySelectorAll('br');
        brElements.forEach(br => {
            // Check if the <br> is the last child or unnecessary
            if (!br.nextSibling) {
                br.remove(); // Remove the trailing <br>
            }
        });
    }
});

