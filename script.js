document.addEventListener('DOMContentLoaded', () => {
    // Enhanced hero entrance animation
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transition = 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(() => {
            hero.style.opacity = '1';
        }, 100);
    }

    // Enhanced scroll to top button with smooth reveal
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    let lastScroll = 0;
    
    window.onscroll = function() {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        
        if (currentScroll > 300) {
            scrollTopBtn.style.display = "flex";
            scrollTopBtn.style.animation = "fadeInUp 0.4s ease-out";
        } else {
            scrollTopBtn.style.display = "none";
        }
        
        // Add scrolled class to header for glassmorphism effect
        const header = document.querySelector('header');
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    };

    scrollTopBtn.onclick = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Mobile menu toggle with enhanced animation
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.style.transform = navLinks.classList.contains('active') 
            ? 'rotate(90deg)' 
            : 'rotate(0deg)';
    });

    // Intersection Observer for scroll-triggered animations
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

    // Observe all cards for scroll animations
    const cards = document.querySelectorAll('.feature-card, .event-card, .team-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`;
        observer.observe(card);
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.cta-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Smooth reveal for content sections
    const sections = document.querySelectorAll('.home-content, .about-content, .events-list, .team-grid');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(section);
    });

    // Add parallax effect to hero section
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = hero.querySelectorAll('h1, .hero-subtitle, .cta-group');
            parallaxElements.forEach((el, index) => {
                const speed = 0.1 + (index * 0.05);
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // Add hover sound effect simulation (visual feedback)
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
    });

    // Cursor trail effect for desktop (subtle)
    if (window.innerWidth > 768) {
        let cursorTrail = [];
        const trailLength = 5;
        
        document.addEventListener('mousemove', (e) => {
            cursorTrail.push({ x: e.clientX, y: e.clientY });
            if (cursorTrail.length > trailLength) {
                cursorTrail.shift();
            }
        });
    }
});
