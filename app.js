// Ultra-Modern JavaScript for Zaxix PharmaMachine Concepts

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Zaxix PharmaMachine website...');
    initModernNavigation();
    initSmoothScrolling();
    initProductFilters();
    initModalSystem();
    initFormHandling();
    initScrollAnimations();
    initModernEffects();
    initAccessibilityFeatures();
    initThemeToggle();
    
    // Ensure global functions are available immediately
    setupGlobalFunctions();
    console.log('Initialization complete');
});

// Setup Global Functions Early
function setupGlobalFunctions() {
    // Make sure these functions are globally available
    window.openModal = openModal;
    window.closeModal = closeModal;
    window.downloadDatasheet = downloadDatasheet;
    window.downloadCatalogue = downloadCatalogue;
    window.closeNotification = closeNotification;
    window.scrollToSection = scrollToSection;
    
    console.log('Global functions attached to window');
}

// Global Modal Functions (defined early)
function openModal(modalId, productName = '') {
    console.log('Opening modal:', modalId, productName);
    
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error('Modal not found:', modalId);
        return;
    }
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Set product name for inquiry modal
    if (modalId === 'inquiryModal' && productName) {
        const productField = document.getElementById('inquiryProduct');
        if (productField) {
            productField.value = productName;
        }
    }
    
    // Modern modal animation
    const container = modal.querySelector('.modal-container');
    if (container) {
        container.style.transform = 'scale(0.9)';
        container.style.opacity = '0';
        
        setTimeout(() => {
            container.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
            container.style.transform = 'scale(1)';
            container.style.opacity = '1';
        }, 10);
    }
    
    // Focus first input
    setTimeout(() => {
        const firstInput = modal.querySelector('input:not([readonly]), textarea, select');
        if (firstInput) {
            firstInput.focus();
        }
    }, 100);
    
    console.log('Modal opened successfully:', modalId);
}

function closeModal(modalId) {
    console.log('Closing modal:', modalId);
    
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error('Modal not found:', modalId);
        return;
    }
    
    const container = modal.querySelector('.modal-container');
    
    if (container) {
        container.style.transform = 'scale(0.9)';
        container.style.opacity = '0';
        
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
            container.style.transform = '';
            container.style.opacity = '';
            container.style.transition = '';
        }, 200);
    } else {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
    
    console.log('Modal closed:', modalId);
}

// Download Functions (defined early)
function downloadDatasheet(filename) {
    console.log('Download datasheet:', filename);
    showModernNotification(
        'Download Starting',
        `Downloading ${filename}... The technical datasheet will be available in your downloads folder.`,
        'info'
    );
}

function downloadCatalogue() {
    console.log('Download catalogue');
    showModernNotification(
        'Catalogue Download',
        'Downloading complete product catalogue... The PDF will be available shortly.',
        'info'
    );
}

function scrollToSection(sectionId) {
    console.log('Scroll to section:', sectionId);
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.modern-header')?.offsetHeight || 80;
        const targetPosition = section.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Modern Navigation System
function initModernNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navItems = document.querySelectorAll('.nav-item');
    
    // Mobile navigation toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.classList.toggle('nav-open');
            
            // Animate hamburger icon
            const spans = navToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translateY(8px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translateY(-8px)';
                } else {
                    span.style.transform = '';
                    span.style.opacity = '';
                }
            });
        });
    }
    
    // Close mobile menu when clicking on nav items
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navMenu && navToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('nav-open');
                
                // Reset hamburger icon
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.modern-header');
    if (header) {
        let lastScrollY = window.scrollY;
        
        const updateHeader = throttle(() => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = 'none';
            }
            
            // Hide/show header on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        }, 10);
        
        window.addEventListener('scroll', updateHeader);
    }
    
    // Active navigation highlighting
    updateActiveNavigation();
}

// Modern Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.modern-header')?.offsetHeight || 80;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Product Filter System
function initProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            console.log('Filter clicked:', filter);
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products with animation
            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Modern Modal System
function initModalSystem() {
    console.log('Initializing modal system');
    
    // Close modal when clicking backdrop
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal-backdrop')) {
            const modal = event.target.closest('.modern-modal');
            if (modal) {
                closeModal(modal.id);
            }
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const openModal = document.querySelector('.modern-modal:not(.hidden)');
            if (openModal) {
                closeModal(openModal.id);
            }
        }
    });
    
    // Add click handlers to close buttons
    const closeButtons = document.querySelectorAll('.modal-close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modern-modal');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });
    
    console.log('Modal system initialized');
}

// Modern Form Handling
function initFormHandling() {
    console.log('Initializing form handling');
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
        console.log('Contact form handler attached');
    }
    
    // Quote Form
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', handleQuoteForm);
        console.log('Quote form handler attached');
    }
    
    // Inquiry Form
    const inquiryForm = document.getElementById('inquiryForm');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', handleInquiryForm);
        console.log('Inquiry form handler attached');
    }
    
    // Enhanced form validation
    initFormValidation();
    
    // Ensure notification styles are loaded
    loadNotificationStyles();
}

