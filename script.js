
document.addEventListener('DOMContentLoaded', () => {
    // Theme Handling
    const themeToggle = document.getElementById('theme-toggle');
    const prefersLightScheme = window.matchMedia('(prefers-color-scheme: light)');

    // Check localStorage or system preference
    const currentTheme = localStorage.getItem('theme');

    // Default is dark (no class). If light is needed, add 'light-mode'
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
    } else if (currentTheme === 'dark') {
        document.body.classList.remove('light-mode');
    } else if (prefersLightScheme.matches) {
        document.body.classList.add('light-mode');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        let theme = 'dark';
        if (document.body.classList.contains('light-mode')) {
            theme = 'light';
        }
        localStorage.setItem('theme', theme);
    });

    // Language Handling
    const langBtns = document.querySelectorAll('.lang-btn');
    const i18nElements = document.querySelectorAll('[data-i18n]');

    const translations = {
        en: {
            greeting: "Hello, I'm Can.",
            bio: "I started as a mechanical engineer, but I found my true calling in code. Now, I channel that passion into building mobile experiences that truly matter!",
            bio_detail: "I took the leap to pursue my dreams, and today I craft mobile apps that seamlessly blend powerful utility with stunning design.",
            bebik_desc: "A smart baby tracker app designed to simplify parenting. I developed this personally to focus on my own baby's development.",
            five_lines_desc: "Logic Made Beautiful. Drop blocks, merge numbers, and find your flow in this relaxing puzzle challenge. A refined logic puzzle combining deep strategy with elegant design.",
            visit_website: "Visit Website",
            contact_btn: "Contact Support"
        },
        tr: {
            greeting: "Merhaba, Ben Can.",
            bio: "Kariyerime makine mühendisi olarak başladım, ancak asıl tutkumu kod dünyasında keşfettim. Şimdi tüm enerjimi, gerçekten fark yaratan mobil deneyimler inşa etmeye harcıyorum!",
            bio_detail: "Hayallerimin peşinden gitmek için büyük bir adım attım. Bugün, güçlü işlevselliği şık tasarımla birleştiren özgün uygulamalar geliştiriyorum.",
            bebik_desc: "Ebeveynliği kolaylaştırmak için tasarlanmış akıllı bir bebek takip uygulaması. Kendi bebeğimin gelişimine odaklanmak için kişisel olarak geliştirdim.",
            five_lines_desc: "Mantığın Güzel Hali. Blokları bırakın, sayıları birleştirin ve bu rahatlatıcı bulmaca oyununda akışınızı bulun. Derin stratejiyi zarif tasarımla birleştiren rafine bir mantık bulmacası.",
            visit_website: "Web Sitesini Ziyaret Et",
            contact_btn: "İletişime Geç"
        }
    };

    function setLanguage(lang) {
        // Update Buttons
        langBtns.forEach(btn => {
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update Text
        i18nElements.forEach(el => {
            const key = el.dataset.i18n;
            if (translations[lang] && translations[lang][key]) {
                // Fade out effect could be added here
                el.textContent = translations[lang][key];
            }
        });

        // Store preference
        localStorage.setItem('lang', lang);
        document.documentElement.lang = lang;
    }

    // Init Language
    const browserLang = navigator.language || navigator.userLanguage;
    const isTurkish = browserLang && browserLang.startsWith('tr');
    const defaultLang = isTurkish ? 'tr' : 'en';

    const storedLang = localStorage.getItem('lang') || defaultLang;
    setLanguage(storedLang);

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.dataset.lang);
        });
    });
});
