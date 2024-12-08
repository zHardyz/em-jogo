
    const carousels = document.querySelectorAll('.carousel-container');

    carousels.forEach(container => {
        const carousel = container.querySelector('.carousel');
        const items = container.querySelectorAll('.carousel-item');
        const prevButton = container.querySelector('.prev');
        const nextButton = container.querySelector('.next');

        let index = 0;

        function updateCarousel() {
            const width = items[0].clientWidth;
            carousel.style.transform = `translateX(${-index * width}px)`;
        }

        nextButton.addEventListener('click', () => {
            index = (index + 1) % items.length;
            updateCarousel();
        });

        prevButton.addEventListener('click', () => {
            index = (index - 1 + items.length) % items.length;
            updateCarousel();
        });

        window.addEventListener('resize', updateCarousel);
    });


    document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
        const button = wrapper.querySelector('.show-carousel');
        const carouselContainer = wrapper.querySelector('.carousel-container');

        button.addEventListener('click', () => {
            if (carouselContainer.classList.contains('hidden')) {
                carouselContainer.classList.remove('hidden');
                button.textContent = "Ocultar"; // Muda o texto do botão
            } else {
                carouselContainer.classList.add('hidden');
                button.textContent = "Ver"; // Volta para o texto original
            }
        });
    });

