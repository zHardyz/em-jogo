// Pesquisa por título
document.getElementById('searchInput').addEventListener('input', function () {
    const searchQuery = this.value.toLowerCase().trim(); // Remove espaços desnecessários
    const items = document.querySelectorAll('.item');
    const noResultsMessage = document.getElementById('noResultsMessage');
    let found = false;

    items.forEach(item => {
        const title = item.dataset.title.toLowerCase();
        // Verifica se o título contém o texto digitado
        if (title.includes(searchQuery)) {
            item.style.display = 'block'; // Exibe o item correspondente
            found = true;
        } else {
            item.style.display = 'none'; // Oculta itens que não correspondem
        }
    });

    // Exibe ou oculta a mensagem de "não tem nada"
    noResultsMessage.style.display = found || searchQuery === '' ? 'none' : 'flex';
});

// Carrossel funcional
document.querySelectorAll('.carousel').forEach(carousel => {
    const wrapper = carousel.querySelector('.carousel-wrapper');
    const images = wrapper.querySelectorAll('img');
    const nextBtn = carousel.querySelector('.next');
    const prevBtn = carousel.querySelector('.prev'); // Adiciona botão "voltar" opcional

    let currentIndex = 0;

    const updateCarousel = () => {
        wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    // Avança para a próxima imagem
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length; // Volta ao início no final
        updateCarousel();
    });

    // Retorna para a imagem anterior
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length; // Volta ao final no início
            updateCarousel();
        });
    }
});
