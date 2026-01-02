/* ============================================
   新春おみくじ メインアプリケーション
   ============================================ */

// DOM要素
const elements = {
    // 画面
    titleScreen: document.getElementById('titleScreen'),
    drawingScreen: document.getElementById('drawingScreen'),
    resultScreen: document.getElementById('resultScreen'),
    
    // タイトル画面
    drawButton: document.getElementById('drawButton'),
    alreadyDrawn: document.getElementById('alreadyDrawn'),
    showResultButton: document.getElementById('showResultButton'),
    omikujiBox: document.getElementById('omikujiBox'),
    
    // 演出画面
    risingStick: document.getElementById('risingStick'),
    stickNumber: document.getElementById('stickNumber'),
    drawingText: document.getElementById('drawingText'),
    
    // 結果画面
    fortuneRank: document.getElementById('fortuneRank'),
    wakaText: document.getElementById('wakaText'),
    wakaAuthor: document.getElementById('wakaAuthor'),
    fortuneDetails: document.getElementById('fortuneDetails'),
    luckyColor: document.getElementById('luckyColor'),
    luckyNumber: document.getElementById('luckyNumber'),
    luckyDirection: document.getElementById('luckyDirection'),
    resultCard: document.getElementById('resultCard'),
    
    // シェア
    shareButton: document.getElementById('shareButton'),
    shareTwitter: document.getElementById('shareTwitter'),
    shareLine: document.getElementById('shareLine'),
    backButton: document.getElementById('backButton'),
    
    // 桜
    sakuraContainer: document.getElementById('sakuraContainer')
};

// アプリケーション状態
let currentResult = null;

// ============================================
// ローカルストレージ管理
// ============================================

const STORAGE_KEY = 'omikuji_2026';

function getTodayString() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function saveResult(result) {
    const data = {
        date: getTodayString(),
        result: result
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadResult() {
    try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (data && data.date === getTodayString()) {
            return data.result;
        }
    } catch (e) {
        console.error('Failed to load result:', e);
    }
    return null;
}

function hasDrawnToday() {
    return loadResult() !== null;
}

// ============================================
// 画面遷移
// ============================================

function showScreen(screenId) {
    // すべての画面を非表示
    elements.titleScreen.classList.remove('active');
    elements.drawingScreen.classList.remove('active');
    elements.resultScreen.classList.remove('active');
    
    // 指定された画面を表示
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.add('active');
    }
}

// ============================================
// おみくじを引く演出
// ============================================

async function drawOmikuji() {
    // 演出画面に遷移
    showScreen('drawingScreen');
    
    // おみくじを生成
    currentResult = generateOmikuji();
    
    // 結果を保存
    saveResult(currentResult);
    
    // 棒の番号を設定（ランダムな吉数）
    const stickNum = Math.floor(Math.random() * 100) + 1;
    elements.stickNumber.textContent = stickNum;
    
    // 演出シーケンス
    await delay(1500);
    
    elements.drawingText.textContent = '棒が出てきます...';
    elements.risingStick.classList.add('rise');
    
    await delay(2000);
    
    elements.drawingText.textContent = 'おみくじを開きます...';
    
    await delay(1500);
    
    // 結果画面に遷移
    showResult(currentResult);
}

// ============================================
// 結果表示
// ============================================

function showResult(result) {
    showScreen('resultScreen');
    
    // 運勢ランクを表示
    elements.fortuneRank.className = 'fortune-rank ' + result.fortune.class;
    elements.fortuneRank.innerHTML = `<span class="rank-text">${result.fortune.name}</span>`;
    
    // 和歌を表示
    elements.wakaText.innerHTML = `
        <span class="kami">${result.waka.kami}</span>
        <span class="shimo">${result.waka.shimo}</span>
    `;
    elements.wakaAuthor.textContent = `― ${result.waka.author}`;
    
    // 各運勢を表示
    elements.fortuneDetails.innerHTML = `
        <div class="fortune-item">
            <span class="item-icon">💕</span>
            <span class="item-label">恋愛</span>
            <span class="item-value">${result.details.love}</span>
        </div>
        <div class="fortune-item">
            <span class="item-icon">💼</span>
            <span class="item-label">仕事</span>
            <span class="item-value">${result.details.work}</span>
        </div>
        <div class="fortune-item">
            <span class="item-icon">💰</span>
            <span class="item-label">金運</span>
            <span class="item-value">${result.details.money}</span>
        </div>
        <div class="fortune-item">
            <span class="item-icon">🏥</span>
            <span class="item-label">健康</span>
            <span class="item-value">${result.details.health}</span>
        </div>
    `;
    
    // ラッキーアイテムを表示
    elements.luckyColor.textContent = result.lucky.color.name;
    elements.luckyColor.style.color = result.lucky.color.code;
    elements.luckyNumber.textContent = result.lucky.number;
    elements.luckyDirection.textContent = result.lucky.direction;
    
    // シェアリンクを設定
    updateShareLinks(result);
    
    // 大吉・大凶の場合は特別な演出
    if (result.fortune.id === 'daikichi') {
        createCelebration();
    }
}

