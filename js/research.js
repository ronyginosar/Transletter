
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
// note: data in separate file: js/research-handwritten-data.js

// Initialize the page with the default character 'alef'
injectHandwrittenImages('alef'); // TODO update

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
        img.src = `../assets/content_images/research_handwritten_glyphs/${imageName}`;
        img.alt = `Handwritten version of ${character}`;

        // Create text element, initially hidden
        const textElement = document.createElement('small');
        textElement.className = 'handwritten-text-label';
        textElement.textContent = labels[character][index]; // Set text immediately
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


// P2 

// Text content for each title
const textContent = {
    text1: "הגופן הגמיש שפיתחתי, מנסה מצד אחד לשמר ולחקות את המסורת הצורנית של הכתיבה הידנית, ומצד שני, לקחת אותה כמה צעדים קדימה אל עבר המרחב הדיגיטלי שבו היא ממילא מתקיימת היום. הגופן אינו מנסה להתחקות אחר תנועת היד האנושית הקליגרפית בשלמותה, אלא מתאים את תכונותיו מחדש בעקבות שינוי הכלי הטכנולוגי. תפקידו הוא לתאר מהלך: התפתחות הנובעת מן העבר, והתקדמות אל עבר השלב הבא. במקביל, הוא מציית לכללי השפה ושומר על צורות מזוהות של אותיות, אם כי אינו מתחייב לבהירות מוחלטת, בייחוד בנקודות המעבר. הוריבאילית היא המדיום שדרכו אני מציגה תהליך, הצעה לתנועה אבולוציונית עדכנית. יתרונותיה הן גמישות ויזואלית, רעיונית ומחשבתית. היא מאפשרת לי לייצר מגוון רחב של צורות בפורמט אחד, לייצר מוביליות ותנועה בין השלבים, ולהגביר את האינטראקציה וחופש הבחירה של המשתמש. ה׳תנואות׳ מוטמעות בקוד, והן יודעות לתפקד ",
    text2: "אותיות כתב יד אלו אותיות שצורותיהן מתאימות לכתיבה מהירה בדיו על נייר, והן עגולות יותר, חופשיות וזורמות. אותיות אלו מכונות גם ”כתב רהוט” על שום מהירות הכתיבה.",
    text3: "מוצר הצריכה הוא תופעה תרבותית, המורכבת מחפץ מעוצב שתהליכי ייצורו מעוגנים בחיקוי ומביאים אותו לידי פונקציונליות, תואם למקור עלום או גלוי, חדשנות בתהליכי ההמרה מהחפץ המקורי לחפץ המעוצב החדש, וגיוון הנובע מחיקוי שיש בו ’טעויות’ ותנועה בין הזהה לדומה. בחיקוי באופן פרדוקסלי מסתתרים חדשנות וגיוון, משום שהחיקוי מדמה את המקור, אבל באופן אחראדם סמית׳ 1759על פי ההגדרה של סמית, כאשר אנו מדברים על גופנים כמוצר צריכה, ובפרט על גופנים טכנולוגיים עכשווים, החיקוי מתייחס לצורתן המוכרת והמסורתית של אותיות הא’-ב’ השונות, שמקבלת איפיון מחודש על ידי גיוון, שימוש בטכנולוגיה וטרנדים חזותיים.",
    text4: "\
    עלייתה של תרבות דיגיטלית, העלתה את הדרישה לגופנים המותאמים לקריאה דרך מסך. המעבר למסך, הצפת המידע וזמינותו ואורח החיים העמוס, גורמים לנו לדלג מקטע כזה או אחר - אנחנו לא קוראים היום כפי שקראנו פעם, ולא באותה כמות. העושר החזותי והצורך בגיוון ויזואלי, וזמינותה וקלותה של הטכנולוגיה הובילו להפיכתו של הגופן למוצר למוצר צריכה של ממש.\
\
עלייתה של תרבות דיגיטלית, העלתה את הדרישה לגופנים המותאמים לקריאה דרך מסך. המעבר למסך, הצפת המידע וזמינותו ואורח החיים העמוס, גורמים לנו לדלג מקטע כזה או אחר - אנחנו לא קוראים היום כפי שקראנו פעם, ולא באותה כמות. העושר החזותי והצורך בגיוון ויזואלי, וזמינותה וקלותה של הטכנולוגיה הובילו להפיכתו של הגופן למוצר למוצר צריכה של ממש.\
על גופנים וריאביליים‍‍לפני כשלוש שנים השיקו גוגל, אפל, מיקרוסופט ואדובי סוג חדש של גופן: גופן וריאבילי - גמיש. קובץ בודד המכיל צירי תנועה והשתנות של אותיות, בקוד. גופן זה מסוגל להכיל למעשה כמות בלתי מוגבלת של משקלים, כתלות בציר החזותי אותו קובע המעצב (רוחב אות, סריף, נטייה וכד’). מטרתו היא קודם כל להקל במשקל הטעינה של האתר, ולאפשר טיפוגרפיה רספונסיבית המתאימה את עצמה ומשתנה בזמן אמת. במקביל ליתרונות הטכנולוגיים, נוצר כלי עיצובי חזק: אפשרות לייצר מערכת מורכבת יותר של אותיות המוגדרת על ידי גבולות גזרה, הרחבת טווח התנועה וחופש הבחירה של המשתמש, וכניסה של מימדים חדשים של תנועה, אינטראקטיביות ומשחקיות. ",
    };


