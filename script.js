// Sticky header effect
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Smooth scroll to section
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
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