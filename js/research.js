
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

// Set the default selected button to be visually indicated (highlight the button for desired char)
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
// note: data in separate file: assets/content_text/research-handwritten-data.js

// Initialize the page with the default character 'alef'
injectHandwrittenImages('alef'); // nth: can be auto

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
        img.src = `../assets/content_images/research_handwritten_glyphs/${character}/${imageName}`;
        img.alt = `Handwritten version of ${character}`;

        // Create text element, initially hidden
        const textElement = document.createElement('small');
        textElement.className = 'handwritten-text-label';
        textElement.innerHTML = labels[character][index].replace(/\n/g, '<br>'); // Set text immediately
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

 
// note P2 new&simplified does not need js


// P2 - original

// Text content for each title
const textContent = {
    text1: "תנואות החל כפרוייקט שנובע מגעגוע אל העבר: אל ילדותי, אל צורת כתיבה שמגלמת בתוכה את מגע היד האישי של הכותב, את תחושותיו ורגשותיו באותו הרגע. יש בה טעויות, יש בה צורות משונות, לעיתים היא אף מאתגרת לקריאה. כאן, בעיני, גלום כל הקסם שבה. ואולי היה מתבקש שאותו געגוע נוסטלגי יקח אותי בחזרה אל המקום הגולמי, אל הקרפט, אל העיפרון. אבל משהו בי דרש עיבוד מחדש, התנתקות כמעט מוחלטת מהטכנולוגיה הידנית, כאילו מתוך התרסה ועצב על מה שעבר ואינו עוד, בניסיון לברוא עולם חדש משלי שמסגל את עצמו לתקופתנו.",
    text2: "העבודה על הפרויקט החלה במחקר טיפוגרפי ויזואלי שכלל זיהוי שלבי מעבר בתולדות הכתב העברי: החל מראשית התפתחותו של הכתב העברי הקדום, דרך השוואה של כתבי יד מן המאה ה-15 בסגנון האשכנזי והספרדי, ועד לכתיבה ידנית עכשווית של מבוגרים ושל ילדים בשלב ראשית הכתיבה. <br><br> \
תחילה חקרתי את התפתחות הכתיבה הידנית היהודית. התחקתי והתנסתי באמצעות כתיבה בעט קליגרפי אחר המסלול שעשו האותיות העבריות החל מהכתב הפרוטו סינאי, ועד ולתקופת המצאת הדפוס. בדרך עברתי בין סגנונות רבים ושונים של כתיבה בינונית ורהוטה. המשכתי ואספתי אותיות עברית רהוטות מתקופת קום המדינה: ציורי אותיות, ספרי לימוד כתיבה וקריאה, כרזות, אותיות לטרסט, וגופנים לדפוס. בהמשך, ביקשתי מאנשים בסביבתי לכתוב בכתב ידם ולשלוח לי, ואספתי ציורי אותיות של ילדים בשלב ראשית הכתיבה. כך, יצרתי לעצמי אוסף של אותיות לשאוב ממנו השראה. <br><br>\
לסיום, ניתחתי גופנים וריאביליים בולטים בשדה הטיפוגרפי העולמי, וכך התפתח המחקר הויזואלי למחקר תיאורטי העוסק בהיסטוריה של הכתב העברי ובמרחב הדיגיטלי מהיבטים טכנולוגיים וחברתיים (מתודולוגיות של תרבות הרשת, תקשורת המונים, צרכנות מודרנית).",
    // text3: "מוצר הצריכה הוא תופעה תרבותית, המורכבת מחפץ מעוצב שתהליכי ייצורו מעוגנים בחיקוי ומביאים אותו לידי פונקציונליות, תואם למקור עלום או גלוי, חדשנות בתהליכי ההמרה מהחפץ המקורי לחפץ המעוצב החדש, וגיוון הנובע מחיקוי שיש בו ’טעויות’ ותנועה בין הזהה לדומה. בחיקוי באופן פרדוקסלי מסתתרים חדשנות וגיוון, משום שהחיקוי מדמה את המקור, אבל באופן אחראדם סמית׳ 1759על פי ההגדרה של סמית, כאשר אנו מדברים על גופנים כמוצר צריכה, ובפרט על גופנים טכנולוגיים עכשווים, החיקוי מתייחס לצורתן המוכרת והמסורתית של אותיות הא’-ב’ השונות, שמקבלת איפיון מחודש על ידי גיוון, שימוש בטכנולוגיה וטרנדים חזותיים.",
    text4: "לאורך הדרך הוקסמתי ונפעמתי מהמשמעות והתרומה ההיסטורית האדירה של תנועת היד בהתפתחות מסורת הכתיבה היהודית והחלטתי להנציח לא רק את צורת האותיות עצמן, אלא את המעבר כולו. בין תקופה לתקופה, בין צורת אות אחת לאחרת, ניסיתי לחפש את שלבי המעבר. ציירתי בעפרון את הפרשנות שלי לשלבים אלו עבור כל אות ואות מהא-ב. לפעמים הדרך שעשתה תנועת היד היתה ברורה וחד משמעית ולעיתים הייתי צריכה לברוא אותה מחדש. ההשתנות עצמה, אם כך, היא חלק בלתי נפרד מהתהליך. <br> <br>\
אותה תנועה ידנית הופכת בתנואות לתנועה אנימטיבית מתוכנתת, שמונצחת בגרסה חדשה של כתב עברי. דייקתי את המעברים בעיפרון עד שהרגשתי שהאותיות מוכנות לעבור אל מסך המחשב שלי, וכך התחיל האתגר האמיתי - ללמוד את הטכנולוגיה שמאפשרת לי לייצר תנועה, ומעבר בין השלבים."
};


