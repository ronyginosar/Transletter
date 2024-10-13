
// const minVrot = 100;
// const maxVrot = 700;

// Controls:

document.addEventListener('DOMContentLoaded', function() {
    const fontSizeSlider = document.getElementById('fontSizeSlider_byBlock');
    const fontSizeLabel = document.getElementById('fontSizeLabel_byBlock');
    // const fontSizeSlider_byLetter = document.getElementById('fontSizeSlider_byLetter');
    // const fontSizeLabel_byLetter  = document.getElementById('fontSizeLabel_byLetter');
    // const wrapperDiv = document.getElementById('wrapper');
    const controls = document.querySelector('.controls');
    const text_block = document.getElementById('text_byBlock');

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

        if (getComputedStyle(controls).flexDirection != 'row-reverse') { // future refactor
            fontSizeLabel.style.right = `${labelLeft}px`;
            fontSizeLabel.style.left = 'auto';
        } else { // not used
            fontSizeLabel.style.left = `${labelLeft}px`;
            fontSizeLabel.style.right = 'auto';
        }
        fontSizeLabel.textContent = `${sliderValue}`;
        text_block.style.fontSize = `${sliderValue}px`;
    }

    fontSizeSlider.addEventListener('input', updateSliderLabel);

    // TODO update value on load
    fontSizeSlider.addEventListener('input', function() {
        fontSize = fontSizeSlider.value;
        fontSizeLabel.textContent = fontSize;
        text_block.style.fontSize = fontSize + 'px';
    });

    updateSliderLabel();
});

