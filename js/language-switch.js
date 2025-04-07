// 获取当前语言设置
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'en';
}

// 设置语言
function setLanguage(lang) {
    localStorage.setItem('language', lang);
    updatePageContent(lang);
}

// 更新页面内容
function updatePageContent(lang) {
    const data = languageData[lang];
    
    // 更新导航链接
    document.querySelectorAll('nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href.includes('index.html')) {
            link.textContent = data.home;
        } else if (href.includes('game-intro.html')) {
            link.textContent = data.gameIntro;
        } else if (href.includes('media.html')) {
            link.textContent = data.media;
        } else if (href.includes('guide.html')) {
            link.textContent = data.guide;
        } else if (href.includes('talk.html')) {
            link.textContent = data.talk;
        }
    });

    // 更新面包屑导航
    document.querySelectorAll('.breadcrumb a').forEach(link => {
        const href = link.getAttribute('href');
        if (href.includes('index.html')) {
            link.textContent = data.home;
        }
    });
    document.querySelectorAll('.breadcrumb span').forEach(span => {
        if (span.textContent.includes('Play Now')) {
            span.textContent = data.playNow;
        } else if (span.textContent.includes('Game Intro')) {
            span.textContent = data.gameIntro;
        } else if (span.textContent.includes('Media')) {
            span.textContent = data.media;
        } else if (span.textContent.includes('Guide')) {
            span.textContent = data.guide;
        } else if (span.textContent.includes('Talk')) {
            span.textContent = data.talk;
        }
    });

    // 更新页面特定内容
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'game-intro.html') {
        // 更新标题和描述
        document.querySelector('.game-overview h1').textContent = data.gameTitle;
        document.querySelector('.game-description p').textContent = data.gameDescription;
        
        // 更新游戏玩法部分
        document.querySelector('.gameplay h2').textContent = data.gameplay;
        document.querySelector('.gameplay p').textContent = data.gameplayDescription;
        
        // 更新基本操作部分
        document.querySelector('.gameplay h3').textContent = data.basicControls;
        document.querySelector('.gameplay ul li').textContent = data.basicControlsDesc;
        
        // 更新游戏目标部分
        document.querySelector('.game-objectives h3').textContent = data.gameObjectives;
        document.querySelector('.game-objectives p').textContent = data.gameObjectivesDesc;
        
        // 更新游戏特色部分
        document.querySelector('.game-features h3').textContent = data.gameFeatures;
        document.querySelector('.game-features p').textContent = data.gameFeaturesDesc;
        
        // 更新游戏历史部分
        document.querySelector('.game-history h2').textContent = data.gameHistory;
        document.querySelector('.game-history p').textContent = data.gameHistoryDesc;
        
        // 更新创作团队部分
        document.querySelector('.development-team h2').textContent = data.developmentTeam;
        document.querySelector('.development-team p').textContent = data.developmentTeamDesc;
    } else if (currentPage === 'media.html') {
        document.querySelector('.media-section h2').textContent = data.gameMedia;
        document.querySelectorAll('.media-category h3').forEach((h3, index) => {
            if (index === 0) h3.textContent = data.screenshots;
            else if (index === 1) h3.textContent = data.music;
            else if (index === 2) h3.textContent = data.videos;
        });
        document.querySelectorAll('.media-category p').forEach((p, index) => {
            if (index === 0) p.textContent = data.screenshotsDesc;
            else if (index === 1) p.textContent = data.musicDesc;
            else if (index === 2) p.textContent = data.videosDesc;
        });
    } else if (currentPage === 'guide.html') {
        // 更新基本操作指南部分
        document.querySelector('.basic-controls h2').textContent = data.basicControls;
        document.querySelector('.basic-controls p').textContent = data.basicControlsGuide;
        document.querySelectorAll('.basic-controls ul li').forEach((li, index) => {
            li.textContent = data.basicControlsList[index];
        });
        
        // 更新关卡攻略部分
        document.querySelector('.level-guide h2').textContent = data.levelGuide;
        document.querySelector('.level-guide p').textContent = data.levelGuideDesc;
        document.querySelectorAll('.level-guide ul li').forEach((li, index) => {
            li.textContent = data.levelGuideList[index];
        });
        
        // 更新高级技巧部分
        document.querySelector('.advanced-tips h2').textContent = data.advancedTips;
        document.querySelector('.advanced-tips p').textContent = data.advancedTipsDesc;
        document.querySelectorAll('.advanced-tips ul li').forEach((li, index) => {
            li.textContent = data.advancedTipsList[index];
        });
        
        // 更新得分系统部分
        document.querySelector('.scoring-system h2').textContent = data.scoringSystem;
        document.querySelector('.scoring-system p').textContent = data.scoringSystemDesc;
        document.querySelectorAll('.scoring-system ul li').forEach((li, index) => {
            li.textContent = data.scoringSystemList[index];
        });
        
        // 更新成就系统部分
        document.querySelector('.achievements h2').textContent = data.achievements;
        document.querySelector('.achievements p').textContent = data.achievementsDesc;
        document.querySelectorAll('.achievements ul li').forEach((li, index) => {
            li.textContent = data.achievementsList[index];
        });
    } else if (currentPage === 'talk.html') {
        document.querySelector('.talk-section h2').textContent = data.gameDiscussion;
        document.querySelector('.comment-form h3').textContent = data.addComment;
        document.querySelector('.comments-header h3').textContent = data.recentComments;
        document.querySelector('.submit-btn').textContent = data.postComment;
        document.querySelectorAll('.page-btn').forEach((btn, index) => {
            if (index === 0) btn.textContent = data.previous;
            else if (index === 1) btn.textContent = data.next;
        });
    }

    // 更新页脚内容
    const footerContact = document.querySelector('.footer-content p:last-child');
    if (footerContact) {
        footerContact.textContent = data.contactUs + data.email;
    }
}

// 初始化语言切换功能
document.addEventListener('DOMContentLoaded', function() {
    const languageToggle = document.getElementById('languageToggle');
    const languageText = languageToggle.querySelector('.language-text');
    const currentLang = getCurrentLanguage();
    
    // 设置初始语言
    languageText.textContent = currentLang === 'en' ? 'EN' : '中';
    updatePageContent(currentLang);
    
    // 添加点击事件
    languageToggle.addEventListener('click', function() {
        const newLang = currentLang === 'en' ? 'zh' : 'en';
        setLanguage(newLang);
        languageText.textContent = newLang === 'en' ? 'EN' : '中';
    });
}); 