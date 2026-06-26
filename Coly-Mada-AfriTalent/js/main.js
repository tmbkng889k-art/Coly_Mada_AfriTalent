/**
 *  ECOUTEUR POUR LE BON FONCTIONNEMENT DU CODE
 */
console.log("main.js chargé");
document.addEventListener('DOMContentLoaded', () => {
    
    // MODE DARK / LIGHT

    const toggleBtn = document.getElementById('theme-toggle');

if(localStorage.getItem('theme')==='dark'){
    document.body.classList.add('dark-mode');
    toggleBtn.textContent = '🔆';
}
toggleBtn.addEventListener('click',()=> {
    document.body.classList.toggle('dark-mode');
    if(document.body.classList.contains('dark-mode')){
        localStorage.setItem('theme', 'dark');
        toggleBtn.textContent ='🔆';
    }else{
        localStorage.setItem('theme', 'light');   
        toggleBtn.textContent="🌙"
    }
}
);
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

    const animateCounters = () => {
        const counters = document.querySelectorAll('.counter');
        const speed = 200;

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };


    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
               
                if (entry.target.classList.contains('counter-section')) {
                    animateCounters();
                }
                
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));
    
    const counterSection = document.querySelector('.counter-section');
    if (counterSection) {
        revealObserver.observe(counterSection);
    }


    
    
    