// ============================================
// シェア機能
// ============================================

function updateShareLinks(result) {
    const text = `【2026年 新春おみくじ】\n運勢：${result.fortune.name}\n\n${result.waka.kami}\n${result.waka.shimo}\n　　　― ${result.waka.author}\n\n`;
    const url = window.location.href;
    const hashtags = '新春おみくじ,おみくじ,2026年';
    
    // X (Twitter)
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(hashtags)}`;
    elements.shareTwitter.href = twitterUrl;
    
    // LINE
    const lineText = text + url;
    const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    elements.shareLine.href = lineUrl;
}

// ============================================
// 桜エフェクト
// ============================================

function createSakura() {
    const sakura = document.createElement('div');
    sakura.className = 'sakura';
    
    // ランダムな位置と大きさ
    sakura.style.left = Math.random() * 100 + '%';
    sakura.style.width = (Math.random() * 10 + 8) + 'px';
    sakura.style.height = sakura.style.width;
    sakura.style.animationDuration = (Math.random() * 5 + 8) + 's';
    sakura.style.animationDelay = Math.random() * 5 + 's';
    
    elements.sakuraContainer.appendChild(sakura);
    
    // アニメーション終了後に削除
    sakura.addEventListener('animationend', () => {
        sakura.remove();
    });
}

function initSakura() {
    // 初期の桜を生成
    for (let i = 0; i < 15; i++) {
        setTimeout(() => createSakura(), i * 300);
    }
    
    // 定期的に桜を追加
    setInterval(() => {
        if (elements.sakuraContainer.children.length < 20) {
            createSakura();
        }
    }, 1000);
}

// ============================================
// 大吉の祝福エフェクト
// ============================================

function createCelebration() {
    // 金色の紙吹雪を追加
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'sakura';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.width = (Math.random() * 8 + 5) + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.background = Math.random() > 0.5 ? '#D4AF37' : '#C41E3A';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.animationDuration = (Math.random() * 3 + 4) + 's';
            confetti.style.opacity = '0.8';
            
            elements.sakuraContainer.appendChild(confetti);
            
            confetti.addEventListener('animationend', () => {
                confetti.remove();
            });
        }, i * 50);
    }
}

// ============================================
// ユーティリティ
// ============================================

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================
// 初期化
// ============================================

function initApp() {
    // 桜エフェクトを開始
    initSakura();
    
    // すでに引いているかチェック
    const savedResult = loadResult();
    if (savedResult) {
        currentResult = savedResult;
        elements.drawButton.classList.add('hidden');
        elements.alreadyDrawn.classList.remove('hidden');
    }
    
    // イベントリスナーを設定
    
    // おみくじを引くボタン
    elements.drawButton.addEventListener('click', () => {
        if (!hasDrawnToday()) {
            drawOmikuji();
        }
    });
    
    // おみくじ箱クリック
    elements.omikujiBox.addEventListener('click', () => {
        if (!hasDrawnToday()) {
            drawOmikuji();
        }
    });
    
    // 結果を見るボタン
    elements.showResultButton.addEventListener('click', () => {
        if (currentResult) {
            showResult(currentResult);
        }
    });
    
    // 戻るボタン
    elements.backButton.addEventListener('click', () => {
        // 演出画面のリセット
        elements.risingStick.classList.remove('rise');
        elements.drawingText.textContent = 'おみくじ箱を振っています...';
        
        showScreen('titleScreen');
    });
    
    // シェアボタン（画像保存）
    elements.shareButton.addEventListener('click', () => {
        if (currentResult) {
            generateShareImage(currentResult);
        }
    });
}

// DOMContentLoaded
document.addEventListener('DOMContentLoaded', initApp);

