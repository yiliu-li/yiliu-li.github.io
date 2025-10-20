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
        // Removed mouse tracking effect
        const cards = document.querySelectorAll('.education-card, .experience-card, .project-card, .publication-card, .skill-category');
        // Keep the fade effect only, no cursor tracking
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

        document.querySelectorAll('.education-card, .experience-card, .project-card, .publication-card, .skill-category')
            .forEach(element => observer.observe(element));
    };

    // Optimized Mobile Menu
    const setupMobileMenu = () => {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        if (!hamburger || !navLinks) return;

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

    // Enhanced Contact Links
    const setupContactLinks = () => {
        const contactLinks = document.querySelectorAll('.contact-info a');
        
        contactLinks.forEach(link => {
            // Add touch feedback
            link.addEventListener('touchstart', () => {
                link.classList.add('touch-active');
            }, { passive: true });
            
            link.addEventListener('touchend', () => {
                link.classList.remove('touch-active');
            }, { passive: true });

            // Add click feedback
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('tel:')) {
                    // For mobile devices, let the default behavior handle phone calls
                    return;
                }
                if (href && href.startsWith('mailto:')) {
                    // For mobile devices, let the default behavior handle emails
                    return;
                }
                e.preventDefault();
                window.open(href, '_blank');
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
    setupContactLinks();
    setupMobileMenu();

    // Optimized window resize handler
    let resizeTimer;
    window.addEventListener('resize', () => {
        if (resizeTimer) clearTimeout(resizeTimer);
        
        resizeTimer = setTimeout(() => {
            // Reset mobile menu state on resize
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');
            
            if (hamburger && navLinks) {
                if (window.innerWidth > 768) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            }
        }, 150);
    }, { passive: true });
});