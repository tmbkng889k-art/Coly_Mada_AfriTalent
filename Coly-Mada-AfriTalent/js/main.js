/**
 *  ECOUTEUR POUR LE BON FONCTIONNEMENT DU CODE
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // MODE DARK / LIGHT

    const themeToggle = document.getElementById('theme-toggle');
    const body = document.documentElement;
    const themeIcon = themeToggle?.querySelector('i');

    //THEME SAUVEGARDE

    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle?.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        if (theme === 'dark') {
            themeIcon.classList.replace('bi-moon-stars', 'bi-sun');
        } else {
            themeIcon.classList.replace('bi-sun', 'bi-moon-stars');
        }
    }

    //  Navbar SCROLL

    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        // Navbar

        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Bouton Retour en haut
        if (window.scrollY > 500) {
            backToTop?.classList.remove('d-none');
        } else {
            backToTop?.classList.add('d-none');
        }
    });

    //Scroll fluide pour le bouton retour en haut

    backToTop?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

   
});