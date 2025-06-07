(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        window.onload = function() {
            // Hide the spinner when the entire page is loaded
            $('#spinner').removeClass('show');
        };
    };
    spinner();

    // Initiate the wowjs (if applicable)
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
    fetch(`./snippet/${file}`)
        .then(res => res.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (callback) callback(); // run optional callback
            $('#spinner').removeClass('show'); // Hide the spinner once content is loaded
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
            (currentPath.startsWith("/services/") && href === "/service.html")
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
