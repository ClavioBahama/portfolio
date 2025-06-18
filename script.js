 // Theme Toggle
        function toggleTheme() {
            const body = document.body;
            const button = document.querySelector('.theme-toggle');
            
            if (body.getAttribute('data-theme') === 'light') {
                body.removeAttribute('data-theme');
                button.textContent = '🌙';
            } else {
                body.setAttribute('data-theme', 'light');
                button.textContent = '☀️';
            }
        }

        // Language Toggle
        let currentLang = 'pt';
        
        function toggleLanguage() {
            currentLang = currentLang === 'pt' ? 'en' : 'pt';
            const button = document.querySelector('.lang-toggle');
            button.textContent = currentLang === 'pt' ? 'EN' : 'PT';
            
            // Update all translatable elements
            const elements = document.querySelectorAll('[data-pt][data-en]');
            elements.forEach(element => {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = element.getAttribute('data-' + currentLang);
                } else {
                    element.textContent = element.getAttribute('data-' + currentLang);
                }
            });
        }

        // Typing Animation
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.textContent = '';
            
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            type();
        }

        // Form Submission
        function handleSubmit(event) {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            
            // Simulate form submission
            const button = form.querySelector('.submit-btn');
            const originalText = button.textContent;
            button.textContent = currentLang === 'pt' ? 'Enviando...' : 'Sending...';
            button.disabled = true;
            
            setTimeout(() => {
                alert(currentLang === 'pt' ? 'Mensagem enviada com sucesso!' : 'Message sent successfully!');
                form.reset();
                button.textContent = originalText;
                button.disabled = false;
            }, 2000);
        }

        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // GSAP Animations
        gsap.registerPlugin(ScrollTrigger);

        // Initialize animations when page loads
        window.addEventListener('load', () => {
            // Hero animations
            const heroElements = document.querySelectorAll('.hero .fade-in');
            gsap.fromTo(heroElements, 
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out" }
            );

            // Typing animation for hero subtitle
            const typingElement = document.querySelector('.typing-animation');
            const texts = {
                pt: "Desenvolvedor Full Stack & Gamer Apaixonado",
                en: "Full Stack Developer & Passionate Gamer"
            };
            
            setTimeout(() => {
                typeWriter(typingElement, texts[currentLang], 50);
            }, 1000);

            // Scroll-triggered animations
            gsap.utils.toArray('.fade-in').forEach(element => {
                if (!element.closest('.hero')) {
                    gsap.fromTo(element,
                        { opacity: 0, y: 30 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: element,
                                start: "top 80%",
                                toggleActions: "play none none reverse"
                            }
                        }
                    );
                }
            });

            gsap.utils.toArray('.slide-in-left').forEach(element => {
                gsap.fromTo(element,
                    { opacity: 0, x: -50 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: element,
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

            gsap.utils.toArray('.slide-in-right').forEach(element => {
                gsap.fromTo(element,
                    { opacity: 0, x: 50 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: element,
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

            gsap.utils.toArray('.scale-in').forEach(element => {
                gsap.fromTo(element,
                    { opacity: 0, scale: 0.8 },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: element,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

            // Stagger animation for skills
            gsap.fromTo('.skills-grid .skill-item',
                { opacity: 0, y: 30, scale: 0.8 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: '.skills-grid',
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Projects cards stagger animation
            gsap.fromTo('.projects-grid .project-card',
                { opacity: 0, y: 50, rotationY: 15 },
                {
                    opacity: 1,
                    y: 0,
                    rotationY: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: '.projects-grid',
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Navbar scroll effect
            ScrollTrigger.create({
                trigger: "body",
                start: "top -80",
                end: "bottom bottom",
                onUpdate: (self) => {
                    const nav = document.querySelector('nav');
                    if (self.direction === -1) {
                        nav.style.transform = 'translateY(0)';
                    } else {
                        nav.style.transform = 'translateY(-100%)';
                    }
                }
            });

            // Parallax effect for background
            gsap.to('.bg-animation::before', {
                yPercent: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: "body",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });

        // Enhanced hover effects
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    scale: 1.05,
                    rotationY: 5,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    scale: 1,
                    rotationY: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });

        document.querySelectorAll('.skill-item').forEach(skill => {
            skill.addEventListener('mouseenter', () => {
                gsap.to(skill, {
                    scale: 1.1,
                    rotation: 5,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                });
            });

            skill.addEventListener('mouseleave', () => {
                gsap.to(skill, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                });
            });
        });

        // Interactive cursor effect (optional enhancement)
        document.addEventListener('mousemove', (e) => {
            const cursor = document.querySelector('.cursor');
            if (!cursor) {
                const newCursor = document.createElement('div');
                newCursor.className = 'cursor';
                newCursor.style.cssText = `
                    position: fixed;
                    width: 20px;
                    height: 20px;
                    background: var(--accent-primary);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    mix-blend-mode: difference;
                    transition: transform 0.1s ease;
                `;
                document.body.appendChild(newCursor);
            }
            
            const cursorElement = document.querySelector('.cursor');
            gsap.to(cursorElement, {
                x: e.clientX - 10,
                y: e.clientY - 10,
                duration: 0.1
            });
        });

        // Enhanced form validation
        const form = document.querySelector('.contact-form');
        const inputs = form.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                gsap.to(input, {
                    scale: 1.02,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });

            input.addEventListener('blur', () => {
                gsap.to(input, {
                    scale: 1,
                    duration: 0.2,
                    ease: "power2.out"
                });
                
                // Simple validation
                if (input.required && !input.value.trim()) {
                    input.style.borderColor = 'var(--accent-secondary)';
                    gsap.to(input, {
                        x: [-10, 10, -10, 10, 0],
                        duration: 0.4,
                        ease: "power2.inOut"
                    });
                } else {
                    input.style.borderColor = 'rgba(0, 255, 136, 0.3)';
                }
            });
        });

        // Language update for typing animation
        const originalToggleLanguage = toggleLanguage;
        toggleLanguage = function() {
            originalToggleLanguage();
            
            // Update typing animation
            const typingElement = document.querySelector('.typing-animation');
            const texts = {
                pt: "Desenvolvedor Full Stack & Gamer Apaixonado",
                en: "Full Stack Developer & Passionate Gamer"
            };
            
            typeWriter(typingElement, texts[currentLang], 30);
        };

        // Mobile menu toggle (for future enhancement)
        function toggleMobileMenu() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // Preloader (optional)
        window.addEventListener('load', () => {
            const preloader = document.querySelector('.preloader');
            if (preloader) {
                gsap.to(preloader, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => preloader.remove()
                });
            }
        });

        // Easter egg - Konami code
        let konamiCode = [];
        const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.code);
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }
            
            if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
                // Easter egg activated!
                document.body.style.animation = 'rainbow 2s infinite';
                setTimeout(() => {
                    document.body.style.animation = '';
                }, 5000);
                
                alert('🎮 Gamer mode activated! 🎮');
                konamiCode = [];
            }
        });

        // Add rainbow animation for easter egg
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
            
            .keyboard-navigation *:focus {
                outline: 2px solid var(--accent-primary);
                outline-offset: 2px;
            }
        `;
        document.head.appendChild(style);