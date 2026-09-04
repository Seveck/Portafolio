document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. SISTEMA DE IDIOMAS (ES / EN)
    // -------------------------------------------------------------
    const langBtn = document.getElementById('lang-btn');
    const bodyElement = document.body;

    const savedLanguage = localStorage.getItem('portfolio-lang') || 'es';
    if (savedLanguage === 'en') {
        bodyElement.classList.add('lang-en');
    } else {
        bodyElement.classList.remove('lang-en');
    }

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            bodyElement.classList.toggle('lang-en');
            if (bodyElement.classList.contains('lang-en')) {
                localStorage.setItem('portfolio-lang', 'en');
            } else {
                localStorage.setItem('portfolio-lang', 'es');
            }
        });
    }

    // -------------------------------------------------------------
    // 2. NAVBAR FIJO CON EFECTO SCROLL
    // -------------------------------------------------------------
    const navbarWrapper = document.getElementById('navbar-wrapper');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbarWrapper?.classList.add('scrolled');
        } else {
            navbarWrapper?.classList.remove('scrolled');
        }
    });

    // -------------------------------------------------------------
    // 3. SCROLLSPY E ILUMINACIÓN DINÁMICA DE TÍTULOS DE SECCIÓN
    // -------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar nav a[data-section]');

    function updateActiveSectionAndIllumination() {
        // Si estamos cerca del tope de la página, mantener el navbar y textos limpios como en el diseño original
        if (window.scrollY < 80) {
            navLinks.forEach(link => link.classList.remove('active'));
            document.querySelectorAll('.section-title').forEach(title => title.classList.remove('in-view'));
            return;
        }

        const scrollPosition = window.scrollY + 200; // Offset para activación oportuna

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const sectionTitles = section.querySelectorAll('.section-title');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Iluminar títulos de las secciones correspondientes al hacer scroll
                sectionTitles.forEach(title => title.classList.add('in-view'));

                // Resaltar enlace activo correspondiente en el Navbar
                navLinks.forEach(link => {
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            } else {
                // Desvanecer iluminación al salir de la sección
                sectionTitles.forEach(title => title.classList.remove('in-view'));
            }
        });
    }

    window.addEventListener('scroll', updateActiveSectionAndIllumination);
    updateActiveSectionAndIllumination(); // Ejecutar al cargar la página

    // -------------------------------------------------------------
    // 4. FORMULARIO DE CONTACTO 100% FUNCIONAL
    // -------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const isEnglish = bodyElement.classList.contains('lang-en');
            const originalBtnHtml = submitBtn.innerHTML;

            // Estado de envío
            submitBtn.disabled = true;
            submitBtn.innerHTML = isEnglish 
                ? '<span>Sending message...</span>' 
                : '<span>Enviando mensaje...</span>';
            
            if (formStatus) {
                formStatus.style.display = 'none';
                formStatus.className = 'form-status';
            }

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    const result = await response.json();
                    
                    if (formStatus) {
                        formStatus.className = 'form-status success';
                        formStatus.innerHTML = isEnglish
                            ? '✓ Message sent successfully! I will get back to you soon.'
                            : '✓ ¡Mensaje enviado con éxito! Te responderé lo más pronto posible.';
                        formStatus.style.display = 'block';
                    }

                    contactForm.reset();
                } else {
                    throw new Error('Network response error');
                }
            } catch (error) {
                if (formStatus) {
                    formStatus.className = 'form-status error';
                    formStatus.innerHTML = isEnglish
                        ? '✕ There was an issue sending. You can also write to me at: <a href="mailto:juanmgouveia08@gmail.com" style="color: #fff; text-decoration: underline;">juanmgouveia08@gmail.com</a>'
                        : '✕ Ocurrió un error al enviar. También puedes escribirme directamente a: <a href="mailto:juanmgouveia08@gmail.com" style="color: #fff; text-decoration: underline;">juanmgouveia08@gmail.com</a>';
                    formStatus.style.display = 'block';
                }
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
            }
        });
    }
});