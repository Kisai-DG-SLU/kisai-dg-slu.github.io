// Portfolio JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links with proper offset
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20; // Added extra 20px padding
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }

        lastScrollTop = scrollTop;
    });

    // Active navigation link highlighting with improved offset
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 120; // Adjusted for better highlighting
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Add animation class to elements and observe them
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .card, .formation__content, .contact__content');
    animateElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });

    // Progress bar animations
    const progressBars = document.querySelectorAll('.progress-bar[data-level]');
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const level = progressBar.getAttribute('data-level');
                
                setTimeout(() => {
                    progressBar.style.setProperty('--progress-width', `${level}%`);
                    progressBar.classList.add('loading');
                    
                    // Use CSS custom property for animation
                    requestAnimationFrame(() => {
                        progressBar.style.setProperty('--progress-width', `${level}%`);
                        progressBar.style.background = `linear-gradient(to right, var(--color-primary) ${level}%, var(--color-secondary) ${level}%)`;
                    });
                }, 300);
                
                progressObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });

    // Enhanced progress bar animation for AI skills
    const enhancedProgressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const level = progressBar.getAttribute('data-level');
                
                setTimeout(() => {
                    progressBar.style.background = `linear-gradient(to right, var(--color-primary) ${level}%, var(--color-secondary) ${level}%)`;
                    progressBar.style.transition = 'background 1.5s ease-out';
                }, 300);
                
                enhancedProgressObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.3 });

    // Apply enhanced animation to AI skill progress bars
    const aiSkillBars = document.querySelectorAll('.skills__section:last-child .progress-bar[data-level]');
    aiSkillBars.forEach(bar => {
        enhancedProgressObserver.observe(bar);
    });

    // Formation progress bar animation
    const formationProgressBar = document.querySelector('.formation__progress-bar .progress-bar');
    const formationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                setTimeout(() => {
                    progressBar.style.background = `linear-gradient(to right, var(--color-primary) 2%, var(--color-secondary) 2%)`;
                    progressBar.style.transition = 'background 2s ease-out';
                }, 500);
                formationObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });

    if (formationProgressBar) {
        formationObserver.observe(formationProgressBar);
    }

    // Contact form handling with improved feedback
    const contactForm = document.querySelector('.contact__form form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name') || document.getElementById('name').value;
        const email = formData.get('email') || document.getElementById('email').value;
        const message = formData.get('message') || document.getElementById('message').value;
        
        // Create mailto link
        const subject = `Message de ${name} - Portfolio`;
        const body = `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        const mailtoLink = `mailto:kisai.dg.slu@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message with better visual feedback
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        const originalClass = submitButton.className;
        
        submitButton.textContent = 'Message envoyé ! ✓';
        submitButton.className = originalClass + ' btn--success';
        submitButton.disabled = true;
        
        // Add success animation
        submitButton.style.transform = 'scale(1.05)';
        setTimeout(() => {
            submitButton.style.transform = 'scale(1)';
        }, 200);
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.className = originalClass;
            submitButton.disabled = false;
            contactForm.reset();
        }, 3000);
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero__title');
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let index = 0;
    const typingSpeed = 100;
    
    function typeText() {
        if (index < originalText.length) {
            heroTitle.textContent += originalText.charAt(index);
            index++;
            setTimeout(typeText, typingSpeed);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeText, 1000);

    // Animate skill cards on hover with improved feedback
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });

    // Animate project cards on hover with improved feedback
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
            this.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });

    // Add click feedback to buttons (excluding external links)
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Skip ripple effect for external links
            if (this.getAttribute('href') && this.getAttribute('target') === '_blank') {
                return;
            }
            
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                top: ${y}px;
                left: ${x}px;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add stagger animation to grids
    const staggerElements = document.querySelectorAll('.skills__grid, .projects__grid');
    staggerElements.forEach(grid => {
        const cards = grid.querySelectorAll('.skill-card, .project-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    });

    // Scroll to top functionality
    const scrollToTop = document.createElement('button');
    scrollToTop.innerHTML = '↑';
    scrollToTop.className = 'scroll-to-top';
    scrollToTop.setAttribute('aria-label', 'Retour en haut');
    scrollToTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--color-primary);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(scrollToTop);
    
    scrollToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTop.style.opacity = '1';
            scrollToTop.style.visibility = 'visible';
        } else {
            scrollToTop.style.opacity = '0';
            scrollToTop.style.visibility = 'hidden';
        }
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Performance optimization: Throttle scroll events
    let ticking = false;
    
    function updateScrollEffects() {
        // Update header background
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestScrollUpdate);

    // Add CSS for improved visual feedback
    const style = document.createElement('style');
    style.textContent = `
        .scroll-to-top:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }
        
        .loaded {
            animation: fadeIn 0.5s ease-out;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes ripple {
            from { transform: scale(0); opacity: 1; }
            to { transform: scale(4); opacity: 0; }
        }
        
        .nav__link.active {
            color: var(--color-primary) !important;
            font-weight: var(--font-weight-semibold);
        }
        
        .nav__link.active::after {
            width: 100%;
        }
        
        .btn--success {
            background: var(--color-success) !important;
            color: var(--color-btn-primary-text) !important;
        }
        
        .btn:active {
            transform: scale(0.98);
        }
        
        .nav__link:focus-visible {
            outline: 2px solid var(--color-primary);
            outline-offset: 2px;
            border-radius: 4px;
        }
        
        .skill-card:focus-within,
        .project-card:focus-within {
            outline: 2px solid var(--color-primary);
            outline-offset: 2px;
        }
        
        .hero__image-placeholder {
            transition: all 0.3s ease;
        }
        
        .hero__image-placeholder:hover {
            transform: scale(1.05);
            border-color: var(--color-primary-hover);
        }
        
        .projects__title-link:hover {
            text-decoration: underline;
        }
        
        .project-card {
            color: inherit;
            text-decoration: none;
        }
        
        .project-card:hover {
            color: inherit;
            text-decoration: none;
        }

        /* Logo placeholder hover effect */
        .nav__logo-placeholder:hover {
            background: var(--color-primary);
            color: var(--color-btn-primary-text);
            transform: scale(1.1);
        }

        /* Enhanced footer styling */
        .footer__content {
            max-width: 600px;
            margin: 0 auto;
        }
        
        /* Improved mobile navigation colors */
        @media (max-width: 768px) {
            .nav__menu .nav__link {
                color: #000000;
                padding: var(--space-12) 0;
                border-bottom: 1px solid var(--color-border);
            }
            
            .nav__menu .nav__link:hover,
            .nav__menu .nav__link.active {
                color: var(--color-primary);
                background: var(--color-secondary);
                padding-left: var(--space-16);
                border-radius: var(--radius-sm);
            }
        }
    `;
    document.head.appendChild(style);

    console.log('Portfolio JavaScript loaded successfully!');
    console.log('Modifications appliquées :');
    console.log('✓ 1. Footer avec texte noir');
    console.log('✓ 2. Navigation : liens noirs par défaut, bleus au survol/actif');
    console.log('✓ 3. Emplacement photo profil prêt');
    console.log('✓ 4. Favicon robotique ajouté');
    console.log('✓ 5. Logo entreprise dans header');
});