const textContainer = document.getElementById('text-container');
// const text = 'placeholder for waterfall';
const text = 'אבגדהוזחטיכלמנסעפצקרשת0123456789';
const weights = [600, 500, 400, 400, 400, 400, 400, 400, 500, 600];
const vrotValues = [100, 100, 100, 200, 300, 400, 500, 600, 700, 700, 700];
// const labels = ['Semi-Bold', 'Medium', 'Regular', 'Regular', 'Regular', 'Regular', 'Regular', 'Regular', 'Medium', 'Semi-Bold'];
const labels    = ['סמי בולד',  'מדיום',  'רגיל',     'רגיל',   'רגיל',     'רגיל',    'רגיל',   'רגיל',    'מדיום',   'סמי בולד'];

for (let i = 0; i < 10; i++) {
    const info = document.createElement('small');
    info.className = 'info-text';
    // info.textContent = `wght: ${weights[i]}, vrot: ${vrotValues[i]}`;
    info.textContent = `${labels[i]} ${vrotValues[i]}`;
    textContainer.appendChild(info);

    const p = document.createElement('p');
    p.textContent = text;
    p.style.fontVariationSettings = `"wght" ${weights[i]}, "vrot" ${vrotValues[i]}`;
    textContainer.appendChild(p);
}

// function toggleWaterfall() {
//         const textContainer = document.getElementById('text-container');
//         const toggleButton = document.getElementById('toggle-button');
        
//         // if (textContainer.style.opacity === '0') {
//         if (textContainer.style.opacity !== '1') {
//             // Show the section
//             textContainer.style.opacity = '1';
    
//             // Update button text with arrow
//             toggleButton.innerHTML = 'משקלים';

//             // create inner elements
//             for (let i = 0; i < 10; i++) {
//                 const info = document.createElement('small');
//                 info.className = 'info-text';
//                 // info.textContent = `wght: ${weights[i]}, vrot: ${vrotValues[i]}`;
//                 info.textContent = `${labels[i]} ${vrotValues[i]}`;
//                 textContainer.appendChild(info);
            
//                 const p = document.createElement('p');
//                 p.textContent = text;
//                 p.style.fontVariationSettings = `"wght" ${weights[i]}, "vrot" ${vrotValues[i]}`;
//                 textContainer.appendChild(p);
//             }

//         } else {
//             // Hide the section
//             textContainer.style.opacity = '0';
            
//             // Update button text with arrow
//             toggleButton.innerHTML = 'משקלים ←';

//             // remove inner elements: delay to allow opacity transition
//             setTimeout(() => {
//                 textContainer.innerHTML = ''; // Remove inner elements
//             }, 500); // Match the transition duration
//         }
//     }
    