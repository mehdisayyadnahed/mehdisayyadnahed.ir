// لود آنی زبان و تم از حافظه مرورگر یا ترجیحات سیستم برای جلوگیری از پرش بصری (FOUT)
(function() {
    // ۱. هماهنگ‌سازی آنی زبان
    const savedLang = localStorage.getItem('preferred-language') || 'fa';
    document.documentElement.setAttribute('lang', savedLang);
    document.documentElement.setAttribute('dir', savedLang === 'fa' ? 'rtl' : 'ltr');
    if (savedLang === 'fa') {
        document.title = "مهدی صیاد | مهندس رشد دیجیتال کسب و کار";
    } else {
        document.title = "Mehdi Sayyad | Digital Business Growth Engineer";
    }

    // ۲. هماهنگ‌سازی آنی تم سیستمی یا ذخیره‌شده (قبل از رندر نهایی بدنه)
    const savedTheme = localStorage.getItem('modern-portfolio-theme');
    if (savedTheme) {
        if (document.body) document.body.setAttribute('data-theme', savedTheme);
    } else {
        // تشخیص سازگار با تمام مرورگرها برای تم تیره سیستم‌عامل
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (document.body) document.body.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
})();

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
        Dynamic Language Toggle & Routing
        ========================================== */
    const languageToggle = document.getElementById('language-toggle');

    function setDynamicLanguage(lang) {
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', lang === 'fa' ? 'rtl' : 'ltr');
        
        // ذخیره دائم زبان انتخابی در مرورگر کاربر
        localStorage.setItem('preferred-language', lang);

        // بروزرسانی عنوان پنجره مرورگر
        if (lang === 'fa') {
            document.title = "مهدی صیاد | مهندس رشد دیجیتال کسب و کار";
        } else {
            document.title = "Mehdi Sayyad | Digital Business Growth Engineer";
        }

        // مدیریت چرخش آیکون تغییر زبان به شکل داینامیک بدون تداخل کلاس‌ها
        const langIcon = document.getElementById('language-icon');
        if (langIcon) {
            if (lang === 'en') {
                langIcon.classList.add('fa-flip-horizontal');
            } else {
                langIcon.classList.remove('fa-flip-horizontal');
            }
        }

        // همگام‌سازی استایل‌های منوی موبایل متناسب با استایل‌های راست‌چین و چپ‌چین خارجی
        const mobileMenu = document.getElementById('mobile-menu');
        const closeBtn = document.getElementById('close-menu');
        const mobileOverlay = document.getElementById('mobile-overlay');

        if (mobileMenu) {
            const isActive = mobileMenu.classList.contains('active');
            if (lang === 'fa') {
                mobileMenu.className = 'mobile-menu' + (isActive ? ' active' : '');
            } else {
                mobileMenu.className = 'mobile-menu-en' + (isActive ? ' active' : '');
            }
        }
        if (closeBtn) {
            if (lang === 'fa') {
                closeBtn.className = 'close-menu-btn';
            } else {
                closeBtn.className = 'close-menu-en-btn';
            }
        }
        if (mobileOverlay) {
            const isActive = mobileOverlay.classList.contains('active');
            if (lang === 'fa') {
                mobileOverlay.className = 'mobile-menu-overlay' + (isActive ? ' active' : '');
            } else {
                mobileOverlay.className = 'mobile-menu-en-overlay' + (isActive ? ' active' : '');
            }
        }
    }

    // لود اولیه تنظیمات زبان ذخیره شده بر روی بدنه
    const savedLanguage = localStorage.getItem('preferred-language') || 'fa';
    setDynamicLanguage(savedLanguage);

    if (languageToggle) {
        languageToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const currentLang = document.documentElement.getAttribute('lang') || 'fa';
            const newLang = currentLang === 'fa' ? 'en' : 'fa';
            setDynamicLanguage(newLang);
        });
    }

    /* ==========================================
        Scroll Progress Bar
        ========================================== */
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        if (scrollProgress) {
            scrollProgress.style.width = `${scrollPercent}%`;
        }
    });

    /* ==========================================
        Mobile Drawer Menu Logic (Single Menu)
        ========================================== */
    const mobileMenuBtn = document.getElementById('open-menu');
    const closeMenuBtn = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item, .mobile-nav-en-item');

    function openMobileMenu() {
        if (mobileMenu) mobileMenu.classList.add('active');
        if (mobileOverlay) mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }

    function closeMobileMenu() {
        if (mobileMenu) mobileMenu.classList.remove('active');
        if (mobileOverlay) mobileOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        document.body.style.overflowX = 'hidden'; 
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMobileMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

    mobileNavItems.forEach(item => {
        item.addEventListener('click', closeMobileMenu);
    });

    /* ==========================================
        Custom Cursor Logic (Desktop Only)
        ========================================== */
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    const isTouchDevice = !window.matchMedia("(pointer: fine)").matches;

    if (!isTouchDevice && cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        const hoverTargets = document.querySelectorAll('a, button, .bento-box, .modern-project-card, .service-card, .testimonial-card');
        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            });
            target.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    } else {
        if (cursorDot) cursorDot.style.display = 'none';
        if (cursorOutline) cursorOutline.style.display = 'none';
    }

    /* ==========================================
        Typing Effect (Persian)
        ========================================== */
    const typedTextSpan = document.getElementById("typed-text");
    const textArray = ["مهندس کامپیوتر", "مشاور تبلیغات آنلاین", "برنامه‌نویس", "مشاور سوشال‌مدیا"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (!typedTextSpan) return;
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (!typedTextSpan) return;
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    if (textArray.length && typedTextSpan) setTimeout(type, newTextDelay + 250);

    /* ==========================================
        Typing Effect (English)
        ========================================== */
    const typedTextSpanEn = document.getElementById("typed-text-en");
    const textArrayEn = ["Computer Engineer", "Ads Consultant", "Programmer", "Media Consultant"];
    const typingDelayEn = 100;
    const erasingDelayEn = 50;
    const newTextDelayEn = 2000;
    let textArrayIndexEn = 0;
    let charIndexEn = 0;

    function type_en() {
        if (!typedTextSpanEn) return;
        if (charIndexEn < textArrayEn[textArrayIndexEn].length) {
            typedTextSpanEn.textContent += textArrayEn[textArrayIndexEn].charAt(charIndexEn);
            charIndexEn++;
            setTimeout(type_en, typingDelayEn);
        } else {
            setTimeout(erase_en, newTextDelayEn);
        }
    }

    function erase_en() {
        if (!typedTextSpanEn) return;
        if (charIndexEn > 0) {
            typedTextSpanEn.textContent = textArrayEn[textArrayIndexEn].substring(0, charIndexEn - 1);
            charIndexEn--;
            setTimeout(erase_en, erasingDelayEn);
        } else {
            textArrayIndexEn++;
            if (textArrayIndexEn >= textArrayEn.length) textArrayIndexEn = 0;
            setTimeout(type_en, typingDelayEn + 1100);
        }
    }

    if (textArrayEn.length && typedTextSpanEn) setTimeout(type_en, newTextDelayEn + 250);

    /* ==========================================
        Dark/Light Theme Toggle (System preference compatible)
        ========================================== */
    const body = document.body;
    const savedTheme = localStorage.getItem('modern-portfolio-theme');
    let activeTheme = 'dark'; // مقدار پیش‌فرض اولیه
    
    // تشخیص نوع تم سیستمی یا لود تم ذخیره شده‌ی قبلی
    if (savedTheme) {
        activeTheme = savedTheme;
    } else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        activeTheme = prefersDark ? 'dark' : 'light';
    }
    
    body.setAttribute('data-theme', activeTheme);
    
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('i');
        updateThemeIcon(activeTheme);
    
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('modern-portfolio-theme', newTheme);
            updateThemeIcon(newTheme);
        });
    
        function updateThemeIcon(theme) {
            if (themeIcon) {
                if (theme === 'dark') {
                    themeIcon.className = 'fas fa-sun';
                } else {
                    themeIcon.className = 'fas fa-moon';
                }
            }
        }
    }

    /* ==========================================
        Scroll Reveal & Skills Progress Animation
        ========================================== */
    const progressBars = document.querySelectorAll('.progress-bar');
    
    function reveal() {
        const reveals = document.querySelectorAll(".reveal");
        const windowHeight = window.innerHeight;

        for (let i = 0; i < reveals.length; i++) {
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }

        progressBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            if (barPosition < windowHeight - 50) {
                const targetWidth = bar.getAttribute('data-width');
                bar.style.width = targetWidth;
            }
        });
    }
    window.addEventListener("scroll", reveal);
    reveal();

    /* ==========================================
        Smooth Scroll for Nav Links (With Modal Bypass)
        ========================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                if (targetElement.classList.contains('custom-modal-overlay')) {
                    e.preventDefault();
                    history.pushState(null, null, targetId); 
                    handleHashModalChange(); 
                    return;
                }

                if (this.classList.contains('custom-modal-close')) {
                    e.preventDefault();
                    history.pushState(null, null, targetId); 
                    handleHashModalChange(); 
                    return;
                }

                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 90,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ==========================================
        Hash-Based Modal Routing (No Background Jumps)
        ========================================== */
    function handleHashModalChange() {
        const hash = window.location.hash;

        const activeModals = document.querySelectorAll('.custom-modal-overlay.active');
        activeModals.forEach(modal => {
            modal.classList.remove('active');
        });

        if (hash && hash !== '#') {
            const targetModal = document.querySelector(`.custom-modal-overlay${hash}`);
            if (targetModal) {
                targetModal.classList.add('active');
            }
        }
    }

    window.addEventListener('hashchange', handleHashModalChange);
    window.addEventListener('load', handleHashModalChange);

    window.addEventListener('click', (e) => {
        const activeModal = document.querySelector('.custom-modal-overlay.active');
        if (activeModal && e.target === activeModal) {
            e.preventDefault();
            history.pushState(null, null, '#activities'); 
            handleHashModalChange();
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.keyCode === 27) {
            const activeModal = document.querySelector('.custom-modal-overlay.active');
            if (activeModal) {
                e.preventDefault();
                history.pushState(null, null, '#activities');
                handleHashModalChange();
            }
        }
    });

    /* ==========================================
        Contact Form Handling
        ========================================== */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = 'در حال ارسال... <i class="fas fa-spinner fa-spin"></i>';
            btn.style.pointerEvents = 'none';

            setTimeout(() => {
                btn.innerHTML = 'پیام با موفقیت ارسال شد <i class="fas fa-check"></i>';
                btn.style.background = '#10b981';
                btn.style.color = '#fff';
                contactForm.reset();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.style.color = '';
                    btn.style.pointerEvents = 'auto';
                }, 3000);
            }, 1500);
        });
    }

    /* ==========================================
        Neural Network Canvas Animation
        ========================================== */
    (() => {
        const canvas = document.getElementById('neural-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width, height;
        
        const colors = {
            node: '#4facfe',
            nodeGlow: 'rgba(79, 172, 254, 0.5)',
            line: 'rgba(255, 255, 255, 0.05)',
            signal: '#00f2fe'
        };

        const layerStructure = [3, 4, 4, 2];
        let nodes = [];
        let links = [];
        let signals = [];

        function resizeCanvas() {
            const parent = canvas.parentElement;
            width = parent.clientWidth;
            height = parent.clientHeight;
            canvas.width = width * window.devicePixelRatio;
            canvas.height = height * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            initNetwork();
        }

        window.addEventListener('resize', resizeCanvas);

        function initNetwork() {
            nodes = [];
            links = [];
            signals = [];

            const layerCount = layerStructure.length;
            const paddingX = 40;
            const layerSpacing = (width - paddingX * 2) / (layerCount - 1);

            layerStructure.forEach((nodeCount, layerIndex) => {
                const x = paddingX + layerIndex * layerSpacing;
                const paddingY = 20;
                const nodeSpacing = (height - paddingY * 2) / (nodeCount === 1 ? 1 : nodeCount - 1);
                
                for (let i = 0; i < nodeCount; i++) {
                    const y = nodeCount === 1 ? height / 2 : paddingY + i * nodeSpacing;
                    nodes.push({ id: `${layerIndex}-${i}`, x, y, layer: layerIndex });
                }
            });

            for (let i = 0; i < layerCount - 1; i++) {
                const currentLayerNodes = nodes.filter(n => n.layer === i);
                const nextLayerNodes = nodes.filter(n => n.layer === i + 1);
                
                currentLayerNodes.forEach(source => {
                    nextLayerNodes.forEach(target => {
                        links.push({ source, target });
                    });
                });
            }
        }

        class Signal {
            constructor(link) {
                this.link = link;
                this.progress = 0;
                this.speed = 0.01 + Math.random() * 0.015; 
                this.size = 2 + Math.random() * 1.5;
            }

            update() {
                this.progress += this.speed;
                return this.progress >= 1;
            }

            draw(ctx) {
                const x = this.link.source.x + (this.link.target.x - this.link.source.x) * this.progress;
                const y = this.link.source.y + (this.link.target.y - this.link.source.y) * this.progress;
                
                ctx.beginPath();
                ctx.arc(x, y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = colors.signal;
                ctx.shadowBlur = 10;
                ctx.shadowColor = colors.signal;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        function spawnSignals() {
            if (Math.random() > 0.85) {
                const randomLink = links[Math.floor(Math.random() * links.length)];
                signals.push(new Signal(randomLink));
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            ctx.lineWidth = 1;
            links.forEach(link => {
                ctx.beginPath();
                ctx.moveTo(link.source.x, link.source.y);
                ctx.lineTo(link.target.x, link.target.y);
                ctx.strokeStyle = colors.line;
                ctx.stroke();
            });

            spawnSignals();
            for (let i = signals.length - 1; i >= 0; i--) {
                const signal = signals[i];
                if (signal.update()) {
                    signals.splice(i, 1); 
                } else {
                    signal.draw(ctx);
                }
            }

            nodes.forEach(node => {
                ctx.beginPath();
                ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
                ctx.fillStyle = colors.node;
                
                ctx.shadowBlur = 8;
                ctx.shadowColor = colors.nodeGlow;
                ctx.fill();
                
                ctx.beginPath();
                ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(79, 172, 254, 0.2)';
                ctx.stroke();
                ctx.shadowBlur = 0;
            });

            requestAnimationFrame(animate);
        }

        resizeCanvas();
        animate();
    })();

    /* ==========================================
        Live Terminal Simulation
        ========================================== */
    (() => {
        const terminalBody = document.getElementById('live-terminal');
        if (!terminalBody) return;

        let epoch = 1;
        const totalEpochs = 50;
        let loss = 2.453;
        let accuracy = 0.45;

        const logMessages = [
            () => `[INFO] Loading dataset 'banking-conversations-v2'...`,
            () => `[INFO] Initializing distributed training across 4 GPUs...`,
            () => `[WARN] <span class="warning">VRAM usage at 88%. Enabling gradient checkpointing.</span>`,
            () => `Epoch ${epoch}/${totalEpochs} - <span class="keyword">Loss:</span> <span class="value">${loss.toFixed(4)}</span> - <span class="keyword">Accuracy:</span> <span class="value">${accuracy.toFixed(2)}</span>`,
            () => `[INFO] Running validation step...`,
            () => `[SUCCESS] <span class="success">Checkpoint saved to ./weights/llama3-finetuned-step-800.pt</span>`,
            () => `[INFO] Adjusting learning rate to 2e-5 with Cosine Healing...`,
            () => `[INFO] Garbage collection freed 1.2GB of memory.`
        ];

        function updateMetrics() {
            epoch = epoch >= totalEpochs ? 1 : epoch + 1;
            loss = Math.max(0.1, loss - (Math.random() * 0.15));
            accuracy = Math.min(0.99, accuracy + (Math.random() * 0.05));
            if (epoch === 1) { loss = 2.5; accuracy = 0.4; }
        }

        let lineCount = 0;
        const maxLines = 8;

        function addLogLine() {
            if (lineCount >= maxLines) {
                terminalBody.removeChild(terminalBody.firstChild);
            } else {
                lineCount++;
            }

            let msgFunc = Math.random() > 0.4 ? logMessages[3] : logMessages[Math.floor(Math.random() * logMessages.length)];
            
            if (msgFunc === logMessages[3]) {
                updateMetrics();
            }

            const newLine = document.createElement('div');
            newLine.className = 'term-line';
            const time = new Date().toISOString().split('T')[1].substring(0, 8);
            newLine.innerHTML = `<span style="color:#8b949e">[${time}]</span> ${msgFunc()}`;
            
            const cursor = document.createElement('span');
            cursor.className = 'term-cursor';
            newLine.appendChild(cursor);

            const oldCursor = terminalBody.querySelector('.term-cursor');
            if (oldCursor) oldCursor.remove();

            terminalBody.appendChild(newLine);

            const nextTick = 800 + Math.random() * 1700;
            setTimeout(addLogLine, nextTick);
        }

        setTimeout(addLogLine, 1000);
    })();

    /* ==========================================
        Live Computer Vision Simulation
        ========================================== */
    (() => {
        const viewport = document.getElementById('cv-viewport');
        if (!viewport) return;

        const cocoClasses = [
            { name: 'person', color: '#00ff00' },
            { name: 'vehicle', color: '#00f2fe' },
            { name: 'traffic light', color: '#ffbd2e' },
            { name: 'laptop', color: '#d2a8ff' },
            { name: 'cup', color: '#ff7b72' }
        ];

        function createBoundingBox() {
            const box = document.createElement('div');
            box.className = 'bounding-box';

            const objClass = cocoClasses[Math.floor(Math.random() * cocoClasses.length)];
            
            const width = 15 + Math.random() * 25;
            const height = 20 + Math.random() * 40;
            const left = Math.random() * (100 - width);
            const top = 10 + Math.random() * (80 - height);

            const confidence = (0.75 + Math.random() * 0.24).toFixed(2);

            box.style.width = `${width}%`;
            box.style.height = `${height}%`;
            box.style.left = `${left}%`;
            box.style.top = `${top}%`;
            box.style.borderColor = objClass.color;
            box.style.boxShadow = `inset 0 0 10px rgba(255,255,255,0.1), 0 0 8px ${objClass.color}`;

            const label = document.createElement('div');
            label.className = 'bb-label';
            label.style.backgroundColor = objClass.color;
            label.innerHTML = `${objClass.name} ${confidence}`;

            box.appendChild(label);
            viewport.appendChild(box);

            const displayTime = 1500 + Math.random() * 1500;
            setTimeout(() => {
                box.style.opacity = '0';
                setTimeout(() => {
                    if (viewport.contains(box)) viewport.removeChild(box);
                }, 300);
            }, displayTime);
        }

        function detectionLoop() {
            const currentBoxes = viewport.querySelectorAll('.bounding-box').length;
            if (currentBoxes < 3 && Math.random() > 0.3) {
                createBoundingBox();
            }
            
            const nextTick = 400 + Math.random() * 1000;
            setTimeout(detectionLoop, nextTick);
        }

        setTimeout(detectionLoop, 1000);
    })();

    /* ==========================================
        Live Vector Space / Embeddings Simulation
        ========================================== */
    (() => {
        const canvas = document.getElementById('vector-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        
        let width, height;
        let particles = [];
        const numParticles = 40;
        const connectionDistance = 80;

        function resize() {
            const parent = canvas.parentElement;
            width = parent.clientWidth;
            height = parent.clientHeight;
            canvas.width = width * window.devicePixelRatio;
            canvas.height = height * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }

        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor(isQuery = false) {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.isQuery = isQuery;
                this.radius = isQuery ? 4 : 2;
                this.color = isQuery ? '#a855f7' : '#4b5563';
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                if (this.isQuery) {
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = this.color;
                }
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }

        let queryParticle = new Particle(true);
        particles.push(queryParticle);

        setInterval(() => {
            queryParticle.x = Math.random() * width;
            queryParticle.y = Math.random() * height;
            drawPulse(queryParticle.x, queryParticle.y);
        }, 4000);

        let pulseRadius = 0;
        let pulseActive = false;
        let pulseX, pulseY;

        function drawPulse(x, y) {
            pulseActive = true;
            pulseRadius = 0;
            pulseX = x;
            pulseY = y;
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            if (pulseActive) {
                ctx.beginPath();
                ctx.arc(pulseX, pulseY, pulseRadius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(168, 85, 247, ${1 - pulseRadius / 100})`;
                ctx.lineWidth = 2;
                ctx.stroke();
                pulseRadius += 2;
                if (pulseRadius > 100) pulseActive = false;
            }

            particles.forEach(p => p.update());

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    let dx = particles[i].x - particles[j].x;
                    let dy = particles[i].y - particles[j].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        
                        let isQueryConnection = particles[i].isQuery || particles[j].isQuery;
                        let opacity = 1 - (distance / connectionDistance);
                        
                        ctx.strokeStyle = isQueryConnection 
                            ? `rgba(168, 85, 247, ${opacity})` 
                            : `rgba(100, 116, 139, ${opacity * 0.3})`;
                        
                        ctx.lineWidth = isQueryConnection ? 1.5 : 0.5;
                        ctx.stroke();
                    }
                }
            }

            particles.forEach(p => p.draw());
            requestAnimationFrame(animate);
        }

        animate();
    })();

});
