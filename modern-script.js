// Hardy em Jogo - Script principal modernizado
document.addEventListener('DOMContentLoaded', function() {
    // Detecção de dispositivo móvel para otimizações
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        document.body.classList.add('is-mobile');
    }

    // Funcionalidade do menu mobile
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileToggle.setAttribute('aria-expanded', 
                mobileToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
            );
            // Alternar ícone do menu
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }
    
    // Fechar menu mobile ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (mobileToggle) {
                    mobileToggle.setAttribute('aria-expanded', 'false');
                    const icon = mobileToggle.querySelector('i');
                    if (icon) {
                        icon.classList.add('fa-bars');
                        icon.classList.remove('fa-times');
                    }
                }
            }
        });
    });
    
    // Fechar menu mobile ao clicar fora
    document.addEventListener('click', function(e) {
        if (
            navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !mobileToggle.contains(e.target)
        ) {
            navLinks.classList.remove('active');
            if (mobileToggle) {
                mobileToggle.setAttribute('aria-expanded', 'false');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        }
    });
    
    // Efeito de rolagem suave para links de ancoragem
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Funcionalidade do carrossel
    initializeCarousels();
    
    // Efeito de revelação ao rolar
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {threshold: 0.1});
    
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
        // Adiciona classe inicial para preparar para a animação
        el.classList.add('reveal-initial');
    });
    
    // Funcionalidade de pesquisa
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterItems(searchTerm);
        });
    }

    // Adicionar efeito de hover nas cards para dispositivos móveis
    if (isMobile) {
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('touchstart', function() {
                this.classList.add('touch-hover');
            });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-hover');
                }, 300);
            });
        });
    }
});

// Função para inicializar todos os carrosséis da página
function initializeCarousels() {
    document.querySelectorAll('.carousel').forEach(carousel => {
        if (!carousel.querySelector('.carousel-controls')) {
            const container = carousel.querySelector('.carousel-container');
            if (!container) return;
            
            // Criar botões de controle
            const controls = document.createElement('div');
            controls.className = 'carousel-controls';
            
            const prevBtn = document.createElement('button');
            prevBtn.className = 'carousel-btn prev-btn';
            prevBtn.innerHTML = '<span>&lsaquo;</span>';
            prevBtn.setAttribute('aria-label', 'Slide anterior');
            
            const nextBtn = document.createElement('button');
            nextBtn.className = 'carousel-btn next-btn';
            nextBtn.innerHTML = '<span>&rsaquo;</span>';
            nextBtn.setAttribute('aria-label', 'Próximo slide');
            
            controls.appendChild(prevBtn);
            controls.appendChild(nextBtn);
            carousel.appendChild(controls);
            
            // Inicializar estado do carrossel
            let currentSlide = 0;
            const items = container.querySelectorAll('.carousel-item');
            const totalSlides = items.length;
            
            if (totalSlides <= 1) {
                controls.style.display = 'none';
                return;
            }
            
            // Funcionalidade dos botões
            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % totalSlides;
                updateCarousel();
            });
            
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                updateCarousel();
            });
            
            // Atualizar a posição do carrossel
            function updateCarousel() {
                container.style.transform = `translateX(-${currentSlide * 100}%)`;
            }
            
            // Auto-play (opcional)
            let interval;
            function startAutoPlay() {
                interval = setInterval(() => {
                    currentSlide = (currentSlide + 1) % totalSlides;
                    updateCarousel();
                }, 5000);
            }
            
            function stopAutoPlay() {
                clearInterval(interval);
            }
            
            carousel.addEventListener('mouseenter', stopAutoPlay);
            carousel.addEventListener('mouseleave', startAutoPlay);
            
            // Iniciar auto-play
            startAutoPlay();
        }
    });
}

// Função para filtrar itens de acordo com o termo de pesquisa
function filterItems(searchTerm) {
    const items = document.querySelectorAll('.item');
    const noResultsMessage = document.getElementById('noResultsMessage');
    let hasResults = false;
    
    items.forEach(item => {
        const title = item.getAttribute('data-title').toLowerCase();
        const isVisible = title.includes(searchTerm);
        
        item.style.display = isVisible ? 'block' : 'none';
        if (isVisible) hasResults = true;
    });
    
    if (noResultsMessage) {
        noResultsMessage.style.display = hasResults ? 'none' : 'block';
    }
} 