// ——— ДАННЫЕ ДЛЯ СОЦИАЛЬНЫХ СЕТЕЙ ———
const socialData = [
    {
        id: 'instagram',
        name: 'Instagram',
        icon: 'fab fa-instagram',
        description: 'Эстетика, сторис, моя идеальная жизнь. Подпишись, пока не поздно.',
        buttonText: 'Перейти',
        url: 'https://www.instagram.com/ammabluebubble',
        image: '../image/8c724378-70f2-4519-b5e7-ad63bedcef50.jfif'
    },
    {
        id: 'telegram',
        name: 'Telegram',
        icon: 'fab fa-telegram-plane',
        description: 'Канал для избранных. Здесь я пишу то, что не вынесут другие соцсети.',
        buttonText: 'Подписаться',
        url: 'https://t.me/dianavonduks',
        image: '../image/898a4d9c-7a88-4db5-b13a-e08fb5ce1d0d.jfif'
    },
    {
        id: 'vk',
        name: 'VK',
        icon: 'fab fa-vk',
        description: 'Мой VK — здесь я делюсь мыслями, которые не влезают в другие соцсети.',
        buttonText: 'Перейти',
        url: 'https://vk.com/ammabluebubble',
        image: '../image/16399782-8ae1-4c45-92c3-c4936baf2dfa.jfif'
    }
];

// ——— ГАЛЕРЕЯ ФОТО ———
const galleryPhotos = [
    { src: '../image/bb2a122a-43e4-496f-8adb-0f067f1facec.jfif', caption: 'Момент величия' },
    { src: '../image/c25533e8-fd18-4e2b-bfd9-76366acf5eae.jfif', caption: 'Пик эволюции' }
];

// ——— ОТКРЫТИЕ ССЫЛКИ ———
function openSocial(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

// ——— СОЗДАНИЕ КАРТОЧЕК ———
function renderSocialCards() {
    const grid = document.getElementById('socialGrid');

    if (!grid) return;

    grid.innerHTML = '';

    socialData.forEach((social, index) => {
        const card = document.createElement('div');

        card.className = 'social-card';
        card.dataset.index = index;
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';

        card.innerHTML = `
            <div class="social-card-image">
                <img src="${social.image}" alt="${social.name}" onerror="this.parentElement.innerHTML='<i class=\\'${social.icon}\\' style=\\'font-size: 40px; color: #c084fc;\\'></i>'">
            </div>
            <h3>${social.name}</h3>
            <p>${social.description}</p>
            <a
                class="btn-small"
                href="${social.url}"
                target="_blank"
                rel="noopener noreferrer"
            >
                ${social.buttonText}
            </a>
        `;

        grid.appendChild(card);
    });

    animateCardsOnScroll();
}

// ——— СОЗДАНИЕ ГАЛЕРЕИ ———
function renderGallery() {
    const grid = document.getElementById('galleryGrid');

    if (!grid) return;

    grid.innerHTML = '';

    galleryPhotos.forEach((photo, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.dataset.index = index;

        item.innerHTML = `
            <img src="${photo.src}" alt="${photo.caption}" onerror="this.parentElement.innerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;height:100%;background:rgba(168,85,247,0.1);color:#8a8aa0;font-size:14px;\\'>Фото ${index + 1}</div>'">
            <div class="gallery-overlay">
                <p>${photo.caption}</p>
            </div>
        `;

        // Открытие фото на весь экран
        item.addEventListener('click', () => openLightbox(photo.src));

        grid.appendChild(item);
    });

    animateGallery();
}

// ——— АНИМАЦИЯ ГАЛЕРЕИ ———
function animateGallery() {
    const items = document.querySelectorAll('.gallery-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    items.forEach(item => observer.observe(item));
}

// ——— LIGHTBOX ———
function openLightbox(src) {
    let lightbox = document.querySelector('.lightbox');

    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <img src="" alt="Full size" />
        `;
        document.body.appendChild(lightbox);

        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    lightbox.querySelector('img').src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ——— АНИМАЦИЯ КАРТОЧЕК ———
function animateCardsOnScroll() {
    const cards = document.querySelectorAll('.social-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const card = entry.target;
            const index = parseInt(card.dataset.index);

            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);

            observer.unobserve(card);
        });
    }, {
        threshold: 0.2
    });

    cards.forEach(card => observer.observe(card));
}

// ——— КНОПКИ В ШАПКЕ ———
function setupHeaderLinks() {
    const socialLinks =
        document.querySelectorAll('.header-socials .social-link');

    socialLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const socialId = this.dataset.social;

            const social =
                socialData.find(item => item.id === socialId);

            if (social) {
                openSocial(social.url);
            }
        });
    });
}

// ——— ПЛАВНАЯ ПРОКРУТКА ———
function setupSmoothScroll() {
    const button =
        document.getElementById('scrollToSocial');

    if (!button) return;

    button.addEventListener('click', function (e) {
        e.preventDefault();

        document
            .getElementById('social-section')
            .scrollIntoView({
                behavior: 'smooth'
            });
    });
}

// ——— ЗАПУСК ———
document.addEventListener('DOMContentLoaded', () => {
    renderSocialCards();
    renderGallery();
    setupHeaderLinks();
    setupSmoothScroll();
});

// Закрытие lightbox на Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});