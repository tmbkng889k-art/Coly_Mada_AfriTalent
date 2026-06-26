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


    // 7. Filtrage dynamique des freelances
    const filterCategory = document.getElementById('filterCategory');
    const freelanceCards = document.querySelectorAll('.freelance-card');

    filterCategory?.addEventListener('change', (e) => {
        const selectedCategory = e.target.value;

        freelanceCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                card.style.display = 'block';
                setTimeout(() => card.style.opacity = '1', 10);
            } else {
                card.style.opacity = '0';
                setTimeout(() => card.style.display = 'none', 300);
            }
        });
    });

    // 8. Validation du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;

        document.getElementById("nameError").textContent = "";
        if (name.length < 2) {
             document.getElementById("nameError").textContent = "Veuillez entrer un nom valide.";
            
            isValid = false;
        }
         document.getElementById("emailError").textContent = "";
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
             document.getElementById("emailError").textContent = "Veuillez entrer une adresse email valide.";
            isValid = false;
        }
         document.getElementById("messageError").textContent = "";
        if (message.length < 20) {
             document.getElementById("messageError").textContent = "Votre message doit contenir au moins 20 caractères.";
            isValid = false;
        }

        if (isValid) {
            // Simulation d'envoi
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Envoi...';

            setTimeout(() => {
                contactForm.reset();
                contactForm.classList.add('d-none');
                formSuccess.classList.remove('d-none');
                console.log('Formulaire envoyé avec succès !');
            }, 1500);
        }
    });


    
    
    