function handleContactForm(event) {
    event.preventDefault();
    console.log('Contact form submitted');
    
    const submitButton = event.target.querySelector('.form-submit');
    
    if (submitButton) {
        showLoadingState(submitButton);
    }
    
    // Simulate form submission
    setTimeout(() => {
        showModernNotification(
            'Message Sent Successfully!',
            'Thank you for contacting us. Our team will respond within 24 hours.',
            'success'
        );
        
        if (submitButton) {
            hideLoadingState(submitButton);
        }
        
        event.target.reset();
        console.log('Contact form processed');
    }, 1500);
}

function handleQuoteForm(event) {
    event.preventDefault();
    console.log('Quote form submitted');
    
    const submitButton = event.target.querySelector('.btn-primary');
    
    if (submitButton) {
        showLoadingState(submitButton);
    }
    
    setTimeout(() => {
        showModernNotification(
            'Quote Request Submitted!',
            'Our sales team will contact you within 2 business days with a detailed quote.',
            'success'
        );
        
        if (submitButton) {
            hideLoadingState(submitButton);
        }
        
        closeModal('quoteModal');
        event.target.reset();
        console.log('Quote form processed');
    }, 1500);
}

function handleInquiryForm(event) {
    event.preventDefault();
    console.log('Inquiry form submitted');
    
    const submitButton = event.target.querySelector('.btn-primary');
    
    if (submitButton) {
        showLoadingState(submitButton);
    }
    
    setTimeout(() => {
        showModernNotification(
            'Inquiry Sent!',
            'Our technical team will respond with detailed product information shortly.',
            'success'
        );
        
        if (submitButton) {
            hideLoadingState(submitButton);
        }
        
        closeModal('inquiryModal');
        event.target.reset();
        console.log('Inquiry form processed');
    }, 1500);
}

// Modern Form Validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateField(input);
                }
            });
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    // Update field appearance
    updateFieldValidation(field, isValid, errorMessage);
    return isValid;
}

function updateFieldValidation(field, isValid, errorMessage) {
    const errorElement = field.parentNode.querySelector('.field-error');
    
    if (isValid) {
        field.classList.remove('error');
        field.style.borderColor = '';
        if (errorElement) {
            errorElement.remove();
        }
    } else {
        field.classList.add('error');
        field.style.borderColor = 'var(--color-error)';
        
        if (!errorElement) {
            const error = document.createElement('div');
            error.className = 'field-error';
            error.textContent = errorMessage;
            error.style.cssText = `
                color: var(--color-error);
                font-size: var(--font-size-xs);
                margin-top: var(--space-4);
                font-weight: 500;
            `;
            field.parentNode.appendChild(error);
        }
    }
}

// Modern Loading States
function showLoadingState(button) {
    if (!button) return;
    
    const originalText = button.innerHTML;
    button.dataset.originalText = originalText;
    button.disabled = true;
    button.innerHTML = `
        <svg class="loading-spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2v4M12 18v4M22 12h-4M6 12H2M19.07 4.93l-2.83 2.83M7.76 16.24l-2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        </svg>
        <span>Processing...</span>
    `;
    
    // Add spinner animation
    const spinner = button.querySelector('.loading-spinner');
    if (spinner) {
        spinner.style.animation = 'spin 1s linear infinite';
    }
    
    // Add spinner keyframes if not exists
    if (!document.querySelector('#spinner-styles')) {
        const style = document.createElement('style');
        style.id = 'spinner-styles';
        style.textContent = `
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

function hideLoadingState(button) {
    if (!button) return;
    
    button.disabled = false;
    button.innerHTML = button.dataset.originalText || 'Submit';
    delete button.dataset.originalText;
}

// Load Notification Styles
function loadNotificationStyles() {
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .modern-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--color-surface);
                border: 1px solid var(--color-card-border);
                border-radius: var(--radius-lg);
                padding: var(--space-16);
                max-width: 400px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
                z-index: 3000;
                transform: translateX(100%);
                transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .modern-notification.success {
                border-left: 4px solid var(--color-success);
            }
            .modern-notification.error {
                border-left: 4px solid var(--color-error);
            }
            .modern-notification.warning {
                border-left: 4px solid var(--color-warning);
            }
            .modern-notification.info {
                border-left: 4px solid var(--color-info);
            }
            .notification-content {
                display: flex;
                align-items: flex-start;
                gap: var(--space-12);
            }
            .notification-icon {
                font-size: var(--font-size-lg);
                margin-top: var(--space-2);
            }
            .notification-text {
                flex: 1;
            }
            .notification-title {
                font-size: var(--font-size-base);
                font-weight: 600;
                color: var(--color-text);
                margin: 0 0 var(--space-4) 0;
            }
            .notification-message {
                font-size: var(--font-size-sm);
                color: var(--color-text-secondary);
                margin: 0;
                line-height: 1.4;
            }
            .notification-close {
                background: none;
                border: none;
                color: var(--color-text-secondary);
                font-size: var(--font-size-lg);
                cursor: pointer;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: var(--radius-sm);
                transition: all var(--duration-fast);
            }
            .notification-close:hover {
                background: var(--color-secondary);
                color: var(--color-text);
            }
            .notification-progress {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                border-radius: 0 0 var(--radius-lg) var(--radius-lg);
                animation: notificationProgress 5s linear forwards;
            }
            .notification-progress.success {
                background: var(--color-success);
            }
            .notification-progress.error {
                background: var(--color-error);
            }
            .notification-progress.warning {
                background: var(--color-warning);
            }
            .notification-progress.info {
                background: var(--color-info);
            }
            @keyframes notificationProgress {
                from { width: 100%; }
                to { width: 0%; }
            }
        `;
        document.head.appendChild(style);
        console.log('Notification styles loaded');
    }
}