const imageContent = {
    text1: ['../assets/content_images/research_textimages/p1_starting_point/How_it_all_started.jpg', 
            // '../assets/content_images/ashkenazi_sfaradi_2-p-500.jpeg', 
            // '../assets/content_images/ashkenazi_sfaradi_4-p-500.jpeg'], // Section 1 images
    ],
    text2: ['../assets/content_images/ashkenazi_sfaradi_3-p-500.jpeg'

    ], // Section 2 image
    // text3: ['../assets/content_images/Dfus_1-p-500.jpeg', 
    //         '../assets/content_images/israeli_3-p-500.jpeg'
    //     ], // Section 3 images
    text4: ['../assets/content_images/research_textimages/p4_sketches/sketches_banner copy.jpg',
            '../assets/content_images/research_textimages/p4_sketches/sketches_banner_1.jpg',
            '../assets/content_images/research_textimages/p4_sketches/sketches_banner_2.jpg',
    ], // Section 4 image
    // text5: ['../assets/content_images/israeli_1-p-500.jpeg', 
    //         '../assets/content_images/history_4-p-500.jpeg'] // Section 5 images
};
    

// Function to display text and images when a title is clicked
const titles = document.querySelectorAll('#text-selector li');
const textDisplay = document.getElementById('text-display');
const imageGallery = document.getElementById('image-gallery');

// Helper function to scroll to the center image
function scrollToCenter() {
    const selectedImages = imageGallery.children;
    if (selectedImages.length > 1) {
        const middleIndex = Math.floor(selectedImages.length / 2);
        const middleImage = selectedImages[middleIndex];

        const galleryWidth = imageGallery.offsetWidth;
        const imageWidth = middleImage.offsetWidth;
        const scrollPosition = middleImage.offsetLeft - (galleryWidth / 2) + (imageWidth / 2);
        imageGallery.scrollLeft = scrollPosition;
    }
}

// note: allow this part for original:
// titles.forEach(title => {
//     title.addEventListener('click', function() {
//         const selectedText = textContent[this.dataset.text]; // Get related text
//         const selectedImages = imageContent[this.dataset.text]; // Get related images

//         // Update text
//         // textDisplay.textContent = selectedText;
//         textDisplay.innerHTML = selectedText;

//         // Clear existing images in the gallery
//         imageGallery.innerHTML = '';

//         // v1
//         // Inject images into the gallery
//         if (selectedImages) {
//             selectedImages.forEach(imageUrl => {
//                 const img = document.createElement('img');
//                 img.src = imageUrl;
//                 img.alt = `Image for ${this.textContent}`;
//                 imageGallery.appendChild(img);
//             });
//         }

//         // Center the gallery based on the number of images
//         if (selectedImages.length === 1) {
//             // Center single image
//             imageGallery.style.justifyContent = 'center';
//         } else {
//             // For multiple images, scroll to center the middle image
//             // TODO -is this working properly?
//             // TODO also - animate?
//             imageGallery.style.justifyContent = 'flex-start'; // Reset to flex-start
//             // imageGallery.style.justifyContent = 'center'; // cuts off the last image

//             const middleIndex = Math.floor(selectedImages.length / 2);
//             const middleImage = imageGallery.children[middleIndex];
            
//             // Scroll so that the middle image is centered in the gallery
//             const galleryWidth = imageGallery.offsetWidth;
//             const imageWidth = middleImage.offsetWidth;
//             const scrollPosition = middleImage.offsetLeft - (galleryWidth / 2) + (imageWidth / 2);
//             imageGallery.scrollLeft = scrollPosition;
//         }
        
//         // Remove .selected from any previously selected item
//         titles.forEach(t => t.classList.remove('selected'));

//         // Add .selected to the clicked title
//         this.classList.add('selected');
//     });
// });


// // TODO also do the image location upon load, not just when clicking

// note: allow this part for original:
// // Set default text and images for the first title on page load
// window.addEventListener('DOMContentLoaded', function() {
//     titles[0].click(); // Automatically select and display the first title

//     // const flexContainer = document.getElementById('research-flex-container');

//     // function isInView(element) {
//     //     const rect = element.getBoundingClientRect();
//     //     return rect.top < window.innerHeight && rect.bottom > 0;
//     // }

//     // function handleWheel(event) {
//     //     if (isInView(flexContainer) || flexContainer.matches(':hover')) {
//     //         event.preventDefault(); // Prevent vertical scroll on this element
//     //         flexContainer.scrollLeft += event.deltaY; // Convert vertical scroll to horizontal scroll
//     //     }
//     // }

//     // // Attach wheel event to handle scroll direction only in flexContainer
//     // window.addEventListener('wheel', handleWheel, { passive: false });

// });
