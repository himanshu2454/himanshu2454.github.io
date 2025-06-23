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
            setTimeout(() => {
                btn.textContent = 'Send Message';
                alert('Thank you for reaching out!');
                form.reset();
            }, 1200);
        });
    });

    // Light/Dark mode toggle
    const html = document.documentElement;

    themeToggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
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
});
