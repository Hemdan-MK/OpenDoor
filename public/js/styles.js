
document.addEventListener("DOMContentLoaded", function () {


    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });





    const navbar = document.getElementById("navbar");
    const navbarToggler = document.querySelector(".navbar-toggler");
    const modalContainer = document.getElementById("modal-container");

    navbarToggler.addEventListener('click', function () {
        const logo = document.querySelector(".logo");

        if (!navbarToggler.classList.contains('collapsed')) {
            console.log("Navbar collapsed");
            navbar.style.backgroundColor = 'black';
            logo.src = "/assets/logo2.webp"; // Change logo on scroll

        } else {
            console.log("Navbar expanded");
            navbar.style.backgroundColor = ''; // Reset to default
            window.addEventListener("scroll", function () {
                if (window.scrollY > 100) {
                    logo.src = "/assets/logo2.webp"; // Change logo on scroll
                } else {
                    logo.src = "/assets/logo.webp"; // Change logo on scroll
                }
            });
        }
    });


    // Handle navbar scroll behavior
    window.addEventListener("scroll", function () {
        const logo = document.querySelector(".logo");

        if (window.scrollY > 100) {
            navbar.classList.remove('transparent');
            navbar.classList.add('dynamic-island', 'scrolled');
            logo.src = "/assets/logo2.webp"; // Change logo on scroll
        } else {
            navbar.classList.remove('dynamic-island', 'scrolled');
            navbar.classList.add('transparent');
            logo.src = "/assets/logo.webp"; // Revert to original logo
        }
    });

    // // Contact button handling
    // document.querySelectorAll(".contactus").forEach(button => {
    //     button.addEventListener("click", function (e) {
    //         e.preventDefault();

    //         // Close navbar collapse if open (for mobile)
    //         const navbarCollapse = document.getElementById("navbarNav");
    //         const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);

    //         if (bsCollapse && navbarCollapse.classList.contains('show')) {
    //             // Reset the hamburger icon when closing the navbar
    //             navbarToggler.setAttribute("aria-expanded", "false");

    //             // First close the navbar with a slight delay before showing modal
    //             bsCollapse.hide();

    //             setTimeout(function () {
    //                 showModal();
    //             }, 300); // Delay matches navbar collapse transition
    //         } else {
    //             // If navbar is already closed, just show the modal
    //             showModal();
    //         }
    //     });
    // });

    // function showModal() {
    //     // Update modal position based on current navbar height
    //     const navbarHeight = navbar.offsetHeight;

    //     // Dynamically set the top position of the modal
    //     modalContainer.style.top = navbarHeight + 'px';
    //     modalContainer.style.height = `calc(100% - ${navbarHeight}px)`;

    //     // Show the modal
    //     modalContainer.className = "";
    //     modalContainer.classList.add("one");
    //     document.body.classList.add("modal-active");

    //     // Disable hamburger button
    //     navbarToggler.setAttribute("disabled", "true");
    //     navbarToggler.classList.add("disabled");
    // }

    // modalContainer.addEventListener("click", function (e) {
    //     // Only close if clicking the background, not the modal content
    //     if (e.target === this || e.target.classList.contains('modal-background')) {
    //         this.classList.add("out");
    //         document.body.classList.remove("modal-active");

    //         // Re-enable hamburger button
    //         navbarToggler.removeAttribute("disabled");
    //         navbarToggler.classList.remove("disabled");
    //     }
    // });

});

// window.onload = () => {
//     const loader = document.getElementById('loader');
//     const main = document.getElementById('main-content');

//     // Add fade-out animation
//     // loader.classList.add('fade-out');

//     // // Wait for the fade-out to complete, then hide the loader
//     // loader.addEventListener('transitionend', () => {
//     //     loader.style.display = 'none';
//     //     main.style.display = 'block';
//     // });
// };
