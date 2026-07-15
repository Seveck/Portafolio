document.addEventListener('DOMContentLoaded', () => {
    const langBtn = document.getElementById('lang-btn');
    const bodyElement = document.body;

    // 1. Cargar el idioma previamente seleccionado o por defecto español
    const savedLanguage = localStorage.getItem('portfolio-lang') || 'es';
    
    if (savedLanguage === 'en') {
        bodyElement.classList.add('lang-en');
    } else {
        bodyElement.classList.remove('lang-en');
    }

    // 2. Escuchar el clic para alternar el idioma
    langBtn.addEventListener('click', () => {
        // Toggle la clase en el body
        bodyElement.classList.toggle('lang-en');

        // Guardar la preferencia actual en el LocalStorage
        if (bodyElement.classList.contains('lang-en')) {
            localStorage.setItem('portfolio-lang', 'en');
        } else {
            localStorage.setItem('portfolio-lang', 'es');
        }
    });
});