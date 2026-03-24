        // Theme Toggle
        function toggleTheme() {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            const themeIcon = document.getElementById('themeIcon');
            const themeText = document.querySelector('.theme-toggle .game-font');

            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            if (newTheme === 'dark') {
                themeIcon.textContent = '☀️';
                themeText.textContent = 'LIGHT MODE';
            } else {
                themeIcon.textContent = '🌙';
                themeText.textContent = 'DARK MODE';
            }
        }

        // Load saved theme
        document.addEventListener('DOMContentLoaded', () => {
            const savedTheme = localStorage.getItem('theme') || 'light';
            const html = document.documentElement;
            const themeIcon = document.getElementById('themeIcon');
            const themeText = document.querySelector('.theme-toggle .game-font');

            html.setAttribute('data-theme', savedTheme);

            if (savedTheme === 'dark') {
                themeIcon.textContent = '☀️';
                themeText.textContent = 'LIGHT MODE';
            }

            // Animate XP bar
            setTimeout(() => {
                document.getElementById('xpBar').style.width = '100%';
            }, 500);
        });

        // Mobile Menu Toggle
        const menuOverlay = document.getElementById('menuOverlay');

        function closeMenu() {
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            const navbar = document.querySelector('.navbar');
            navMenu.classList.remove('active');
            navbar.classList.remove('menu-open');
            menuOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }

        function toggleMenu() {
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            const navbar = document.querySelector('.navbar');
            navMenu.classList.toggle('active');
            navbar.classList.toggle('menu-open');
            menuOverlay.classList.toggle('active');
            document.body.classList.toggle('menu-open');

            const spans = hamburger.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'translateY(8px) rotate(45deg)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }

        // Close menu when tapping dim overlay
        menuOverlay.addEventListener('click', closeMenu);

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Navbar scroll effect + mobile show/hide
        let lastScroll = 0;
        const navbar = document.querySelector('.navbar');
        const isMobile = () => window.innerWidth <= 768;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                navbar.style.boxShadow = '0 4px 20px rgba(0, 240, 255, 0.3)';
            } else {
                navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            }

            // Mobile: hide on scroll down, show on scroll up
            if (isMobile() && !navbar.classList.contains('menu-open')) {
                if (currentScroll > lastScroll && currentScroll > 80) {
                    navbar.classList.add('navbar-hidden');
                } else {
                    navbar.classList.remove('navbar-hidden');
                }
            }

            lastScroll = currentScroll;
        });

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = `all 0.6s ease ${index * 0.1}s`;
            observer.observe(item);
        });

        // Observe project highlights
        const projectHighlights = document.querySelectorAll('.project-highlight');
        projectHighlights.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = `all 0.6s ease ${index * 0.1}s`;
            observer.observe(item);
        });

        // Observe document cards
        const documentCards = document.querySelectorAll('.document-card');
        documentCards.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = `all 0.6s ease ${index * 0.1}s`;
            observer.observe(item);
        });

        // Observe skill categories
        const skillCategories = document.querySelectorAll('.skill-category');
        skillCategories.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = `all 0.6s ease ${index * 0.1}s`;
            observer.observe(item);
        });

        // Active nav link on scroll
        const sections = document.querySelectorAll('section[id]');

        function scrollActive() {
            const scrollY = window.pageYOffset;

            sections.forEach(current => {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 100;
                const sectionId = current.getAttribute('id');
                const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

                if (navLink) {
                    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                        navLink.classList.add('active');
                    } else {
                        navLink.classList.remove('active');
                    }
                }
            });
        }

        window.addEventListener('scroll', scrollActive);

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Counter animation for stats
        const statNumbers = document.querySelectorAll('.stat-number');
        const statsSection = document.querySelector('.stats');

        let counted = false;

        function animateCounter(element) {
            const target = element.textContent;
            const isPercentage = target.includes('%');
            const numericValue = parseInt(target.replace(/\D/g, ''));

            let count = 0;
            const duration = 2000;
            const increment = numericValue / (duration / 16);

            const timer = setInterval(() => {
                count += increment;
                if (count >= numericValue) {
                    element.textContent = target;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(count) + (isPercentage ? '%' : '+');
                }
            }, 16);
        }

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counted) {
                    counted = true;
                    statNumbers.forEach(stat => {
                        animateCounter(stat);
                    });
                }
            });
        }, { threshold: 0.5 });

        if (statsSection) {
            statsObserver.observe(statsSection);
        }

        // Add loading animation
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });

        // Console greeting with game style
        console.log('%c⚡ GAME DESIGNER YJ - LEVEL 99 ⚡',
            'color: #00f0ff; font-size: 24px; font-weight: bold; text-shadow: 0 0 10px #00f0ff;');
        console.log('%c🎮 9+ Years Experience | System Design Specialist',
            'color: #b537f2; font-size: 16px; font-weight: bold;');
        console.log('%c📧 Contact for collaboration!',
            'color: #00ff41; font-size: 14px;');
