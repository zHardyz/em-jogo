// Hardy em Jogo - Script principal modernizado
document.addEventListener('DOMContentLoaded', function() {
    // Detecção de dispositivo móvel para otimizações
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        document.body.classList.add('is-mobile');
    }

    // Detectar página ativa e marcar no navbar
    function setActiveNavItem() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPage = link.getAttribute('href');
            
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html') ||
                (currentPage === 'index.html' && linkPage === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    // Aplicar página ativa
    setActiveNavItem();

    // Prevenir scroll horizontal em toda a página
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
    
    // Funcionalidade do menu mobile melhorada
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        // Menu dropdown mobile com animações
        mobileToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isOpen = navLinks.classList.contains('active');
            
            if (isOpen) {
                // Fechar menu
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
                document.body.style.overflow = '';
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                
                // Animação do ícone
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                }
            } else {
                // Abrir menu
                navLinks.classList.add('active');
                document.body.classList.add('menu-open');
                document.body.style.overflow = 'hidden';
                mobileToggle.classList.add('active');
                mobileToggle.setAttribute('aria-expanded', 'true');
                
                // Animação do ícone
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.style.transform = 'rotate(90deg)';
                }
            }
        });
    }
    
    // Fechar menu mobile ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
                document.body.style.overflow = '';
                mobileToggle.classList.remove('active');
                
                if (mobileToggle) {
                    mobileToggle.setAttribute('aria-expanded', 'false');
                    const icon = mobileToggle.querySelector('i');
                    if (icon) {
                        icon.style.transform = 'rotate(0deg)';
                    }
                }
            }
        });
    });
    
    // Fechar menu mobile ao clicar fora
    document.addEventListener('click', function(e) {
        if (
            navLinks && 
            navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            mobileToggle && !mobileToggle.contains(e.target)
        ) {
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            document.body.style.overflow = '';
            mobileToggle.classList.remove('active');
            
            if (mobileToggle) {
                mobileToggle.setAttribute('aria-expanded', 'false');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                }
            }
        }
    });

    // Fechar menu mobile ao pressionar ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            document.body.style.overflow = '';
            mobileToggle.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotate(0deg)';
            }
        }
    });
    
    // Prevenir scroll horizontal em dispositivos móveis
    document.addEventListener('touchmove', function(e) {
        if (document.body.classList.contains('menu-open')) {
            // Permitir scroll apenas dentro do menu
            if (!navLinks.contains(e.target)) {
                e.preventDefault();
            }
        }
    }, { passive: false });
    
    // Verificar e corrigir qualquer scroll horizontal
    window.addEventListener('resize', function() {
        document.documentElement.style.overflowX = 'hidden';
        document.body.style.overflowX = 'hidden';
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
    
    // Funcionalidade do carrossel melhorada
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
    
    // Ajustar carrosséis para dispositivos móveis
    if (isMobile) {
        adjustCarouselsForMobile();
    }
    
    // Ajustar tamanho dos carrosséis ao redimensionar a janela
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            document.body.classList.add('is-mobile');
            adjustCarouselsForMobile();
        } else {
            document.body.classList.remove('is-mobile');
        }
    });
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
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                currentSlide = (currentSlide + 1) % totalSlides;
                updateCarousel();
            });
            
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                updateCarousel();
            });
            
            // Adicionar suporte para gestos de deslize em dispositivos móveis
            let touchStartX = 0;
            let touchEndX = 0;
            
            carousel.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, {passive: true});
            
            carousel.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, {passive: true});
            
            function handleSwipe() {
                const swipeThreshold = 50;
                if (touchEndX < touchStartX - swipeThreshold) {
                    // Deslize para a esquerda - próximo slide
                    currentSlide = (currentSlide + 1) % totalSlides;
                    updateCarousel();
                } else if (touchEndX > touchStartX + swipeThreshold) {
                    // Deslize para a direita - slide anterior
                    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                    updateCarousel();
                }
            }
            
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
            carousel.addEventListener('touchstart', stopAutoPlay, {passive: true});
            carousel.addEventListener('touchend', startAutoPlay, {passive: true});
            
            // Iniciar auto-play
            startAutoPlay();
        }
    });
}

// Função para ajustar carrosséis em dispositivos móveis
function adjustCarouselsForMobile() {
    document.querySelectorAll('.carousel').forEach(carousel => {
        const carouselItems = carousel.querySelectorAll('.carousel-item');
        carouselItems.forEach(item => {
            const img = item.querySelector('img');
            if (img) {
                img.style.height = '200px';
                img.style.objectFit = 'cover';
            }
        });
    });
}

// Função para filtrar itens de acordo com o termo de pesquisa
function filterItems(searchTerm) {
    const items = document.querySelectorAll('.item');
    const noResultsMessage = document.getElementById('noResultsMessage');
    let hasResults = false;
    
    items.forEach(item => {
        const title = item.getAttribute('data-title')?.toLowerCase() || '';
        const isVisible = title.includes(searchTerm);
        
        item.style.display = isVisible ? 'block' : 'none';
        if (isVisible) hasResults = true;
    });
    
    if (noResultsMessage) {
        noResultsMessage.style.display = hasResults ? 'none' : 'block';
    }
} 