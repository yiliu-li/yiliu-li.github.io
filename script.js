// Initialize all features when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Scroll Progress Indicator with throttle
    const createScrollProgress = () => {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const winScroll = document.documentElement.scrollTop;
                    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                    const scrolled = (winScroll / height) * 100;
                    document.documentElement.style.setProperty('--scroll', `${scrolled}%`);
                    ticking = false;
                });
                ticking = true;
            }
        });
    };

    // Optimized Card Hover Effect with debounce
    const setupCardHoverEffect = () => {
        const cards = document.querySelectorAll('.education-card, .experience-card, .project-card, .skill-category');
        let rafId = null;

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                if (rafId) cancelAnimationFrame(rafId);
                
                rafId = requestAnimationFrame(() => {
                    const rect = card.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
                    const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
                    
                    card.style.setProperty('--mouse-x', `${x}%`);
                    card.style.setProperty('--mouse-y', `${y}%`);
                });
            });

            // Reset effect on mouse leave
            card.addEventListener('mouseleave', () => {
                if (rafId) cancelAnimationFrame(rafId);
                card.style.setProperty('--mouse-x', '50%');
                card.style.setProperty('--mouse-y', '50%');
            });
        });
    };

    // Enhanced Intersection Observer for Fade In
    const setupIntersectionObserver = () => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: [0, 0.1, 0.2, 0.3]
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Calculate opacity based on intersection ratio
                    const opacity = Math.min(entry.intersectionRatio * 3, 1);
                    entry.target.style.opacity = opacity;
                    
                    if (entry.intersectionRatio > 0.2) {
                        entry.target.classList.add('fade-in');
                        // Only unobserve if fully visible
                        if (entry.intersectionRatio > 0.9) {
                            observer.unobserve(entry.target);
                        }
                    }
                }
            });
        }, options);

        document.querySelectorAll('.education-card, .experience-card, .project-card, .skill-category')
            .forEach(element => observer.observe(element));
    };

    // Optimized Mobile Menu
    const setupMobileMenu = () => {
        const hamburger = document.createElement('div');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;

        const nav = document.querySelector('.nav-content');
        const navLinks = document.querySelector('.nav-links');
        
        nav.insertBefore(hamburger, nav.firstChild);

        // Add touch feedback
        const addTouchFeedback = (element) => {
            element.addEventListener('touchstart', () => {
                element.classList.add('touch-active');
            }, { passive: true });
            
            element.addEventListener('touchend', () => {
                element.classList.remove('touch-active');
            }, { passive: true });
        };

        // Add touch feedback to menu items
        navLinks.querySelectorAll('a').forEach(link => {
            addTouchFeedback(link);
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });

        // Toggle menu with animation frame
        hamburger.addEventListener('click', () => {
            requestAnimationFrame(() => {
                hamburger.classList.toggle('active');
                navLinks.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });
        });
    };

    // Enhanced Smooth Scrolling
    const setupSmoothScrolling = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    // Add active state to the clicked link
                    document.querySelectorAll('.nav-links a').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // Optimized Navbar Scroll Effect
    const setupNavbarScroll = () => {
        const navbar = document.querySelector('.navbar');
        let lastScroll = 0;
        let scrollTimeout;

        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                cancelAnimationFrame(scrollTimeout);
            }

            scrollTimeout = requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll <= 0) {
                    navbar.classList.remove('scroll-up');
                    return;
                }
                
                if (Math.abs(currentScroll - lastScroll) < 10) return;

                if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
                    navbar.classList.remove('scroll-up');
                    navbar.classList.add('scroll-down');
                } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
                    navbar.classList.remove('scroll-down');
                    navbar.classList.add('scroll-up');
                }
                
                lastScroll = currentScroll;
            });
        }, { passive: true });
    };

    // Enhanced Section Headers Animation
    const setupSectionHeaders = () => {
        const sections = document.querySelectorAll('.section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const header = entry.target.querySelector('h2');
                    requestAnimationFrame(() => {
                        header.classList.add('animate');
                        // Update active nav link
                        const id = entry.target.id;
                        if (id) {
                            document.querySelectorAll('.nav-links a').forEach(link => {
                                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                            });
                        }
                    });
                }
            });
        }, { 
            threshold: 0.5,
            rootMargin: '-20% 0px -20% 0px'
        });

        sections.forEach(section => observer.observe(section));
    };

    // Skill Tags Interaction
    const setupSkillTags = () => {
        const tags = document.querySelectorAll('.skill-tags span');
        
        tags.forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                requestAnimationFrame(() => {
                    tag.style.transform = 'translateY(-2px)';
                });
            });
            
            tag.addEventListener('mouseleave', () => {
                requestAnimationFrame(() => {
                    tag.style.transform = 'translateY(0)';
                });
            });
        });
    };

    // Initialize all features
    createScrollProgress();
    setupCardHoverEffect();
    setupIntersectionObserver();
    setupSmoothScrolling();
    setupNavbarScroll();
    setupSectionHeaders();
    setupSkillTags();

    // Mobile setup
    if (window.innerWidth <= 768) {
        setupMobileMenu();
    }

    // Optimized window resize handler
    let resizeTimer;
    window.addEventListener('resize', () => {
        if (resizeTimer) clearTimeout(resizeTimer);
        
        resizeTimer = setTimeout(() => {
            if (window.innerWidth <= 768) {
                if (!document.querySelector('.hamburger')) {
                    setupMobileMenu();
                }
            } else {
                const hamburger = document.querySelector('.hamburger');
                if (hamburger) {
                    hamburger.remove();
                }
                document.querySelector('.nav-links').classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }, 150);
    }, { passive: true });
}); 