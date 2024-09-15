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