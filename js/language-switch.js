// 确保 languageData 变量可访问
if (typeof languageData === 'undefined') {
    console.error('languageData is not defined. Make sure language.js is loaded before language-switch.js');
}

// 获取当前语言
function getCurrentLanguage() {
    return localStorage.getItem('selectedLanguage') || 'en';
}

// 设置语言
function setLanguage(lang) {
    if (!languageData[lang]) {
        console.error('Unsupported language:', lang);
        return;
    }
    
    localStorage.setItem('selectedLanguage', lang);
    updateContent(lang);
    updateLanguageSelector(lang);
}

// 更新页面内容
function updateContent(lang) {
    const elements = document.querySelectorAll('[data-lang-key]');
    elements.forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (languageData[lang] && languageData[lang][key]) {
            element.textContent = languageData[lang][key];
        }
    });
}

// 更新语言选择器
function updateLanguageSelector(lang) {
    const languageText = document.querySelector('.language-text');
    if (languageText) {
        languageText.textContent = lang === 'en' ? 'English' : '中文';
    }
    closeLanguageDropdown();
}

// 打开语言下拉菜单
function openLanguageDropdown() {
    const dropdown = document.querySelector('.language-dropdown');
    if (dropdown) {
        dropdown.classList.add('active');
    }
}

// 关闭语言下拉菜单
function closeLanguageDropdown() {
    const dropdown = document.querySelector('.language-dropdown');
    if (dropdown) {
        dropdown.classList.remove('active');
    }
}

// 初始化语言切换功能
document.addEventListener('DOMContentLoaded', () => {
    // 初始化当前语言
    const currentLang = getCurrentLanguage();
    updateContent(currentLang);
    updateLanguageSelector(currentLang);

    // 语言切换按钮点击事件
    const languageBtn = document.querySelector('.language-btn');
    if (languageBtn) {
        languageBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const dropdown = document.querySelector('.language-dropdown');
            if (dropdown.classList.contains('active')) {
                closeLanguageDropdown();
            } else {
                openLanguageDropdown();
            }
        });
    }

    // 语言选项点击事件
    const languageOptions = document.querySelectorAll('.language-option');
    languageOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const lang = option.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    // 点击页面其他地方关闭下拉菜单
    document.addEventListener('click', () => {
        closeLanguageDropdown();
    });
}); 