const imageContent = {
    text1: ['../assets/content_images/ashkenazi_sfaradi_1-p-500.jpeg', 
            '../assets/content_images/ashkenazi_sfaradi_2-p-500.jpeg', 
            '../assets/content_images/ashkenazi_sfaradi_4-p-500.jpeg'], // Section 1 images
    text2: ['../assets/content_images/ashkenazi_sfaradi_3-p-500.jpeg'], // Section 2 image
    text3: ['../assets/content_images/Dfus_1-p-500.jpeg', 
            '../assets/content_images/israeli_3-p-500.jpeg'], // Section 3 images
    text4: ['../assets/content_images/history_3-p-500.jpeg'], // Section 4 image
    text5: ['../assets/content_images/israeli_1-p-500.jpeg', 
            '../assets/content_images/history_4-p-500.jpeg'] // Section 5 images
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

titles.forEach(title => {
    title.addEventListener('click', function() {
        const selectedText = textContent[this.dataset.text]; // Get related text
        const selectedImages = imageContent[this.dataset.text]; // Get related images

        // Update text
        textDisplay.textContent = selectedText;

        // Clear existing images in the gallery
        imageGallery.innerHTML = '';

        // v1
        // Inject images into the gallery
        if (selectedImages) {
            selectedImages.forEach(imageUrl => {
                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = `Image for ${this.textContent}`;
                imageGallery.appendChild(img);
            });
        }

        // Center the gallery based on the number of images
        if (selectedImages.length === 1) {
            // Center single image
            imageGallery.style.justifyContent = 'center';
        } else {
            // For multiple images, scroll to center the middle image
            imageGallery.style.justifyContent = 'flex-start'; // Reset to flex-start
            // imageGallery.style.justifyContent = 'center'; // cuts off the last image

            // Scroll to the center image
            const middleIndex = Math.floor(selectedImages.length / 2);
            const middleImage = imageGallery.children[middleIndex];
            
            // Scroll so that the middle image is centered in the gallery
            const galleryWidth = imageGallery.offsetWidth;
            const imageWidth = middleImage.offsetWidth;
            const scrollPosition = middleImage.offsetLeft - (galleryWidth / 2) + (imageWidth / 2);
            imageGallery.scrollLeft = scrollPosition;
        }

        // v2
        // Inject images into the gallery
        // if (selectedImages) {
        //     let imagesLoaded = 0;
        //     selectedImages.forEach((imageUrl, index) => {
        //         const img = document.createElement('img');
        //         img.src = imageUrl;
        //         img.alt = `Image for ${this.textContent}`;
        //         img.style.display = 'none'; // Initially hide the image until it's loaded
        //         img.onload = function() {
        //             img.style.display = 'block'; // Show the image once loaded
        //             imagesLoaded += 1;
        //             // If all images are loaded, scroll to center the middle image
        //             if (imagesLoaded === selectedImages.length) {
        //                 scrollToCenter();
        //             }
        //         };
        //         imageGallery.appendChild(img);
        //     });
        // }
        

        // Remove .selected from any previously selected item
        titles.forEach(t => t.classList.remove('selected'));

        // Add .selected to the clicked title
        this.classList.add('selected');
    });
});

// Set default text and images for the first title on page load
// TODO also do the image location upon load, not just when clicking
// titles[0].click();

// Set default text and images for the first title on page load
window.addEventListener('DOMContentLoaded', function() {
    titles[0].click(); // Automatically select and display the first title
});
