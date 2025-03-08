# Hardy em Jogo - Documentação

Este repositório contém o código-fonte do site Hardy em Jogo, uma biblioteca de links e recursos para games. Este guia fornece instruções sobre como manter e expandir o site.

## Estrutura do Projeto

```
em-jogo/
├── estilizações/
│   └── modern-style.css     # Estilo principal do site
├── imagens/                 # Imagens utilizadas no site
├── imagens-em breve/        # Imagens para projetos futuros
├── arquivos/                # Arquivos para download
├── index.html               # Página inicial
├── links-onedrive.html      # Página de links externos
├── downloads.html           # Página de downloads
├── anuncios.html            # Página de anúncios
├── modern-script.js         # Script principal do site
├── anuncios.js              # Script específico para a página de anúncios
└── README.md                # Este arquivo
```

## Como Adicionar Novas Seções

Para adicionar uma nova seção à página inicial ou qualquer outra página:

1. Abra o arquivo HTML correspondente (ex: `index.html`)
2. Insira o código da nova seção seguindo este modelo:

```html
<section id="nome-da-secao" class="nome-classe">
    <div class="container">
        <h2 class="reveal">Título da Seção</h2>
        <p class="reveal">Descrição da seção.</p>
        
        <!-- Conteúdo específico da seção aqui -->
        
    </div>
</section>
```

3. Adicione a classe `reveal` aos elementos para ativar a animação de revelação ao rolar.

## Como Adicionar Novos Cards

Para adicionar um novo card de opção na página inicial:

```html
<a href="link-da-pagina.html" class="card reveal">
    <div class="card-img">
        <img src="imagens/imagem.jpg" alt="Descrição da Imagem">
    </div>
    <h3 class="card-title">Título do Card</h3>
    <p>Descrição do card com informações relevantes.</p>
    <div style="margin-top: auto; text-align: center; padding-top: 1rem;">
        <span class="btn"><span>Texto do Botão</span></span>
    </div>
</a>
```

## Como Adicionar Novos Links com Ícones

Para adicionar novos links com ícones na página de links:

1. Abra o arquivo `links-onedrive.html`
2. Adicione uma nova categoria ou use uma existente
3. Para adicionar um novo item com ícone:

```html
<div class="links-category reveal">
    <h2><i class="fas fa-ICONE"></i> Nome da Categoria</h2>
    <div class="link-item">
        <a href="URL_DO_LINK" target="_blank">Nome do Link</a>
        <p>Descrição do link</p>
        <div class="link-tags">
            <span class="tag">Tag 1</span>
            <span class="tag">Tag 2</span>
        </div>
    </div>
    <hr>
    <!-- Mais links aqui -->
</div>
```

### Guia de Ícones de Jogos

Os ícones são do Font Awesome. Para adicionar ícones específicos para jogos:

| Jogo/Categoria | Ícone | Código |
|----------------|-------|--------|
| Dragon Ball | Dragão | `<i class="fas fa-dragon"></i>` |
| Hollow Knight | Inseto | `<i class="fas fa-bug"></i>` |
| Celeste | Montanha | `<i class="fas fa-mountain"></i>` |
| Jogos em geral | Controle | `<i class="fas fa-gamepad"></i>` |
| Recursos de vídeo | Video | `<i class="fas fa-video"></i>` |
| Imagens | Imagem | `<i class="fas fa-image"></i>` |
| Documentos | Documento | `<i class="fas fa-file-alt"></i>` |
| Músicas | Música | `<i class="fas fa-music"></i>` |
| RPGs | Dados | `<i class="fas fa-dice-d20"></i>` |
| FPS | Mira | `<i class="fas fa-crosshairs"></i>` |
| Aventura | Carro | `<i class="fas fa-car"></i>` |
| Esportes | Futebol | `<i class="fas fa-futbol"></i>` |

### Encontrando mais ícones

Para encontrar mais ícones, visite [Font Awesome](https://fontawesome.com/search?o=r&m=free). Use apenas ícones gratuitos do pacote Free (sólido).

## Como Adicionar Carrossel de Imagens

Para adicionar um carrossel de imagens:

```html
<div class="carousel-wrapper">
    <button class="show-carousel">Ver Imagens</button>
    <div class="carousel-container hidden">
        <div class="carousel">
            <div class="carousel-container">
                <div class="carousel-item">
                    <img src="imagens/imagem1.jpg" alt="Descrição da Imagem 1">
                    <div class="carousel-caption">
                        <h3>Título da Imagem</h3>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="imagens/imagem2.jpg" alt="Descrição da Imagem 2">
                    <div class="carousel-caption">
                        <h3>Título da Imagem 2</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
```

## Como Adicionar Novos Downloads

Para adicionar um novo item de download:

```html
<div class="download-item">
    <a href="arquivos/nome-do-arquivo.extensao" download>
        <i class="fas fa-download"></i>
        Nome do Arquivo
    </a>
    <p>Descrição do arquivo para download.</p>
    <div class="download-info">
        <span><i class="fas fa-file"></i> Tipo de Arquivo</span>
        <span><i class="fas fa-info-circle"></i> Informação Adicional</span>
    </div>
    <a href="arquivos/nome-do-arquivo.extensao" download class="download-btn">
        <span>Baixar Agora</span>
    </a>
</div>
```

## Manutenção e Personalização

### Alterar Cores

As cores principais do site são definidas em variáveis CSS no início do arquivo `estilizações/modern-style.css`:

```css
:root {
  --primary-color: #080808;     /* Cor de fundo principal */
  --secondary-color: #141414;   /* Cor de fundo secundária */
  --accent-color: #4c00ff;      /* Cor de destaque (roxo) */
  --accent-hover: #ffffff;      /* Cor ao passar o mouse */
  --text-color: #f8f8f8;        /* Cor do texto principal */
  --text-muted: #b0b0b0;        /* Cor do texto secundário */
}
```

Para alterar qualquer cor, basta editar o valor hexadecimal correspondente.

### Responsividade

O site já é totalmente responsivo. As regras para diferentes tamanhos de tela estão definidas no final do arquivo `modern-style.css`.

## Dicas Importantes

1. Sempre use a classe `reveal` nos elementos que devem aparecer com animação ao rolar.
2. Ao adicionar botões, utilize a estrutura completa com spans internos para garantir que o texto permaneça visível.
3. Mantenha as imagens com tamanhos otimizados para melhor desempenho.
4. Ao adicionar links externos, sempre use `target="_blank"` para abrir em nova aba.
5. Teste todas as alterações em diferentes tamanhos de tela para garantir responsividade. 