// Modern Notification System
function showModernNotification(title, message, type = 'success') {
    console.log('Showing notification:', title, type);
    
    const notification = document.createElement('div');
    notification.className = `modern-notification ${type}`;
    
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">${icons[type]}</div>
            <div class="notification-text">
                <h4 class="notification-title">${title}</h4>
                <p class="notification-message">${message}</p>
            </div>
            <button class="notification-close" onclick="closeNotification(this)">×</button>
        </div>
        <div class="notification-progress ${type}"></div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    console.log('Notification displayed');
}

function closeNotification(button) {
    const notification = button.closest('.modern-notification');
    if (notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Staggered animation for grids
                if (entry.target.classList.contains('solutions-grid') ||
                    entry.target.classList.contains('products-grid') ||
                    entry.target.classList.contains('services-grid')) {
                    const cards = entry.target.querySelectorAll('.solution-card, .product-card, .service-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(`
        .solution-card, .product-card, .service-card, 
        .achievement-item, .cert-item, .contact-method,
        .solutions-grid, .products-grid, .services-grid
    `);
    
    animateElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Modern Effects and Interactions
function initModernEffects() {
    // Parallax effect for hero section
    const hero = document.querySelector('.ultra-hero');
    const floatingElements = document.querySelectorAll('.floating-element');
    
    if (hero || floatingElements.length > 0) {
        const parallaxEffect = throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (hero) {
                hero.style.transform = `translateY(${rate}px)`;
            }
            
            floatingElements.forEach((element, index) => {
                const speed = 0.2 + (index * 0.1);
                element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
            });
        }, 16);
        
        window.addEventListener('scroll', parallaxEffect);
    }
    
    // Hover effects for cards
    const cards = document.querySelectorAll('.solution-card, .product-card, .service-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Back to top button
    initBackToTop();
}

// Back to Top Button
function initBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
    `;
    backToTop.className = 'back-to-top-btn';
    backToTop.setAttribute('aria-label', 'Back to top');
    
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--color-primary), var(--color-teal-800));
        color: white;
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(var(--color-teal-500-rgb), 0.3);
        opacity: 0;
        visibility: hidden;
        transition: all var(--duration-normal) var(--ease-standard);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(backToTop);
    
    const toggleBackToTop = throttle(() => {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    }, 100);
    
    window.addEventListener('scroll', toggleBackToTop);
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTop.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.1)';
    });
    
    backToTop.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
}

// Modern Accessibility Features
function initAccessibilityFeatures() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: fixed;
        top: -100px;
        left: 20px;
        background: var(--color-primary);
        color: white;
        padding: var(--space-8) var(--space-16);
        text-decoration: none;
        border-radius: var(--radius-base);
        z-index: 9999;
        transition: top var(--duration-fast);
        font-weight: 600;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '20px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-100px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Keyboard navigation enhancement
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add keyboard navigation styles
    if (!document.querySelector('#keyboard-styles')) {
        const keyboardStyles = document.createElement('style');
        keyboardStyles.id = 'keyboard-styles';
        keyboardStyles.textContent = `
            .keyboard-navigation *:focus-visible {
                outline: 2px solid var(--color-primary) !important;
                outline-offset: 2px !important;
            }
        `;
        document.head.appendChild(keyboardStyles);
    }
}

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Function to set the theme
    const setTheme = (theme) => {
        htmlElement.setAttribute('data-color-scheme', theme);
        localStorage.setItem('theme', theme);
    };

    // Check for saved theme in localStorage or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDark) {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    // Add click event listener to the toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-color-scheme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    // Listen for changes in system preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        // Only change if no theme is manually set in localStorage
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
}

// Active Navigation Update
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item[href^="#"]');
    
    if (sections.length === 0 || navItems.length === 0) return;
    
    const updateActive = throttle(() => {
        const scrollPosition = window.scrollY + 150;
        
        let activeSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                activeSection = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${activeSection}`) {
                item.classList.add('active');
            }
        });
    }, 50);
    
    window.addEventListener('scroll', updateActive);
    updateActive(); // Initial call
}

// Utility Functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
function optimizePerformance() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Preload critical resources
    const preloadLinks = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
    ];
    
    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);