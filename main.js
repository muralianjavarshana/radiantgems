// Radiant Gems - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle (if needed in future)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add active class to current page in navigation
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // Form validation for contact form
    const contactForm = document.querySelector('form[action*="contact"]');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const requiredFields = contactForm.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#e74c3c';
                    isValid = false;
                } else {
                    field.style.borderColor = '#dee2e6';
                }
            });

            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    }

    // Image lazy loading (basic implementation)
    const images = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Shopping cart functionality (basic)
    let cart = JSON.parse(localStorage.getItem('radiantGemsCart')) || [];

    window.addToCart = function(productId, price) {
        const quantity = parseInt(document.getElementById('quantity')?.value) || 1;
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: productId,
                price: price,
                quantity: quantity
            });
        }

        localStorage.setItem('radiantGemsCart', JSON.stringify(cart));
        updateCartCount();
        alert(`Added ${quantity} item(s) to cart!`);
    };

    function updateCartCount() {
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        const cartBadge = document.querySelector('.cart-badge');

        if (cartBadge) {
            cartBadge.textContent = cartCount;
            cartBadge.style.display = cartCount > 0 ? 'inline' : 'none';
        }
    }

    // Initialize cart count on page load
    updateCartCount();

    // Product filtering (for products page)
    const filterForm = document.querySelector('.filters');
    if (filterForm) {
        const filterSelects = filterForm.querySelectorAll('select');

        filterSelects.forEach(select => {
            select.addEventListener('change', filterProducts);
        });
    }

    function filterProducts() {
        const categoryFilter = document.getElementById('category')?.value || 'all';
        const materialFilter = document.getElementById('material')?.value || 'all';
        const priceFilter = document.getElementById('price-range')?.value || 'all';

        const products = document.querySelectorAll('.product-card');

        products.forEach(product => {
            const category = product.dataset.category;
            const material = product.dataset.material;
            const price = parseFloat(product.dataset.price);

            let show = true;

            if (categoryFilter !== 'all' && category !== categoryFilter) {
                show = false;
            }

            if (materialFilter !== 'all' && material !== materialFilter) {
                show = false;
            }

            if (priceFilter !== 'all') {
                const [min, max] = priceFilter.split('-').map(p => p === '+' ? Infinity : parseFloat(p));
                if (price < min || price > max) {
                    show = false;
                }
            }

            product.style.display = show ? 'block' : 'none';
        });
    }

    // Newsletter signup (placeholder)
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with ${email}!`);
            this.reset();
        });
    }

    // Search functionality (placeholder)
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = this.querySelector('input[type="search"]').value;
            alert(`Search functionality coming soon! You searched for: ${query}`);
        });
    }
});

// Utility functions
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

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        });

        elements.forEach(element => observer.observe(element));
    }
}

// Initialize animations
animateOnScroll();