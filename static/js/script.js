(function () {
    'use strict';

    const CONFIG = {
        heartsCount: 12,
        heartsInterval: 1200,
        particlesCount: 80,
        particleColor: 'rgba(255, 255, 255, 0.6)',
        particleColorAlt: 'rgba(244, 114, 182, 0.4)',
        particleSize: 2,
        particleSpeed: 0.3
    };

    const MUSIC_SOURCE = 'static/music/song.mp3';
    // Replace the path above with your actual MP3 file path.

    // Loading screen
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        window.addEventListener('load', function () {
            setTimeout(function () {
                loadingScreen.classList.add('hidden');
            }, 2500);
        });
    }

    // Particles background
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animFrameId;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        resizeCanvas();

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * CONFIG.particleSize + 0.5;
                this.speedX = (Math.random() - 0.5) * CONFIG.particleSpeed;
                this.speedY = (Math.random() - 0.5) * CONFIG.particleSpeed;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.color = Math.random() > 0.5 ? CONFIG.particleColor : CONFIG.particleColorAlt;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > canvas.width) {
                    this.speedX *= -1;
                }
                if (this.y < 0 || this.y > canvas.height) {
                    this.speedY *= -1;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < CONFIG.particlesCount; i++) {
                particles.push(new Particle());
            }
        }

        function connectParticles() {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (const p of particles) {
                p.update();
                p.draw();
            }

            connectParticles();
            animFrameId = requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();

        window.addEventListener('resize', function () {
            resizeCanvas();
            initParticles();
            // Re-initialize particles positions for new canvas size
        });
    }

    // Floating hearts
    const heartsContainer = document.getElementById('hearts-container');
    if (heartsContainer) {
        const heartSymbols = ['❤️', '💕', '💗', '💖', '💝', '✨', '🌸'];

        function createHeart() {
            const heart = document.createElement('div');
            heart.className = 'heart-particle';
            heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 1.2 + 0.6) + 'rem';
            heart.style.animationDuration = (Math.random() * 4 + 5) + 's';
            heart.style.animationDelay = '0s';
            heartsContainer.appendChild(heart);

            setTimeout(function () {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 9000);
        }

        for (let i = 0; i < CONFIG.heartsCount; i++) {
            setTimeout(createHeart, i * (CONFIG.heartsInterval / CONFIG.heartsCount));
        }

        setInterval(createHeart, CONFIG.heartsInterval);
    }

    // Confetti
    function fireConfetti() {
        if (typeof canvasConfetti === 'function') {
            const duration = 3000;
            const end = Date.now() + duration;

            (function frame() {
                canvasConfetti({
                    particleCount: 3,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0, y: 0.7 },
                    colors: ['#ec4899', '#a855f7', '#fbbf24', '#f472b6', '#c084fc', '#fcd34d']
                });
                canvasConfetti({
                    particleCount: 3,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1, y: 0.7 },
                    colors: ['#ec4899', '#a855f7', '#fbbf24', '#f472b6', '#c084fc', '#fcd34d']
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            })();
        }
    }

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const html = document.documentElement;

        function setTheme(theme) {
            html.setAttribute('data-bs-theme', theme);
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
            }
            localStorage.setItem('theme', theme);
        }

        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);

        themeToggle.addEventListener('click', function () {
            const current = html.getAttribute('data-bs-theme');
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    // Music player
    const musicToggle = document.getElementById('musicToggle');
    const musicProgressBar = document.getElementById('musicProgressBar');
    const musicTime = document.getElementById('musicTime');
    const musicVolume = document.getElementById('musicVolume');
    const musicCard = document.querySelector('.music-card');

    if (musicToggle) {
        const audio = new Audio(MUSIC_SOURCE);
        audio.loop = true;
        let isPlaying = false;

        musicToggle.addEventListener('click', function () {
            if (isPlaying) {
                audio.pause();
                musicToggle.innerHTML = '<i class="bi bi-play-circle-fill"></i>';
                if (musicCard) musicCard.classList.remove('playing');
            } else {
                audio.play().catch(function () {
                    console.warn('Music file not found. Please add an MP3 to static/music/');
                });
                musicToggle.innerHTML = '<i class="bi bi-pause-circle-fill"></i>';
                if (musicCard) musicCard.classList.add('playing');
            }
            isPlaying = !isPlaying;
        });

        audio.addEventListener('timeupdate', function () {
            if (audio.duration) {
                const progress = (audio.currentTime / audio.duration) * 100;
                if (musicProgressBar) musicProgressBar.style.width = progress + '%';
                if (musicTime) musicTime.textContent = formatTime(audio.currentTime);
            }
        });

        const progressBarContainer = document.querySelector('.music-progress');
        if (progressBarContainer) {
            progressBarContainer.addEventListener('click', function (e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const width = rect.width;
                const ratio = x / width;
                if (audio.duration) {
                    audio.currentTime = ratio * audio.duration;
                }
            });
        }

        if (musicVolume) {
            musicVolume.addEventListener('input', function () {
                audio.volume = parseFloat(this.value);
            });
        }

        function formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return mins + ':' + (secs < 10 ? '0' : '') + secs;
        }
    }

    // Surprise button
    const surpriseBtn = document.getElementById('surpriseBtn');
    if (surpriseBtn) {
        surpriseBtn.addEventListener('click', function () {
            fireConfetti();

            for (let i = 0; i < 8; i++) {
                setTimeout(function () {
                    launchBurstConfetti();
                }, i * 200);
            }

            const modalEl = document.getElementById('surpriseModal');
            if (typeof bootstrap !== 'undefined' && modalEl) {
                const modal = new bootstrap.Modal(modalEl);
                modal.show();
            }
        });
    }

    function launchBurstConfetti() {
        if (typeof canvasConfetti === 'function') {
            canvasConfetti({
                particleCount: 30,
                spread: 100,
                origin: {
                    x: Math.random(),
                    y: Math.random() * 0.3
                },
                colors: ['#ec4899', '#a855f7', '#fbbf24', '#f472b6', '#c084fc', '#fcd34d']
            });
        }
    }

    // Secret letter
    const letterBtn = document.getElementById('letterBtn');
    const letterContainer = document.getElementById('letterContainer');
    if (letterBtn && letterContainer) {
        letterBtn.addEventListener('click', function () {
            const isRevealed = letterContainer.classList.contains('revealed');
            if (isRevealed) {
                letterContainer.classList.remove('revealed');
                letterBtn.innerHTML = '<span class="letter-btn-icon">✉️</span><span class="letter-btn-text">Open Secret Letter</span>';
            } else {
                letterContainer.classList.add('revealed');
                letterBtn.innerHTML = '<span class="letter-btn-icon">📬</span><span class="letter-btn-text">Close Secret Letter</span>';
                setTimeout(fireConfetti, 300);
            }
        });
    }

    // Scroll animations (AOS-like)
    const aosElements = document.querySelectorAll('[data-aos]');
    if (aosElements.length > 0) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function (entries) {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-aos-delay');
                    const delayMs = delay ? parseInt(delay) : 0;
                    setTimeout(function () {
                        entry.target.classList.add('aos-animate');
                    }, delayMs);
                    observer.unobserve(entry.target);
                }
            }
        }, observerOptions);

        for (const el of aosElements) {
            observer.observe(el);
        }
    }

    // Fireworks animation on finale
    const finaleSection = document.querySelector('.finale-section');
    if (finaleSection) {
        const finaleObserver = new IntersectionObserver(function (entries) {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    let count = 0;
                    const interval = setInterval(function () {
                        launchBurstConfetti();
                        count++;
                        if (count > 8) {
                            clearInterval(interval);
                        }
                    }, 500);
                    finaleObserver.unobserve(entry.target);
                }
            }
        }, { threshold: 0.3 });

        finaleObserver.observe(finaleSection);
    }

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const navHeight = document.querySelector('.glass-nav')?.offsetHeight || 70;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log('🎂 Happy Birthday! 🎉');
})();
