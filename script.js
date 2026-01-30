// Funcionalidade do Carrossel
document.addEventListener('DOMContentLoaded', function() {
    const carouselTrack = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.carousel-button-prev');
    const nextButton = document.querySelector('.carousel-button-next');
    const cards = document.querySelectorAll('.product-card.featured');
    
    let currentIndex = 0;
    let cardsPerView = getCardsPerView();
    
    // Determina quantos cards mostrar baseado na largura da tela
    function getCardsPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }
    
    // Atualiza o carrossel
    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth;
        const gap = 32; // 2rem em pixels
        const offset = -(currentIndex * (cardWidth + gap));
        carouselTrack.style.transform = `translateX(${offset}px)`;
        
        // Atualiza estado dos botões
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= cards.length - cardsPerView;
        
        prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextButton.style.opacity = currentIndex >= cards.length - cardsPerView ? '0.5' : '1';
    }
    
    // Navegação anterior
    prevButton.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    // Navegação próxima
    nextButton.addEventListener('click', function() {
        if (currentIndex < cards.length - cardsPerView) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    // Atualiza ao redimensionar a janela
    window.addEventListener('resize', function() {
        const newCardsPerView = getCardsPerView();
        if (newCardsPerView !== cardsPerView) {
            cardsPerView = newCardsPerView;
            currentIndex = 0;
            updateCarousel();
        }
    });
    
    // Suporte para navegação por teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevButton.click();
        } else if (e.key === 'ArrowRight') {
            nextButton.click();
        }
    });
    
    // Suporte para swipe em dispositivos touch
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselTrack.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carouselTrack.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - próximo
                nextButton.click();
            } else {
                // Swipe right - anterior
                prevButton.click();
            }
        }
    }
    
    // Inicializa o carrossel
    updateCarousel();
    
    // Adiciona transição suave após o carregamento
    setTimeout(() => {
        carouselTrack.style.transition = 'transform 0.5s ease-in-out';
    }, 100);
});

// Animação de entrada dos elementos ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observa os cards de categoria
document.querySelectorAll('.category-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Funcionalidade de busca (simulada)
const searchInput = document.querySelector('.search-input');
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const searchTerm = this.value.trim();
        if (searchTerm) {
            console.log('Buscando por:', searchTerm);
            // Aqui você implementaria a lógica de busca real
            alert(`Buscando por: ${searchTerm}`);
        }
    }
});

// Adiciona efeito de clique nos botões
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Efeito ripple
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Adiciona estilo para animação ripple
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Log de carregamento
console.log('MV Exchange - Loja carregada com sucesso! 🚀');