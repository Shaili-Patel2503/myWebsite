// Enhanced JavaScript for Studytable website

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // Offset for fixed header if you have one
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animated counter for statistics
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000; // ms
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            el.textContent = Math.floor(current);
            
            if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }
    
    // Animate sections when they come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animate counters if they exist in this section
                entry.target.querySelectorAll('.counter').forEach(counter => {
                    animateCounter(counter);
                });
                
                // Stop observing once animation is applied
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and key elements
    document.querySelectorAll('section, .hero-content, .feature-card').forEach(section => {
        observer.observe(section);
    });
    
    // Typing effect for hero heading (optional)
    const heroHeading = document.querySelector('.hero-text h2');
    if (heroHeading) {
        const text = heroHeading.textContent;
        heroHeading.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroHeading.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Uncomment to enable typing effect
        // typeWriter();
    }
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        // Parallax for hero section
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        }
    });
});