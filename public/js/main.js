/* ============================================
   Main Application JavaScript
   Portfolio - Dhanush Gopi Kavala
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80
    });

    // Preloader
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1500);
    });
    // Fallback timeout
    setTimeout(() => preloader.classList.add('hidden'), 4000);

    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    if (cursorDot && cursorOutline) {
        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        function animateOutline() {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;
            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';
            requestAnimationFrame(animateOutline);
        }
        animateOutline();

        // Hover effect on interactive elements
        const hoverTargets = document.querySelectorAll('a, button, .project-card, .skill-card, .cert-card, .achievement-card, input, textarea');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    }

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link
        updateActiveNav();
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Mobile Menu
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Active nav link on scroll
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[data-section="${id}"]`);

            if (navLink) {
                if (scrollPos >= top && scrollPos < top + height) {
                    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }

    // Typing Animation
    const typedTextEl = document.getElementById('typed-text');
    const phrases = [
        'Full-Stack Developer',
        'AI & ML Enthusiast',
        'MERN Stack Developer',
        'Problem Solver',
        'Cloud Certified Professional'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typedTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }
    typeEffect();

    // ==========================================
    // FETCH DATA FROM APIs
    // ==========================================

    // Fetch Profile
    fetch('/api/profile')
        .then(res => res.json())
        .then(data => {
            if (data.profile) {
                const p = data.profile;

                // Update hero
                if (p.objective) {
                    document.getElementById('hero-objective').textContent = p.objective;
                }
                if (p.profileImage) {
                    document.getElementById('hero-profile-img').src = p.profileImage;
                }

                // Update about
                if (p.aboutImage) {
                    document.getElementById('about-img').src = p.aboutImage;
                }
                if (p.objective) {
                    document.getElementById('about-objective').textContent = p.objective;
                }
                if (p.college) {
                    document.getElementById('about-college').textContent = p.college;
                }
                if (p.email) {
                    document.getElementById('about-email').textContent = p.email;
                    document.getElementById('contact-email').textContent = p.email;
                    document.getElementById('contact-email').href = 'mailto:' + p.email;
                }
                if (p.phone) {
                    document.getElementById('about-phone').textContent = p.phone;
                    document.getElementById('contact-phone').textContent = p.phone;
                    document.getElementById('contact-phone').href = 'tel:' + p.phone;
                }

                // Update social links
                if (p.github) {
                    document.querySelectorAll('a[aria-label="GitHub"]').forEach(el => el.href = p.github);
                }
                if (p.linkedin) {
                    document.querySelectorAll('a[aria-label="LinkedIn"]').forEach(el => el.href = p.linkedin);
                }
            }

            // Render education timeline
            if (data.education && data.education.length > 0) {
                renderEducation(data.education);
            }
        })
        .catch(err => console.log('Profile API not available, using defaults:', err.message));

    // Fetch Projects
    fetch('/api/projects')
        .then(res => res.json())
        .then(projects => {
            if (projects.length > 0) {
                renderProjects(projects);
            }
        })
        .catch(err => console.log('Projects API not available:', err.message));

    // Fetch Skills
    fetch('/api/skills')
        .then(res => res.json())
        .then(skills => {
            if (skills.length > 0) {
                renderSkills(skills);
            }
        })
        .catch(err => console.log('Skills API not available:', err.message));

    // Fetch Certifications
    fetch('/api/certifications')
        .then(res => res.json())
        .then(certs => {
            if (certs.length > 0) {
                renderCertifications(certs);
            }
        })
        .catch(err => console.log('Certifications API not available:', err.message));

    // Fetch Achievements
    fetch('/api/achievements')
        .then(res => res.json())
        .then(achievements => {
            if (achievements.length > 0) {
                renderAchievements(achievements);
            }
        })
        .catch(err => console.log('Achievements API not available:', err.message));

    // ==========================================
    // RENDER FUNCTIONS
    // ==========================================

    function renderEducation(education) {
        const timeline = document.getElementById('education-timeline');
        timeline.innerHTML = education.map((edu, i) => `
      <div class="timeline-item" data-aos="fade-${i % 2 === 0 ? 'right' : 'left'}" data-aos-delay="${i * 100}">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <h3>${edu.degree}</h3>
          <p>${edu.institute}</p>
          <p class="timeline-cgpa">CGPA/Percentage: ${edu.cgpa}</p>
          <span class="timeline-year">${edu.year}</span>
        </div>
      </div>
    `).join('');
        AOS.refresh();
    }

    function renderProjects(projects) {
        const grid = document.getElementById('projects-grid');
        window._allProjects = projects;
        renderProjectCards(projects);

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.dataset.filter;
                const filtered = filter === 'all'
                    ? window._allProjects
                    : window._allProjects.filter(p => p.category === filter);
                renderProjectCards(filtered);
            });
        });
    }

    function renderProjectCards(projects) {
        const grid = document.getElementById('projects-grid');
        const icons = {
            'main': 'fas fa-rocket',
            'practice': 'fas fa-flask'
        };

        grid.innerHTML = projects.map(project => `
      <div class="project-card" data-category="${project.category}">
        <div class="project-card-header">
          <div class="project-icon">
            <i class="${icons[project.category] || 'fas fa-code'}"></i>
          </div>
          ${project.date ? `<span class="project-date">${project.date}</span>` : ''}
        </div>
        <div class="project-card-body">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          ${project.tools ? `
            <div class="project-tools">
              ${project.tools.split(',').map(tool => `<span class="tool-tag">${tool.trim()}</span>`).join('')}
            </div>
          ` : ''}
          <div class="project-card-footer">
            <span class="project-category-badge ${project.category}">${project.category === 'main' ? 'Main Project' : 'Practice'}</span>
            <div class="project-links">
              ${project.github ? `<a href="${project.github}" target="_blank" class="project-link-btn" title="View on GitHub"><i class="fab fa-github"></i> GitHub</a>` : ''}
              ${project.link ? `<a href="${project.link}" target="_blank" class="project-link-btn live"><i class="fas fa-external-link-alt"></i> Live</a>` : ''}
            </div>
          </div>
        </div>
      </div>
    `).join('');

        // Re-trigger animations
        void grid.offsetWidth;
    }

    function renderSkills(skills) {
        const grid = document.getElementById('skills-grid');
        grid.innerHTML = skills.map((skill, i) => `
      <div class="skill-card" data-aos="fade-up" data-aos-delay="${i * 100}">
        <div class="skill-card-icon">
          <i class="${skill.icon || 'fas fa-star'}"></i>
        </div>
        <h3>${skill.category}</h3>
        <div class="skill-tags">
          ${skill.items.map(item => `<span class="skill-tag">${item}</span>`).join('')}
        </div>
      </div>
    `).join('');
        AOS.refresh();
    }

    function renderCertifications(certs) {
        const grid = document.getElementById('certifications-grid');
        const issuerIcons = {
            'Salesforce': 'fab fa-salesforce',
            'ServiceNow': 'fas fa-cog',
            'Oracle': 'fas fa-cloud',
            'Microsoft': 'fab fa-microsoft',
            'NPTEL': 'fas fa-graduation-cap',
            'NVIDIA': 'fas fa-microchip'
        };

        grid.innerHTML = certs.map((cert, i) => `
      <div class="cert-card" data-aos="fade-up" data-aos-delay="${i * 80}">
        <div class="cert-icon">
          <i class="${issuerIcons[cert.issuer] || 'fas fa-certificate'}"></i>
        </div>
        <div class="cert-info">
          <h3>${cert.title}</h3>
          <span class="cert-issuer">Issued by ${cert.issuer}</span>
          ${cert.date ? `<span class="cert-date"><i class="fas fa-calendar-alt"></i> ${cert.date}</span>` : ''}
        </div>
        ${cert.link ? `<a href="${cert.link}" target="_blank" class="cert-link-btn" title="View Certificate"><i class="fas fa-external-link-alt"></i></a>` : ''}
      </div>
    `).join('');
        AOS.refresh();
    }

    function renderAchievements(achievements) {
        const grid = document.getElementById('achievements-grid');
        const icons = ['fas fa-trophy', 'fas fa-award', 'fas fa-medal', 'fas fa-star'];

        grid.innerHTML = achievements.map((ach, i) => `
      <div class="achievement-card" data-aos="fade-up" data-aos-delay="${i * 100}">
        <div class="achievement-icon">
          <i class="${icons[i % icons.length]}"></i>
        </div>
        <h3>${ach.title}</h3>
        <p>${ach.description}</p>
        ${ach.link ? `<a href="${ach.link}" target="_blank" class="achievement-link-btn"><i class="fas fa-external-link-alt"></i> View Certificate</a>` : ''}
      </div>
    `).join('');
        AOS.refresh();
    }

    // ==========================================
    // CONTACT FORM
    // ==========================================

    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const btnIcon = submitBtn.querySelector('.fa-paper-plane');

        // Show loading
        btnText.style.display = 'none';
        btnIcon.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;

        const formData = {
            name: document.getElementById('contact-name').value,
            email: document.getElementById('contact-form-email').value,
            subject: document.getElementById('contact-subject').value,
            message: document.getElementById('contact-message').value
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                formStatus.className = 'form-status success';
                formStatus.textContent = data.message || 'Message sent successfully!';
                contactForm.reset();
            } else {
                const errorMsg = data.errors
                    ? data.errors.map(e => e.msg).join(', ')
                    : data.message || 'Something went wrong';
                formStatus.className = 'form-status error';
                formStatus.textContent = errorMsg;
            }
        } catch (error) {
            formStatus.className = 'form-status error';
            formStatus.textContent = 'Network error. Please try again later.';
        }

        // Reset button
        btnText.style.display = 'inline';
        btnIcon.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;

        // Hide status after 5 seconds
        setTimeout(() => {
            formStatus.className = 'form-status';
            formStatus.style.display = 'none';
        }, 5000);
    });

    // ==========================================
    // TILT EFFECT ON CARDS
    // ==========================================

    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.project-card, .skill-card');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            }
        });
    });

    document.addEventListener('mouseleave', () => {
        document.querySelectorAll('.project-card, .skill-card').forEach(card => {
            card.style.transform = '';
        });
    });

    // Reset tilt on card mouse leave
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest && (e.target.closest('.project-card') || e.target.closest('.skill-card'))) {
            const card = e.target.closest('.project-card') || e.target.closest('.skill-card');
            card.style.transform = '';
        }
    });

    // ==========================================
    // SMOOTH REVEAL ANIMATION
    // ==========================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
