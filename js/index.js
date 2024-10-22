// Function to adjust the iframe height and width
function adjustIframeSize(iframeId) {
    // Selecting the iframe element
    var frame = document.getElementById(iframeId);
    
    if (frame) {
        // Adjusting the iframe height onload event
        frame.onload = function() {
            // Set the height of the iframe as the height of the iframe content
            // console.log(`Iframe with ID ${iframeId} height ${frame.contentWindow.document.body.scrollHeight}.`);
            frame.style.height = frame.contentWindow.document.body.scrollHeight + 'px';
            // console.log(`Iframe with ID ${iframeId} height adjusted to ${frame.style.height}.`);
            // Uncomment the line below if you also want to adjust the width
            // frame.style.width = frame.contentWindow.document.body.scrollWidth + 'px';
        }
    } else {
        console.error(`Iframe with ID ${iframeId} not found.`);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav li');

    // Click event listener to manually activate the clicked nav item
    navLinks.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.forEach(
                item => item.classList.remove('active')
            );
            this.classList.add('active');
        });
    });

    // Function to determine the active section on scroll
    function setActiveSection() {
        let currentSection = '';

        // detect current section
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                currentSection = section.getAttribute('id');
            }
        });

        // remove active class from all nav links and add it to the correct one
        navLinks.forEach(item => {
            item_href = item.parentElement.getAttribute('href');
            item.classList.remove('active');
            if (item_href === `#${currentSection}`) {
                // console.log(`Current section from href: ${item_href}`);
                item.classList.add('active');
            }
        });
    }

    // Add a scroll event listener
    window.addEventListener('scroll', setActiveSection);
});


// Load at top of page
document.addEventListener('DOMContentLoaded', function() {
    // Disable browser scroll restoration
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // Scroll to the top of the page
    window.scrollTo(0, 0);

    // Alternatively, scroll to a specific element by ID
    // document.getElementById('section1').scrollIntoView({ behavior: 'smooth' });
});
