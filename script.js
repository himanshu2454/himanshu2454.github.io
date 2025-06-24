document.addEventListener('DOMContentLoaded', () => {
    // Theme toggling
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
        themeToggle.querySelector('i').classList.toggle('fa-moon');
        themeToggle.querySelector('i').classList.toggle('fa-sun');
    });

    // Smooth scroll for sidebar navigation
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('section');
    
    const reveal = () => {
        revealElements.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', reveal);
    reveal();

    // Highlight active section in sidebar
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.sidebar-nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Highlight active section in header nav
    const headerNavLinks = document.querySelectorAll('.header-nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        headerNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Contact form animation (button feedback)
    document.querySelectorAll('.contact-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = form.querySelector('button');
            btn.textContent = 'Sending...';

            // Get form values
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const message = form.querySelector('textarea').value;

            // Construct mailto link
            const to = 'hchouhan3654@gmail.com';
            const cc = encodeURIComponent(email);
            const subject = encodeURIComponent('Portfolio Contact: ' + name);
            const body = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\n${message}`
            );
            const mailto = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&cc=${cc}&su=${subject}&body=${body}`;

            setTimeout(() => {
                btn.textContent = 'Send Message';
                window.open(mailto, '_blank');
                form.reset();
            }, 900);
        });
    });

    // Light/Dark mode toggle
    const html = document.documentElement;

    themeToggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const nextTheme = current === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
    });

    // On load, set theme from localStorage or system preference
    (function() {
        const saved = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(saved ? saved : (prefersDark ? 'dark' : 'light'));
    })();

    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
        // Fix: force body and html to always have correct data-theme
        document.body.setAttribute('data-theme', theme);
    }

    // Custom scroll for header navigation to keep header visible
    document.querySelectorAll('.header-nav a, .sidebar-nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const header = document.querySelector('.main-header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    const rect = target.getBoundingClientRect();
                    const absoluteY = window.pageYOffset + rect.top;
                    window.scrollTo({
                        top: absoluteY - headerHeight - 8, // 8px extra spacing
                        behavior: 'smooth'
                    });
                    // Trigger reveal animation after scroll
                    setTimeout(() => {
                        target.classList.add('active');
                    }, 500);
                }
            }
        });
    });

    // Hamburger menu toggle for mobile nav
    const hamburger = document.getElementById('hamburger');
    const headerNav = document.getElementById('header-nav');
    if (hamburger && headerNav) {
        hamburger.addEventListener('click', () => {
            headerNav.classList.toggle('open');
            hamburger.querySelector('i').classList.toggle('fa-bars');
            hamburger.querySelector('i').classList.toggle('fa-times');
        });
        // Close menu on nav link click (mobile)
        headerNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                headerNav.classList.remove('open');
                hamburger.querySelector('i').classList.add('fa-bars');
                hamburger.querySelector('i').classList.remove('fa-times');
            });
        });
    }

    // --- EMAILJS INTEGRATION FOR CONTACT FORM ---
    // Replace with your EmailJS user ID, service ID, and template ID
    const EMAILJS_USER_ID = 'YOUR_EMAILJS_USER_ID';
    const EMAILJS_SERVICE_ID = 'YOUR_EMAILJS_SERVICE_ID';
    const EMAILJS_TEMPLATE_ID = 'YOUR_EMAILJS_TEMPLATE_ID';

    if (window.emailjs) {
        emailjs.init(EMAILJS_USER_ID);
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            btn.textContent = 'Sending...';

            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;

            // EmailJS params
            const templateParams = {
                from_name: name,
                from_email: email,
                message: message,
                cc_email: email // for CC
            };

            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
                .then(function(response) {
                    btn.textContent = 'Message Sent!';
                    setTimeout(() => btn.textContent = 'Send Message', 2000);
                    contactForm.reset();
                }, function(error) {
                    btn.textContent = 'Send Failed';
                    setTimeout(() => btn.textContent = 'Send Message', 2000);
                });
        });
    }

    // --- SMOOTH SCROLL FOR ALL CONTACT LINKS/BUTTONS ---
    function scrollToContact() {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    // Only scroll for anchor links, not for the contact form button
    document.querySelectorAll('a[href="#contact"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToContact();
        });
    });

    // --- SMOOTH SCROLL FOR ALL NAVIGATION LINKS (EXCEPT BLOG) ---
    document.querySelectorAll('.header-nav a[href^="#"], .sidebar-nav a[href^="#"], .mobile-hero .profile-social a[href^="#"], .cta-button[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});
