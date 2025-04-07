// 获取当前语言设置
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'en';
}

// 设置语言
function setLanguage(lang) {
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
        chevron.style.transform = 'rotate(180deg)';
    }
}

// 关闭语言下拉菜单
function closeLanguageDropdown() {
    const dropdown = document.querySelector('.language-dropdown');
    const chevron = document.querySelector('.language-toggle .fa-chevron-down');
    if (dropdown) {
        dropdown.classList.remove('active');
        chevron.style.transform = 'rotate(0deg)';
    }
}

// 更新页面内容
function updatePageContent(lang) {
    const data = languageData[lang];
    if (!data) return;

    // 更新导航链接
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
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
        }
    });

    // 更新面包屑导航
    const breadcrumbLinks = document.querySelectorAll('.breadcrumb-item a');
    breadcrumbLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
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
        if (href && href.includes('index.html')) {
            link.textContent = data.home;
        }
    });
    document.querySelectorAll('.breadcrumb span').forEach(span => {
        if (span.textContent.includes('Game Intro') || span.textContent.includes('游戏介绍') || 
            span.textContent.includes('ゲーム紹介') || span.textContent.includes('게임 소개') || 
            span.textContent.includes('Introducción')) {
            span.textContent = data.gameIntro;
        }
    });

    // 更新页面特定内容
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'game-intro.html') {
        // 更新游戏介绍页面内容
        const gameTitle = document.querySelector('.game-title');
        if (gameTitle) gameTitle.textContent = data.gameTitle;
        
        const gameDescription = document.querySelector('.game-description');
        if (gameDescription) gameDescription.textContent = data.gameDescription;
        
        // 更新游戏玩法部分
        const gameplayTitle = document.querySelector('.gameplay h2');
        if (gameplayTitle) gameplayTitle.textContent = data.gameplay;
        
        const gameplayContent = document.querySelector('.gameplay-content');
        if (gameplayContent) gameplayContent.textContent = data.gameplayContent;
        
        // 更新游戏历史部分
        const historyTitle = document.querySelector('.game-history h2');
        if (historyTitle) historyTitle.textContent = data.gameHistory;
        
        const historyContent = document.querySelector('.history-content');
        if (historyContent) historyContent.textContent = data.historyContent;
        
        // 更新创作团队部分
        const teamTitle = document.querySelector('.development-team h2');
        if (teamTitle) teamTitle.textContent = data.developmentTeam;
        
        const teamContent = document.querySelector('.team-content');
        if (teamContent) teamContent.textContent = data.teamContent;
    } else if (currentPage === 'guide.html') {
        // 更新主要标题
        document.querySelector('.basic-controls h2').textContent = data.basicControls;
        document.querySelector('.level-guide h2').textContent = data.levelGuide;
        document.querySelector('.advanced-tips h2').textContent = data.advancedTips;
        document.querySelector('.scoring-system h2').textContent = data.scoringSystem;
        document.querySelector('.achievements h2').textContent = data.achievements;

        // 更新基本操作部分
        const controlsContent = document.querySelector('.controls-content');
        if (controlsContent) {
            // 瞄准系统
            const aimingH3 = controlsContent.querySelector('.control-item:nth-child(1) h3');
            if (aimingH3) aimingH3.textContent = data.aimingSystem;
            const aimingUl = controlsContent.querySelector('.control-item:nth-child(1) ul');
            if (aimingUl) {
                const lis = aimingUl.querySelectorAll('li');
                data.aimingSystemList.forEach((text, index) => {
                    if (lis[index]) lis[index].textContent = text;
                });
            }

            // 射击机制
            const shootingH3 = controlsContent.querySelector('.control-item:nth-child(2) h3');
            if (shootingH3) shootingH3.textContent = data.shootingMechanism;
            const shootingUl = controlsContent.querySelector('.control-item:nth-child(2) ul');
            if (shootingUl) {
                const lis = shootingUl.querySelectorAll('li');
                data.shootingMechanismList.forEach((text, index) => {
                    if (lis[index]) lis[index].textContent = text;
                });
            }

            // 特殊技巧
            const specialH3 = controlsContent.querySelector('.control-item:nth-child(3) h3');
            if (specialH3) specialH3.textContent = data.specialTechniques;
            const specialUl = controlsContent.querySelector('.control-item:nth-child(3) ul');
            if (specialUl) {
                const lis = specialUl.querySelectorAll('li');
                data.specialTechniquesList.forEach((text, index) => {
                    if (lis[index]) lis[index].textContent = text;
                });
            }
        }

        // 更新关卡攻略部分
        const levelContent = document.querySelector('.level-content');
        if (levelContent) {
            // 初级关卡
            const beginnerH3 = levelContent.querySelector('.level-item:nth-child(1) h3');
            if (beginnerH3) beginnerH3.textContent = data.beginnerLevels;
            const beginnerUl = levelContent.querySelector('.level-item:nth-child(1) ul');
            if (beginnerUl) {
                const lis = beginnerUl.querySelectorAll('li');
                data.beginnerLevelsList.forEach((text, index) => {
                    if (lis[index]) lis[index].textContent = text;
                });
            }

            // 中级关卡
            const intermediateH3 = levelContent.querySelector('.level-item:nth-child(2) h3');
            if (intermediateH3) intermediateH3.textContent = data.intermediateLevels;
            const intermediateUl = levelContent.querySelector('.level-item:nth-child(2) ul');
            if (intermediateUl) {
                const lis = intermediateUl.querySelectorAll('li');
                data.intermediateLevelsList.forEach((text, index) => {
                    if (lis[index]) lis[index].textContent = text;
                });
            }

            // 高级关卡
            const advancedH3 = levelContent.querySelector('.level-item:nth-child(3) h3');
            if (advancedH3) advancedH3.textContent = data.advancedLevels;
            const advancedUl = levelContent.querySelector('.level-item:nth-child(3) ul');
            if (advancedUl) {
                const lis = advancedUl.querySelectorAll('li');
                data.advancedLevelsList.forEach((text, index) => {
                    if (lis[index]) lis[index].textContent = text;
                });
            }

            // 终极关卡
            const ultimateH3 = levelContent.querySelector('.level-item:nth-child(4) h3');
            if (ultimateH3) ultimateH3.textContent = data.ultimateLevels;
            const ultimateUl = levelContent.querySelector('.level-item:nth-child(4) ul');
            if (ultimateUl) {
                const lis = ultimateUl.querySelectorAll('li');
                data.ultimateLevelsList.forEach((text, index) => {
                    if (lis[index]) lis[index].textContent = text;
                });
            }
        }

        // 更新高级技巧部分
        const tipsContent = document.querySelector('.tips-content');
        if (tipsContent) {
            // 风力补偿
            const windH3 = tipsContent.querySelector('.tip-item:nth-child(1) h3');
            if (windH3) windH3.textContent = data.windCompensation;
            const windUl = tipsContent.querySelector('.tip-item:nth-child(1) ul');
            if (windUl) {
                const lis = windUl.querySelectorAll('li');
                data.windCompensationList.forEach((text, index) => {
                    if (lis[index]) lis[index].textContent = text;
                });
            }

            // 移动目标预判
            const targetH3 = tipsContent.querySelector('.tip-item:nth-child(2) h3');
            if (targetH3) targetH3.textContent = data.movingTargetPrediction;
            const targetUl = tipsContent.querySelector('.tip-item:nth-child(2) ul');
            if (targetUl) {
                const lis = targetUl.querySelectorAll('li');
                data.movingTargetPredictionList.forEach((text, index) => {
                    if (lis[index]) lis[index].textContent = text;
                });
            }

            // 完美蓄力时机
            const chargeH3 = tipsContent.querySelector('.tip-item:nth-child(3) h3');
            if (chargeH3) chargeH3.textContent = data.perfectChargeTiming;
            const chargeUl = tipsContent.querySelector('.tip-item:nth-child(3) ul');
            if (chargeUl) {
                const lis = chargeUl.querySelectorAll('li');
                data.perfectChargeTimingList.forEach((text, index) => {
                    if (lis[index]) lis[index].textContent = text;
                });
            }
        }

        // 更新得分系统部分
        const scoringContent = document.querySelector('.scoring-content');
        if (scoringContent) {
            // 基础得分
            const basicH3 = scoringContent.querySelector('.score-item:nth-child(1) h3');
            if (basicH3) basicH3.textContent = data.basicScoring;
            const basicUl = scoringContent.querySelector('.score-item:nth-child(1) ul');
            if (basicUl) {
                const lis = basicUl.querySelectorAll('li');
                data.basicScoringList.forEach((text, index) => {
                    if (lis[index]) lis[index].textContent = text;
                });
            }

            // 连击奖励
            const comboH3 = scoringContent.querySelector('.score-item:nth-child(2) h3');
            if (comboH3) comboH3.textContent = data.comboBonus;
            const comboUl = scoringContent.querySelector('.score-item:nth-child(2) ul');
            if (comboUl) {
                const lis = comboUl.querySelectorAll('li');
                data.comboBonusList.forEach((text, index) => {
                    if (lis[index]) lis[index].textContent = text;
                });
            }

            // 特殊奖励
            const specialH3 = scoringContent.querySelector('.score-item:nth-child(3) h3');
            if (specialH3) specialH3.textContent = data.specialBonus;
            const specialUl = scoringContent.querySelector('.score-item:nth-child(3) ul');
            if (specialUl) {
                const lis = specialUl.querySelectorAll('li');
                data.specialBonusList.forEach((text, index) => {
                    if (lis[index]) lis[index].textContent = text;
                });
            }
        }

        // 更新成就系统部分
        const achievementsContent = document.querySelector('.achievements-content');
        if (achievementsContent) {
            // 新手成就
            const beginnerH3 = achievementsContent.querySelector('.achievement-item:nth-child(1) h3');
            if (beginnerH3) beginnerH3.textContent = data.beginnerAchievements;
            const beginnerUl = achievementsContent.querySelector('.achievement-item:nth-child(1) ul');
            if (beginnerUl) {
                const lis = beginnerUl.querySelectorAll('li');
                data.beginnerAchievementsList.forEach((text, index) => {
                    if (lis[index]) lis[index].textContent = text;
                });
            }

            // 进阶成就
            const intermediateH3 = achievementsContent.querySelector('.achievement-item:nth-child(2) h3');
            if (intermediateH3) intermediateH3.textContent = data.intermediateAchievements;
            const intermediateUl = achievementsContent.querySelector('.achievement-item:nth-child(2) ul');
            if (intermediateUl) {
                const lis = intermediateUl.querySelectorAll('li');
                data.intermediateAchievementsList.forEach((text, index) => {
                    if (lis[index]) lis[index].textContent = text;
                });
            }

            // 大师成就
            const masterH3 = achievementsContent.querySelector('.achievement-item:nth-child(3) h3');
            if (masterH3) masterH3.textContent = data.masterAchievements;
            const masterUl = achievementsContent.querySelector('.achievement-item:nth-child(3) ul');
            if (masterUl) {
                const lis = masterUl.querySelectorAll('li');
                data.masterAchievementsList.forEach((text, index) => {
                    if (lis[index]) lis[index].textContent = text;
                });
            }
        }
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
    const footerContact = document.querySelector('.footer-contact');
    if (footerContact) {
        footerContact.textContent = data.contactUs;
    }
}

// 初始化语言切换功能
document.addEventListener('DOMContentLoaded', function() {
    const currentLang = getCurrentLanguage();
    updateLanguageSelector(currentLang);
    updatePageContent(currentLang);
    
    // 添加语言选择事件监听
    const languageToggle = document.querySelector('.language-toggle');
    const languageDropdown = document.querySelector('.language-dropdown');
    
    if (languageToggle && languageDropdown) {
        // 点击语言切换按钮
        languageToggle.addEventListener('click', function(e) {
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
                const lang = this.getAttribute('data-lang');
                setLanguage(lang);
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
}); 