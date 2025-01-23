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

    // mobile handler
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    if (mediaQuery.matches) {
      const hamburger = document.getElementById('hamburger-menu');
      const menuItems = document.getElementById('menu-items');
  
      // hamburger.addEventListener('click', function () {
      //     menuItems.classList.toggle('show'); // Toggle the `show` class
      // });
      hamburger.addEventListener('click', function () {
        menuItems.classList.toggle('show'); // Toggle the `show` class
        hamburger.classList.toggle('open'); // Toggle the `open` class
    });

      // Close menu when a link is clicked
      menuItems.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function () {
            menuItems.classList.remove('show'); // Hide the menu
            hamburger.classList.remove('open'); // Reset hamburger icon
        });
    });
    }
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

    // Remove any hash from the URL
    if (window.location.hash) {
        history.replaceState(null, null, window.location.pathname);
    }
});

// Hide the navigation bar on scroll down and show it on scroll up
document.addEventListener('DOMContentLoaded', function() {
    let lastScrollTop = 0;
    const nav = document.querySelector('header');

    window.addEventListener('scroll', function() {
      let scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        // Scrolling down
        nav.classList.add('hidden'); // Add the hidden class
      } else {
        // Scrolling up
        nav.classList.remove('hidden'); // Remove the hidden class
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For mobile or negative scrolling
    });
  });


  // nav title vrot and hover
//   note: script instead of hover css due to conflict
  document.addEventListener('DOMContentLoaded', function() {
    const titleElement = document.getElementById('nav-title-text');
    // console.log(titleElement);
    const text = titleElement.innerHTML;
    // console.log(text);
    let newHTML = '';
  
    // Loop through each letter and assign a random or incremental vrot value
    for (let i = 0; i < text.length; i++) {
      const letter = text[i];
      const vrotValue = 100 + (i * 100); // Change this calculation as needed
      newHTML += `<span style="font-variation-settings: 'vrot' ${vrotValue}; transition: font-variation-settings .8s;">${letter}</span>`;
    }
  
    // Replace the text content with the new spans
    titleElement.innerHTML = newHTML;

    // Add a hover listener to the parent element to override the inline styles
    titleElement.addEventListener('mouseenter', function() {
      titleElement.querySelectorAll('span').forEach(span => {
        span.style.fontVariationSettings = '"vrot" 500'; // Change all letters to hover value
      });
    });

    titleElement.addEventListener('mouseleave', function() {
      titleElement.querySelectorAll('span').forEach((span, i) => {
        const initialVrot = 100 + (i * 100); // Reset to original values
        span.style.fontVariationSettings = `"vrot" ${initialVrot}`;
      });
    });
  });


  function toggleWaterfall() {
    // const textContainer = document.getElementById('text-container');
    const toggleButton = document.getElementById('waterfall-toggle-button');        
    const iframe = document.getElementById('waterfall-iframe');
    
    if (iframe.style.height === '0px' || iframe.style.height === '') {
        iframe.style.height = '98vh'; // Expand iframe
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        if (mediaQuery.matches) {
            // Logic for narrow screens
            // console.log('Screen is 768px or narrower');
            iframe.style.height = '50vh'; // Expand iframe
          }
        toggleButton.innerHTML = 'משקלים'; // Update button text
        // iframe.classList.remove('hidden-iframe'); // Remove class to show section inside iframe
    } else {
        iframe.style.height = '0'; // Collapse iframe
        toggleButton.innerHTML = 'משקלים ←'; // Update button text
        // iframe.classList.add('hidden-iframe'); // Add class to hide section inside iframe
    }
    }

    document.addEventListener('DOMContentLoaded', function () {
      // Detect if the browser is not Chrome
      const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  
      // if (!isChrome) {
      if (!isChrome) {
          const banner = document.getElementById('browser-warning-banner');
          banner.style.display = 'flex'; // Show the banner if not Chrome
      }
  
      // Handle close button click
      const closeButton = document.getElementById('close-banner-button');
      closeButton.addEventListener('click', function () {
          const banner = document.getElementById('browser-warning-banner');
          banner.style.display = 'none'; // Hide the banner
      });
  });
  