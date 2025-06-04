(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();

    // Initiate the wowjs
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

})(jQuery);

// === Custom Component Loader with Active Link Highlighter ===
function loadComponent(id, file, callback) {
    fetch(`/snippet/${file}`)
        .then(res => res.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (callback) callback(); // run optional callback
        })
        .catch(err => console.error(`Error loading ${file}:`, err));
}

function setActiveNavLink() {
    const currentPath = window.location.pathname;

    // Highlight main and dropdown links
    document.querySelectorAll('#navbar-container .nav-link, .dropdown-menu .dropdown-item').forEach(link => {
        const href = link.getAttribute('href');

        if (
            currentPath === href ||
            (currentPath === "/" && href === "/index.html") ||
            (currentPath.startsWith("/Services/") && href === "/service.html")
        ) {
            link.classList.add('active');
        }
    });

    // Highlight dropdown parent if a child is active
    const activeDropdownItem = document.querySelector('.dropdown-menu .dropdown-item.active');
    if (activeDropdownItem) {
        const dropdownToggle = activeDropdownItem.closest('.nav-item.dropdown')?.querySelector('.nav-link.dropdown-toggle');
        if (dropdownToggle) {
            dropdownToggle.classList.add('active');
        }
    }
}

// Load components on DOM ready
document.addEventListener("DOMContentLoaded", function () {
    loadComponent("topbar-container", "_topbar.html");
    loadComponent("navbar-container", "_navbar.html", setActiveNavLink); // set active nav after load
    loadComponent("services-container", "_services.html");
    loadComponent("footer-container", "_footer.html");

});



//******************** Get a Quote Form Validation & Submit *********************/
document.getElementById('quoteForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Client-Side Validation
    let isValid = true;

    // Check if Name is filled
    if (document.getElementById('gname').value.trim() === '') {
        alert('Please provide your name.');
        isValid = false;
    }

    // Check if Email is valid
    let email = document.getElementById('gmail').value.trim();
    if (!email || !validateEmail(email)) {
        alert('Please provide a valid email.');
        isValid = false;
    }

    // Check if Mobile is filled
    if (document.getElementById('cname').value.trim() === '') {
        alert('Please provide your mobile number.');
        isValid = false;
    }

    // Check if Service Type is selected
    if (document.getElementById('service').value === '') {
        alert('Please select a service.');
        isValid = false;
    }

    if (!isValid) {
        return; // Stop the form submission if validation fails
    }

    // Prepare form data
    let formData = new FormData(this);

    // Submit form data using Fetch API
    fetch('https://formsubmit.co/homnextinc@gmail.com', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('successMessage').classList.remove('d-none');
            document.getElementById('quoteForm').reset(); // Reset form
        } else {
            throw new Error('Submission failed');
        }
    })
    .catch(error => {
        document.getElementById('errorMessage').classList.remove('d-none');
    });
});

// Email validation function
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
}
//******************** End of Get a Quote Form Validation & Submit *********************/