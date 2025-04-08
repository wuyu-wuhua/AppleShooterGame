// 确保 languageData 变量可访问
if (typeof languageData === 'undefined') {
    console.error('languageData is not defined. Make sure language.js is loaded before language-switch.js');
}

// 获取当前语言
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'en';
}

// 设置语言
function setLanguage(lang) {
    if (!languageData[lang]) {
        console.error(`Language ${lang} is not supported`);
        return;
    }
    localStorage.setItem('language', lang);
    updatePageContent(lang);
    updateLanguageSelector(lang);
    closeLanguageDropdown();
}

// 更新语言选择器显示
function updateLanguageSelector(lang) {
    const languageText = document.querySelector('.language-text');
    if (languageText) {
        switch(lang) {
            case 'en':
                languageText.textContent = 'EN';
                break;
            case 'zh':
                languageText.textContent = '中';
                break;
            case 'ja':
                languageText.textContent = '日';
                break;
            case 'ko':
                languageText.textContent = '한';
                break;
            case 'es':
                languageText.textContent = 'ES';
                break;
        }
    }
}

// 打开语言下拉菜单
function openLanguageDropdown() {
    const dropdown = document.querySelector('.language-dropdown');
    const chevron = document.querySelector('.language-toggle .fa-chevron-down');
    if (dropdown) {
        dropdown.classList.add('active');
        if (chevron) {
            chevron.style.transform = 'rotate(180deg)';
        }
    }
}

// 关闭语言下拉菜单
function closeLanguageDropdown() {
    const dropdown = document.querySelector('.language-dropdown');
    const chevron = document.querySelector('.language-toggle .fa-chevron-down');
    if (dropdown) {
        dropdown.classList.remove('active');
        if (chevron) {
            chevron.style.transform = 'rotate(0deg)';
        }
    }
}

// 更新页面内容
function updatePageContent(lang) {
    const data = languageData[lang];
    if (!data) {
        console.error(`No translation data found for language: ${lang}`);
        return;
    }

    // 更新导航链接
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const key = link.getAttribute('data-lang-key');
        if (key && data[key]) {
            link.textContent = data[key];
        }
    });

    // 更新面包屑导航
    const breadcrumbItems = document.querySelectorAll('.breadcrumb-item');
    breadcrumbItems.forEach(item => {
        const key = item.getAttribute('data-lang-key');
        if (key && data[key]) {
            item.textContent = data[key];
        }
    });

    // 更新游戏介绍页面内容
    const gameIntroElements = {
        'gameTitle': '.game-title',
        'gameDescription': '.game-description',
        'gameplay': '.gameplay',
        'basicControls': '.basic-controls',
        'basicControlsDesc': '.basic-controls-desc',
        'gameObjectives': '.game-objectives',
        'gameObjectivesDesc': '.game-objectives-desc',
        'gameFeatures': '.game-features',
        'gameFeaturesDesc': '.game-features-desc',
        'gameHistory': '.game-history',
        'gameHistoryDesc': '.game-history-desc',
        'developmentTeam': '.development-team',
        'developmentTeamDesc': '.development-team-desc'
    };

    for (const [key, selector] of Object.entries(gameIntroElements)) {
        const element = document.querySelector(selector);
        if (element && data[key]) {
            element.textContent = data[key];
        }
    }

    // 更新媒体页面内容
    const mediaElements = {
        'gameMedia': '.game-media',
        'gameScreenshots': '.game-screenshots',
        'viewScreenshots': '.view-screenshots',
        'gameMusic': '.game-music',
        'listenMusic': '.listen-music',
        'gameVideos': '.game-videos',
        'watchVideos': '.watch-videos'
    };

    for (const [key, selector] of Object.entries(mediaElements)) {
        const element = document.querySelector(selector);
        if (element && data[key]) {
            element.textContent = data[key];
        }
    }

    // 更新攻略页面内容
    const guideElements = {
        'basicControlsGuide': '.basic-controls-guide',
        'aimingSystem': '.aiming-system',
        'shootingMechanism': '.shooting-mechanism',
        'specialTechniques': '.special-techniques',
        'levelGuide': '.level-guide',
        'advancedTips': '.advanced-tips',
        'scoringSystem': '.scoring-system',
        'achievements': '.achievements'
    };

    for (const [key, selector] of Object.entries(guideElements)) {
        const element = document.querySelector(selector);
        if (element && data[key]) {
            element.textContent = data[key];
        }
    }

    // 更新讨论页面内容
    const talkElements = {
        'gameDiscussion': '.game-discussion',
        'addComment': '.add-comment',
        'username': '.username-label',
        'comment': '.comment-label',
        'postComment': '.post-comment',
        'recentComments': '.recent-comments',
        'totalComments': '.total-comments',
        'deleteComment': '.delete-comment'
    };

    for (const [key, selector] of Object.entries(talkElements)) {
        const element = document.querySelector(selector);
        if (element && data[key]) {
            element.textContent = data[key];
        }
    }

    // 更新页脚内容
    const footerContact = document.querySelector('.footer-contact');
    if (footerContact && data.contactUs) {
        footerContact.textContent = data.contactUs;
    }
}

// 初始化语言切换功能
function initLanguageSwitch() {
    const currentLang = getCurrentLanguage();
    updateLanguageSelector(currentLang);
    updatePageContent(currentLang);
    
    // 添加语言选择事件监听
    const languageToggle = document.querySelector('.language-toggle');
    const languageDropdown = document.querySelector('.language-dropdown');
    
    if (languageToggle && languageDropdown) {
        // 点击语言切换按钮
        languageToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (languageDropdown.classList.contains('active')) {
                closeLanguageDropdown();
            } else {
                openLanguageDropdown();
            }
        });
        
        // 点击语言选项
        languageDropdown.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const lang = this.getAttribute('data-lang');
                if (lang && languageData[lang]) {
                    setLanguage(lang);
                }
            });
        });
        
        // 点击页面其他地方关闭下拉菜单
        document.addEventListener('click', function() {
            closeLanguageDropdown();
        });
        
        // 阻止下拉菜单点击事件冒泡
        languageDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
}

// 等待 DOM 完全加载后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguageSwitch);
} else {
    initLanguageSwitch();
} 